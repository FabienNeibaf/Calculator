const InputStream = input => {
  let i = 0;
  const peek = () => input[i];

  const prev = () => input[i - 1] || null;

  const next = () => {
    const current = input[i];
    if (current) i += 1;
    return current;
  };

  const end = () => i === input.length;

  const croak = message => {
    throw new Error(message);
  };

  return { peek, prev, next, end, croak };
};

const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  mod: 2,
};

const readNumber = input => {
  let char;
  let number = '';
  let decimal = false;
  while (!input.end() && /[\d.]/.test(input.peek())) {
    char = input.next();
    if (decimal && char === '.') input.croak(`${number}. is not a number`);
    if (char === '.') decimal = true;
    number += char;
  }
  number = Number(number);
  if (input.peek() === '%') {
    input.next();
    number /= 100;
  }
  return { type: 'number', value: number };
};

const readOperator = input => {
  let operator = input.next();
  if (operator === 'm') {
    while (!input.end() && /[^\d(]/.test(input.peek()))
      operator += input.next() || '';
    if (operator !== 'mod') input.croak('Invalid expression');
  }
  if (/[^\d(-]/.test(input.peek())) input.croak('Invalid expression');
  return operator;
};

let Expression;

const Atom = input => {
  const char = input.peek();
  if (char === '(') {
    input.next();
    return { type: 'group', value: Expression(input) };
  }
  if (char === '-' && /[^\d)]/.test(input.prev())) {
    input.next();
    return {
      type: 'unary',
      operator: 'negate',
      value: Atom(input),
    };
  }
  if (/\d/.test(char)) return readNumber(input);
  return null;
};

Expression = input => {
  let tree = Atom(input);
  while (!input.end()) {
    const char = input.peek();
    if (char === ')') {
      input.next();
      return tree;
    }
    if (tree.type === 'binary' && PRECEDENCE[tree.operator] < PRECEDENCE[char])
      tree.right = {
        type: 'binary',
        left: tree.right,
        operator: readOperator(input),
        right: Atom(input),
      };
    else
      tree = {
        type: 'binary',
        left: tree,
        operator: readOperator(input),
        right: Atom(input),
      };
  }
  return tree;
};

const normalize = input => {
  let res = '';
  const parens = [];
  for (let i = 0, l = input.length; i < l; i += 1) {
    let char = input[i];
    if (char !== ' ') {
      if (char === 'x') char = '*';
      else if (char === '\u00f7') char = '/';
      else if (char === '(') parens.push(char);
      else if (char === ')') {
        if (!parens.length) throw new Error('Invalid expression');
        parens.pop();
      }
      res += char;
    }
  }
  return res;
};

const evaluate = input => {
  const expression = Expression(InputStream(normalize(input)));
  const evaluator = expression => {
    if (!expression) throw new Error('Invalid expression');
    switch (expression.type) {
      case 'number':
        return expression.value;
      case 'group':
        return evaluator(expression.value);
      case 'unary':
        return -evaluator(expression.value);
      case 'binary': {
        const op = expression.operator;
        if (op === '+')
          return evaluator(expression.left) + evaluator(expression.right);
        if (op === '-')
          return evaluator(expression.left) - evaluator(expression.right);
        if (op === '*')
          return evaluator(expression.left) * evaluator(expression.right);
        if (op === '/')
          return evaluator(expression.left) / evaluator(expression.right);
        if (op === 'mod')
          return evaluator(expression.left) % evaluator(expression.right);
        throw new Error(`Unknown operation: ${op}`);
      }
      default:
        throw new Error('Invalid expression');
    }
  };
  return Number(evaluator(expression).toFixed(5));
};

export default evaluate;
