/**
 * Standalone HTML for the full Service Showcase page.
 * Sections: Chatbot Demo · Risk Assessment · AI Doc Gen · Reviews
 * All SVG inline, all CSS embedded — zero external dependencies.
 */
export function generateServiceShowcaseHtml(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>새임(SEIIM) - 서비스 소개</title>
<style>
/* ===== Reset ===== */
*{margin:0;padding:0;box-sizing:border-box;}
body{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans KR','Malgun Gothic',sans-serif;
  background:#fff;color:#111827;-webkit-font-smoothing:antialiased;line-height:1.5;
}
img{display:block;max-width:100%;}

/* ===== Header ===== */
.hd{background:#fff;border-bottom:1px solid #e5e7eb;padding:14px 32px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100;}
.hd-logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#00b7af,#21a69f);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:12px;}
.hd-brand{font-size:17px;font-weight:800;color:#111827;}
.hd-sub{font-size:11px;color:#9ca3af;margin-left:2px;}

/* ===== Section ===== */
.sec{padding:72px 24px;}
.sec-gray{background:#f9fafb;}
.sec-inner{max-width:1100px;margin:0 auto;}
.sec-head{text-align:center;margin-bottom:48px;}
.sec-sub{color:#00b7af;font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:8px;}
.sec-title{font-size:34px;font-weight:800;line-height:1.35;color:#111827;margin-bottom:14px;}
.sec-title .hl{color:#00b7af;}
.sec-desc{color:#6b7280;font-size:16px;line-height:1.7;max-width:520px;margin:0 auto;}

/* ===== Phone Mockup ===== */
.phone{width:260px;flex-shrink:0;}
.phone-frame{border-radius:36px;border:5px solid #1f2937;background:#1f2937;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,0.13);}
.phone-notch{background:#1f2937;height:22px;display:flex;align-items:center;justify-content:center;}
.phone-notch-i{width:60px;height:16px;background:#111827;border-radius:0 0 12px 12px;}
.phone-status{background:#fff;padding:5px 16px;display:flex;align-items:center;justify-content:space-between;font-size:9px;color:#6b7280;font-weight:600;}
.phone-chatheader{background:#fff;border-bottom:1px solid #f3f4f6;padding:8px 12px;display:flex;align-items:center;gap:8px;}
.phone-avatar{width:28px;height:28px;border-radius:50%;overflow:hidden;flex-shrink:0;}
.phone-name{font-size:12px;font-weight:700;color:#111827;}
.phone-online{font-size:9px;color:#21a69f;}
.phone-chat{height:300px;overflow-y:auto;background:#f9fafb;padding:10px;display:flex;flex-direction:column;gap:8px;}
.phone-input{background:#fff;border-top:1px solid #f3f4f6;padding:8px 10px;display:flex;align-items:center;gap:6px;}
.phone-input-box{flex:1;font-size:11px;padding:7px 12px;background:#f9fafb;border-radius:20px;border:1px solid #e5e7eb;color:#9ca3af;}
.phone-send{width:28px;height:28px;border-radius:50%;background:#00b7af;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;}
.phone-bottom{background:#fff;height:14px;display:flex;align-items:center;justify-content:center;}
.phone-home{width:72px;height:4px;background:#d1d5db;border-radius:99px;}

/* ===== Chat Bubbles ===== */
.chat-row{display:flex;gap:6px;align-items:flex-start;}
.chat-row.user{justify-content:flex-end;}
.chat-avatar{width:22px;height:22px;border-radius:50%;overflow:hidden;flex-shrink:0;margin-top:2px;}
.chat-bubble{max-width:78%;padding:8px 11px;font-size:11px;line-height:1.55;white-space:pre-line;border-radius:14px;}
.chat-bubble.bot{background:#fff;color:#374151;border-top-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
.chat-bubble.user{background:#00b7af;color:#fff;border-top-right-radius:4px;}
.chat-bubble .attach{display:flex;align-items:center;gap:4px;}

/* ===== Feature List ===== */
.feat-list{display:flex;flex-direction:column;gap:10px;max-width:340px;}
.feat-item{display:flex;align-items:center;gap:8px;}
.feat-icon{width:20px;height:20px;border-radius:50%;background:#e6f3f3;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.feat-text{font-size:13px;color:#4b5563;}
.feat-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:#f8fbfb;border:1px solid #d3e4e3;border-radius:99px;margin-bottom:16px;}
.feat-badge-dot{width:7px;height:7px;border-radius:50%;background:#00b7af;}
.feat-badge-text{font-size:11px;font-weight:600;color:#348d89;}

/* ===== Chatbot Section Layout ===== */
.chat-layout{display:flex;align-items:center;gap:40px;flex-wrap:wrap;justify-content:center;}
.chat-left{flex:1;min-width:280px;}
.chat-left h3{font-size:26px;font-weight:800;line-height:1.4;color:#111827;margin-bottom:14px;}
.chat-left h3 .hl{color:#00b7af;}
.chat-left p.desc{font-size:14px;color:#6b7280;line-height:1.7;margin-bottom:20px;max-width:380px;}

/* ===== Admin Preview ===== */
.admin-wrap{margin-top:48px;max-width:540px;margin-left:auto;margin-right:auto;}
.admin-label{text-align:center;margin-bottom:16px;display:flex;flex-direction:column;align-items:center;gap:6px;}
.admin-label svg{color:#9ca3af;}
.admin-label span{font-size:12px;font-weight:600;color:#6b7280;}

/* ===== Browser Frame ===== */
.browser{border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08);border:1px solid #e5e7eb;background:#fff;}
.browser-bar{background:#f3f4f6;border-bottom:1px solid #e5e7eb;padding:8px 14px;display:flex;align-items:center;gap:8px;}
.browser-dots{display:flex;gap:5px;}
.browser-dot{width:10px;height:10px;border-radius:50%;}
.browser-dot.r{background:#f87171;}.browser-dot.y{background:#fbbf24;}.browser-dot.g{background:#4ade80;}
.browser-url{flex:1;margin:0 10px;background:#fff;border-radius:5px;padding:4px 10px;font-size:9px;color:#9ca3af;text-align:center;border:1px solid #e5e7eb;}
.browser-body{display:flex;min-height:300px;}

/* ===== Sidebar ===== */
.sidebar{width:120px;background:#111827;padding:10px 6px;flex-shrink:0;}
.sidebar-logo{display:flex;align-items:center;gap:6px;padding:4px 6px;margin-bottom:12px;}
.sidebar-logo-icon{width:22px;height:22px;border-radius:50%;background:#00b7af;display:flex;align-items:center;justify-content:center;color:#fff;font-size:7px;font-weight:800;}
.sidebar-logo-text{color:#fff;font-size:9px;font-weight:700;}
.sidebar-item{padding:5px 8px;border-radius:6px;font-size:9px;margin-bottom:2px;color:#6b7280;cursor:default;}
.sidebar-item.active{background:#21a69f;color:#fff;font-weight:600;}

/* ===== Admin Main ===== */
.admin-main{flex:1;padding:14px;}
.admin-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.admin-title{font-size:12px;font-weight:700;color:#111827;}
.admin-btn{display:flex;align-items:center;gap:4px;padding:4px 10px;background:#00b7af;color:#fff;font-size:9px;font-weight:600;border-radius:5px;border:none;cursor:pointer;}
.admin-meta{display:flex;gap:10px;font-size:9px;color:#9ca3af;margin-bottom:10px;}

/* ===== Table ===== */
.tbl{width:100%;border-collapse:collapse;font-size:10px;}
.tbl th{background:#f9fafb;padding:7px 8px;text-align:left;border-bottom:1px solid #e5e7eb;font-weight:600;color:#4b5563;}
.tbl td{padding:7px 8px;border-bottom:1px solid #f3f4f6;color:#374151;}
.tbl td.label{color:#6b7280;font-weight:600;background:#fafafa;width:80px;}
.tbl .center{text-align:center;}
.badge-done{display:inline-flex;align-items:center;padding:2px 8px;background:#f0fdf4;color:#15803d;font-size:9px;font-weight:600;border-radius:99px;border:1px solid #bbf7d0;}
.badge-ai{font-size:9px;color:#9ca3af;margin-left:8px;}

/* ===== Risk Assessment ===== */
.risk-combos{display:flex;gap:10px;margin-bottom:14px;}
.risk-combo{flex:1;display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border:1px solid #e5e7eb;border-radius:8px;font-size:11px;background:#fff;}
.risk-combo .val{color:#111827;font-weight:600;}
.risk-combo .placeholder{color:#9ca3af;}
.risk-combo svg{color:#9ca3af;}
.risk-badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:99px;font-size:9px;font-weight:700;}
.risk-badge.high{background:#fee2e2;color:#b91c1c;}
.risk-badge.mid{background:#fef9c3;color:#a16207;}
.risk-badge.low{background:#dcfce7;color:#15803d;}
.risk-status{margin-top:10px;display:flex;align-items:center;gap:6px;}

/* ===== AI Doc Gen ===== */
.aidoc-flow{display:flex;align-items:center;gap:28px;margin-bottom:40px;justify-content:center;flex-wrap:wrap;}
.aidoc-phone{flex-shrink:0;text-align:center;}
.aidoc-phone-frame{width:180px;border-radius:24px;border:4px solid #1f2937;background:#1f2937;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,0.12);}
.aidoc-phone-notch{background:#1f2937;height:16px;display:flex;align-items:center;justify-content:center;}
.aidoc-phone-notch-i{width:44px;height:12px;background:#111827;border-radius:0 0 10px 10px;}
.aidoc-phone-bottom{background:#111827;height:12px;display:flex;align-items:center;justify-content:center;}
.aidoc-phone-home{width:48px;height:3px;background:#4b5563;border-radius:99px;}
.aidoc-phone-label{margin-top:12px;}
.aidoc-phone-label p:first-child{font-size:12px;font-weight:700;color:#374151;}
.aidoc-phone-label p:last-child{font-size:10px;color:#9ca3af;margin-top:2px;}

.aidoc-arrow{display:flex;flex-direction:column;align-items:center;gap:8px;flex-shrink:0;}
.aidoc-ai-badge{position:relative;width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,#00b7af,#21a69f);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,183,175,0.25);}
.aidoc-ai-ring{position:absolute;inset:-5px;border-radius:19px;border:2px solid rgba(0,183,175,0.3);animation:pulse-ring 2s ease-in-out infinite;}
@keyframes pulse-ring{0%,100%{opacity:.3;transform:scale(1);}50%{opacity:0;transform:scale(1.15);}}
.aidoc-ai-label{font-size:11px;font-weight:700;color:#00b7af;letter-spacing:1px;}
.aidoc-arrow-line{width:2px;height:16px;background:linear-gradient(to bottom,#00b7af,#99e2df);}

.aidoc-docs{display:flex;gap:14px;flex:1;min-width:0;flex-wrap:wrap;justify-content:center;}
.doc-card{flex:1;min-width:180px;max-width:280px;background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 3px 16px rgba(0,0,0,0.04);}
.doc-bar{height:4px;}
.doc-bar.red{background:linear-gradient(to right,#ef4444,#fb923c);}
.doc-bar.blue{background:linear-gradient(to right,#3b82f6,#22d3ee);}
.doc-bar.mint{background:linear-gradient(to right,#00b7af,#4ade80);}
.doc-body{padding:14px;}
.doc-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
.doc-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.doc-icon.red{background:#fee2e2;color:#dc2626;}
.doc-icon.blue{background:#dbeafe;color:#2563eb;}
.doc-icon.mint{background:#e6f3f3;color:#21a69f;}
.doc-dtitle{font-size:13px;font-weight:700;color:#111827;}
.doc-rows{display:flex;flex-direction:column;gap:5px;}
.doc-row{display:flex;align-items:center;gap:7px;font-size:10px;padding:6px 8px;background:#f9fafb;border-radius:7px;}
.doc-row-label{color:#9ca3af;font-weight:600;min-width:65px;flex-shrink:0;}
.doc-row-value{color:#374151;font-weight:600;flex:1;}
.doc-check{width:14px;height:14px;border-radius:3px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;}
.doc-check.on{background:#3b82f6;border:1.5px solid #3b82f6;}
.doc-check.off{background:#fff;border:1.5px solid #d1d5db;}
.doc-row-text{color:#374151;font-weight:600;flex:1;}
.doc-lang{display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;background:#374151;border-radius:3px;padding:2px 5px;min-width:24px;flex-shrink:0;}
.doc-ai-tag{margin-top:10px;display:flex;align-items:center;gap:5px;}
.doc-ai-dot{width:5px;height:5px;border-radius:50%;background:#22c55e;animation:blink 2s ease-in-out infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:.3;}}
.doc-ai-text{font-size:9px;color:#9ca3af;font-weight:600;}

/* ===== CTA ===== */
.cta{text-align:center;margin-top:32px;}
.cta-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:#111827;color:#fff;font-size:14px;font-weight:700;border-radius:14px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.1);}
.cta-btn:hover{background:#1f2937;}
.cta-sub{margin-top:10px;font-size:12px;color:#9ca3af;}

/* ===== Reviews ===== */
.reviews{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;}
.review-card{flex:1;min-width:260px;max-width:340px;background:#fff;border-radius:14px;padding:24px;border:1px solid #f3f4f6;box-shadow:0 2px 10px rgba(0,0,0,0.03);}
.review-stars{display:flex;gap:2px;margin-bottom:14px;font-size:14px;color:#f59e0b;}
.review-text{font-size:13px;line-height:1.7;color:#4b5563;margin-bottom:18px;}
.review-author{display:flex;align-items:center;gap:10px;padding-top:14px;border-top:1px solid #f3f4f6;}
.review-avatar{width:36px;height:36px;border-radius:50%;background:#e6f3f3;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#348d89;}
.review-name{font-size:13px;font-weight:600;color:#111827;}
.review-role{font-size:11px;color:#9ca3af;}

/* ===== Footer ===== */
.ft{text-align:center;padding:28px 0;border-top:1px solid #e5e7eb;margin-top:0;}
.ft p{font-size:11px;color:#9ca3af;line-height:1.8;}

/* ===== Responsive ===== */
@media(max-width:768px){
  .sec{padding:48px 16px;}
  .sec-title{font-size:26px;}
  .chat-layout{flex-direction:column;}
  .chat-left{text-align:center;min-width:auto;}
  .chat-left h3{font-size:22px;}
  .feat-list{margin:0 auto;}
  .aidoc-flow{flex-direction:column;gap:20px;}
  .aidoc-arrow{flex-direction:row;}
  .aidoc-arrow-line{width:16px;height:2px;background:linear-gradient(to right,#00b7af,#99e2df);}
  .aidoc-docs{flex-direction:column;align-items:center;}
  .doc-card{max-width:100%;min-width:auto;width:100%;}
  .reviews{flex-direction:column;align-items:center;}
  .review-card{max-width:100%;min-width:auto;width:100%;}
  .risk-combos{flex-direction:column;}
  .browser-body{flex-direction:column;}
  .sidebar{width:100%;display:flex;gap:4px;padding:6px;flex-wrap:wrap;}
  .sidebar-logo{display:none;}
}
</style>
</head>
<body>

<!-- ==================== Header ==================== -->
<div class="hd">
  <div class="hd-logo">SB</div>
  <span class="hd-brand">SEIIM</span>
  <span class="hd-sub">SafeBuddy &middot; 서비스 소개</span>
</div>

<!-- ============================================================
     Section 1: 원스톱 안전관리 서비스 (Chatbot Demo)
     ============================================================ -->
<div class="sec">
  <div class="sec-inner">
    <div class="sec-head">
      <p class="sec-sub">Service</p>
      <h2 class="sec-title">원스톱 안전관리 서비스</h2>
      <p class="sec-desc">위험성 평가부터 안전교육까지, 모든 안전관리 업무를 하나의 플랫폼에서 관리하세요.</p>
    </div>

    <div class="chat-layout">
      <!-- Left: Description -->
      <div class="chat-left">
        <div class="feat-badge">
          <span class="feat-badge-dot"></span>
          <span class="feat-badge-text">AI 챗봇 체험</span>
        </div>
        <h3>AI 챗봇으로<br><span class="hl">3분 만에</span> 문서 완성</h3>
        <p class="desc">세이프버디 챗봇이 질문하고, 답변을 선택하면<br>신규채용자 관리대장이 자동으로 작성됩니다.</p>
        <div class="feat-list">
          <div class="feat-item">
            <div class="feat-icon">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#00b7af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="feat-text">추천 답변을 선택하거나 직접 입력</span>
          </div>
          <div class="feat-item">
            <div class="feat-icon">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#00b7af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="feat-text">모든 단계 완료 시 문서 자동 생성</span>
          </div>
          <div class="feat-item">
            <div class="feat-icon">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#00b7af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="feat-text">관리자 페이지에서 출력까지</span>
          </div>
        </div>
      </div>

      <!-- Right: Phone Mockup -->
      <div class="phone">
        <div class="phone-frame">
          <div class="phone-notch"><div class="phone-notch-i"></div></div>
          <div class="phone-status"><span>9:41</span><span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><rect x="0" y="0" width="12" height="8" rx="1.5" stroke="#6b7280" stroke-width="1"/><rect x="1.5" y="1.5" width="9" height="5" rx="0.5" fill="#6b7280"/><rect x="12.5" y="2" width="1.5" height="4" rx="0.5" fill="#6b7280"/></svg>
          </span></div>
          <div class="phone-chatheader">
            <div class="phone-avatar">
              <svg viewBox="0 0 28 28" width="28" height="28"><circle cx="14" cy="14" r="14" fill="#e6f3f3"/><text x="14" y="18" text-anchor="middle" fill="#00b7af" font-weight="bold" font-size="9" font-family="sans-serif">SB</text></svg>
            </div>
            <div><div class="phone-name">세이프버디</div><div class="phone-online">온라인</div></div>
          </div>
          <div class="phone-chat">
            <!-- Bot -->
            <div class="chat-row">
              <div class="chat-avatar"><svg viewBox="0 0 22 22" width="22" height="22"><circle cx="11" cy="11" r="11" fill="#e6f3f3"/><text x="11" y="15" text-anchor="middle" fill="#00b7af" font-weight="bold" font-size="7" font-family="sans-serif">SB</text></svg></div>
              <div class="chat-bubble bot">안녕하세요! 홍길동님 👋
신규채용자 관리대장을 작성해볼까요?</div>
            </div>
            <!-- User -->
            <div class="chat-row user"><div class="chat-bubble user">네, 시작할게요!</div></div>
            <!-- Bot -->
            <div class="chat-row">
              <div class="chat-avatar"><svg viewBox="0 0 22 22" width="22" height="22"><circle cx="11" cy="11" r="11" fill="#e6f3f3"/><text x="11" y="15" text-anchor="middle" fill="#00b7af" font-weight="bold" font-size="7" font-family="sans-serif">SB</text></svg></div>
              <div class="chat-bubble bot">직종 및 건설장비를 선택해주세요.</div>
            </div>
            <!-- User -->
            <div class="chat-row user"><div class="chat-bubble user">건설기계 운전</div></div>
            <!-- Bot -->
            <div class="chat-row">
              <div class="chat-avatar"><svg viewBox="0 0 22 22" width="22" height="22"><circle cx="11" cy="11" r="11" fill="#e6f3f3"/><text x="11" y="15" text-anchor="middle" fill="#00b7af" font-weight="bold" font-size="7" font-family="sans-serif">SB</text></svg></div>
              <div class="chat-bubble bot">안전보호구 지급현황을 선택해주세요.</div>
            </div>
            <!-- User -->
            <div class="chat-row user"><div class="chat-bubble user">안전모, 안전화, 안전대, 보호장갑</div></div>
            <!-- Bot -->
            <div class="chat-row">
              <div class="chat-avatar"><svg viewBox="0 0 22 22" width="22" height="22"><circle cx="11" cy="11" r="11" fill="#e6f3f3"/><text x="11" y="15" text-anchor="middle" fill="#00b7af" font-weight="bold" font-size="7" font-family="sans-serif">SB</text></svg></div>
              <div class="chat-bubble bot">모든 항목이 입력되었습니다! ✅
관리자 페이지에서 확인해보세요.</div>
            </div>
          </div>
          <div class="phone-input">
            <div class="phone-input-box">메시지를 입력하세요</div>
            <div class="phone-send">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </div>
          </div>
          <div class="phone-bottom"><div class="phone-home"></div></div>
        </div>
      </div>
    </div>

    <!-- Admin Preview -->
    <div class="admin-wrap">
      <div class="admin-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        <span>챗봇 완료 시 관리자 페이지에 자동 반영</span>
      </div>
      <div class="browser">
        <div class="browser-bar">
          <div class="browser-dots"><div class="browser-dot r"></div><div class="browser-dot y"></div><div class="browser-dot g"></div></div>
          <div class="browser-url">safebuddy.co.kr/admin</div>
        </div>
        <div class="browser-body">
          <div class="sidebar">
            <div class="sidebar-logo"><div class="sidebar-logo-icon">SB</div><div class="sidebar-logo-text">SafeBuddy</div></div>
            <div class="sidebar-item">대시보드</div>
            <div class="sidebar-item">위험성평가</div>
            <div class="sidebar-item">안전교육</div>
            <div class="sidebar-item">점검관리</div>
            <div class="sidebar-item">안전활동</div>
            <div class="sidebar-item active">근로자관리</div>
          </div>
          <div class="admin-main">
            <div class="admin-header">
              <span class="admin-title">신규채용자 관리대장</span>
              <button class="admin-btn">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                출력하기
              </button>
            </div>
            <div class="admin-meta"><span>작성일: 2025.01.15</span><span>작성자: 홍길동</span></div>
            <table class="tbl">
              <thead><tr><th style="width:80px;">항목</th><th>내용</th></tr></thead>
              <tbody>
                <tr><td class="label">성명</td><td>홍길동</td></tr>
                <tr><td class="label">직종</td><td>건설기계 운전</td></tr>
                <tr><td class="label">안전보호구</td><td>안전모, 안전화, 안전대, 보호장갑</td></tr>
                <tr><td class="label">혈액형</td><td>A형</td></tr>
                <tr><td class="label">비상연락망</td><td>010-*990-1019</td></tr>
                <tr><td class="label">교육증 첨부</td><td>이수증 첨부완료</td></tr>
              </tbody>
            </table>
            <div style="margin-top:10px;display:flex;align-items:center;gap:6px;">
              <span class="badge-done">작성완료</span>
              <span class="badge-ai">AI 자동작성</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ============================================================
     Section 2: 위험성평가 자동화 (Risk Assessment)
     ============================================================ -->
<div class="sec sec-gray">
  <div class="sec-inner">
    <div class="sec-head">
      <p class="sec-sub">Risk Assessment</p>
      <h2 class="sec-title">위험성평가 자동화</h2>
      <p class="sec-desc">업종과 작업을 선택하면, AI가 위험성평가표를 자동으로 생성합니다.</p>
    </div>

    <div style="max-width:900px;margin:0 auto;">
      <div class="browser">
        <div class="browser-bar">
          <div class="browser-dots"><div class="browser-dot r"></div><div class="browser-dot y"></div><div class="browser-dot g"></div></div>
          <div class="browser-url">safebuddy.co.kr/admin/risk-assessment</div>
        </div>
        <div class="browser-body">
          <div class="sidebar">
            <div class="sidebar-logo"><div class="sidebar-logo-icon">SB</div><div class="sidebar-logo-text">SafeBuddy</div></div>
            <div class="sidebar-item">대시보드</div>
            <div class="sidebar-item active">위험성평가</div>
            <div class="sidebar-item">안전교육</div>
            <div class="sidebar-item">점검관리</div>
            <div class="sidebar-item">안전활동</div>
            <div class="sidebar-item">근로자관리</div>
          </div>
          <div class="admin-main">
            <div class="admin-header">
              <span class="admin-title">위험성평가표</span>
              <button class="admin-btn">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                문서출력
              </button>
            </div>
            <div class="risk-combos">
              <div class="risk-combo"><span class="val">건설공사</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </div>
              <div class="risk-combo"><span class="val">고소작업(비계)</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
            <table class="tbl">
              <thead>
                <tr>
                  <th class="center" style="width:28px;">#</th>
                  <th>유해위험요인</th>
                  <th>현재안전조치</th>
                  <th class="center" style="width:90px;">위험도</th>
                  <th>개선대책</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="center" style="color:#9ca3af;">1</td>
                  <td style="font-weight:600;">비계 상부 추락</td>
                  <td>안전대 착용</td>
                  <td class="center"><span class="risk-badge high">상 (3&times;5)</span></td>
                  <td>안전난간 설치 및 추락방지망 보강</td>
                </tr>
                <tr>
                  <td class="center" style="color:#9ca3af;">2</td>
                  <td style="font-weight:600;">자재 낙하</td>
                  <td>안전모 착용</td>
                  <td class="center"><span class="risk-badge high">상 (4&times;4)</span></td>
                  <td>낙하물 방지망 설치 및 자재 고정</td>
                </tr>
                <tr>
                  <td class="center" style="color:#9ca3af;">3</td>
                  <td style="font-weight:600;">비계 붕괴</td>
                  <td>정기 점검 실시</td>
                  <td class="center"><span class="risk-badge mid">중 (2&times;5)</span></td>
                  <td>구조검토서 기반 설치 및 전문가 점검</td>
                </tr>
              </tbody>
            </table>
            <div class="risk-status">
              <span class="badge-done">평가완료</span>
              <span class="badge-ai">AI 자동생성 &middot; 3건</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ============================================================
     Section 3: AI 문서 자동생성
     ============================================================ -->
<div class="sec">
  <div class="sec-inner">
    <div class="sec-head">
      <p class="sec-sub">AI Document</p>
      <h2 class="sec-title">사진 한 장으로<br><span class="hl">3종 문서</span>를 자동 생성</h2>
      <p class="sec-desc">현장 사진을 업로드하면 AI가 위험성평가, 점검 체크리스트, 다국어 TBM 교육자료를 한번에 생성합니다.</p>
    </div>

    <div class="aidoc-flow">
      <!-- Phone -->
      <div class="aidoc-phone">
        <div class="aidoc-phone-frame">
          <div class="aidoc-phone-notch"><div class="aidoc-phone-notch-i"></div></div>
          <svg viewBox="0 0 220 250" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block;">
            <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#bae6fd"/></linearGradient></defs>
            <rect width="220" height="250" fill="url(#sky)"/>
            <circle cx="175" cy="38" r="18" fill="#fde047" opacity=".9"/><circle cx="175" cy="38" r="26" fill="#fde047" opacity=".15"/>
            <ellipse cx="42" cy="48" rx="22" ry="7" fill="white" opacity=".7"/><ellipse cx="56" cy="43" rx="14" ry="5" fill="white" opacity=".6"/>
            <rect x="88" y="42" width="5" height="145" fill="#ca8a04"/><rect x="56" y="42" width="86" height="5" fill="#ca8a04"/>
            <rect x="86" y="36" width="9" height="6" fill="#eab308" rx="1"/><line x1="140" y1="47" x2="140" y2="105" stroke="#6b7280" stroke-width="1.5"/>
            <rect x="8" y="172" width="40" height="68" fill="#6b7280" rx="2"/>
            <rect x="15" y="179" width="5" height="4" fill="#fef08a" opacity=".5" rx=".5"/><rect x="24" y="179" width="5" height="4" fill="#fef08a" opacity=".6" rx=".5"/><rect x="33" y="179" width="5" height="4" fill="#fef08a" opacity=".4" rx=".5"/>
            <rect x="15" y="188" width="5" height="4" fill="#fef08a" opacity=".6" rx=".5"/><rect x="24" y="188" width="5" height="4" fill="#fef08a" opacity=".5" rx=".5"/><rect x="33" y="188" width="5" height="4" fill="#fef08a" opacity=".6" rx=".5"/>
            <rect x="53" y="138" width="46" height="102" fill="#4b5563" rx="2"/>
            <rect x="60" y="146" width="6" height="4" fill="#fef08a" opacity=".5" rx=".5"/><rect x="70" y="146" width="6" height="4" fill="#fef08a" opacity=".6" rx=".5"/><rect x="80" y="146" width="6" height="4" fill="#fef08a" opacity=".4" rx=".5"/>
            <rect x="60" y="155" width="6" height="4" fill="#fef08a" opacity=".6" rx=".5"/><rect x="70" y="155" width="6" height="4" fill="#fef08a" opacity=".5" rx=".5"/><rect x="80" y="155" width="6" height="4" fill="#fef08a" opacity=".6" rx=".5"/>
            <rect x="104" y="156" width="50" height="84" fill="#92400e" opacity=".8" rx="2"/>
            <rect x="111" y="164" width="5" height="4" fill="#fef08a" opacity=".4" rx=".5"/><rect x="121" y="164" width="5" height="4" fill="#fef08a" opacity=".5" rx=".5"/><rect x="131" y="164" width="5" height="4" fill="#fef08a" opacity=".4" rx=".5"/><rect x="141" y="164" width="5" height="4" fill="#fef08a" opacity=".5" rx=".5"/>
            <rect x="111" y="173" width="5" height="4" fill="#fef08a" opacity=".5" rx=".5"/><rect x="121" y="173" width="5" height="4" fill="#fef08a" opacity=".4" rx=".5"/><rect x="131" y="173" width="5" height="4" fill="#fef08a" opacity=".5" rx=".5"/><rect x="141" y="173" width="5" height="4" fill="#fef08a" opacity=".4" rx=".5"/>
            <rect x="160" y="190" width="40" height="50" fill="#9ca3af" rx="2"/>
            <rect x="167" y="198" width="5" height="4" fill="#fef08a" opacity=".5" rx=".5"/><rect x="177" y="198" width="5" height="4" fill="#fef08a" opacity=".6" rx=".5"/><rect x="187" y="198" width="5" height="4" fill="#fef08a" opacity=".4" rx=".5"/>
            <rect x="0" y="228" width="220" height="10" fill="#92400e" opacity=".4"/>
            <rect x="0" y="238" width="220" height="12" fill="#78716c" opacity=".2"/>
            <rect x="10" y="10" width="200" height="230" fill="none" stroke="white" stroke-width="2" rx="8" opacity=".35"/>
            <path d="M10 30 L10 10 L30 10" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M190 10 L210 10 L210 30" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M10 220 L10 240 L30 240" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M190 240 L210 240 L210 220" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <circle cx="110" cy="225" r="12" fill="none" stroke="white" stroke-width="2.5" opacity=".8"/>
            <circle cx="110" cy="225" r="8" fill="white" opacity=".9"/>
          </svg>
          <div class="aidoc-phone-bottom"><div class="aidoc-phone-home"></div></div>
        </div>
        <div class="aidoc-phone-label"><p>현장 사진 촬영</p><p>스마트폰으로 촬영 후 업로드</p></div>
      </div>

      <!-- AI Arrow -->
      <div class="aidoc-arrow">
        <div class="aidoc-ai-badge">
          <div class="aidoc-ai-ring"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/></svg>
        </div>
        <span class="aidoc-ai-label">AI 분석</span>
        <div class="aidoc-arrow-line"></div>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#00b7af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <!-- Document Cards -->
      <div class="aidoc-docs">
        <!-- Card 1 -->
        <div class="doc-card">
          <div class="doc-bar red"></div>
          <div class="doc-body">
            <div class="doc-header">
              <div class="doc-icon red">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>
              </div>
              <span class="doc-dtitle">위험성평가문서</span>
            </div>
            <div class="doc-rows">
              <div class="doc-row"><span class="doc-row-label">유해위험요인</span><span class="doc-row-value">비계 상부 추락</span></div>
              <div class="doc-row"><span class="doc-row-label">현재안전조치</span><span class="doc-row-value">안전대 착용</span></div>
              <div class="doc-row"><span class="doc-row-label">위험도</span><span class="doc-row-value">상 (3&times;5)</span></div>
              <div class="doc-row"><span class="doc-row-label">개선대책</span><span class="doc-row-value">안전난간 설치</span></div>
            </div>
            <div class="doc-ai-tag"><div class="doc-ai-dot"></div><span class="doc-ai-text">AI 자동생성</span></div>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="doc-card">
          <div class="doc-bar blue"></div>
          <div class="doc-body">
            <div class="doc-header">
              <div class="doc-icon blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              </div>
              <span class="doc-dtitle">점검 체크리스트</span>
            </div>
            <div class="doc-rows">
              <div class="doc-row">
                <span class="doc-check on"><svg width="8" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span class="doc-row-text">안전난간 설치 상태</span>
              </div>
              <div class="doc-row">
                <span class="doc-check on"><svg width="8" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span class="doc-row-text">안전모 착용 여부</span>
              </div>
              <div class="doc-row">
                <span class="doc-check on"><svg width="8" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span class="doc-row-text">작업발판 고정 상태</span>
              </div>
              <div class="doc-row">
                <span class="doc-check off"></span>
                <span class="doc-row-text">안전네트 설치 여부</span>
              </div>
            </div>
            <div class="doc-ai-tag"><div class="doc-ai-dot"></div><span class="doc-ai-text">AI 자동생성</span></div>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="doc-card">
          <div class="doc-bar mint"></div>
          <div class="doc-body">
            <div class="doc-header">
              <div class="doc-icon mint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <span class="doc-dtitle">다국어 TBM 교육자료</span>
            </div>
            <div class="doc-rows">
              <div class="doc-row"><span class="doc-lang">KO</span><span class="doc-row-text">고소작업 시 안전대 착용</span></div>
              <div class="doc-row"><span class="doc-lang">EN</span><span class="doc-row-text">Wear harness for work at height</span></div>
              <div class="doc-row"><span class="doc-lang">VN</span><span class="doc-row-text">Đeo d&acirc;y an to&agrave;n khi l&agrave;m việc tr&ecirc;n cao</span></div>
              <div class="doc-row"><span class="doc-lang">ZH</span><span class="doc-row-text">高处作业时佩戴安全带</span></div>
            </div>
            <div class="doc-ai-tag"><div class="doc-ai-dot"></div><span class="doc-ai-text">AI 자동생성</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="cta">
      <a href="https://safebuddy.co.kr" target="_blank" rel="noopener noreferrer" class="cta-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/></svg>
        AI 문서생성 체험하기
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </a>
      <p class="cta-sub">사진 한 장으로 3종 문서가 자동 생성됩니다</p>
    </div>

  </div>
</div>

<!-- ============================================================
     Section 4: 고객이 말하는 새임 (Reviews)
     ============================================================ -->
<div class="sec sec-gray">
  <div class="sec-inner">
    <div class="sec-head">
      <p class="sec-sub">Reviews</p>
      <h2 class="sec-title">고객이 말하는 새임</h2>
    </div>

    <div class="reviews">
      <!-- Review 1 -->
      <div class="review-card">
        <div class="review-stars">&starf;&starf;&starf;&starf;&starf;</div>
        <p class="review-text">&ldquo;SEIIM 도입 후 우리 팀의 생산성이 눈에 띄게 향상되었습니다. 특히 실시간 협업 기능이 원격 근무 환경에서 큰 도움이 되고 있습니다.&rdquo;</p>
        <div class="review-author">
          <div class="review-avatar">김</div>
          <div><div class="review-name">김지훈</div><div class="review-role">CTO, 테크스타트업</div></div>
        </div>
      </div>
      <!-- Review 2 -->
      <div class="review-card">
        <div class="review-stars">&starf;&starf;&starf;&starf;&starf;</div>
        <p class="review-text">&ldquo;프로젝트 관리가 이렇게 쉬울 수 있다니! 직관적인 인터페이스와 강력한 분석 도구 덕분에 업무 효율이 2배 이상 증가했습니다.&rdquo;</p>
        <div class="review-author">
          <div class="review-avatar">박</div>
          <div><div class="review-name">박서연</div><div class="review-role">프로젝트 매니저, 글로벌 IT 기업</div></div>
        </div>
      </div>
      <!-- Review 3 -->
      <div class="review-card">
        <div class="review-stars">&starf;&starf;&starf;&starf;&starf;</div>
        <p class="review-text">&ldquo;데이터 기반 의사결정이 가능해지면서 비즈니스 성과가 크게 개선되었습니다. SEIIM은 우리 회사의 디지털 전환의 핵심 파트너입니다.&rdquo;</p>
        <div class="review-author">
          <div class="review-avatar">이</div>
          <div><div class="review-name">이준호</div><div class="review-role">대표이사, 제조업</div></div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ==================== Footer ==================== -->
<div class="ft">
  <p>&copy; 2025 ㈜새임(SEIIM). All rights reserved.</p>
  <p>safebuddy.co.kr</p>
</div>

</body>
</html>`;
}

export function downloadServiceShowcaseHtml() {
  const html = generateServiceShowcaseHtml();
  const blob = new Blob(["\uFEFF" + html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "SEIIM_서비스소개.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
