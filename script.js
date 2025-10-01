// ĐỊA CHỈ WORKER CỦA BẠN ĐÃ ĐƯỢC ĐẶT Ở ĐÂY
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử HTML
    const urlInput = document.getElementById('blockedUrl');      
    const goButton = document.getElementById('goButton');        
    const quickItems = document.querySelectorAll('.quick-select-item'); // Các mục trong dropdown
    const dropdownButton = document.getElementById('quickSelectDropdown'); // Nút Dropdown
    
    // --- 1. TỰ ĐỘNG ĐIỀN LINK MẶC ĐỊNH ---
    const DEFAULT_URL = "vi.falundafa.org/"; 
    urlInput.value = DEFAULT_URL; 
    
    // --- HÀM XỬ LÝ CHUYỂN HƯỚNG CHÍNH ---
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
    }
    
    // --- 2. GÁN LOGIC VÀO NÚT CHÍNH ---
    goButton.addEventListener('click', handleGoButtonClick);

    
    // --- 3. LOGIC CHO DROP DOWN (TỰ ĐỘNG CHỌN VÀ CHUYỂN HƯỚNG) ---
    quickItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const targetUrl = item.getAttribute('data-url');
            
            // 1. Đặt URL mới vào ô nhập liệu chính
            urlInput.value = targetUrl;
            
            // 2. Tự động bấm nút "Mở Khóa"
            handleGoButtonClick(); 
        });
    });
    
    // --- PHẦN MỚI: TỰ ĐỘNG MỞ DROP DOWN KHI TẢI TRANG ---
    if (dropdownButton) {
        // Sử dụng class của Bootstrap để mở Dropdown
        dropdownButton.classList.add('show');
        const menu = dropdownButton.nextElementSibling;
        if (menu && menu.classList.contains('dropdown-menu')) {
            menu.classList.add('show');
        }
    }
    // --- KẾT THÚC PHẦN MỚI ---
    
});
