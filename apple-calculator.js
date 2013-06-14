/*
Calculates the input expression
*/
function calculate(text) {
    var pattern = /\d*\.?\d+|\+|\-|\*|\/|\w*\(|\)|\^|\%/g;          //matches nonzero digit sequences, operators and parentheses, g means global match
    var tokens = text.match(pattern);
    try {
        var val = evaluate(tokens);
        if(tokens.length > 0)   throw("ill-formed expression");
        return String(val);
    } catch(err) {
        return err;
    }
}
/*
Reads the next operand in the expression
*/
function read_operand(array) {
    var num = array.shift();
    if(num == '(') {
        num = evaluate(array);
        if(array.shift() != ')')    throw("missing close parenthesis");
    }
    if(num == 'sin(') {
        num = Math.sin(evaluate(array));
        if(array.shift() != ')')    throw("missing close parenthesis");
    }
    if(num == '-')  num += array.shift();
    var out = parseFloat(num);
    if(array[0] == '^') {
        array.shift();
        out = Math.pow(out,read_term(array))
    }
    if(isNaN(out)) {
        throw("number expected");
    }
    else {
        return out;
    }
}
/*
Evaluates the expression
*/
function evaluate(array) {
    if(array.length === 0) {
        throw("missing operand");
    }
    var val = read_term(array);
    while(array.length > 0) {
        if(array[0] == ')') return val;
        var oper = array.shift();
        if($.inArray(oper,['+','-']) == -1)   throw("unrecognized operator");
        if(array.length === 0)  throw("missing operand");
        var temp = read_term(array);
        if(oper == '+') val = val+temp;
        if(oper == '-') val = val-temp;
    }
    return val;
}
function read_term(array){
    if(array.length === 0) {
        throw("missing operand");
    }
    var val = read_operand(array);
    while(array.length > 0 & ['+','-'].indexOf(array[0]) == -1) {
        if(array[0] == ')') return val;
        var oper = array.shift();
        if($.inArray(oper,['*','/','%']) == -1)   throw("unrecognized operator");
        if(array.length === 0)  throw("missing operand");
        var temp = read_operand(array);
        if(oper == '*') val = val*temp;
        if(oper == '/') val = val/temp;
        if(oper == '%') val = val%temp;
    }
    
    return val;
}
/*
Sets up the HTML calculator
*/

  
    
    
    

/*
Calls setup when document is ready
*/
$(document).ready(function(){
      var input = '';
    $(".button").bind("click", function(event) {
        input+=$(event.target).text()
        $("#txtbox").text(input);
});
   $('#equals').bind("click",function(){                   
        $("#txtbox").text(calculate(input));
    });
    
    $('#c').bind("click",function(){
        input = '';
        $("#txtbox").text(input);
    });
    
});

