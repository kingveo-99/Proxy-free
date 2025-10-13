
// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://web.daiphap.to/"; // QUAN TRỌNG: Hãy thay thế bằng địa chỉ worker đang hoạt động của bạn!

/**
 * Generates a proxy link for the given URL and opens it in a new tab.
 * The URL is formatted to be path-based for better readability.
 * e.g., https://web.daiphap.to/example.com/page
 * @param {string} url The URL to proxy.
 */
const openProxyForUrl = (url) => {
    if (!url) return;

    // Ensure the URL has a protocol for correct parsing.
    const validUrl = url.startsWith('http://') || url.startsWith('https') 
        ? url 
        : 'https://' + url;
    
    // Create a path-based proxy URL by removing the protocol from the target URL.
    // This assumes the worker at WORKER_URL is configured to handle path-based requests.
    const urlWithoutProtocol = validUrl.replace(/^https?:\/\//, '');
    const generatedProxyLink = `${WORKER_URL}${urlWithoutProtocol}`;
    
    window.open(generatedProxyLink, '_blank');
};


document.addEventListener('DOMContentLoaded', () => {
    // Main elements
    const urlInput = document.getElementById('blockedUrl') as HTMLInputElement;
    const goButton = document.getElementById('goButton') as HTMLButtonElement;
    const pasteButton = document.getElementById('pasteButton') as HTMLButtonElement;
    const goButtonText = goButton.querySelector('.button-text') as HTMLSpanElement;
    const goButtonSpinner = goButton.querySelector('.spinner-border');
    const originalGoButtonHTML = goButtonText.innerHTML;
    const urlInputHelp = document.getElementById('urlInputHelp') as HTMLParagraphElement;
    const originalHelpText = urlInputHelp.textContent;
    const originalHelpClasses = urlInputHelp.className;

    /**
     * Resets the help text below the input to its original state.
     */
    const resetHelpText = () => {
        if (urlInputHelp) {
            urlInputHelp.textContent = originalHelpText;
            urlInputHelp.className = originalHelpClasses;
        }
    };

    /**
     * Displays an error message in the help text area.
     * @param {string} message The error message to display.
     */
    const showHelpError = (message: string) => {
        if (urlInputHelp) {
            urlInputHelp.textContent = message;
            urlInputHelp.className = 'form-text text-danger mt-3';
        }
    };

    // Reset help text when user starts typing
    urlInput.addEventListener('input', resetHelpText);


    /**
     * Handles the proxy generation from the main input field.
     */
    const handleProxyGeneration = () => {
        const blockedUrl = urlInput.value.trim();
        resetHelpText();

        if (blockedUrl === '') {
            urlInput.classList.add('is-invalid');
            return;
        }
        urlInput.classList.remove('is-invalid');

        // Show loading state
        goButton.disabled = true;
        if (goButtonText) goButtonText.textContent = 'Đang xử lý...';
        if (goButtonSpinner) goButtonSpinner.classList.remove('d-none');

        setTimeout(() => { // Simulate processing
            openProxyForUrl(blockedUrl);
            
            // Hide loading state
            goButton.disabled = false;
            if (goButtonText) goButtonText.innerHTML = originalGoButtonHTML;
            if (goButtonSpinner) goButtonSpinner.classList.add('d-none');

        }, 500); // A small delay for better UX
    };
    
    // Event listeners for the main form
    goButton.addEventListener('click', handleProxyGeneration);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleProxyGeneration();
        }
    });

    pasteButton.addEventListener('click', async () => {
        resetHelpText(); // Reset on each click attempt
    
        // Check for secure context and API support. The Clipboard API is only available in secure contexts (HTTPS).
        if (!navigator.clipboard || !window.isSecureContext) {
            showHelpError('Tính năng dán không khả dụng. Vui lòng đảm bảo bạn đang truy cập trang web qua HTTPS.');
            return;
        }
    
        try {
            // Use the Permissions API to check the clipboard-read permission status.
            // This provides a better user experience by informing them if they have previously denied the permission.
            const permissionStatus = await navigator.permissions.query({ name: 'clipboard-read' as PermissionName });
    
            if (permissionStatus.state === 'denied') {
                showHelpError('Bạn đã chặn quyền truy cập clipboard. Vui lòng cho phép trong cài đặt trang web của trình duyệt để sử dụng tính năng này.');
                return;
            }
    
            // If permission is 'granted' or 'prompt', try reading from the clipboard.
            // This will trigger the permission prompt if it's the first time.
            const text = await navigator.clipboard.readText();
            if (urlInput) {
                urlInput.value = text;
                urlInput.focus();
            }
        } catch (err) {
            console.error('Không thể đọc clipboard: ', err);
            // If the user denies the prompt, a 'NotAllowedError' will be thrown.
            if (err.name === 'NotAllowedError') {
                showHelpError('Quyền truy cập clipboard đã bị từ chối.');
            } else {
                // For other potential errors (e.g., clipboard is empty, or an unexpected browser error).
                showHelpError('Không thể đọc nội dung từ clipboard. Vui lòng thử sao chép lại văn bản.');
            }
        }
    });


    // --- Quick Access Logic ---
    const quickAccessButtons = document.querySelectorAll('.quick-access-btn') as NodeListOf<HTMLElement>;

    quickAccessButtons.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Prevent multiple clicks while processing
            if (element.classList.contains('processing')) return;

            const urlToAccess = element.dataset.url;
            const linkType = element.dataset.type || 'proxy'; // Default to 'proxy' if not specified

            if (urlToAccess) {
                element.classList.add('processing');
                
                // If it's a button, also set the disabled property
                if (element instanceof HTMLButtonElement) {
                    element.disabled = true;
                }

                setTimeout(() => {
                    // Choose action based on link type
                    if (linkType === 'direct') {
                        window.open(urlToAccess, '_blank');
                    } else { // 'proxy' is the default
                        openProxyForUrl(urlToAccess);
                    }
                    
                    // Reset element state
                    element.classList.remove('processing');
                    if (element instanceof HTMLButtonElement) {
                        element.disabled = false;
                    }
                }, 500); // Small delay for better UX
            }
        });
    });
});
