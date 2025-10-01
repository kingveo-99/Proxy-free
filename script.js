// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('blockedUrl');
    const goButton = document.getElementById('goButton');
    // LOẠI BỎ resultDiv vì không cần hiển thị kết quả
    
    // --- 1. LOGIC CHO NÚT CHÍNH "MỞ KHÓA!" (CHUYỂN HƯỚNG TAB HIỆN TẠI) ---
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

        // HÀNH ĐỘNG: CHUYỂN HƯỚNG TAB HIỆN TẠI
        window.location.href = directProxyLink;
        
        // Xóa nội dung ô nhập
        urlInput.value = '';
    });

    
    // --- 2. LOGIC CHO 3 NÚT CỨNG TRUY CẬP NHANH (MỞ TAB MỚI) ---
    const quickButtons = document.querySelectorAll('.quick-button');

    quickButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Lấy URL từ thuộc tính data-url trong HTML
            const blockedUrl = button.getAttribute('data-url');
            
            // Xử lý URL (Chỉ cần thêm HTTPS prefix)
            let validUrl = blockedUrl;
            if (!validUrl.startsWith('http')) {
                validUrl = 'https://' + validUrl;
            }
            
            const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;
            
            // HÀNH ĐỘNG: MỞ TAB MỚI NGAY LẬP TỨC
            // Vì đây là hành động click trực tiếp, nó sẽ không bị chặn pop-up
            window.open(directProxyLink, '_blank');
        });
    });
    
}); 
// Xóa hoàn toàn hàm copyLink() và các phần tử liên quan.
