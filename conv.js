
var stackarr = [];
var topp = -1;

function push(e) {
	topp++;
	stackarr[topp] = e;
}

function pop() {
	if (topp == -1)
		return 0;
	else {
		var popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}

function operator(op) {
	if (op == '+' || op == '-' ||
		op == '^' || op == '*' ||
		op == '/' || op == '(' ||
		op == ')') {
		return true;
	} else
		return false;
}

function precedency(pre) {
	if (pre == '@' || pre == '(' || pre == ')') {
		return 1;
	} else if (pre == '+' || pre == '-') {
		return 2;
	} else if (pre == '/' || pre == '*') {
		return 3;
	} else if (pre == '^') {
		return 4;
	} else
		return 0;
}

function InfixtoPostfix() {
	var postfix = [];
	var temp = 0;
	push('@');
	var infixval = document.getElementById("from").value; 

	for (var i = 0; i < infixval.length; i++) {
		var el = infixval[i];

		if (operator(el)) {
			if (el == ')') {
				while (stackarr[topp] != '(') {
					postfix[temp++] = pop();
				}
				pop();
			} else if (el == '(') {
				push(el);
			} else if (precedency(el) > precedency(stackarr[topp])) {
				push(el);
			} else {
				while (precedency(el) <=
					precedency(stackarr[topp]) && topp > -1) {
					postfix[temp++] = pop();
				}
				push(el);
			}
		} else {
			postfix[temp++] = el;
		}
	}

	while (stackarr[topp] != '@') {
		postfix[temp++] = pop();
	}

	var st = "";
	for (var i = 0; i < postfix.length; i++) {
		st += postfix[i];
	}
	console.log(st);
	document.getElementById("postfix").innerHTML = st;
}


function InfixToPrefix() {
    var prefix = [];
    var temp = 0;
    var infixval = document.getElementById("from").value;
    var infixLength = infixval.length;
    var stackarr = [];
    var topp = -1;

    function push(val) {
        stackarr[++topp] = val;
    }

    function pop() {
        if (topp > -1) {
            return stackarr[topp--];
        }
    }

    // Reverse the infix expression
    var reversedInfix = "";
    for (var i = infixLength - 1; i >= 0; i--) {
        var el = infixval[i];
        if (el === '(') reversedInfix += ')';
        else if (el === ')') reversedInfix += '(';
        else reversedInfix += el;
    }

    push('@');

    for (var i = 0; i < infixLength; i++) {
        var el = reversedInfix[i];

        if (operator(el)) {
            if (el === '(') {
                push(el);
            } else if (el === ')') {
                while (stackarr[topp] !== '(') {
                    prefix[temp++] = pop();
                }
                pop(); // Pop the '('
            } else if (precedency(el) >= precedency(stackarr[topp])) {
                push(el);
            } else {
                while (precedency(el) < precedency(stackarr[topp]) && topp > -1 && stackarr[topp] !== '(') {
                    prefix[temp++] = pop();
                }
                push(el);
            }
        } else {
            prefix[temp++] = el;
        }
    }

    while (stackarr[topp] !== '@') {
        prefix[temp++] = pop();
    }

    var res = prefix.reverse().join(""); // Reverse the prefix expression
    console.log(res);
    document.getElementById("prefix").innerHTML = res;
}






function convert(){
	InfixToPrefix();
    InfixtoPostfix();
    
}
