const btnEl = document.getElementById("btn");
const animeContainerEl = document.querySelector(".anime-container");
const animeImgEl = document.querySelector(".anime-image");
// const animeNameEl = document.querySelector(".anime-name");
const submitEl = document.querySelector(".btn-submit");
const charNameEl = document.querySelector(".char-name");
const correctEl = document.querySelector(".correct");
const wrongEl = document.querySelector(".wrong");
const scoresEl = document.querySelector(".scores");
const scoreEl = document.querySelector(".score");
const scoresCountEl = document.querySelector(".scores-count");
const highScoresEl = document.querySelector(".high-score");
const highScoreCount = document.querySelector(".high-score-count");
const lastHighScore = document.querySelector(".last-high-score");

let fetchRes;
let correctCnt = 0 ;

// if(localStorage.getItem('lastHighScore')) {
// console.log(
//     "hey mf"
// );}

lastHighScore.innerHTML = localStorage.getItem('lasthighScore');

btnEl.addEventListener("click",async () => {
    try {
        const response = await fetch("https://api.jikan.moe/v4/characters/"+Math.floor(Math.random()*100)+1);
        fetchRes = await response.json();
        console.log(fetchRes);
        console.log(fetchRes.data.name);

        animeContainerEl.style.display = "block";
        animeImgEl.src = fetchRes.data.images.jpg.image_url;
        // console.log(fetchRes);
        // console.log(data.data.images.jpg.image_url);

        // console.log("animeImgEl.src",animeImgEl.src);
        // animeNameEl.innerText = fetchRes.data.name;
        
    } catch (error) {
        console.log("Error : Check the connection");
    }
});

submitEl.addEventListener("click", () => {
    const text = charNameEl.value;
    const inputText = text.toUpperCase().trim();
    console.log(inputText);
    console.log(fetchRes.data.name.toUpperCase());
    if(inputText == fetchRes.data.name.toUpperCase()){
        correctCnt++;
        // correctEl.style.display = "block";
        scoresCountEl.innerHTML = `<b>${correctCnt}</b>`;
        scoresEl.style.display = "block";
        scoreEl.style.display = "block";
        scoresCountEl.style.display = "block";
        btnEl.click();
    } else {
        wrongEl.style.display = "block";
        scoresEl.style.display = "block";
        scoreEl.style.display = "none";
        // scoresCountEl.innerHTML += `<b> ${correctCnt}</b>`;
        highScoresEl.style.display = "block";
        highScoreCount.innerHTML = `<b>${correctCnt}</b>`;
        scoresCountEl.style.display = "block";
        highScoreCount.style.display = "block";
        localStorage.setItem('lasthighScore',correctCnt);
    }
});

charNameEl.addEventListener("keypress", (event) => {
    if(event.key == "Enter"){
        event.preventDefault(); //cancel the default action if needed
        submitEl.click(); //trigger the button element with a click, It is basically calling the submitEl event listener
    }
});

