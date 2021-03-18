let _app = {};
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyBkX6D9WIo0s7jYISSJibJwAF4UtK30P88",
    authDomain: "ucode-411cd.firebaseapp.com",
    projectId: "ucode-411cd",
    storageBucket: "ucode-411cd.appspot.com",
    messagingSenderId: "796349148456",
    appId: "1:796349148456:web:a87357379332d79be3b41d",
  };
  
  firebase.initializeApp(firebaseConfig);
  async function googlesignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await firebase.auth().signInWithPopup(provider);
    const { uid, displayName: uname, photoURL: upic, email } = credential.user;
    const data = { uid, uname, upic, email, timestamp: firebase.firestore.FieldValue.serverTimestamp() };
    localStorage.setItem('fuid', JSON.stringify(data));
    firebase.firestore().collection("users").doc(uid).set(data, { merge: true }).then(() => location.replace('account.html'));
  }

  function logout() {
    localStorage.removeItem('fuid');
    firebase.auth().signOut().then(() => {
      location.replace('login.html');
    });
  }

  _app.signin = googlesignin;
  _app.logout = logout;
})();
