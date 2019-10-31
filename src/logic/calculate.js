import operate from './operate';

const calculate = (calculator, buttonName) => {
  const { next, total, operation } = calculator;
  try {
    switch (buttonName) {
      case '+/-':
        if (next) return { ...calculator, next: String(-next) };
<<<<<<< HEAD
        if (operation === '=') return { ...calculator, total: String(-total) };
=======
        if (total) return { ...calculator, total: String(-total) };
>>>>>>> Set logic up with component
        return calculator;
      case '+':
      case '-':
      case 'x':
      case `\u0025`:
      case `\u00f7`:
<<<<<<< HEAD
        if (total && next) {
          const computed = operate(total, next, operation);
          return {
            next: null,
            operation: buttonName,
            step: `${computed} ${buttonName}`,
            total: computed,
          };
        }
        if (total) {
          return {
            ...calculator,
            operation: buttonName,
            step: `${total} ${buttonName}`,
          };
        }
        if (next)
          return {
            next: null,
            total: next,
            operation: buttonName,
            step: `${next} ${buttonName}`,
          };
=======
        if (total && next)
          return {
            total: operate(total, next, operation),
            next: null,
            operation: buttonName,
          };
        if (total) return { ...calculator, operation: buttonName };
        if (next) return { total: next, next: null, operation: buttonName };
>>>>>>> Set logic up with component
        return calculator;
      case '=':
        if (total && next)
          return {
<<<<<<< HEAD
            next: null,
            operation: buttonName,
            step: `${total} ${operation} ${next} =`,
            total: operate(total, next, operation),
          };
        if (total)
          return {
            next: null,
            operation: buttonName,
            step: `${total} ${operation} 0 =`,
            total: operate(total, 0, operation),
          };
        return { ...calculator, total: '0' };
      case 'AC':
        return { step: null, total: null, next: null, operation: null };
      default:
        if (operation === '=')
          return {
            step: null,
            total: null,
            operation: null,
            next: buttonName,
          };
        return { ...calculator, next: next ? next + buttonName : buttonName };
    }
  } catch (e) {
    return {
      total: null,
      operation: null,
      step: `${total} ${operation} ${next || 0}`,
      next: e.message.replace('[big.js]', ''),
    };
=======
            total: operate(total, next, operation),
            next: null,
            operation: null,
          };
        return calculator;
      case 'AC':
        return { total: null, next: null, operation: null };
      default:
        return { ...calculator, next: next ? next + buttonName : buttonName };
    }
  } catch (e) {
    return { total: 'Unknown opperation', next: null, operation: null };
>>>>>>> Set logic up with component
  }
};

export default calculate;
