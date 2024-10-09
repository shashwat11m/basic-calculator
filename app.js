var v = document.getElementById('res');
var bracOpen = false;

function solve(n) {
    v.value += n;
}

function equal() {
    if(v.value !== "") {
        var num1 = addImplicitMultiplication(v.value);
        try {
            var num2 = eval(num1.replace('x', '*'));
            v.value = num2;
        } catch {
            document.getElementById('res').value = 'Error';
        }
    }
}

function addImplicitMultiplication(input) {
    return input.replace(/(\d)(\()/g, '$1*(').replace(/(\))(\d)/g, ')*$2');
}

function allClear() {
    v.value = "";
    bracOpen = false;
}

function backSpace() {
    const lastChar = v.value.charAt(v.value.length - 1);
    if(lastChar === "(" || lastChar === ")") {
        bracOpen = !bracOpen;
    }

    v.value = v.value.slice(0, -1);
}

function brackets() {
    if(!bracOpen) {
        v.value += "(";
        bracOpen = true;
    }
    else {
        v.value += ")";
        bracOpen = false;
    }    
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    const validKeys = '0123456789+-*/.%';
    if (validKeys.includes(key)) {
       solve(key === '*' ? 'x' : key);
    } else if (key === 'Enter' || key === "=") {
       equal();
    } else if (key === 'Backspace') {
       backSpace();
    } else if (key.toLowerCase() === 'c') {
       allClear();
    }
 });