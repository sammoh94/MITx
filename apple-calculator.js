
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
    var symbol  = token_array[0];
    var num = parseInt(symbol,10);
    if (symbol === '('){
        token_array.shift();
        num = evaluation(token_array);
    }
    else if (symbol == ")"){
        return ")";
    }
    else if (isNaN(num)){
        throw "number expected";
    }
    else if (symbol === '-'){
        token_array.shift();
        num = parseFloat(token_array[0],10);
        token_array.shift();
        return -1*num;
    }
    else{
        token_array.shift();
    }
    return num;
    }
    

/*
function read_term(token_array){
    for (var i = 0; i < token_array.length; i++) {
        if (token_array[i]==='+' || token_array[i]==='-'){   
            break;
    }
    else if (token_array.length === 0){
        break;
    }
    }
    var value_1 = read_operand(token_array);
    while (token_array.length !== 0) {
        var operator = token_array.shift()
        var temp = read_operand(token_array);
        
        if (operator === '*'){
            var value_2 = parseInt(value_1) * parseInt(temp);
        }
        else if (operator === '/'){
            value_2 = parseInt(value_1) / parseInt(temp);
        }
}
}
*/
function evaluation(token_array){
    if (token_array.length === 0){
        throw "missing operand";
    }
    var value_1 = read_operand(token_array);
    while (token_array.length !== 0) {
        if (token_array[0] === ')'){
            token_array.shift();
            return value_1;
        }
        var operator = token_array.shift();
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

$(document).ready(function (){
    var output = $('.text');
    output.text('C');
    $('.input').bind("click", function(){
        output.text('C');
    });  
});