((_) => {
  var audiobg = new Audio("../img/Nintendo Wii - Mii Channel Theme.mp3");

  function playAudio() {
    audiobg.play();
  }
  function pauseAudio() {
    audiobg.pause();
  }

    document.getElementById('audioOn').addEventListener("click", function(){
      playAudio();
    });
  const firebaseConfig = {
    apiKey: "AIzaSyBkX6D9WIo0s7jYISSJibJwAF4UtK30P88",
    authDomain: "ucode-411cd.firebaseapp.com",
    projectId: "ucode-411cd",
    storageBucket: "ucode-411cd.appspot.com",
    messagingSenderId: "796349148456",
    appId: "1:796349148456:web:a87357379332d79be3b41d",
  };
  firebase.initializeApp(firebaseConfig);

  const main = document.querySelector("#main");
  const tie = "linear-gradient(to bottom right, #d946ef, #9333ea)";
  let qi = 1;
  const render = (q, qi) => {
    return `<div class="box" data-qi="${qi}">
      <div class="number-box"></div>
      <div class="question">
      <pre>${q}</pre>
      </div>
      <div class="random-number"></div>
      <img class="osu-icon" src="img/icon/osu.png" alt="osu" />
      <img class="question-icon" src="img/icon/help.png" alt="question" />
    </div>`;
  };

  let _questions = [];
  let db = firebase.database().ref("questions");

  db.get().then(function (st) {
    const data = st.val();
    for (const k in data) {
      _questions.push(data[k].question);
    }
    qsr = [...new Set(_questions)].sort(() => Math.random() - 0.5);
    qsr.forEach(_ => main.insertAdjacentHTML('beforeend', render(_, qi++)));
    [...document.querySelectorAll(".box")].forEach((box, index) => {
      box.children[0].innerHTML = index + 1;

      box.addEventListener("click", () => {
        let numberBox = box.children[0];
        let question = box.children[1];
        let randomNumber = box.children[2];
        let osoIcon = box.children[3];
        let questionIcon = box.children[4];

        if (!box.classList.contains("ani-none")) {
          box.style.cursor = "default";
          box.classList.add("bouncing");
          setTimeout((_) => {
            numberBox.style.display = "none";
            osoIcon.style.transform = "scale(1)";
            questionIcon.style.transform = "scale(1)";
            question.style.opacity = "1";
            box.classList.remove("bouncing");
            box.style.backgroundImage = "url('../img/cardfliped.svg')";
            box.classList.add("ani-none");
            box.classList.add("hover-dis");
          }, 2000);
        }
        var audioLose = new Audio(
          "../img/yeahBoy.mp3"
        );
        var audioNice = new Audio(
          "../img/Nicememe.mp3"
        );

        function losers() {
          box.style.backgroundImage = "url('../img/cardflipedlose.svg')";
          audioLose.play();
          audiobg.pause();
          setTimeout(() =>{audiobg.play()}, 4000);
        }
        function winners() {
          box.style.backgroundImage = "url('../img/cardflipedwin.svg')";
          audioNice.play();
          audiobg.pause();
           setTimeout(() =>{audiobg.play()}, 4000);
        }

        osoIcon.addEventListener("click", () => {
          randomNumber.style.opacity = "1";
          question.style.opacity = "0";
          if (randomNumber.textContent == "") {
            let random = ~~(Math.random() * (20 - -10 + 1)) + -10;
            random == 0
              ? (box.style.backgroundImage = "url('../img/cardfliped0.svg')")
              : random > 0
              ? losers()
              : winners()
            randomNumber.innerHTML = random > 0 ? `+${random}` : random;
          }
        });

        questionIcon.addEventListener("click", () => {
          (box.style.backgroundImage = "url('../img/cardfliped.svg')");
          document.querySelector("#main > div.box.ani-none.hover-dis > div.random-number").style.color="black";
          question.style.opacity = "1";
          randomNumber.style.opacity = "0";
        });
      });
    });

  }).catch(function (error) {
    console.error(error);
  });

})();
