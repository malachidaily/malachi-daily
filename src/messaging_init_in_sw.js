import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { getMessaging as getMessagingFromSW } from "firebase/messaging/sw";

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
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
export const messagingFromSW = getMessagingFromSW(app);

/**
 * Requests permission for notifications and returns the current token.
 *
 * @return {Promise<void>}
 */
export async function requestNotificationPermission() {
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
}
