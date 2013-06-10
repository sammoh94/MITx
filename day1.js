
/*
a calculator that calculates numbers
*/
function calculate(text){
    var pattern = /\d+|\+|\-|\*|\/|\(|\)/g; //d+ is matching digits that atleast have a length of 1
    var tokens = text.match(pattern)
    try{
        var val = evaluation(tokens);
        if (tokens.length !== 0 ){
            throw "ill-formed expression";
        }
        return String(val);
    }
    catch(err){
        return err;
    }
    return JSON.stringify(tokens);
}
/*
a function that interprets the first token in the array
*/
function read_operand(token_array){
    var num  = token_array.shift();
    if (isNaN(parseInt(num))){
        throw "number expected";
    }
    return(parseInt(num));
}

function evaluation(token_array){
    if (token_array.length === 0){
        throw "missing operand";
    }
    var value_1 = read_operand(token_array);
    while (token_array.length !== 0) {
        var operator = token_array.shift()
        var temp = read_operand(token_array);
        
        if (operator === '+'){
            var value_2 = parseInt(value_1) + parseInt(temp);
        }
        else if (operator === '-'){
            value_2 = parseInt(value_1) - parseInt(temp);
        }
        else if (operator === '*'){
            value_2 = parseInt(value_1) * parseInt(temp);
        }
        else if (operator === '/'){
            value_2 = parseInt(value_1) / parseInt(temp);
        }
        else{
            throw "unrecognized operator";
        }
    }    
    return value_2;
}

function setup_calc(div){
    var input = $('<input></input>',{type: "text", size: 50});
    var output = $('<div></div>');
    var button  = $('<button>Calculate</button>');
    button.bind("click", function (){
       output.text(String(calculate(input.val()))); 
    });
    $(div).append(input, button, output);
}

$(document).ready(function (){
   $('.calculator').each(function(){  // '.' is class, # is id
       // this refers to the <div> with class calculator
       setup_calc(this);
   });  
});