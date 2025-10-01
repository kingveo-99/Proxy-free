// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('blockedUrl');
    const goButton = document.getElementById('goButton');
    const resultDiv = document.getElementById('resultLinks');

    goButton.addEventListener('click', () => {
        const blockedUrl = urlInput.value.trim();

        if (blockedUrl === '') {
            alert('Vui lòng dán link cần mở khóa.');
            return;
        }

        const validUrl = blockedUrl.startsWith('http') ? blockedUrl : 'https://' + blockedUrl;

        // --- 1. TẠO LIÊN KẾT PROXY TRỰC TIẾP ---
        const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;

        // --- 2. HIỂN THỊ KẾT QUẢ VÀ NÚT ---
        resultDiv.innerHTML = `
            <div class="col-md-10 alert alert-light shadow-sm">
                <h5 class="text-success">✅ Đã Tạo Liên Kết Proxy</h5>

                <p class="text-start"><strong>Bước 1:</strong> Xem trang bị chặn trực tiếp:</p>
                <a href="${directProxyLink}" target="_blank" class="btn btn-primary btn-sm mb-3">Mở Trang Ngay</a>

                <p class="text-start mb-1"><strong>Bước 2:</strong> Rút gọn link để gửi bạn bè (Họ bấm vào là xem được ngay):</p>
                <div class="input-group mb-3">
                    <input type="text" id="proxyLink" class="form-control" value="${directProxyLink}" readonly>
                    <button class="btn btn-secondary" onclick="copyLink()">Sao chép Link Proxy</button>
                    <a href="https://tinyurl.com/" target="_blank" class="btn btn-warning">Đến TinyURL.com</a>
                </div>
                <p class="text-muted small text-start">Sau khi sao chép, hãy dán liên kết Proxy vào ô rút gọn của TinyURL để tạo link chia sẻ trực tiếp.</p>
            </div>
        `;
    });
});

function copyLink() {
    const linkElement = document.getElementById('proxyLink');
    linkElement.select();
    linkElement.setSelectionRange(0, 99999); 
    document.execCommand('copy');
    alert('Liên kết Proxy đã được sao chép! Hãy dán vào TinyURL.com để rút gọn.');
}