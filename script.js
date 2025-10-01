<script>
// ĐỊA CHỈ WORKER CỦA BẠN
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('blockedUrl');
    const goButton = document.getElementById('goButton');
    const resultDiv = document.getElementById('resultLinks');

    // Khi bấm "Mở Khóa"
    goButton.addEventListener('click', () => {
        let blockedUrl = urlInput.value.trim();

        if (blockedUrl === '') {
            alert('Vui lòng dán link cần mở khóa.');
            return;
        }
        
        // Xử lý URL: thêm https nếu thiếu
        blockedUrl = blockedUrl.replace(/^https?:\/\//i, '');
        let validUrl = blockedUrl;
        if (!validUrl.startsWith('http')) {
            validUrl = 'https://' + validUrl;
        }
        if (validUrl.match(/^(https?:\/\/[^\/]+)$/i)) {
             validUrl += '/';
        }

        const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;

        // 👉 Mở tab mới luôn
        window.open(directProxyLink, '_blank');
    });

    // 👉 Tạo 3 nút cố định
    resultDiv.innerHTML = `
        <div class="mt-4">
            <h5 class="text-primary">🌐 Truy cập nhanh</h5>
            <div class="d-flex flex-wrap gap-2 mt-2">
                <a href="${WORKER_URL}/?url=${encodeURIComponent('https://minghui.org/news/')}" target="_blank" class="btn btn-success">Minghui News</a>
                <a href="${WORKER_URL}/?url=${encodeURIComponent('https://vn.falundafa.org/')}" target="_blank" class="btn btn-success">VN Falun Dafa</a>
                <a href="${WORKER_URL}/?url=${encodeURIComponent('https://chanhkien.org/')}" target="_blank" class="btn btn-success">Chanhkien</a>
            </div>
        </div>
    `;
});
</script>
