// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử HTML
    const urlInput = document.getElementById('blockedUrl');
    const goButton = document.getElementById('goButton');
    const quickLinks = document.querySelectorAll('.quick-link'); // Các nút truy cập nhanh (thẻ <a>)

    // --- 1. LOGIC CHO NÚT CHÍNH "MỞ KHÓA!" (CHUYỂN HƯỚNG TAB HIỆN TẠI) ---
    // Hành động này diễn ra khi người dùng nhập URL vào ô và bấm nút.
    goButton.addEventListener('click', () => {
        let blockedUrl = urlInput.value.trim();

        if (blockedUrl === '') {
            alert('Vui lòng dán link cần mở khóa.');
            return;
        }
        
        // Chuẩn hóa và Fix URL (Đảm bảo có https:// và dấu / ở cuối nếu là trang chủ)
        blockedUrl = blockedUrl.replace(/^https?:\/\//i, '');
        let validUrl = blockedUrl;
        if (!validUrl.startsWith('http')) {
            validUrl = 'https://' + validUrl;
        }
        if (validUrl.match(/^(https?:\/\/[^\/]+)$/i)) { 
             validUrl += '/';
        }

        const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;

        // HÀNH ĐỘNG: CHUYỂN HƯỚNG TAB HIỆN TẠI (Không bị chặn)
        window.location.href = directProxyLink;
        
        // Xóa nội dung ô nhập
        urlInput.value = '';
    });

    
    // --- 2. LOGIC CHO 3 LIÊN KẾT TRUY CẬP NHANH (MỞ TAB MỚI) ---
    // Hành động này diễn ra khi trang tải xong: gán link Proxy vào thuộc tính href của thẻ <a>.
    quickLinks.forEach(link => {
        // Lấy URL từ thuộc tính data-url trong HTML
        const blockedUrl = link.getAttribute('data-url');
        
        // Chuẩn hóa URL cho Proxy (Chỉ cần thêm HTTPS prefix)
        let validUrl = blockedUrl;
        if (!validUrl.startsWith('http')) {
            validUrl = 'https://' + validUrl;
        }
        
        const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;
        
        // Gán link Proxy đã tạo vào thuộc tính href của thẻ <a>
        // Khi người dùng click, thẻ <a> với target="_blank" sẽ tự mở tab mới
        link.setAttribute('href', directProxyLink);
    });
    
});
