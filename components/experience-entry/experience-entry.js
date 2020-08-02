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

            root.getElementById('position').textContent = this.dataset.position;
            root.getElementById('company-name').textContent = this.dataset.company;
            root.getElementById('start-date').textContent =  new Date(this.dataset.startDate.replace(/-/g, '\/')).toLocaleDateString("en-US", {'month': 'long', 'year': 'numeric'});
            if (this.dataset.endDate) {
                root.getElementById('end-date').textContent =  new Date(this.dataset.endDate.replace(/-/g, '\/')).toLocaleDateString("en-US", {'month': 'long', 'year': 'numeric'});
            } else {
                root.getElementById('end-date').textContent = 'Present';
            }
            root.getElementById('location').textContent = this.dataset.location;
        }
    }
}

fetch('components/experience-entry/experience-entry.html')
    .then(stream => stream.text())
    .then(htmlContent => {
        const contentNode = document.createRange().createContextualFragment(htmlContent);
        createCustomElement('experience-entry', contentNode, elementClass);
    })