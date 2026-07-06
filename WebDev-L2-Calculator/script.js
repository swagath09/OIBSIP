const history = document.getElementById("history");
const resultDisplay = document.getElementById("result");

const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let firstNumber = "";
let operator = "";
let secondNumber = "";

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent.trim();

        if (button.classList.contains("clear")) {
            currentInput = "";
            firstNumber = "";
            secondNumber = "";
            operator = "";
            history.textContent = "";
            resultDisplay.textContent = "0";
            return;
        }

        if (button.classList.contains("delete")) {
            currentInput = currentInput.slice(0, -1);
            resultDisplay.textContent = currentInput || "0";
            return;
        }

        if (button.classList.contains("equal")) {

            if (firstNumber === "" || operator === "") return;

            secondNumber = currentInput;

            let answer = 0;

            const num1 = parseFloat(firstNumber);
            const num2 = parseFloat(secondNumber);

            switch (operator) {

                case "+":
                    answer = num1 + num2;
                    break;

                case "-":
                    answer = num1 - num2;
                    break;

                case "*":
                    answer = num1 * num2;
                    break;

                case "/":

                    if (num2 === 0) {

                        history.textContent = "";
                        resultDisplay.textContent = "Cannot divide by 0";

                        currentInput = "";
                        firstNumber = "";
                        secondNumber = "";
                        operator = "";

                        return;
                    }

                    answer = num1 / num2;
                    break;

                case "%":
                    answer = num1 % num2;
                    break;
            }

            const symbol =
                operator === "*" ? "×" :
                operator === "/" ? "÷" :
                operator;

            history.textContent =
            `${firstNumber} ${symbol} ${secondNumber} =`;

            resultDisplay.textContent = answer;

            currentInput = answer.toString();

            firstNumber = "";
            secondNumber = "";
            operator = "";

            return;
        }

        if (
            value === "+" ||
            value === "-" ||
            value === "*" ||
            value === "/" ||
            value === "%"
        ) {

            if (currentInput === "") return;

            firstNumber = currentInput;
            operator = value;

            const symbol =
                operator === "*" ? "×" :
                operator === "/" ? "÷" :
                operator;

            history.textContent = `${firstNumber} ${symbol}`;
            currentInput = "";
            resultDisplay.textContent = "";

            return;
        }

        if (value === ".") {

            if (currentInput.includes(".")) return;

        }

        currentInput += value;

        resultDisplay.textContent = currentInput;

    });

});

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {

        currentInput += key;
        resultDisplay.textContent = currentInput;
    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        if (currentInput === "") return;

            firstNumber = currentInput;
            operator = key;

            const symbol =
                operator === "*" ? "×" :
                operator === "/" ? "÷" :
                operator;

            history.textContent = `${firstNumber} ${symbol}`;

            currentInput = "";
            resultDisplay.textContent = "";
        }

    else if (key === "Enter") {

        document.querySelector(".equal").click();

    }

    else if (key === "Backspace") {

        currentInput = currentInput.slice(0, -1);
        resultDisplay.textContent = currentInput || "0";

    }

    else if (key === "Escape") {

        currentInput = "";
        firstNumber = "";
        secondNumber = "";
        operator = "";
        history.textContent = "";
        resultDisplay.textContent = "0";

    }

});