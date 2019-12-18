import evaluate from './evaluate';

const calculate = (calculator, buttonName) => {
  const { result } = calculator;
  let { expression, input } = calculator;
  try {
    switch (buttonName) {
      case '+/-':
        if (input !== '') return { ...calculator, input: `${-Number(input)}` };
        return calculator;
      case `\u0025`:
        return calculator;
      case '+':
      case '-':
      case 'x':
      case `\u00f7`:
        if (Number(input) < 0) input = `(${input})`;
        expression = /=$/.test(expression) ? result : `${expression} ${input}`;
        return {
          input: '',
          result: evaluate(expression).toString(),
          expression: `${expression} ${buttonName}`,
        };
      case '=':
        expression = `${expression} ${input}`;
        return {
          input: '',
          expression: `${expression} =`,
          result: evaluate(expression).toString(),
        };
      case 'AC':
        return { expression: '', input: '', result: '' };
      default:
        return { ...calculator, result: '', input: `${input}${buttonName}` };
    }
  } catch (e) {
    return { ...calculator, result: e.message };
  }
};

export default calculate;
