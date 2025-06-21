let startButton = document.getElementById("startButton");
let themeButton = document.getElementById("theme");
let themeIcon = document.getElementById("themeIcon");
let gameStyle = document.getElementById("gameStyle");
let mainStyle = document.getElementById("mainStyle");
let mainSizeStyle = document.getElementById("mainSize")
let gameSizeStyle = document.getElementById("gameSize")
let isDarkMod = false;

startButton.onmouseover = function() {
    this.style.backgroundColor = "#F261AD";
};

startButton.onmouseout = function() {
    this.style.backgroundColor = "pink";
};

startButton.onclick = function() {
    let mainState = document.getElementById("mainState");
    mainState.style.display = "none";

    let gameState = document.getElementById("gameState");
    gameState.style.display = "flex"

    setUpGame();
};

themeButton.addEventListener("click",function() {
    isDarkMod = !isDarkMod;
    if(!isDarkMod){
        this.className = "themeNotChecked";
        themeIcon.style.transform = "";
        themeIcon.style.backgroundColor = "";
        mainStyle.href = "css/lightMod/mainLight.css";
        gameStyle.href = "css/lightMod/gameLight.css";
    }
    else{
        this.classList = "themeChecked";
        console.log(themeIcon.getBoundingClientRect());
        themeIcon.style.transform = `translateX(${themeIcon.getBoundingClientRect().width}px)`;
        themeIcon.style.backgroundColor = "yellow";
        mainStyle.href = "css/darkMod/mainDark.css";
        gameStyle.href = "css/darkMod/gameDark.css";
    }
});

function changeSize(){
    let width = window.innerWidth;
    if(width < 450){
        mainSizeStyle.href = "css/smallMod/main.css";
        gameSizeStyle.href = "css/smallMod/game.css";
    }
    else{
        mainSizeStyle.href = "css/defaltMod/main.css";
        gameSizeStyle.href = "css/defaltMod/game.css";
    }
}

window.addEventListener("resize",function() {
    changeSize();
});

changeSize();

