/**
 * Removes all Alpine.js attributes from the DOM elements.
 *
 * @return {void} This function does not return anything.
 */
export function removeAlpineAttributes(): void {
    const xDataElements = document.querySelectorAll('[x-data]');
    xDataElements.forEach((el) => {
        el.removeAttribute('x-data');
    });

    const xShowElements = document.querySelectorAll('[x-show]');
    xShowElements.forEach((el) => {
        el.removeAttribute('x-show');
    });

    const xRefsElements = document.querySelectorAll('[x-ref]');
    xRefsElements.forEach((el) => {
        el.removeAttribute('x-ref');
    });

    const xBindElements = document.querySelectorAll('[x-bind]');
    xBindElements.forEach((el) => {
        el.removeAttribute('x-bind');
    });

    const xTextElements = document.querySelectorAll('[x-text]');
    xTextElements.forEach((el) => {
        el.removeAttribute('x-text');
    });

    const xHtmlElements = document.querySelectorAll('[x-html]');
    xHtmlElements.forEach((el) => {
        el.removeAttribute('x-html');
    });

    const xModelElements = document.querySelectorAll('[x-model]');
    xModelElements.forEach((el) => {
        el.removeAttribute('x-model');
    });

    const xOnElements = document.querySelectorAll('[x-on]');
    xOnElements.forEach((el) => {
        el.removeAttribute('x-on');
    });

    const xCloakElements = document.querySelectorAll('[x-cloak]');
    xCloakElements.forEach((el) => {
        el.removeAttribute('x-cloak');
    });
}

// https://totheroot.io/article/native-apps-are-dead-web-push-on-i-os-with-next-js
export function areNotifcationsSupported() {
    return Boolean(
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window
    );
}

// https://totheroot.io/article/native-apps-are-dead-web-push-on-i-os-with-next-js
export async function saveSubscription(subscription: PushSubscription) {
    const ORIGIN = window.location.origin
    const BACKEND_URL = `${ORIGIN}/api/push`

    const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
    })

    return response.json()
}

// To make development and debugging easier, we will implement a function to unregister 
// all service workers in our app. This helps when you are changing the code of the 
// service worker later on. Normally you have to manually unregister the service worker 
// by using the developer tools of your webbrowser, but we will do it programmatically:
export const unregisterServiceWorkers = async () => {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map((r) => r.unregister()))
}

export const registerServiceWorkers = async () => {
    return Promise.all([
        navigator.serviceWorker.register('/service.js'),
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
    ])
}
