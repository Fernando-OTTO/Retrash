const body = document.body;
const Scanner = document.querySelector(".scanner");
const scannerButtom = document.querySelector(".scanner-buttom");
const backScanner = document.querySelector(".back");
const preview = document.getElementById("preview");

const scored = document.querySelector(".to-score");
const scoredConfirms = document.querySelectorAll(".to-score-buttom");
body.removeChild(scored);

const pontutation = document.getElementById("pontuation");
pontutation.innerText = 0;
let counter = 0;

function toScore(score) {
  counter += score;
  pontutation.innerText = counter;
}

let scanner = new Instascan.Scanner({
  video: document.getElementById("preview"),
});

function closeScanner() {
  body.removeChild(Scanner);
  body.style.height = "calc(100vh + 150px)";
  body.removeChild(preview);
}
closeScanner();

function openScanner() {
  body.appendChild(Scanner);
  body.style.height = "100vh";
  body.appendChild(preview);

  scanner.addListener("scan", function (content) {
    scanner.stop();
    console.log(content);
    body.appendChild(scored);

    let trashKG = 0.12;
    let score = trashKG * 100;

    const reConinsInfo = document.querySelector("#reCoins-Info");
    const trashInfo = document.querySelector("#trash-info");
    reConinsInfo.innerText = score;
    trashInfo.innerText = trashKG;
    console.log(score);

    function getReward() {
      toScore(score);
      closeScanner();
      body.removeChild(scored);
    }
    scoredConfirms.forEach((buttom) => {
      buttom.addEventListener("click", getReward);
    });
  });

  Instascan.Camera.getCameras().then((cameras) => {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error("Não existe câmera no dispositivo!");
    }
  });
}
scannerButtom.addEventListener("click", openScanner);
backScanner.addEventListener("click", closeScanner);
