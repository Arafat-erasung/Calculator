class Calculator {
    constructor(prevOperandInnerText, currentOperandInnerText){
        this.prevOperandInnerText = prevOperandInnerText
        this.currentOperandInnerText = currentOperandInnerText
        this.clearAll()
    }


    clearAll = () => {
        this.prevOperand = ''
        this.currentOperand = ''
        this.operation = ''
    }

    delete = () => {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber = number => {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    selectOperation = operation => {
        if(this.currentOperand === '') return
        if(this.prevOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate = () => {
        let result
        const previous = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(previous) || isNaN(current)) return
            switch(this.operation){
                case '+':
                    result = previous + current
                break
                case '-':
                    result = previous - current
                break
                case 'x':
                    result = previous * current
                break
                case '÷':
                    result = previous / current
                break
                default:
                    return
            }
            this.currentOperand = result
            this.operation = ''
            this.prevOperand = ''

    }

    getCommaAndDecimalNumber = number => {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }


    updateDisplay = () => {
        this.currentOperandInnerText.innerText = this.getCommaAndDecimalNumber(this.currentOperand)
        if(this.prevOperand != null){
            this.prevOperandInnerText.innerText = `${this.getCommaAndDecimalNumber(this.prevOperand)} ${this.operation}`
        }else {
            this.prevOperandInnerText = ''
        }
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

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clearAll()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})