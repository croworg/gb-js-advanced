const textBlock = document.querySelector('.raw-text');
const rawText = textBlock.textContent;
document.querySelector('.buttons').addEventListener('click', e => {
    if (e.target.classList.contains('replaceAll')) {
        textBlock.textContent = rawText.replace(/'/g,'"');
    } else if (e.target.classList.contains('replaceEdges')) {
        textBlock.textContent = rawText.replace(/(\B'|'\B)/g,'"');
    } else if (e.target.classList.contains('reset')) {
        textBlock.textContent = rawText;
    }
});

class InputData {
    constructor(name) {
        this.name = name;
        this.inputField = document.querySelector(`.feedback-form .${name}`);
        this._initEvents(this.inputField);
    }

    _initEvents() {
        this.inputField.addEventListener('focus', e => {
            if (e.target.classList.contains('incorrect')) {
                e.target.classList.remove('incorrect');
            }
            if (e.target.nextSibling.classList.contains('show')) {
                e.target.nextSibling.classList.remove('show');
            }
        })
    }

    isIncorrect() {
        const regex = new RegExp(regexes[this.name], 'i');
        if (regex.test(String(this.inputField.value))) {
            this._showWarning(this.inputField);
        }
    }

    _showWarning(inputField) {
        if (!inputField.classList.contains('incorrect')) {
            inputField.classList.add('incorrect');
        }
        if (!inputField.nextSibling.classList.contains('show')) {
            inputField.nextSibling.classList.add('show');
        }
    }
}

const regexes = {
    name: /^(?!([a-zA-Zа-яА-ЯёЁ]+)$)/,
    phone: /^(?!(\+\d\(\d{3}\)\d{3}-\d{4})$)/,
    email: /^(?!([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4})$)/,
    message: /^\s*$/
}

const fieldName = new InputData('name');
const fieldPhone = new InputData('phone');
const fieldEmail = new InputData('email');
const fieldMessage = new InputData('message');

document.querySelector('.feedback-form').addEventListener('submit', () => {
    fieldName.isIncorrect();
    fieldPhone.isIncorrect();
    fieldEmail.isIncorrect();
    fieldMessage.isIncorrect();
});