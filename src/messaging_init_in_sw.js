import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAB5bk5DBxwgUibsYBYz2_NGk0OaBFhP_4",
  authDomain: "malachi-daily.firebaseapp.com",
  projectId: "malachi-daily",
  storageBucket: "malachi-daily.appspot.com",
  messagingSenderId: "44879717629",
  appId: "1:44879717629:web:c06413d20d281de6c24a94",
  measurementId: "G-S0N4P2MHKX"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export function requestNotificationPermission() {
    console.log('requesting permission')
    Notification.requestPermission()
        .then((permission) => {
            console.log(permission)
            if (permission === 'granted') {
                // Permission has been granted
                getToken(messaging, { vapidKey: "BCWhyz_ReqLr3lA_dUjrtyHAEJ-LnNPoI-zOdutLHnKnpb9LYVbbox13YlovUIadeyMfq7RWE3fUz0sVfEGokqA" }).then((currentToken) => {
                    if (currentToken) {
                        // Send the token to your server and update the UI if necessary
                        console.log(currentToken)
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        // ...
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });            
            } else if (permission === 'denied') {
                // Permission has been denied
                console.log('Notification permission has been denied.');
            } else {
                // Permission request was dismissed by the user
                console.log('Notification permission request was dismissed.');
            }
        });
}
