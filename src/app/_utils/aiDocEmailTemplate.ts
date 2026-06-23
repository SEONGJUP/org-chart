/**
 * Standalone HTML template for the AI Document Generation showcase.
 * All images are inline SVG, all styles embedded — no external dependencies.
 * Can be sent as an email attachment and opened in any browser.
 */
export function generateAIDocGenHtml(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>새임(SEIIM) - AI 문서 자동생성 서비스</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans KR','Malgun Gothic',sans-serif;
  background:#f8fafb;color:#111827;-webkit-font-smoothing:antialiased;
}

/* Header */
.header{
  background:#fff;border-bottom:1px solid #e5e7eb;padding:16px 32px;
  display:flex;align-items:center;gap:12px;
}
.header-logo{
  width:36px;height:36px;border-radius:10px;
  background:linear-gradient(135deg,#00b7af,#21a69f);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-weight:800;font-size:13px;letter-spacing:0.5px;
}
.header-brand{font-size:18px;font-weight:800;color:#111827;letter-spacing:-0.3px;}
.header-sub{font-size:12px;color:#9ca3af;margin-left:4px;}

/* Wrapper */
.wrapper{max-width:1100px;margin:0 auto;padding:48px 24px 32px;}

/* Title area */
.title-area{text-align:center;margin-bottom:48px;}
.subtitle{
  color:#00b7af;font-size:13px;font-weight:700;
  letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;
}
.main-title{
  font-size:36px;font-weight:800;line-height:1.35;color:#111827;margin-bottom:16px;
}
.main-title .highlight{color:#00b7af;}
.description{
  color:#6b7280;font-size:17px;line-height:1.6;max-width:540px;margin:0 auto;
}

/* Flow layout */
.flow{
  display:flex;align-items:center;gap:32px;margin-bottom:48px;
  justify-content:center;flex-wrap:wrap;
}

/* Phone */
.phone-wrapper{flex-shrink:0;text-align:center;}
.phone-frame{
  width:200px;border-radius:28px;border:5px solid #1f2937;
  background:#1f2937;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.15);
}
.phone-notch{
  background:#1f2937;height:20px;display:flex;
  align-items:center;justify-content:center;
}
.phone-notch-inner{width:56px;height:16px;background:#111827;border-radius:0 0 12px 12px;}
.phone-screen{position:relative;width:100%;height:260px;overflow:hidden;}
.phone-bottom{
  background:#111827;height:16px;display:flex;
  align-items:center;justify-content:center;
}
.phone-home{width:64px;height:4px;background:#4b5563;border-radius:99px;}
.phone-label{margin-top:14px;}
.phone-label-title{font-size:13px;font-weight:700;color:#374151;}
.phone-label-sub{font-size:11px;color:#9ca3af;margin-top:3px;}

/* AI arrow */
.ai-arrow{
  display:flex;flex-direction:column;align-items:center;gap:10px;
  flex-shrink:0;padding:12px 0;
}
.ai-badge{
  position:relative;width:64px;height:64px;border-radius:16px;
  background:linear-gradient(135deg,#00b7af,#21a69f);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 8px 24px rgba(0,183,175,0.25);
}
.ai-badge-ring{
  position:absolute;inset:-6px;border-radius:22px;
  border:2px solid rgba(0,183,175,0.3);
  animation:pulse-ring 2s ease-in-out infinite;
}
@keyframes pulse-ring{
  0%,100%{opacity:0.3;transform:scale(1);}
  50%{opacity:0;transform:scale(1.15);}
}
.ai-label{font-size:12px;font-weight:700;color:#00b7af;letter-spacing:1px;}
.ai-arrow-line{
  width:2px;height:20px;
  background:linear-gradient(to bottom,#00b7af,#99e2df);
}

/* Documents */
.docs{display:flex;gap:16px;flex:1;min-width:0;}
.doc-card{
  flex:1;min-width:200px;background:#fff;border-radius:14px;
  border:1px solid #e5e7eb;overflow:hidden;
  box-shadow:0 4px 20px rgba(0,0,0,0.05);
}
.doc-bar-red{height:5px;background:linear-gradient(to right,#ef4444,#fb923c);}
.doc-bar-blue{height:5px;background:linear-gradient(to right,#3b82f6,#22d3ee);}
.doc-bar-mint{height:5px;background:linear-gradient(to right,#00b7af,#4ade80);}
.doc-body{padding:18px;}
.doc-header{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.doc-icon{
  width:34px;height:34px;border-radius:9px;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.doc-icon-red{background:#fee2e2;color:#dc2626;}
.doc-icon-blue{background:#dbeafe;color:#2563eb;}
.doc-icon-mint{background:#e6f3f3;color:#21a69f;}
.doc-title{font-size:14px;font-weight:700;color:#111827;}
.doc-rows{display:flex;flex-direction:column;gap:6px;}
.doc-row{
  display:flex;align-items:center;gap:8px;
  font-size:11px;padding:7px 10px;background:#f9fafb;border-radius:8px;
}
.doc-row-label{color:#9ca3af;font-weight:600;min-width:70px;flex-shrink:0;}
.doc-row-value{color:#374151;font-weight:600;flex:1;}
.doc-check{
  width:15px;height:15px;border-radius:3px;
  display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;
}
.doc-check-on{background:#3b82f6;border:1.5px solid #3b82f6;}
.doc-check-off{background:#fff;border:1.5px solid #d1d5db;}
.doc-row-text{color:#374151;font-weight:600;flex:1;}
.doc-lang{
  display:inline-flex;align-items:center;justify-content:center;
  font-size:10px;font-weight:700;color:#fff;background:#374151;
  border-radius:4px;padding:2px 6px;min-width:26px;flex-shrink:0;
}
.doc-ai-tag{
  margin-top:12px;display:flex;align-items:center;gap:6px;
}
.doc-ai-dot{
  width:6px;height:6px;border-radius:50%;background:#22c55e;
  animation:blink 2s ease-in-out infinite;
}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
.doc-ai-text{font-size:10px;color:#9ca3af;font-weight:600;}

/* CTA */
.cta{text-align:center;margin-top:8px;}
.cta-btn{
  display:inline-flex;align-items:center;gap:10px;
  padding:16px 36px;background:#111827;color:#fff;
  font-size:15px;font-weight:700;border-radius:16px;
  text-decoration:none;transition:all 0.2s;
  box-shadow:0 4px 16px rgba(0,0,0,0.12);
}
.cta-btn:hover{background:#1f2937;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.18);}
.cta-sub{margin-top:12px;font-size:13px;color:#9ca3af;}

/* Footer */
.footer{
  text-align:center;margin-top:48px;padding:24px 0;
  border-top:1px solid #e5e7eb;
}
.footer p{font-size:12px;color:#9ca3af;line-height:1.8;}

/* Responsive */
@media(max-width:768px){
  .flow{flex-direction:column;gap:24px;}
  .docs{flex-direction:column;}
  .main-title{font-size:28px;}
  .ai-arrow{flex-direction:row;padding:0 12px;}
  .ai-arrow-line{width:20px;height:2px;
    background:linear-gradient(to right,#00b7af,#99e2df);}
}
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <div class="header-logo">SB</div>
  <span class="header-brand">SEIIM</span>
  <span class="header-sub">SafeBuddy</span>
</div>

<div class="wrapper">
  <!-- Title -->
  <div class="title-area">
    <p class="subtitle">AI Document</p>
    <h1 class="main-title">
      사진 한 장으로<br>
      <span class="highlight">3종 문서</span>를 자동 생성
    </h1>
    <p class="description">
      현장 사진을 업로드하면 AI가 위험성평가, 점검 체크리스트,<br>
      다국어 TBM 교육자료를 한번에 생성합니다.
    </p>
  </div>

  <!-- Flow: Phone → AI → Documents -->
  <div class="flow">

    <!-- Phone -->
    <div class="phone-wrapper">
      <div class="phone-frame">
        <div class="phone-notch"><div class="phone-notch-inner"></div></div>
        <div class="phone-screen">
          <svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#bae6fd"/>
              </linearGradient>
            </defs>
            <!-- Sky -->
            <rect width="220" height="260" fill="url(#sky)"/>
            <!-- Sun -->
            <circle cx="175" cy="40" r="20" fill="#fde047" opacity="0.9"/>
            <circle cx="175" cy="40" r="28" fill="#fde047" opacity="0.15"/>
            <!-- Clouds -->
            <ellipse cx="42" cy="50" rx="24" ry="8" fill="white" opacity="0.7"/>
            <ellipse cx="58" cy="45" rx="16" ry="6" fill="white" opacity="0.6"/>
            <ellipse cx="130" cy="32" rx="20" ry="7" fill="white" opacity="0.5"/>
            <!-- Crane -->
            <rect x="88" y="45" width="5" height="150" fill="#ca8a04"/>
            <rect x="56" y="45" width="90" height="5" fill="#ca8a04"/>
            <rect x="86" y="38" width="9" height="7" fill="#eab308" rx="1"/>
            <line x1="143" y1="50" x2="143" y2="108" stroke="#6b7280" stroke-width="1.5"/>
            <rect x="138" y="106" width="10" height="8" fill="#4b5563" rx="1"/>
            <rect x="54" y="38" width="12" height="8" fill="#78716c" rx="1"/>
            <!-- Building 1 -->
            <rect x="8" y="175" width="42" height="72" fill="#6b7280" rx="2"/>
            <rect x="15" y="182" width="6" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="25" y="182" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="35" y="182" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="15" y="192" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="25" y="192" width="6" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="35" y="192" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="15" y="202" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="25" y="202" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="35" y="202" width="6" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <!-- Building 2 (tallest) -->
            <rect x="55" y="135" width="48" height="112" fill="#4b5563" rx="2"/>
            <rect x="62" y="143" width="7" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="73" y="143" width="7" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="84" y="143" width="7" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="62" y="153" width="7" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="73" y="153" width="7" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="84" y="153" width="7" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="62" y="163" width="7" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="73" y="163" width="7" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="84" y="163" width="7" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="62" y="173" width="7" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="73" y="173" width="7" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="84" y="173" width="7" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <!-- Building 3 (brown) -->
            <rect x="108" y="160" width="52" height="87" fill="#92400e" opacity="0.8" rx="2"/>
            <rect x="115" y="168" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="125" y="168" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="135" y="168" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="145" y="168" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="115" y="178" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="125" y="178" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="135" y="178" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="145" y="178" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="115" y="188" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="125" y="188" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="135" y="188" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="145" y="188" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <!-- Building 4 -->
            <rect x="165" y="195" width="42" height="52" fill="#9ca3af" rx="2"/>
            <rect x="172" y="203" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="182" y="203" width="6" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="192" y="203" width="6" height="5" fill="#fef08a" opacity="0.4" rx="0.5"/>
            <rect x="172" y="213" width="6" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <rect x="182" y="213" width="6" height="5" fill="#fef08a" opacity="0.5" rx="0.5"/>
            <rect x="192" y="213" width="6" height="5" fill="#fef08a" opacity="0.6" rx="0.5"/>
            <!-- Scaffold -->
            <rect x="0" y="234" width="220" height="12" fill="#92400e" opacity="0.45"/>
            <line x1="15" y1="234" x2="15" y2="246" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
            <line x1="42" y1="234" x2="42" y2="246" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
            <line x1="69" y1="234" x2="69" y2="246" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
            <line x1="96" y1="234" x2="96" y2="246" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
            <line x1="123" y1="234" x2="123" y2="246" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
            <line x1="150" y1="234" x2="150" y2="246" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
            <line x1="177" y1="234" x2="177" y2="246" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
            <line x1="204" y1="234" x2="204" y2="246" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
            <!-- Ground -->
            <rect x="0" y="246" width="220" height="14" fill="#78716c" opacity="0.25"/>
            <!-- Camera viewfinder -->
            <rect x="10" y="10" width="200" height="240" fill="none" stroke="white" stroke-width="2" rx="8" opacity="0.35"/>
            <path d="M10 32 L10 10 L32 10" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M188 10 L210 10 L210 32" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M10 228 L10 250 L32 250" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M188 250 L210 250 L210 228" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <!-- Shutter button -->
            <circle cx="110" cy="235" r="14" fill="none" stroke="white" stroke-width="2.5" opacity="0.8"/>
            <circle cx="110" cy="235" r="10" fill="white" opacity="0.9"/>
          </svg>
        </div>
        <div class="phone-bottom"><div class="phone-home"></div></div>
      </div>
      <div class="phone-label">
        <p class="phone-label-title">현장 사진 촬영</p>
        <p class="phone-label-sub">스마트폰으로 촬영 후 업로드</p>
      </div>
    </div>

    <!-- AI Arrow -->
    <div class="ai-arrow">
      <div class="ai-badge">
        <div class="ai-badge-ring"></div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/>
        </svg>
      </div>
      <span class="ai-label">AI 분석</span>
      <div class="ai-arrow-line"></div>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M1 1L6 6L11 1" stroke="#00b7af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- Document Cards -->
    <div class="docs">
      <!-- Card 1: Risk Assessment -->
      <div class="doc-card">
        <div class="doc-bar-red"></div>
        <div class="doc-body">
          <div class="doc-header">
            <div class="doc-icon doc-icon-red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/>
              </svg>
            </div>
            <span class="doc-title">위험성평가문서</span>
          </div>
          <div class="doc-rows">
            <div class="doc-row">
              <span class="doc-row-label">유해위험요인</span>
              <span class="doc-row-value">비계 상부 추락</span>
            </div>
            <div class="doc-row">
              <span class="doc-row-label">현재안전조치</span>
              <span class="doc-row-value">안전대 착용</span>
            </div>
            <div class="doc-row">
              <span class="doc-row-label">위험도</span>
              <span class="doc-row-value">상 (3&times;5)</span>
            </div>
            <div class="doc-row">
              <span class="doc-row-label">개선대책</span>
              <span class="doc-row-value">안전난간 설치</span>
            </div>
          </div>
          <div class="doc-ai-tag">
            <div class="doc-ai-dot"></div>
            <span class="doc-ai-text">AI 자동생성</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Checklist -->
      <div class="doc-card">
        <div class="doc-bar-blue"></div>
        <div class="doc-body">
          <div class="doc-header">
            <div class="doc-icon doc-icon-blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <span class="doc-title">점검 체크리스트</span>
          </div>
          <div class="doc-rows">
            <div class="doc-row">
              <span class="doc-check doc-check-on">
                <svg width="9" height="9" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="doc-row-text">안전난간 설치 상태</span>
            </div>
            <div class="doc-row">
              <span class="doc-check doc-check-on">
                <svg width="9" height="9" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="doc-row-text">안전모 착용 여부</span>
            </div>
            <div class="doc-row">
              <span class="doc-check doc-check-on">
                <svg width="9" height="9" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="doc-row-text">작업발판 고정 상태</span>
            </div>
            <div class="doc-row">
              <span class="doc-check doc-check-off"></span>
              <span class="doc-row-text">안전네트 설치 여부</span>
            </div>
          </div>
          <div class="doc-ai-tag">
            <div class="doc-ai-dot"></div>
            <span class="doc-ai-text">AI 자동생성</span>
          </div>
        </div>
      </div>

      <!-- Card 3: TBM -->
      <div class="doc-card">
        <div class="doc-bar-mint"></div>
        <div class="doc-body">
          <div class="doc-header">
            <div class="doc-icon doc-icon-mint">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <span class="doc-title">다국어 TBM 교육자료</span>
          </div>
          <div class="doc-rows">
            <div class="doc-row">
              <span class="doc-lang">KO</span>
              <span class="doc-row-text">고소작업 시 안전대 착용</span>
            </div>
            <div class="doc-row">
              <span class="doc-lang">EN</span>
              <span class="doc-row-text">Wear harness for work at height</span>
            </div>
            <div class="doc-row">
              <span class="doc-lang">VN</span>
              <span class="doc-row-text">Đeo d&acirc;y an to&agrave;n khi l&agrave;m việc tr&ecirc;n cao</span>
            </div>
            <div class="doc-row">
              <span class="doc-lang">ZH</span>
              <span class="doc-row-text">高处作业时佩戴安全带</span>
            </div>
          </div>
          <div class="doc-ai-tag">
            <div class="doc-ai-dot"></div>
            <span class="doc-ai-text">AI 자동생성</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="cta">
    <a href="https://safebuddy.co.kr" target="_blank" rel="noopener noreferrer" class="cta-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/>
      </svg>
      AI 문서생성 체험하기
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
      </svg>
    </a>
    <p class="cta-sub">사진 한 장으로 3종 문서가 자동 생성됩니다</p>
  </div>
</div>

<!-- Footer -->
<div class="footer">
  <p>&copy; 2025 ㈜새임(SEIIM). All rights reserved.</p>
  <p>safebuddy.co.kr</p>
</div>

</body>
</html>`;
}

export function downloadAIDocGenHtml() {
  const html = generateAIDocGenHtml();
  const blob = new Blob(["\uFEFF" + html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "SEIIM_AI문서생성_소개.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
