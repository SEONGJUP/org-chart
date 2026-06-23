/**
 * Standalone HTML — Risk Assessment empty (pre-fill) state.
 * Shows the browser mockup with empty combo boxes and placeholder.
 */
export function generateRiskAssessmentEmptyHtml(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>새임(SEIIM) - 위험성평가 자동화</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans KR','Malgun Gothic',sans-serif;
  background:#f9fafb;color:#111827;-webkit-font-smoothing:antialiased;line-height:1.5;
}

/* Header */
.hd{background:#fff;border-bottom:1px solid #e5e7eb;padding:14px 32px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100;}
.hd-logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#00b7af,#21a69f);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:12px;}
.hd-brand{font-size:17px;font-weight:800;color:#111827;}
.hd-sub{font-size:11px;color:#9ca3af;margin-left:2px;}

/* Section */
.sec{padding:64px 24px 72px;}
.sec-inner{max-width:960px;margin:0 auto;}
.sec-head{text-align:center;margin-bottom:40px;}
.sec-sub{color:#00b7af;font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:8px;}
.sec-title{font-size:34px;font-weight:800;line-height:1.35;color:#111827;margin-bottom:14px;}
.sec-desc{color:#6b7280;font-size:16px;line-height:1.7;max-width:520px;margin:0 auto;}

/* Browser */
.browser{border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08);border:1px solid #e5e7eb;background:#fff;}
.browser-bar{background:#f3f4f6;border-bottom:1px solid #e5e7eb;padding:9px 14px;display:flex;align-items:center;gap:8px;}
.browser-dots{display:flex;gap:5px;}
.browser-dot{width:11px;height:11px;border-radius:50%;}
.browser-dot.r{background:#f87171;}.browser-dot.y{background:#fbbf24;}.browser-dot.g{background:#4ade80;}
.browser-url{flex:1;margin:0 10px;background:#fff;border-radius:6px;padding:5px 12px;font-size:10px;color:#9ca3af;text-align:center;border:1px solid #e5e7eb;}
.browser-body{display:flex;min-height:420px;}

/* Sidebar */
.sidebar{width:130px;background:#111827;padding:12px 8px;flex-shrink:0;}
.sb-logo{display:flex;align-items:center;gap:7px;padding:4px 6px;margin-bottom:14px;}
.sb-icon{width:24px;height:24px;border-radius:50%;background:#00b7af;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:800;}
.sb-text{color:#fff;font-size:10px;font-weight:700;}
.sb-item{padding:6px 8px;border-radius:6px;font-size:10px;margin-bottom:2px;color:#6b7280;cursor:default;}
.sb-item.active{background:#21a69f;color:#fff;font-weight:600;}

/* Main */
.main{flex:1;padding:18px 20px;}
.main-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.main-title{font-size:14px;font-weight:700;color:#111827;}

/* Combos */
.combos{display:flex;gap:12px;margin-bottom:20px;}
.combo{
  position:relative;flex:1;display:flex;align-items:center;justify-content:space-between;
  padding:9px 12px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:12px;background:#fff;
  transition:all .2s;
}
.combo.attention{
  border-color:#29d1c8;
  box-shadow:0 0 0 3px rgba(0,183,175,0.15);
  animation:combo-pulse 2s cubic-bezier(.4,0,.6,1) infinite;
}
@keyframes combo-pulse{
  0%{box-shadow:0 0 0 0 rgba(0,183,175,0.4);}
  70%{box-shadow:0 0 0 8px rgba(0,183,175,0);}
  100%{box-shadow:0 0 0 0 rgba(0,183,175,0);}
}
.combo .placeholder{color:#9ca3af;}
.combo svg{color:#9ca3af;}
.combo-hint{
  position:absolute;top:-24px;left:50%;transform:translateX(-50%);
  font-size:11px;font-weight:600;color:#00b7af;white-space:nowrap;
  animation:bounce-hint 2s ease-in-out infinite;
}
@keyframes bounce-hint{
  0%,100%{transform:translateX(-50%) translateY(0);}
  50%{transform:translateX(-50%) translateY(-4px);}
}
.combo.disabled{opacity:.45;cursor:not-allowed;}

/* Empty State */
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px 0;color:#9ca3af;}
.empty svg{margin-bottom:10px;opacity:.35;}
.empty p{font-size:13px;line-height:1.7;}

/* Footer */
.ft{text-align:center;padding:24px 0;border-top:1px solid #e5e7eb;}
.ft p{font-size:11px;color:#9ca3af;line-height:1.8;}

/* Responsive */
@media(max-width:768px){
  .sec-title{font-size:26px;}
  .browser-body{flex-direction:column;}
  .sidebar{width:100%;display:flex;gap:4px;padding:8px;flex-wrap:wrap;}
  .sb-logo{display:none;}
  .combos{flex-direction:column;}
}
</style>
</head>
<body>

<!-- Header -->
<div class="hd">
  <div class="hd-logo">SB</div>
  <span class="hd-brand">SEIIM</span>
  <span class="hd-sub">SafeBuddy &middot; 위험성평가</span>
</div>

<!-- Section -->
<div class="sec">
  <div class="sec-inner">
    <div class="sec-head">
      <p class="sec-sub">Risk Assessment</p>
      <h2 class="sec-title">위험성평가 자동화</h2>
      <p class="sec-desc">업종과 작업을 선택하면, AI가 위험성평가표를 자동으로 생성합니다.</p>
    </div>

    <div class="browser">
      <div class="browser-bar">
        <div class="browser-dots">
          <div class="browser-dot r"></div>
          <div class="browser-dot y"></div>
          <div class="browser-dot g"></div>
        </div>
        <div class="browser-url">safebuddy.co.kr/admin/risk-assessment</div>
      </div>

      <div class="browser-body">
        <!-- Sidebar -->
        <div class="sidebar">
          <div class="sb-logo">
            <div class="sb-icon">SB</div>
            <div class="sb-text">SafeBuddy</div>
          </div>
          <div class="sb-item">대시보드</div>
          <div class="sb-item active">위험성평가</div>
          <div class="sb-item">안전교육</div>
          <div class="sb-item">점검관리</div>
          <div class="sb-item">안전활동</div>
          <div class="sb-item">근로자관리</div>
        </div>

        <!-- Main -->
        <div class="main">
          <div class="main-header">
            <span class="main-title">위험성평가표</span>
          </div>

          <!-- Combo Boxes (empty state) -->
          <div class="combos">
            <div class="combo attention">
              <span class="combo-hint">클릭하여 업종을 선택해 보세요</span>
              <span class="placeholder">중분류 선택</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00b7af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div class="combo disabled">
              <span class="placeholder">단위작업 선택</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>

          <!-- Empty Placeholder -->
          <div class="empty">
            <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" stroke-width="2"/>
              <path d="M6 18h36" stroke="currentColor" stroke-width="2"/>
              <path d="M18 18v20" stroke="currentColor" stroke-width="2"/>
            </svg>
            <p>중분류와 단위작업을 선택하면</p>
            <p>위험성평가표가 자동으로 생성됩니다.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- Footer -->
<div class="ft">
  <p>&copy; 2025 ㈜새임(SEIIM). All rights reserved.</p>
  <p>safebuddy.co.kr</p>
</div>

</body>
</html>`;
}

export function downloadRiskAssessmentEmptyHtml() {
  const html = generateRiskAssessmentEmptyHtml();
  const blob = new Blob(["\uFEFF" + html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "SEIIM_위험성평가_작성전.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
