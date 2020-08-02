import { createCustomElement } from '../util/createCustomElement.js';

function elementClass(contentNode) {
    return class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            }).appendChild(contentNode.cloneNode(true));
        }

        connectedCallback() {
            const root = this.shadowRoot;

            root.getElementById('project-title').textContent = this.dataset.projectTitle;
            root.getElementById('project-origin').textContent = this.dataset.projectOrigin;
            root.getElementById('project-languages').textContent = this.dataset.projectLanguages.split(",").join(" \u2022 ");
        }
    }
}

fetch('components/project-entry/project-entry.html')
    .then(stream => stream.text())
    .then(htmlContent => {
        const contentNode = document.createRange().createContextualFragment(htmlContent);
        createCustomElement('project-entry', contentNode, elementClass);
    })