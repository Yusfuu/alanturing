((_) => {

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
      <div class="question">${q}</div>
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
            box.classList.add("ani-none");
            box.classList.add("hover-dis");
          }, 2000);
        }

        osoIcon.addEventListener("click", () => {
          randomNumber.style.opacity = "1";
          question.style.opacity = "0";
          if (randomNumber.textContent == "") {
            let random = ~~(Math.random() * (20 - (-10) + 1)) + (-10);
            random == 0
              ? (box.style.background = tie)
              : random > 0
                ? (box.style.background = "#60D360")
                : (box.style.background = "#EC4899");
            randomNumber.innerHTML = random > 0 ? `+${random}` : random;
          }
        });

        questionIcon.addEventListener("click", () => {
          question.style.opacity = "1";
          randomNumber.style.opacity = "0";
        });
      });
    });

  }).catch(function (error) {
    console.error(error);
  });

})();
