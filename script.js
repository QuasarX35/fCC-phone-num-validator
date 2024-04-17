const input = document.querySelector('#user-input');

input.addEventListener('blur', e => {
    if (e.target.value.length) {
        e.target.classList.add('filled');
    } else {
        e.target.classList.remove('filled');
    }
});

const checkBtn = document.querySelector('#check-btn');
const clearBtn = document.querySelector('#clear-btn');
const output = document.querySelector('#results-div');

const displayError = (errorMsg) => {
    output.innerHTML = '';
    const errorMsgExists = document.querySelector('.errorMsg');
    if (errorMsgExists) return;

    const errorMsgEl = document.createElement('span');
    errorMsgEl.textContent = errorMsg;
    errorMsgEl.classList.add('error');
    errorMsgEl.classList.add('errorMsg');

    output.appendChild(errorMsgEl);
    output.removeAttribute('hidden');

    setTimeout(() => {
        errorMsgEl.remove();
        output.setAttribute('hidden', '');
    }, '3000');
}

const displayMsg = msg => {
    output.innerHTML = msg;
    output.removeAttribute('hidden');
}

const isPhoneNumValid = phoneNum => {
    const regex = /^1?[ (]?\(?\d{3}\)?[\ \-]?\d{3}[\ \-]?\d{4}$/g;
    return regex.test(phoneNum);
}

const isParenthesisBalanced = phoneNum => {
    return (phoneNum.match(/\(/g) || []).length === (phoneNum.match(/\)/g) || []).length;
}

const checkInput = e => {
    e.preventDefault();
    if (!input.value.length) {
        displayError("Please provide a phone number");
    } else if (isPhoneNumValid(input.value) && isParenthesisBalanced(input.value)) {
        displayMsg(`Valid US number: ${input.value}`);
    } else {
        displayMsg(`Invalid US number: ${input.value}`);
    }
}

const clearResult = e => {
    e.preventDefault();
    output.innerHTML = "";
    output.setAttribute('hidden', '');
}

checkBtn.addEventListener('click', checkInput);
clearBtn.addEventListener('click', clearResult);