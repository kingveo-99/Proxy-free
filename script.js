// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử HTML
    const urlInput = document.getElementById('blockedUrl'); // Ô nhập liệu
    const goButton = document.getElementById('goButton');   // Nút chính "Mở Khóa"
    const quickLinks = document.querySelectorAll('.quick-link'); // Các nút truy cập nhanh

    
    // --- 1. LOGIC CHO NÚT CHÍNH "MỞ KHÓA!" (CHUYỂN HƯỚNG TAB HIỆN TẠI) ---
    // Hành động này diễn ra khi người dùng bấm nút chính
    goButton.addEventListener('click', handleGoButtonClick);

    function handleGoButtonClick() {
        let blockedUrl = urlInput.value.trim();

        if (blockedUrl === '') {
            alert('Vui lòng dán link cần mở khóa.');
            return;
        }
        
        // Chuẩn hóa và Fix URL
        blockedUrl = blockedUrl.replace(/^https?:\/\//i, '');
        let validUrl = blockedUrl;
        if (!validUrl.startsWith('http')) {
            validUrl = 'https://' + validUrl;
        }
        if (validUrl.match(/^(https?:\/\/[^\/]+)$/i)) { 
             validUrl += '/';
        }

        const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(validUrl)}`;

        // HÀNH ĐỘNG: CHUYỂN HƯỚNG TAB HIỆN TẠI
        window.location.href = directProxyLink;
        
        // Xóa nội dung ô nhập
        urlInput.value = '';
    }

    
    // --- 2. LOGIC CHO 3 NÚT CỨNG TRUY CẬP NHANH (MÔ PHỎNG NÚT CHÍNH) ---
    // Gán Event Listener cho 3 nút truy cập nhanh
    quickLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Ngăn chặn hành vi mặc định của thẻ <a> (ngăn chặn mở tab mới lỗi)
            event.preventDefault(); 
            
            // Lấy URL từ thuộc tính data-url
            const targetUrl = link.getAttribute('data-url');
            
            // 1. Đặt URL vào ô nhập liệu chính
            urlInput.value = targetUrl;
            
            // 2. Kích hoạt logic của nút "Mở Khóa"
            handleGoButtonClick();
        });
        
        // Cần đảm bảo thuộc tính href trống (hoặc là #) để logic ngăn chặn hoạt động tốt
        link.setAttribute('href', '#');
    });
    
});
