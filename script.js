<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Proxy Web Miễn Phí — Mở Khóa</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;padding:28px;background:#f6f8fa;color:#111}
  .container{max-width:900px;margin:0 auto;background:#fff;padding:24px;border-radius:8px;box-shadow:0 6px 20px rgba(10,10,10,0.06)}
  h1{margin:0 0 14px;font-size:28px;color:#1167d1}
  p.lead{margin:0 0 18px;color:#444}
  .input-row{display:flex;gap:8px}
  input[type="text"]{flex:1;padding:12px 14px;font-size:16px;border:1px solid #d7dbe0;border-radius:6px}
  button.btn{padding:10px 14px;font-size:15px;border-radius:6px;border:0;cursor:pointer}
  button.primary{background:#2e8b57;color:#fff}
  .quick{margin-top:16px;display:flex;gap:8px;flex-wrap:wrap}
  .quick button{background:#e9f4ff;border:1px solid #cfe7ff;color:#064a9e}
  .quick button.success{background:#eaf6ed;border:1px solid #cfead2;color:#176b2f}
  .quick button.warn{background:#fff4e6;border:1px solid #ffe5b8;color:#7a4b00}
  .fallback{margin-top:16px;padding:12px;border-radius:6px;background:#fff8f0;border:1px solid #ffe5cc;color:#6b4b00;display:none}
  .small{font-size:13px;color:#666;margin-top:10px}
  .copy-btn{margin-left:8px;padding:8px 10px}
  a.link-proxy{color:#064a9e; text-decoration:underline}
</style>
</head>
<body>
  <div class="container" role="main">
    <h1>Proxy Web Miễn phí</h1>
    <p class="lead">Dán link cần mở khóa rồi bấm <strong>Mở Khóa!</strong> — hoặc dùng 3 nút truy cập nhanh bên dưới.</p>

    <div class="input-row" aria-label="form-open">
      <input id="blockedUrl" type="text" placeholder="Ví dụ: https://vn.falundafa.org/ hoặc vn.minghui.org" autocomplete="url" />
      <button id="goButton" class="btn primary" title="Mở Khóa">Mở Khóa!</button>
    </div>

    <div class="quick" aria-label="quick-access">
      <button class="quick-btn" data-site="https://minghui.org/news/" title="Minghui News">Minghui News</button>
      <button class="quick-btn success" data-site="https://vn.falundafa.org/" title="Falun Dafa VN">VN Falun Dafa</button>
      <button class="quick-btn warn" data-site="https://chanhkien.org/" title="Chánh Kiến">Chánh Kiến</button>
    </div>

    <div id="fallback" class="fallback" role="status" aria-live="polite">
      <div>Popup bị chặn. Mở thủ công:</div>
      <div style="margin-top:8px;">
        <a id="fallbackLink" href="#" class="link-proxy" target="_blank" rel="noopener noreferrer"></a>
        <button id="copyBtn" class="btn copy-btn" title="Sao chép liên kết">Sao chép</button>
        <button id="openHereBtn" class="btn copy-btn" title="Mở liên kết trong tab hiện tại">Mở ở tab này</button>
      </div>
      <div class="small">Nếu muốn, bạn có thể sao chép và dán vào TinyURL để rút gọn.</div>
    </div>

    <div class="small" style="margin-top:14px">Ghi chú: Liên kết được điều hướng qua Cloudflare Worker của bạn.</div>
  </div>

<script>
/* ====== CẤU HÌNH ====== */
const WORKER_URL = "https://proxy-free.kinglightveo3.workers.dev"; // <--- để nguyên hoặc thay nếu cần

/* ====== HỖ TRỢ ====== */
function normalizeUrl(input) {
  if (!input) return null;
  let s = input.trim();
  // nếu user paste chỉ //domain
  if (/^\/\//.test(s)) s = 'https:' + s;
  // nếu thiếu schema
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const u = new URL(s);
    // nếu path rỗng, đặt '/'
    if (!u.pathname || u.pathname === '') u.pathname = '/';
    return u.href;
  } catch (e) {
    return null;
  }
}

function buildProxyUrl(target) {
  return `${WORKER_URL}/?url=${encodeURIComponent(target)}`;
}

/* ====== LOGIC GIAO DIỆN ====== */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('blockedUrl');
  const goBtn = document.getElementById('goButton');
  const quicks = document.querySelectorAll('.quick-btn');
  const fallback = document.getElementById('fallback');
  const fallbackLink = document.getElementById('fallbackLink');
  const copyBtn = document.getElementById('copyBtn');
  const openHereBtn = document.getElementById('openHereBtn');

  function showFallback(proxyUrl) {
    fallbackLink.href = proxyUrl;
    fallbackLink.textContent = proxyUrl;
    fallback.style.display = 'block';
  }

  function hideFallback() {
    fallback.style.display = 'none';
  }

  function openProxyInNewTab(targetUrl) {
    hideFallback();
    const proxy = buildProxyUrl(targetUrl);

    // Mở tab mới bằng user click (nên được cho phép)
    const newWin = window.open(proxy, '_blank', 'noopener');

    // Nếu bị chặn (newWin === null), hiển thị fallback
    if (!newWin) {
      showFallback(proxy);
    } else {
      // Focus vào tab mới khi có thể (không bắt buộc)
      try { newWin.focus(); } catch(e){}
    }
  }

  // Nút Mở Khóa
  goBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const raw = input.value;
    const norm = normalizeUrl(raw);
    if (!norm) {
      alert('URL không hợp lệ. Vui lòng kiểm tra lại (ví dụ: vn.minghui.org hoặc https://vi.falundafa.org/).');
      input.focus();
      return;
    }
    openProxyInNewTab(norm);
  });

  // Enter trong ô input => kích hoạt mở
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goBtn.click();
    }
  });

  // Nút truy cập nhanh
  quicks.forEach(btn => {
    btn.addEventListener('click', () => {
      const site = btn.getAttribute('data-site');
      const norm = normalizeUrl(site);
      if (!norm) {
        alert('URL cố định không hợp lệ: ' + site);
        return;
      }
      openProxyInNewTab(norm);
    });
  });

  // Copy fallback
  copyBtn.addEventListener('click', async () => {
    const txt = fallbackLink.href;
    if (!txt) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(txt);
      } else {
        // fallback cũ
        const ta = document.createElement('textarea');
        ta.value = txt;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      alert('Đã sao chép liên kết proxy vào clipboard.');
    } catch (e) {
      alert('Sao chép thất bại. Hãy copy thủ công: ' + txt);
    }
  });

  // Mở ở tab hiện tại (fallback)
  openHereBtn.addEventListener('click', () => {
    const url = fallbackLink.href;
    if (!url) return;
    window.location.href = url;
  });

  // Tắt fallback khi người sửa input
  input.addEventListener('input', () => hideFallback());
});
</script>
</body>
</html>
