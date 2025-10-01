// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử HTML
    const urlInput = document.getElementById('blockedUrl');      // Ô nhập liệu
    const goButton = document.getElementById('goButton');        // Nút chính "Mở Khóa"
    const quickLinks = document.querySelectorAll('.quick-link'); // Các nút truy cập nhanh

    
    // --- HÀM XỬ LÝ CHUYỂN HƯỚNG CHÍNH ---
    // Hàm này chứa logic chuẩn hóa URL và CHUYỂN HƯỚNG tab hiện tại.
    function handleGoButtonClick() {
        let blockedUrl = urlInput.value.trim();

        if (blockedUrl === '') {
            // Nếu không có URL nào trong ô (chỉ xảy ra khi người dùng cố gắng bấm nút chính mà không nhập gì)
            alert('Vui lòng dán link cần mở khóa.');
            return;
        }
        
        // Chuẩn hóa và Fix URL (Đảm bảo độ tin cậy)
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
        
        // Xóa nội dung ô nhập sau khi chuyển hướng
        urlInput.value = '';
    }
    
    // --- 1. GÁN LOGIC VÀO NÚT CHÍNH ---
    goButton.addEventListener('click', handleGoButtonClick);

    
    // --- 2. GÁN LOGIC VÀO 3 NÚT CỨNG TRUY CẬP NHANH ---
    quickLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Ngăn chặn thẻ <a> mở link bình thường (vì chúng ta muốn mô phỏng nút chính)
            event.preventDefault(); 
            
            // Lấy URL từ thuộc tính data-url
            const targetUrl = link.getAttribute('data-url');
            
            // 1. Đặt URL vào ô nhập liệu chính (Mô phỏng thao tác dán link)
            urlInput.value = targetUrl;
            
            // 2. Kích hoạt logic của nút "Mở Khóa" (Mô phỏng thao tác click)
            handleGoButtonClick();
        });
        
        // Đảm bảo href là '#' để event.preventDefault() hoạt động hiệu quả
        link.setAttribute('href', '#');
    });
    
});
