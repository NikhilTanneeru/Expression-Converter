class Stack{
    constructor()
    {
        
    }
}
function myFunc()
{
    var exp=document.getElementById("from").value;
    var stack = new Stack();
    for (var i = 0; i < exp.length; i++) {
        var c = exp[i];
        if (!isNaN(c))
            stack.push(c - '0');
        else {
            var val1 = stack.pop();
            var val2 = stack.pop();
            if (val1 == "Underflow" || val2 == "Underflow")
                return "Can't perform postfix evaluation";
            switch (c) {
            case '+':
                stack.push(val2 + val1);
                break;
 
            case '-':
                stack.push(val2 - val1);
                break;
 
            case '/':
                stack.push(val2 / val1);
                break;
 
            case '*':
                stack.push(val2 * val1);
                break;
            }
        }
    }
 
    return stack.pop();
}


function convertToPostfix(infix) {
    var output = "";
    var stack = [];
    for (var i = 0; i < infix.length; i++) {
       var ch = infix.charAt(i);
       if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
          while (stack.length != 0 && stack[stack.length - 1] != '(' &&
          getPrecedence(ch) <= getPrecedence(stack[stack.length - 1])) {
             output += stack.pop();
             output += ' ';
          }
          stack.push(ch);
       }
       else if (ch == '(') {
          stack.push(ch);
       }
       else if (ch == ')') {
          while (stack.length != 0 && stack[stack.length - 1] != '(') {
             output += stackHTML.pop();
             output += ' ';
          }
          stack.pop();
       } else {
          output += ch;
       }
    }
    while (stack.length != 0) {
       output += stack.pop();
       output += ' ';
    }
    return output;
 }
 function getPrecedence(ch) {
    if (ch == '+' || ch == '-') {
       return 1;
    }
    else if (ch == '*' || ch == '/') {
       return 2;
    } else {
       return 0;
    }
 }
