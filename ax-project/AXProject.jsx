import { useNavigate } from 'react-router-dom';
import './AXProject.css';

function AXProject() {
  const navigate = useNavigate();

  return (
    <div className="ax-page">
      {/* Nav */}
      <nav className="ax-nav">
        <button className="ax-back-btn" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          메인으로
        </button>
        <div className="ax-nav-title">초격차 스타트업 AX 프로젝트</div>
      </nav>

      {/* Hero */}
      <section className="ax-hero">
        <div className="ax-hero-inner">
          <span className="ax-hero-tag">산업현장 AI 혁신</span>
          <h1 className="ax-hero-title">
            현장의 복잡한 문제,<br />
            <span className="ax-accent">에이전틱 AI</span>로 즉시 해결
          </h1>
          <p className="ax-hero-sub">
            건설·제조 산업현장의 수천 페이지 기술문서를 AI가 통합 분석하여<br />
            신뢰성 있는 의사결정을 지원하는 차세대 산업 AI 솔루션
          </p>
          <div className="ax-hero-badges">
            <span className="ax-badge">RAG 파이프라인</span>
            <span className="ax-badge">VARCO LLM</span>
            <span className="ax-badge">한국어 특화</span>
            <span className="ax-badge">에이전틱 AI</span>
          </div>
        </div>
        <div className="ax-hero-gradient" />
      </section>

      {/* Problem Section */}
      <section className="ax-section ax-dark">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag red">현장의 문제</span>
            <h2 className="ax-section-title">왜 지금 산업현장에<br />AI가 필요한가</h2>
          </div>

          <div className="ax-problem-grid">
            <div className="ax-problem-card">
              <div className="ax-problem-icon red-bg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="ax-problem-content">
                <h3>수천 페이지의 분산된 정보</h3>
                <p>설비 매뉴얼·도면·기술문서가 방대하고 이질적으로 분산되어 있어 현장 관리자가 복잡한 문제를 <strong>즉각적으로 해결하기 어려운 구조</strong></p>
              </div>
              <div className="ax-problem-stat">
                <span className="ax-stat-num">수천</span>
                <span className="ax-stat-label">페이지 분산</span>
              </div>
            </div>

            <div className="ax-problem-card">
              <div className="ax-problem-icon orange-bg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div className="ax-problem-content">
                <h3>산업안전의 높은 Stakes</h3>
                <p>실무 현장 맥락을 정확히 이해하지 못하면 <strong>중대한 인적·물적 피해</strong>로 직결 — 신뢰성 있는 AI 추론 체계가 필수적</p>
              </div>
              <div className="ax-problem-stat">
                <span className="ax-stat-num">0%</span>
                <span className="ax-stat-label">오류 허용치</span>
              </div>
            </div>

            <div className="ax-problem-card">
              <div className="ax-problem-icon yellow-bg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="ax-problem-content">
                <h3>단순 검색의 한계</h3>
                <p>정보 검색을 넘어 <strong>의사결정을 지원하는 에이전틱 AI</strong>가 요구됨 — 근본 원인 도출 및 최적 대응 시나리오 제시 필요</p>
              </div>
              <div className="ax-problem-stat">
                <span className="ax-stat-num">→</span>
                <span className="ax-stat-label">Agentic AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Flow Section */}
      <section className="ax-section ax-gradient">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag blue">기술 필요성</span>
            <h2 className="ax-section-title">핵심 기술 아키텍처</h2>
            <p className="ax-section-desc">비정형 다중 소스 통합부터 신뢰성 있는 응답 생성까지</p>
          </div>

          <div className="ax-tech-flow">
            <div className="ax-tech-node">
              <div className="ax-tech-icon blue-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <h3>다중 소스 통합</h3>
              <p>법령·매뉴얼·도면 등 비정형 문서를 통합 색인화</p>
            </div>

            <div className="ax-flow-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            <div className="ax-tech-node highlight">
              <div className="ax-tech-icon green-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9h6M9 12h6M9 15h4" />
                </svg>
              </div>
              <h3>RAG 파이프라인</h3>
              <p>자연어 질의에 근거 있는 응답 생성 — 핵심 기술</p>
              <span className="ax-core-badge">CORE</span>
            </div>

            <div className="ax-flow-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            <div className="ax-tech-node">
              <div className="ax-tech-icon purple-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3>상관관계 분석</h3>
              <p>인프라·관리객체·운영 프로세스 간 관계 파악으로 근본 원인 도출</p>
            </div>

            <div className="ax-flow-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            <div className="ax-tech-node">
              <div className="ax-tech-icon emerald-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>의사결정 지원</h3>
              <p>최적 대응 시나리오 제시 및 에이전틱 자율 실행</p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator Section */}
      <section className="ax-section ax-dark">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag green">기술 차별화</span>
            <h2 className="ax-section-title">범용 LLM의 한계를<br />VARCO LLM으로 극복</h2>
          </div>

          <div className="ax-diff-grid">
            <div className="ax-diff-card bad">
              <div className="ax-diff-header">
                <span className="ax-diff-label bad-label">범용 LLM</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="ax-diff-list">
                <li>한국어 법령·지침 이해도 낮음</li>
                <li>환각(Hallucination) 위험 높음</li>
                <li>산업 현장 맥락 파악 불가</li>
                <li>실무 적용에 근본적 한계</li>
              </ul>
            </div>

            <div className="ax-diff-vs">VS</div>

            <div className="ax-diff-card good">
              <div className="ax-diff-header">
                <span className="ax-diff-label good-label">NC AI · VARCO LLM</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <ul className="ax-diff-list">
                <li>한국어 특화 사전학습</li>
                <li>산업 도메인 파인튜닝</li>
                <li>근거 기반 응답 (RAG 연동)</li>
                <li>산업현장 즉시 적용 가능</li>
              </ul>
            </div>
          </div>

          <div className="ax-summary-box">
            <div className="ax-summary-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="ax-summary-text">
              <strong>NC AI의 한국어 특화 VARCO LLM 기반 에이전트로 기술 차별화</strong>
              <p>법령·매뉴얼·도면 통합 RAG + 산업현장 특화 언어모델 = 신뢰성 있는 산업 AI 솔루션</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="ax-section ax-gradient">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag purple">구현 가능한 기능</span>
            <h2 className="ax-section-title">AI가 실현하는<br />산업현장 핵심 기능</h2>
            <p className="ax-section-desc">법령·매뉴얼·현장 데이터를 바탕으로 실무에 바로 적용 가능한 지능형 기능 제공</p>
          </div>

          <div className="ax-features-grid">
            {/* 근거 기반 질의응답 */}
            <div className="ax-feature-card">
              <div className="ax-feature-icon-wrap teal-feat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  <line x1="9" y1="9" x2="15" y2="9" />
                  <line x1="9" y1="13" x2="13" y2="13" />
                </svg>
              </div>
              <div className="ax-feature-body">
                <h3 className="ax-feature-title">근거 기반 질의응답</h3>
                <p className="ax-feature-desc">법령·매뉴얼 출처를 명시하여 신뢰성 있는 응답을 제공합니다</p>
              </div>
              <div className="ax-feature-tag teal-tag">출처 명시</div>
            </div>

            {/* 문서작성 지원 */}
            <div className="ax-feature-card">
              <div className="ax-feature-icon-wrap blue-feat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <div className="ax-feature-body">
                <h3 className="ax-feature-title">문서작성 지원</h3>
                <p className="ax-feature-desc">위험성 평가·안전계획을 자동으로 생성하여 작성 시간을 단축합니다</p>
              </div>
              <div className="ax-feature-tag blue-tag">자동 생성</div>
            </div>

            {/* 기준 안내 */}
            <div className="ax-feature-card">
              <div className="ax-feature-icon-wrap amber-feat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="ax-feature-body">
                <h3 className="ax-feature-title">기준 안내</h3>
                <p className="ax-feature-desc">법적 기준·절차를 즉시 제공하여 현장 컴플라이언스를 지원합니다</p>
              </div>
              <div className="ax-feature-tag amber-tag">즉시 제공</div>
            </div>

            {/* 리스크 점검 */}
            <div className="ax-feature-card">
              <div className="ax-feature-icon-wrap red-feat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>
              <div className="ax-feature-body">
                <h3 className="ax-feature-title">리스크 점검</h3>
                <p className="ax-feature-desc">현장 상황 기반으로 잠재 위험 요소를 자동 식별·분류합니다</p>
              </div>
              <div className="ax-feature-tag red-tag">위험 식별</div>
            </div>

            {/* 진단형 응답 */}
            <div className="ax-feature-card ax-feature-card--wide">
              <div className="ax-feature-icon-wrap purple-feat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="ax-feature-body">
                <h3 className="ax-feature-title">진단형 응답</h3>
                <p className="ax-feature-desc">현장 상황을 분석하고 근본 원인을 도출하여 맞춤형 대응 방안을 제시합니다</p>
              </div>
              <div className="ax-feature-tag purple-tag">맞춤 대응</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ax-footer">
        <p>© 2026 SEIIM. 초격차 스타트업 AX 프로젝트</p>
        <button className="ax-back-link" onClick={() => navigate('/')}>← 메인페이지로 돌아가기</button>
      </footer>
    </div>
  );
}

export default AXProject;
