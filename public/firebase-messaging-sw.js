importScripts('https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAB5bk5DBxwgUibsYBYz2_NGk0OaBFhP_4",
    authDomain: "malachi-daily.firebaseapp.com",
    projectId: "malachi-daily",
    storageBucket: "malachi-daily.appspot.com",
    messagingSenderId: "44879717629",
    appId: "1:44879717629:web:c06413d20d281de6c24a94",
    measurementId: "G-S0N4P2MHKX"
};

firebase.initializeApp(firebaseConfig);

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
        self.registration.showNotification(title, { body, icon: image || '/logo.png' });
    });
}