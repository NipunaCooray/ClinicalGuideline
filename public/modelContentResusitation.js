// Select modal elements
var modalTitleResus = document.getElementById('modalTitleResusitation');
var modalBodyResus = document.getElementById('modalBody');
var backBtnResus = document.getElementById('backBtn');
var modalElementResus = document.getElementById('myModel1ResucitationPrinciples'); // Modal element

// Stack to track modal states
var modalHistoryResus = [];

/**
 * Function to update the modal content.
 * @param {string} header - Header for the modal.
 * @param {string} body - Content (HTML) for the modal body.
 */
function updateModalContentResus(header, body) {
    // Save current state to history
    modalHistoryResus.push({
        header: modalTitleResus.innerText,
        body: modalBodyResus.innerHTML,
    });

    // Update modal title and body
    modalTitleResus.innerText = header;
    modalBodyResus.innerHTML = body;

    // Show the back button
    backBtnResus.classList.remove('d-none');

    // Reattach dynamic event listeners
    attachDynamicLinksResus();
}

// Attach links dynamically based on their IDs
function attachDynamicLinksResus() {
    // Go to Level 2
    const nextPageLinkResus = document.getElementById('nextPageLink');
    if (nextPageLinkResus) {
        nextPageLinkResus.addEventListener('click', () => {
            updateModalContentResus(
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

// Event Listener: Back Button
backBtnResus.addEventListener('click', () => {
    if (modalHistoryResus.length > 0) {
        const previousState = modalHistoryResus.pop();

        // Restore previous state
        modalTitleResus.innerText = previousState.header;
        modalBodyResus.innerHTML = previousState.body;

        // Hide back button if no more history
        if (modalHistoryResus.length === 0) {
            backBtnResus.classList.add('d-none');
        }

        // Reattach dynamic links
        attachDynamicLinksResus();
    }
});

// Reset modal history on modal close
modalElementResus.addEventListener('hidden.bs.modal', () => {
    1
    modalHistoryResus = []; // Clear the history stack
    backBtnResus.classList.add('d-none'); // Hide the back button
    modalTitleResus.innerText = 'Main Header'; // Reset modal title
    modalBodyResus.innerHTML = `
      <p>Welcome to the main content of the modal.</p>
      <a class="modal-link" id="nextPageLink">Go to Level 2</a>
    `; // Reset modal body to initial content
    attachDynamicLinksResus(); // Reattach initial links
});


// Attach links when DOM loads
document.addEventListener('DOMContentLoaded', attachDynamicLinksResus);
