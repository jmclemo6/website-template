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

            root.getElementById('school-name').textContent = this.dataset.schoolName;
            root.getElementById('degree-name').textContent = this.dataset.degreeName;
            const gradDate = new Date(this.dataset.gradDate.replace(/-/g, '\/'));
            const gradDateString = gradDate.toLocaleDateString("en-US", {'month': 'long', 'year': 'numeric'});
            root.getElementById('grad-date').textContent = gradDate > Date.now() ? `Expected ${gradDateString}` : gradDateString
            root.getElementById('gpa').textContent = this.dataset.gpa;
            root.getElementById('gpa-scale').textContent = this.dataset.gpaScale;
        }
    }
}

fetch('components/education-entry/education-entry.html')
    .then(stream => stream.text())
    .then(htmlContent => {
        const contentNode = document.createRange().createContextualFragment(htmlContent);
        createCustomElement('education-entry', contentNode, elementClass);
    })