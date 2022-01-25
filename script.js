const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
)
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
)

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString()

    const integerDigits = parseFloat(stringNumber.split(',')[0])
    const decimalDigits = stringNumber.split(',')[1]

    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('br', {
        maximumFractionDigits: 0
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  calculate() {
    let result

    const _previousOperand = parseFloat(this.previousOperand)
    const _currentOperand = parseFloat(this.currentOperand)

    if (isNaN(_previousOperand) && isNaN(_currentOperand)) return

    switch (this.operation) {
      case '+':
        result = _previousOperand + _currentOperand
        break

      case '-':
        result = _previousOperand - _currentOperand
        break

      case '/':
        result = _previousOperand / _currentOperand
        break

      case '*':
        result = _previousOperand * _currentOperand
        break

      default:
        return
    }

    this.currentOperand = result
    this.operation = undefined
    this.previousOperand = ''
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return

    if (this.previousOperand !== '') {
      this.calculate()
    }

    this.operation = operation

    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  appendNumber(number) {
    this.currentOperand = `${this.currentOperand}${number.toString()}`
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ''}`
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    )
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
)

for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText)
    calculator.updateDisplay()
  })
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener('click', () => {
    calculator.chooseOperation(operationButton.innerText)
    calculator.updateDisplay()
  })
}

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
  calculator.calculate()
  calculator.updateDisplay()
})
