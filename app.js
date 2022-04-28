class Calculator {
    constructor(prevOperandInnerText, currentOperandInnerText){
        this.prevOperandInnerText = prevOperandInnerText
        this.currentOperandInnerText = currentOperandInnerText
        this.clearAll()
    }


    clearAll = () => {
        this.prevOperand = ""
        this.currentOperand = ""
        this.operation = undefined
    }

    deleter = () => {

    }

    appendNumber = number => {
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    selectOperation = operation => {

    }

    calculate = () => {

    }


    updateDisplay = () => {
        this.currentOperandInnerText.innerText = this.currentOperand
    }
}






const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const prevOperandInnerText = document.querySelector('[data-prev-operand]')
const currentOperandInnerText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(prevOperandInnerText, currentOperandInnerText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})