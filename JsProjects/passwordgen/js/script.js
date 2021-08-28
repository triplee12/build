const pwd = document.getElementById('pwd');
const copy = document.getElementById('copy');
const pwlength = document.getElementById('pwlength');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const number = document.getElementById('number');
const symbol = document.getElementById('symbol');
const generate = document.getElementById('generate');


const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "`!@#$%^&*()_-+=:;'|{}?/>.<,";


function getUpperCase(){
    return upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
}

function getLowerCase(){
    return lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
}

function getNumbers(){
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbols(){
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    const len = pwlength.value;

    let password = "";

    if(uppercase.checked) {
        password += getUpperCase();
    }
    if(lowercase.checked) {
        password += getLowerCase();
    }
    if(number.checked) {
        password += getNumbers();
    }
    if(symbol.checked) {
        password += getSymbols();
    }

    for(let i = password.length; i < len; i++) {
        const genValue = randomChar();
        password += genValue;
    }

    pwd.innerText = password;
}

function randomChar() {
    const chars = [];

    if(uppercase.checked) {
        chars.push(getUpperCase());
    }
    if(lowercase.checked) {
        chars.push(getLowerCase());
    }
    if(number.checked) {
        chars.push(getNumbers());
    }
    if(symbol.checked) {
        chars.push(getSymbols());
    }
    if(chars.length === 0) return "";

    return chars[Math.floor(Math.random() * chars.length)];
}

generate.addEventListener('click', () => {
    generatePassword();
});

copy.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = pwd.innerText;

    if(!password){
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password copied to clipboard');
});