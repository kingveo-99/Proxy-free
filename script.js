<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Proxy Web Miễn phí</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container py-5">
  <h2 class="mb-3 text-primary">Proxy Web Miễn phí</h2>
  <p>Dán liên kết bị chặn ở Việt Nam và xem nội dung ngay lập tức.</p>

  <!-- Ô nhập URL -->
  <div class="input-group mb-3">
    <input type="text" id="blockedUrl" class="form-control" placeholder="Dán link cần mở khóa...">
    <button class="btn btn-success" id="goButton">Mở Khóa!</button>
  </div>

  <!-- Nút truy cập nhanh -->
  <div class="mb-4">
    <p><strong>Hoặc truy cập nhanh:</strong></p>
    <button class="btn btn-outline-primary me-2" onclick="openQuick('https://minghui.org/news/')">Minghui News</button>
    <button class="btn btn-outline-success me-2" onclick="openQuick('https://vn.falundafa.org/')">Falun Dafa VN</button>
    <button class="btn btn-outline-warning" onclick="openQuick('https://chanhkien.org/')">Chánh Kiến</button>
  </div>

  <!-- Kết quả -->
  <div id="resultLinks"></div>
</div>

<script>
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; 

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('blockedUrl');
    const goButton = document.getElementById('goButton');
    const resultDiv = document.getElementById('resultLinks');

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

        // Mở tab mới ngay lập tức
        window.open(directProxyLink, '_blank');
    });
});

// Hàm mở nhanh 3 site cố định
function openQuick(siteUrl) {
    const directProxyLink = `${WORKER_URL}/?url=${encodeURIComponent(siteUrl)}`;
    window.open(directProxyLink, '_blank');
}
</script>
</body>
</html>
