var btnNameSave = document.querySelector(".btn-name");
var btnStart = document.querySelector(".btn-start");
var btnResult = document.querySelector(".btn-result");
var nameBox = document.querySelector(".name");
var points = document.querySelector(".points");
var firstLine = document.querySelector(".first-line");
var secondLine = document.querySelector(".second-line");
var outResult = document.querySelector(".out-result");
var arrNumbers = [];
var answers = JSON.parse(localStorage.getItem("Answers")) || {
    correct: 0,
    incorrect: 0,
};
// Запись ответов в localStorage
var setAnswersToLocalStorage = function () {
    localStorage.setItem("Answers", JSON.stringify(answers));
};
// получение правильных ответов
var getRightAnswers = function () {
    if (answers) {
        points.textContent = String(answers.correct);
    }
};
// Полуение имени пользователя из localStorage и если оно там есть, то скрыть блок ввода имени
var checkUserName = function () {
    var userName = localStorage.getItem("User");
    document.querySelector(".name-out").textContent = userName;
    if (userName) {
        nameBox.classList.add("hidden");
        getRightAnswers();
    }
};
checkUserName();
// Создание имени пользователы и сохранения его в localStorage и скрытие блока ввода имени
var inputUserName = function () {
    var inputName = document.querySelector(".input-name");
    localStorage.setItem("Answers", JSON.stringify({ correct: 0, incorrect: 0 }));
    if (inputName.value) {
        var name_1 = inputName.value.trim();
        localStorage.setItem("User", name_1);
        inputName.value = "";
        checkUserName();
        nameBox.classList.add("hidden");
    }
};
btnNameSave.addEventListener("click", inputUserName);
// Получение случайного чисела от 10 до 99 и добавление его в массив arrNumbers
var getRandomNumbers = function (min, max) {
    if (min === void 0) { min = 10; }
    if (max === void 0) { max = 99; }
    if (arrNumbers.length < 2) {
        arrNumbers.push(Math.floor(Math.random() * (max - min)) + min);
    }
};
// Генерация примера на основе массива arrNumbers
var exampleGeneration = function () {
    arrNumbers.length = 0;
    for (var index = 0; index < 2; index++) {
        getRandomNumbers();
    }
    var arr = arrNumbers.sort(function (a, b) { return a - b; });
    firstLine.textContent = String(arr[1]);
    secondLine.textContent = String(arr[0]);
    outResult.textContent = "";
    characters(arr);
    disableButton(btnStart);
    activationButton(btnResult);
    outResult.classList.remove("correct");
    outResult.classList.remove("incorrect");
};
btnStart.addEventListener("click", exampleGeneration);
// Получить сумму двух элементов из массива arrNumbers
var getSumNumbers = function (arr) {
    var sum = arr.reduce(function (a, b) {
        return a + b;
    });
    return sum;
};
// Вычислить количество символов в ответе и на основе этого сгенерировать инпуты для ввода ответа
var characters = function (arr) {
    var result = document.querySelector(".result-line");
    var sum = getSumNumbers(arr);
    result.innerHTML = "";
    for (var index = 0; index < String(sum).length; index++) {
        result.innerHTML += "\n    <input\n    class=\"input-result\"\n    id=\"result-".concat(index, "\"\n    type=\"text\"\n    tabindex=\"").concat(6 - index, "\"\n    inputmode=\"numeric\"\n    required=\"true\"   \n    maxlength=\"1\"\n  />\n   \n   ");
    }
};
// Проверка результата
var checkExampleResult = function () {
    var resultFirst = document.querySelector("#result-0");
    var resultSecond = document.querySelector("#result-1");
    var resultThird = document.querySelector("#result-2");
    var result = resultThird
        ? resultFirst.value + resultSecond.value + resultThird.value
        : resultFirst.value + resultSecond.value;
    if (!result) {
        return (outResult.textContent = "Реши пример");
    }
    if (+result === getSumNumbers(arrNumbers)) {
        outResult.textContent = "Good";
        outResult.classList.add("correct");
        answers.correct === 0 ? (answers.correct = 1) : answers.correct++;
        setAnswersToLocalStorage();
        getRightAnswers();
    }
    else {
        outResult.textContent = "No";
        outResult.classList.add("incorrect");
        (answers === null || answers === void 0 ? void 0 : answers.incorrect) === 0 ? (answers.incorrect = 1) : answers.incorrect++;
        setAnswersToLocalStorage();
    }
    disableButton(btnResult);
    activationButton(btnStart);
};
btnResult.addEventListener("click", checkExampleResult);
//Отключение кнопки
var disableButton = function (btn) {
    btn.setAttribute("disabled", "true");
};
// активация кнопки
var activationButton = function (btn) {
    btn.removeAttribute("disabled");
};
