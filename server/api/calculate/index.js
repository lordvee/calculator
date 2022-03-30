'use strict'

const {calculate} = require('./lib/functionsList');

const route  = {
  calculator: (app) =>{
    app.post('/api/calculate', async (req, reply) => {

      // outputStack holds the array of operands/operations
      let outputStack = [];

      // opStack shunts the operators based on precedence
      let opStack = [];

      // check input is array and start parsing values
      if(req.body && Array.isArray(req.body)) {
        req.body.map( token => {

          // push numbers to the outputStack
          if(token.type === 'number') outputStack.push(token);

          // push operators based on precedence into the opStack
          if(token.type === 'operator') {
            if(opStack.length > 0) {
              const lastOp = opStack.pop();

              // higher precedence go first
              if(lastOp.priority < token.priority){
                opStack.push(lastOp);
                opStack.push(token);
              } else {
                outputStack.push(lastOp);
                opStack.push(token);
              }
            } else {
              opStack.push(token);
            }
          }

          // enough to complete an operation if there is an operator
          if(outputStack.length > 2) {
            const opIndex = outputStack.findIndex(o => o.type === 'operator');
            if(opIndex > -1) {
              const a = outputStack[opIndex - 2].val;
              const b = outputStack[opIndex - 1].val;
              const op = outputStack[opIndex].val;

              outputStack.splice(opIndex -2, 3, {val: calculate({a, b, op}), type: 'number'});
              //outputStack.push(opStack.pop())
              if(opStack.length> 1) outputStack.push(opStack.pop());
            }
          }
        });

        // deal with residual operators left in the opStack
        while(opStack.length > 0) {
          outputStack.push(opStack.pop());
          const opIndex = outputStack.findIndex(o => o.type === 'operator');
          const a = outputStack[opIndex - 2].val;
          const b = outputStack[opIndex - 1].val;
          const op = outputStack[opIndex].val;

          outputStack.splice(opIndex -2, 3, {val: calculate({a, b, op}), type: 'number'});
        };


      } else {
        return
      }





      return {
        expression: req.body,
        result: outputStack[0].val
      };

    });
  }
}

module.exports = route
