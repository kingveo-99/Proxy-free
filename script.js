// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('blockedUrl');
    const goButton = document.getElementById('goButton');
    // LOẠI BỎ resultDiv vì không cần hiển thị kết quả
    
    goButton.addEventListener('click', () => {
        let blockedUrl = urlInput.value.trim();

        if (blockedUrl === '') {
            alert('Vui lòng dán link cần mở khóa.');
            return;
        }
        
        // --- LOGIC: CHUẨN HÓA VÀ FIX URL ---
        blockedUrl = blockedUrl.replace(/^https?:\/\//i, '');
        
        let validUrl = blockedUrl;
        if (!validUrl.startsWith('http')) {
            validUrl = 'https://' + validUrl;
        }
        
        if (validUrl.match(/^(https?:\/\/[^\/]+)$/i)) { 
             validUrl += '/';
        }
        // --- KẾT THÚC LOGIC ---

        const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;

        // --- HÀNH ĐỘNG MỚI: CHUYỂN HƯỚNG TAB HIỆN TẠI (1 nút, 1 thao tác) ---
        // Thao tác này là chắc chắn nhất và không bao giờ bị chặn.
        window.location.href = directProxyLink;
        
        // Xóa nội dung ô nhập
        urlInput.value = '';
    });
});

// Xóa hoàn toàn hàm copyLink() và các phần tử liên quan.
