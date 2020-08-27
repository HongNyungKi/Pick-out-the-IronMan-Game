"use strict";


const heroWidth = 80;
const heroHeight = 115;
const gameBtn = document.querySelector(".header__btn");
const gameTimer = document.querySelector(".header__time");
const gameScore = document.querySelector(".header__score");
const ironManCount = 5;
const heroCount = 3;
const gameDuration = 5;
const popUp = document.querySelector(".pop-up");
const popupMessage = document.querySelector(".pop-up__message");
const popupRefresh = document.querySelector(".pop-up__refresh");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();


let started = false; //게임이 시작되었는지, 안됬는지 알수있도록.
let timer = undefined; // 얼마만의 시간이 남았는지 기억하기위해.
let score = 0; // 최종적인 점수를 기억해야하기때문에.

gameBtn.addEventListener("click", () => {
    // 게임이 시작되었다면, 중지해야하는 기능을 입력하고,
    // 게임이 시작되지 않았다면, 게임시작을 위한 세팅을 한다.
    if (!started) {
        startGame();
    } else if (started) {
        stopGame();
    }
});

//게임이 시작되었을 경우 실행되는 함수들
function startGame() {
    settingGame();
    showStopBtn();
    showTimeAndScore();
    startGameTimer();
    started = true;
}

//게임이 중지되었을 경우 실행되는 함수들
function stopGame() {
    stopGameTimer();
    hideGameBtn();
    showPopupWidthText("REPLAY?");
    started = false;
}

//아이템(hero)을 클릭시 발생하는 이벤트
field.addEventListener("click", onfieldClick);

//리플레이 버튼 클릭시
popupRefresh.addEventListener("click", () => {
    startGame();
    hidePopup();
});

function settingGame() {
    score = 0;
    field.innerHTML = "";
    gameScore.innerText = ironManCount;
    addItem("IronMan", ironManCount, "IronMan.a44b6e8e.png");
    addItem("hero", heroCount, "CaptainAmerica.fbcd2c59.png");
    addItem("hero", heroCount, "SpiderMan.04c09517.png");
    addItem("hero", heroCount, "Hulk.27b33131.png");
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - heroWidth;
    const y2 = fieldRect.height - heroHeight;
    for (let i = 0; i < count; i++) {
        const item = document.createElement("img");
        item.setAttribute("class", className);
        item.setAttribute("src", imgPath);
        item.style.position = "absolute";
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function showStopBtn() {
    const icon = document.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    gameBtn.style.visibility = "visible";
}

function showTimeAndScore() {
    gameTimer.style.visibility = "visible";
    gameScore.style.visibility = "visible";
}

function startGameTimer() {
    let remainingTimeSec = gameDuration;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(score === ironManCount);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function stopGameTimer() {
    clearInterval(timer);
}

function hideGameBtn() {
    gameBtn.style.visibility = "hidden";
}

function showPopupWidthText(text) {
    popUp.classList.remove("pop-up--hide");
    popupMessage.innerText = text;
}

function onfieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches(".IronMan")) {
        target.remove();
        score++;
        updateScore();
        if (score === ironManCount) {
            finishGame(true);
        }
    } else if (target.matches(".hero")) {
        stopGameTimer();
        finishGame(false);
    }
}

function updateScore() {
    gameScore.innerText = ironManCount - score;
}

function finishGame(win) {
    started = false;
    hideGameBtn();
    showPopupWidthText(win ? "YOU WIN!" : "YOU LOSE!");
}

function hidePopup() {
    popUp.classList.add("pop-up--hide");
}