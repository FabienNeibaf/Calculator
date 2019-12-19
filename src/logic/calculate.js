import evaluate from './evaluate';

const reset = calculator => {
  calculator.result = null;
  calculator.expression = null;
  return calculator;
};

const cancel = calculator => {
  const { result } = calculator;
  let { expression: exp } = calculator;
  if (result) {
    exp = exp.slice(0, -2);
  } else if (exp) {
    let i = exp.length - 1;
    while (i >= 0 && /[^\d.]/.test(exp[i - 1])) i -= 1;
    exp = exp.slice(0, i);
  }
  calculator.result = null;
  calculator.expression = exp;
  return calculator;
};

const openParens = calculator => {
  const { result } = calculator;
  let { expression: exp } = calculator;
  if (result) exp = `(${result}`;
  else if (/(\(|\s|)$/.test(exp)) exp = `${exp || ''}(`;
  else exp += ' (';
  calculator.result = null;
  calculator.expression = exp;
  return calculator;
};

const closeParens = calculator => {
  const { expression: exp } = calculator;
  if (/[)\u0025\d]$/.test(exp)) {
    calculator.result = null;
    calculator.expression += ')';
  }
  return calculator;
};

const negate = calculator => {
  let { expression: exp } = calculator;
  if (/-$/.test(exp)) exp = exp.slice(0, -1);
  else if (/-\s$/.test(exp)) exp = `${exp.slice(0, -3)} + `;
  else if (/\+\s$/.test(exp)) exp = `${exp.slice(0, -3)} - `;
  else if (/((x|\u00f7|mod)\s|\()$/.test(exp)) exp += '-';
  calculator.result = null;
  calculator.expression = exp;
  return calculator;
};

const digit = (calculator, input) => {
  const { result } = calculator;
  let { expression: exp } = calculator;
  if (input !== '.' && /(\(|\.|\s|)$/.test(exp)) {
    exp = result ? input : `${exp || ''}${input}`;
    calculator.result = null;
  } else if (!result && exp) {
    let i = exp.length - 1;
    while (i >= 0 && /\d/.test(exp[i])) i -= 1;
    if (exp[i] !== '.') exp = `${exp || ''}${input}`;
  }
  calculator.expression = exp;
  return calculator;
};

const percent = calculator => {
  const { result } = calculator;
  let { expression: exp } = calculator;
  if (result) exp = `${result}%`;
  else if (/\d$/.test(exp)) exp += '%';
  calculator.result = null;
  calculator.expression = exp;
  return calculator;
};

const binary = (calculator, input) => {
  const { result } = calculator;
  let { expression: exp } = calculator;
  if (result) {
    exp = `${result} ${input} `;
  } else if (exp) {
    if (/[)\d%]\s?$/.test(exp)) exp = `${exp} ${input} `;
    else if (/mod\s$/.test(exp)) exp = `${exp.slice(0, -4)} ${input} `;
    else if (/(\+|-|x|\u00f7|mod)\s$/.test(exp))
      exp = `${exp.slice(0, -3)} ${input} `;
  }
  calculator.result = null;
  calculator.expression = exp;
  return calculator;
};

const compute = calculator => {
  let { result } = calculator;
  const { expression } = calculator;
  if (expression) {
    try {
      result = evaluate(expression);
      calculator.expression += ' =';
    } catch (err) {
      result = err.message;
    }
    calculator.result = result;
  }
  return calculator;
};

const calculate = (calculator, input) => {
  if (input === 'AC') return reset(calculator);
  if (input === '%') return percent(calculator);
  if (input === '=') return compute(calculator);
  if (input === '+/-') return negate(calculator);
  if (input === '(') return openParens(calculator);
  if (input === ')') return closeParens(calculator);
  if (input === '\u232b') return cancel(calculator);
  if (/[\d.]/.test(input)) return digit(calculator, input);
  if (/[+\-x\u00f7]|mod/.test(input)) return binary(calculator, input);
  return calculator;
};

export default calculate;
