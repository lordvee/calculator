'use strict'

const obj = {
  calculate: ({a, b, op}) => {

    let result = 0;
    a = Number(a);
    b = Number(b);
    switch (op) {
      case 'x':
        result = a * b;
        break;
      case '/':
        result = a / b;
        break;
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      default:
        result = 0;
    }
    return result;
  }
}

module.exports = obj;
