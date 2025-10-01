// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('blockedUrl');
    const goButton = document.getElementById('goButton');
    
    // **LOẠI BỎ resultDiv (vì không cần hiển thị kết quả)
    
    goButton.addEventListener('click', () => {
        let blockedUrl = urlInput.value.trim();

        if (blockedUrl === '') {
            alert('Vui lòng dán link cần mở khóa.');
            return;
        }
        
        // --- LOGIC: CHUẨN HÓA VÀ FIX URL ---
        // 1. Xóa https:// hoặc http://
        blockedUrl = blockedUrl.replace(/^https?:\/\//i, '');
        
        // 2. Thêm lại https://
        let validUrl = blockedUrl;
        if (!validUrl.startsWith('http')) {
            validUrl = 'https://' + validUrl;
        }
        
        // 3. Đảm bảo URL kết thúc bằng / nếu chỉ là tên miền
        if (validUrl.match(/^(https?:\/\/[^\/]+)$/i)) { 
             validUrl += '/';
        }
        // --- KẾT THÚC LOGIC ---

        const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;

        // --- THAO TÁC MỚI: MỞ TAB NGAY LẬP TỨC ---
        window.open(directProxyLink, '_blank');
        
        // (Tùy chọn: Xóa nội dung ô nhập sau khi mở)
        urlInput.value = '';
    });
});

// Xóa hàm copyLink() và các phần tử hiển thị liên kết cũ (Nếu có)
