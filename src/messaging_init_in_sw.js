import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

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
export const messaging = firebase.messaging();

export async function getUserFirebaseNotificationToken() {
    const isSubscribedToNotifications = Boolean(
        ("Notification" in window &&
            Notification?.permission === "granted") ||
            false,
    );
    let currentToken = '';

    if (isSubscribedToNotifications) {
        currentToken = await messaging.getToken({
            vapidKey: "BCWhyz_ReqLr3lA_dUjrtyHAEJ-LnNPoI-zOdutLHnKnpb9LYVbbox13YlovUIadeyMfq7RWE3fUz0sVfEGokqA",
        });
    }
    
    return currentToken
}

getUserFirebaseNotificationToken()

/**
 * Requests permission for notifications and returns the current token.
 *
 * @return {Promise<string>}
 */
export async function requestNotificationPermission() {
    let currentToken = '';
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
        // User can receive messages
        console.log('Notification permissions granted!')
    } else if (permission === 'denied') {
        // Permission has been denied
        console.log('Notification permission has been denied.');
        throw new Error('Notification permission has been denied.');
    } else {
        // Permission request was dismissed by the user
        console.log('Notification permission request was dismissed.');
        throw new Error('Notifications must be allowed to get notification updates. Please try again.');
    }

    return currentToken
}
