import { type Alpine as AlpineType, type AlpineComponent } from "alpinejs";

/**
 * Removes all Alpine.js attributes from the DOM elements.
 *
 * @return {void} This function does not return anything.
 */
export function removeAlpineAttributes(): void {
    const xDataElements = document.querySelectorAll('[x-data][x-clear]');
    xDataElements.forEach((el) => {
        el.removeAttribute('x-data');
    });

    const xInitElements = document.querySelectorAll('[x-init][x-clear]');
    xInitElements.forEach((el) => {
        el.removeAttribute('x-init');
    });

    const xShowElements = document.querySelectorAll('[x-show][x-clear]');
    xShowElements.forEach((el) => {
        el.removeAttribute('x-show');
    });

    const xRefsElements = document.querySelectorAll('[x-ref][x-clear]');
    xRefsElements.forEach((el) => {
        el.removeAttribute('x-ref');
    });

    const xBindElements = document.querySelectorAll('[x-bind][x-clear]');
    xBindElements.forEach((el) => {
        el.removeAttribute('x-bind');
    });

    const xTextElements = document.querySelectorAll('[x-text][x-clear]');
    xTextElements.forEach((el) => {
        el.removeAttribute('x-text');
    });

    const xHtmlElements = document.querySelectorAll('[x-html][x-clear]');
    xHtmlElements.forEach((el) => {
        el.removeAttribute('x-html');
    });

    const xModelElements = document.querySelectorAll('[x-model][x-clear]');
    xModelElements.forEach((el) => {
        el.removeAttribute('x-model');
    });

    const xOnElements = document.querySelectorAll('[x-on][x-clear]');
    xOnElements.forEach((el) => {
        el.removeAttribute('x-on:click');
    });

    const xCloakElements = document.querySelectorAll('[x-cloak][x-clear]');
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
// https://totheroot.io/article/native-apps-are-dead-web-push-on-i-os-with-next-js
export const unregisterServiceWorkers = async () => {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map((r) => r.unregister()))
}

// https://totheroot.io/article/native-apps-are-dead-web-push-on-i-os-with-next-js
export const registerServiceWorkers = async () => {
    return Promise.all([
        navigator.serviceWorker.register('/service.js'),
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
    ])
}

declare global {
    var Alpine: AlpineType;
}

/**
 * Sets the value of a specific key in the AlpineJS state.
 *
 * @param {string} key - The key of the AlpineJS state to be updated.
 * @param {any} value - The new value to assign to the specified key.
 * @param {HTMLElement} alpineStateTargetEl - The target element on which the AlpineJS state is attached. Defaults to document.documentElement.
 * @throws {Error} If the specified key does not exist in the existing AlpineJS state.
 * @return {void}
 */
export function setAlpineState(
    key: string, 
    value: any,
    alpineStateTargetEl: HTMLElement = document.documentElement
): void {
    const alpineData : AlpineComponent<any> = window.Alpine.$data(alpineStateTargetEl);

    try {
        alpineData[key] = value;
    } catch {
        throw new Error('That key does not exist in your existing AlpineJS state.')
    }
}
