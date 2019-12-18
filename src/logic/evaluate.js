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
  x: 2,
  mod: 2,
  [`\u00f7`]: 2,
};

const readNumber = input => {
  let char;
  let number = '';
  let decimal = false;
  while (!input.end() && /[0-9.]/.test(input.peek())) {
    char = input.next();
    if (decimal && char === '.') input.croak(`${number}. is not a number`);
    if (char === '.') decimal = true;
    number += char;
  }
  if (input.peek() === '\u0025') {
    input.next();
    number = Number(number) / 100;
  }
  return { type: 'number', value: number };
};

const readOperator = input => {
  let operator = input.next();
  if (operator === 'm') {
    while (!input.end() && /[^\d(]/.test(input.peek()))
      operator += input.next();
    if (operator !== 'mod') input.croak(`Unknown operator '${operator}'`);
  }
  if (/[^\d(-]/.test(input.peek()))
    input.croak(`Unknown operator '${operator}${input.peek()}'`);
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
  if (/[0-9]/.test(char)) return readNumber(input);
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
    const char = input[i];
    const last = res.slice(-1);
    if (/[^\s(]/.test(char)) res += char;
    if (char === '(') {
      res += /\d/.test(last) ? 'x(' : char;
      parens.push(char);
    }
    if (char === ')') parens.pop();
  }
  if (parens.length) throw new Error('Unbalenced parenthensis');
  return res;
};

const evaluate = input => {
  const expression = Expression(InputStream(normalize(input)));
  const evaluator = expression => {
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
        if (op === 'x')
          return evaluator(expression.left) * evaluator(expression.right);
        if (op === 'mod')
          return evaluator(expression.left) % evaluator(expression.right);
        if (op === '\u00f7')
          return evaluator(expression.left) / evaluator(expression.right);
        throw new Error(`Unknown operation '${op}'`);
      }
      default:
        throw new Error(`Unknown expression '${expression}'`);
    }
  };
  return evaluator(expression).toPrecision(5);
};

export default evaluate;
