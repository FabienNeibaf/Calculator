const InputStream = input => {
  let i = 0;
  const peek = () => input[i];

  const next = () => {
    const current = input[i];
    if (current) i += 1;
    return current;
  };

  const end = () => i === input.length;

  const croak = message => {
    throw new Error(`${message} at index ${i}`);
  };

  return { peek, next, end, croak };
};

const PRECEDENCE = {
  '+': 1,
  '-': 1,
  x: 2,
  [`\u00f7`]: 2,
};

const readNumber = input => {
  let char;
  let number = '';
  let decimal = false;
  while (!input.end() && /[0-9.]/.test(input.peek())) {
    char = input.next();
    if (decimal && char === '.') input.croak('Number syntax error');
    if (char === '.') decimal = true;
    number += char;
  }
  return number;
};

const readOperator = input => {
  const operator = input.next();
  if (/[^0-9(]/.test(input.peek())) input.croak('operator syntax error');
  return operator;
};

let Expression;

const Atom = input => {
  const char = input.peek();
  if (char === '(') {
    input.next();
    return Expression(input);
  }
  if (/[0-9]/.test(char)) return readNumber(input);
  return input.croak('Invalid expression');
};

Expression = input => {
  let tree = Atom(input);
  while (!input.end()) {
    const char = input.peek();
    if (char === ')') {
      input.next();
      tree.parens = true;
      return tree;
    }
    if (
      !tree.parens &&
      tree.operator &&
      PRECEDENCE[tree.operator] < PRECEDENCE[char]
    ) {
      tree.right = {
        left: tree.right,
        operator: readOperator(input),
        right: Atom(input),
      };
    } else {
      tree = {
        left: tree,
        operator: readOperator(input),
        right: Atom(input),
      };
    }
  }
  return tree;
};

const evaluate = input => {
  const expression = Expression(InputStream(input.replace(/\s/g, '')));
  const evaluator = expression => {
    if (typeof expression === 'string') return parseInt(expression, 10);
    switch (expression.operator) {
      case '+':
        return evaluator(expression.left) + evaluator(expression.right);
      case '-':
        return evaluator(expression.left) - evaluator(expression.right);
      case 'x':
        return evaluator(expression.left) * evaluator(expression.right);
      case `\u00f7`:
        return evaluator(expression.left) / evaluator(expression.right);
      default:
        throw new Error('Unknown expression');
    }
  };
  return evaluator(expression);
};

export default evaluate;
