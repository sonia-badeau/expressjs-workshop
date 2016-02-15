var express = require('express');
var app = express();

app.get('/op/:operation/:number1/:number2', function(req, res) {
    console.log(req.params)
    var result;
   if (req.params.operation === 'add'){
       result = Number(req.params.number1) + Number(req.params.number2);
   }
   if (req.params.operation === 'sub'){
       result = Number(req.params.number1) - Number(req.params.number2);
   }
   if (req.params.operation === 'mult'){
       result = Number(req.params.number1) * Number(req.params.numbers2);
   }
   if (req.params.operation === 'div'){
       result = Number(req.params.number1) / Number(req.params.numbers2);
   }
   
   if(result){
       res.json(
           {
               operator: req.params.operation,
               firstOperand: req.params.number1,
               secondOperand: req.params.number2,
               solution: result
       })
   } else {
       res.status(400).send('Pas bien')
   }
   
});

app.listen(process.env.PORT);





