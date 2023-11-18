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