

import { resusitationBody } from './modalContents.js';
//Limiting scope using immediately invoked function expression (IIFE)

(function () {
    // Cache modal elements inside the module
    const modalElements = {
        modalTitle: document.getElementById('modalTitleResusitation'),
        modalBody: document.getElementById('modalBody'),
        backBtn: document.getElementById('backBtn'),
        modalElement: document.getElementById('myModel1ResucitationPrinciples'),
    };

    // Private stack to track modal states
    let modalHistory = [];

    /**
     * Update the modal content.
     * @param {string} header - Header for the modal.
     * @param {string} body - Content (HTML) for the modal body.
     */
    function updateModalContent(header, body) {
        // Save current state to history
        modalHistory.push({
            header: modalElements.modalTitle.innerText,
            body: modalElements.modalBody.innerHTML,
        });

        // Update modal title and body
        modalElements.modalTitle.innerText = header;
        modalElements.modalBody.innerHTML = body;

        // Show the back button
        modalElements.backBtn.classList.remove('d-none');

        // Reattach dynamic event listeners
        attachDynamicLinks();
    }

    /**
     * Attach links dynamically based on their IDs.
     */
    function attachDynamicLinks() {
        // Go to Level 2
        const nextPageLink = document.getElementById('nextPageLink');
        if (nextPageLink) {
            nextPageLink.addEventListener('click', () => {
                updateModalContent(
                    'Local MTP',
                    `
                        <p>This is Level 2 content. Choose an option:</p>
                        <a class="modal-link d-block mb-2" id="level2Option1">Go to Level 2 - Option 1</a>
                        <a class="modal-link" id="level2Option2">Go to Level 2 - Option 2</a>
                    `
                );
            });
        }

        // Level 2 - Option 1
        const level2Option1 = document.getElementById('level2Option1');
        if (level2Option1) {
            level2Option1.addEventListener('click', () => {
                updateModalContent(
                    'Level 2 - Option 1',
                    `
                        <p>This is Level 2 - Option 1.</p>
                        <a class="modal-link" id="level3Content">Go to Level 3 Content</a>
                    `
                );
            });
        }

        // Level 3 Content
        const level3Content = document.getElementById('level3Content');
        if (level3Content) {
            level3Content.addEventListener('click', () => {
                updateModalContent(
                    'Level 3 Header',
                    `<p>This is the final Level 3 content inside Level 2 - Option 1.</p>`
                );
            });
        }

        // Level 2 - Option 2
        const level2Option2 = document.getElementById('level2Option2');
        if (level2Option2) {
            level2Option2.addEventListener('click', () => {
                updateModalContent(
                    'Level 2 - Option 2',
                    `<p>This is Level 2 - Option 2. No further levels here.</p>`
                );
            });
        }
    }

    /**
     * Event Listener: Back Button
     */
    modalElements.backBtn.addEventListener('click', () => {
        if (modalHistory.length > 0) {
            const previousState = modalHistory.pop();

            // Restore previous state
            modalElements.modalTitle.innerText = previousState.header;
            modalElements.modalBody.innerHTML = previousState.body;

            // Hide back button if no more history
            if (modalHistory.length === 0) {
                modalElements.backBtn.classList.add('d-none');
            }

            // Reattach dynamic links
            attachDynamicLinks();
        }
    });

    /**
     * Reset modal history on modal close
     */
    modalElements.modalElement.addEventListener('hidden.bs.modal', () => {
        modalHistory = []; // Clear the history stack
        modalElements.backBtn.classList.add('d-none'); // Hide the back button
        modalElements.modalTitle.innerText = `Resuscitation principles`
            ; // Reset modal title
        modalElements.modalBody.innerHTML = resusitationBody; // Reset modal body to initial content
        attachDynamicLinks(); // Reattach initial links
    });

    // Attach links when DOM loads
    document.addEventListener('DOMContentLoaded', attachDynamicLinks);
})();
