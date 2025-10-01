// ĐỊA CHỈ WORKER
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('blockedUrl');
    const goButton = document.getElementById('goButton');
    const resultDiv = document.getElementById('resultLinks');

    // Xử lý nút "Mở Khóa"
    goButton.addEventListener('click', () => {
        let blockedUrl = urlInput.value.trim();

        if (blockedUrl === '') {
            alert('Vui lòng dán link cần mở khóa.');
            return;
        }

        // Chuẩn hóa URL
        blockedUrl = blockedUrl.replace(/^https?:\/\//i, '');
        let validUrl = blockedUrl;
        if (!validUrl.startsWith('http')) {
            validUrl = 'https://' + validUrl;
        }
        if (validUrl.match(/^(https?:\/\/[^\/]+)$/i)) {
            validUrl += '/';
        }

        const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;
        window.open(directProxyLink, "_blank"); // mở tab mới
    });

    // Nút truy cập nhanh
    document.getElementById("btnVnMinghui").addEventListener("click", () => {
        window.open(`${WORKER_URL}/?url=${encodeURIComponent("https://vn.minghui.org/")}`, "_blank");
    });

    document.getElementById("btnFalunDafa").addEventListener("click", () => {
        window.open(`${WORKER_URL}/?url=${encodeURIComponent("https://vi.falundafa.org/")}`, "_blank");
    });

    document.getElementById("btnChanhKien").addEventListener("click", () => {
        window.open(`${WORKER_URL}/?url=${encodeURIComponent("https://chanhkien.org/")}`, "_blank");
    });
});
