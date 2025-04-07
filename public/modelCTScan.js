
import { ctScanBody, angioembolisationBody, surgicalPrinciplesBody, placeOfCareBody, interfacilityTransferBody } from './modalContents.js';


(function () {

    // Cache modal elements inside the module
    const modalElements = {
        modalTitle: document.getElementById('modalTitleCTScan'),
        modalBody: document.getElementById('modalBodyCTScan'),
        backBtn: document.getElementById('backBtnCTScan'),
        modalElement: document.getElementById('myModelCTScan'),
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
        // Go to Level 2 - Angioembolisation
        const nextPageLink = document.getElementById('nextPageLinkCTScanAngioembolisation');
        if (nextPageLink) {
            nextPageLink.addEventListener('click', () => {
                updateModalContent(
                    'Angeoembolisation',
                    angioembolisationBody
                );
            });
        }

        // Go to Level 2 - Surgical Principles
        const nextPageLinkSurgicalPrinciples = document.getElementById('nextPageLinkSurgicalPrinciples');
        if (nextPageLinkSurgicalPrinciples) {
            nextPageLinkSurgicalPrinciples.addEventListener('click', () => {
                updateModalContent(
                    'Surgical Principles',
                    surgicalPrinciplesBody
                );
            });
        }

        // Go to Level 2 - Link 14 Place of Care  
        const nextPageLinkPlaceofCare = document.getElementById('nextPageLinkPlaceofCare');
        if (nextPageLinkPlaceofCare) {
            nextPageLinkPlaceofCare.addEventListener('click', () => {
                updateModalContent(
                    'Place of Care',
                    placeOfCareBody
                );
            });
        }

        // Go to Level 2 - Interfacility Transfer 
        const nextPageLinkInterfacilityTransfer = document.getElementById('nextPageLinkInterfacilityTransfer');
        if (nextPageLinkInterfacilityTransfer) {
            nextPageLinkInterfacilityTransfer.addEventListener('click', () => {
                updateModalContent(
                    'Interfacility Transfer',
                    interfacilityTransferBody
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
        modalElements.modalTitle.innerText = 'CT Scan'; // Reset modal title
        modalElements.modalBody.innerHTML = ctScanBody; // Reset modal body to initial content
        attachDynamicLinks(); // Reattach initial links
    });

    // Attach links when DOM loads
    document.addEventListener('DOMContentLoaded', attachDynamicLinks);
})();
