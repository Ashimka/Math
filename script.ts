const btnNameSave = document.querySelector(".btn-name");
const btnStart = document.querySelector(".btn-start") as HTMLButtonElement;
const btnResult = document.querySelector(".btn-result") as HTMLButtonElement;
const nameBox = document.querySelector(".name");
const points = document.querySelector(".points");
const firstLine = document.querySelector(".first-line");
const secondLine = document.querySelector(".second-line");
const outResult = document.querySelector(".out-result");

let arrNumbers: [number?, number?] = [];
let answers = JSON.parse(localStorage.getItem("Answers"));

// Запись ответов в localStorage
const setAnswersToLocalStorage = () => {
  localStorage.setItem("Answers", JSON.stringify(answers));
};

// получение правильных ответов
const getRightAnswers = () => {
  // let rightAnswers = JSON.parse(localStorage.getItem("answers"));

  if (answers) {
    points.textContent = String(answers.correct);
  }
};

// Полуение имени пользователя из localStorage и если оно там есть, то скрыть блок ввода имени
const checkUserName = () => {
  let userName = localStorage.getItem("User");
  document.querySelector(".name-out").textContent = userName;

  if (userName) {
    nameBox.classList.add("hidden");
    getRightAnswers();
    // setAnswersToLocalStorage();
  }
};
checkUserName();

// Создание имени пользователы и сохранения его в localStorage и скрытие блока ввода имени
const inputUserName = () => {
  const inputName = document.querySelector(".input-name") as HTMLInputElement;
  let answers = { correct: 0, incorrect: 0 };

  localStorage.setItem("Answers", JSON.stringify(answers));

  if (inputName.value) {
    const name = inputName.value.trim();
    localStorage.setItem("User", name);

    inputName.value = "";

    checkUserName();
    nameBox.classList.add("hidden");
  }
};

btnNameSave.addEventListener("click", inputUserName);

// Получение случайного чисела от 10 до 99 и добавление его в массив arrNumbers
const getRandomNumbers = (min: number = 10, max: number = 99) => {
  if (arrNumbers.length < 2) {
    arrNumbers.push(Math.floor(Math.random() * (max - min)) + min);
  }
};

// Генерация примера на основе массива arrNumbers
const exampleGeneration = () => {
  arrNumbers.length = 0;
  for (let index = 0; index < 2; index++) {
    getRandomNumbers();
  }

  const arr = arrNumbers.sort((a, b) => a - b);

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
const getSumNumbers = (arr: [number?, number?]) => {
  const sum = arr.reduce((a, b) => {
    return a + b;
  });

  return sum;
};

// Вычислить количество символов в ответе и на основе этого сгенерировать инпуты для ввода ответа
const characters = (arr: [number?, number?]) => {
  const result = document.querySelector(".result-line");
  const sum = getSumNumbers(arr);

  result.innerHTML = "";

  for (let index = 0; index < String(sum).length; index++) {
    result.innerHTML += `
    <input
    class="input-result"
    id="result-${index}"
    type="text"
    tabindex="${6 - index}"
    inputmode="numeric"
    required="true"   
    maxlength="1"
  />
   
   `;
  }
};

// Проверка результата
const checkExampleResult = () => {
  const resultFirst = document.querySelector("#result-0") as HTMLInputElement;
  const resultSecond = document.querySelector("#result-1") as HTMLInputElement;
  const resultThird = document.querySelector("#result-2") as HTMLInputElement;

  const result = resultThird
    ? resultFirst.value + resultSecond.value + resultThird.value
    : resultFirst.value + resultSecond.value;

  if (!result) {
    return (outResult.textContent = "Реши пример");
  }

  if (+result === getSumNumbers(arrNumbers)) {
    outResult.textContent = "Good";
    outResult.classList.add("correct");
    answers.correct++;
    setAnswersToLocalStorage();
    getRightAnswers();
  } else {
    outResult.textContent = "No";
    outResult.classList.add("incorrect");

    answers.incorrect++;
    setAnswersToLocalStorage();
  }

  disableButton(btnResult);
  activationButton(btnStart);
};

btnResult.addEventListener("click", checkExampleResult);

//Отключение кнопки
const disableButton = (btn: HTMLButtonElement) => {
  btn.setAttribute("disabled", "true");
};
// активация кнопки
const activationButton = (btn: HTMLButtonElement) => {
  btn.removeAttribute("disabled");
};
