'use client';

import Link from 'next/link';
import { useState } from 'react';
import './AXProject.css';

const TSM_DATA = [
  {
    abbr: 'TAM', name: '국내 전체 AI 시장',
    amount: '3.9조 ~ 6.4조 원',
    notes: ['[보수] IDC CAGR 14.3% 기준', '[적극] Fortune Business CAGR 33% 기준'],
    color: 'var(--teal-600)', bg: 'rgba(20,184,166,0.08)', border: 'var(--teal-300)',
    bar: 100,
  },
  {
    abbr: 'SAM', name: '국내 산업용 AI 시장',
    amount: '1.2조 ~ 1.9조 원',
    notes: ['제조업 GDP 비중(약 30%) 적용', '예측 유지보수 · 공정 최적화 · 산업용 챗봇 등'],
    color: '#2563eb', bg: 'rgba(96,165,250,0.08)', border: '#93c5fd',
    bar: 40,
  },
  {
    abbr: 'SOM', name: '솔루션 타겟 시장',
    amount: '1,770억 ~ 2,880억 원',
    notes: ['초기 1~3년 내 산업 도메인 특화 AI Agent', '점유 목표율 15% 적용'],
    color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: '#c4b5fd',
    bar: 10,
  },
];

const CIRC = 2 * Math.PI * 44; // r=44 기준 둘레

function DonutRing({pct, color, bg}: {pct:number; color:string; bg:string}) {
  const offset = CIRC * (1 - pct / 100);
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="44" fill="none" stroke={bg} strokeWidth="12"/>
      <circle cx="55" cy="55" r="44" fill="none" stroke={color} strokeWidth="12"
        strokeDasharray={CIRC} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 55 55)"/>
    </svg>
  );
}

function TsmTabs() {
  const [tab, setTab] = useState(0);
  const tabs = [
    'A · 퍼널', 'B · 바 차트', 'C · 카드 그리드',
    'D · 도넛 링', 'E · 피라미드', 'F · 버블',
  ];
  return (
    <div className="ax-tsm-tabs-wrap">
      <div className="ax-tsm-tabs">
        {tabs.map((label, i) => (
          <button key={i} className={`ax-tsm-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>
            {label}
          </button>
        ))}
      </div>

      {/* A: 퍼널 */}
      {tab === 0 && (
        <div className="ax-tsm-design-a">
          {TSM_DATA.map((d, i) => (
            <div key={d.abbr}>
              <div className="ax-tsm-a-row" style={{maxWidth:`${100 - i*14}%`, borderColor:d.border, background:d.bg}}>
                <div className="ax-tsm-a-left">
                  <span className="ax-tsm-a-abbr" style={{color:d.color}}>{d.abbr}</span>
                  <span className="ax-tsm-a-name">{d.name}</span>
                </div>
                <div className="ax-tsm-a-right">
                  <span className="ax-tsm-a-amount" style={{color:d.color}}>약 {d.amount}</span>
                  <div className="ax-tsm-a-notes">{d.notes.map(n => <span key={n}>{n}</span>)}</div>
                </div>
              </div>
              {i < 2 && <div className="ax-tsm-a-arrow" style={{color:d.color}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="20" height="20">
                  <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                </svg>
              </div>}
            </div>
          ))}
        </div>
      )}

      {/* B: 바 차트 */}
      {tab === 1 && (
        <div className="ax-tsm-design-b">
          {TSM_DATA.map((d) => (
            <div key={d.abbr} className="ax-tsm-b-row">
              <div className="ax-tsm-b-label">
                <span className="ax-tsm-b-abbr" style={{color:d.color}}>{d.abbr}</span>
                <span className="ax-tsm-b-name">{d.name}</span>
              </div>
              <div className="ax-tsm-b-bar-wrap">
                <div className="ax-tsm-b-bar-track">
                  <div className="ax-tsm-b-bar-fill" style={{width:`${d.bar}%`, background:d.color}}/>
                </div>
                <span className="ax-tsm-b-amount" style={{color:d.color}}>약 {d.amount}</span>
              </div>
              <div className="ax-tsm-b-notes">{d.notes.map(n => <span key={n}>{n}</span>)}</div>
            </div>
          ))}
        </div>
      )}

      {/* C: 카드 그리드 */}
      {tab === 2 && (
        <div className="ax-tsm-design-c">
          {TSM_DATA.map((d, i) => (
            <div key={d.abbr} className="ax-tsm-c-card" style={{borderTopColor:d.color}}>
              <div className="ax-tsm-c-top">
                <span className="ax-tsm-c-abbr" style={{color:d.color, background:d.bg, borderColor:d.border}}>{d.abbr}</span>
                <span className="ax-tsm-c-step">0{i+1}</span>
              </div>
              <div className="ax-tsm-c-name">{d.name}</div>
              <div className="ax-tsm-c-amount" style={{color:d.color}}>약 {d.amount}</div>
              <ul className="ax-tsm-c-notes">{d.notes.map(n => <li key={n}>{n}</li>)}</ul>
            </div>
          ))}
        </div>
      )}

      {/* D: 도넛 링 */}
      {tab === 3 && (
        <div className="ax-tsm-design-d">
          {TSM_DATA.map((d) => (
            <div key={d.abbr} className="ax-tsm-d-item">
              <div className="ax-tsm-d-ring-wrap">
                <DonutRing pct={d.bar} color={d.color} bg={d.bg === 'rgba(20,184,166,0.08)' ? '#e6faf8' : d.bg === 'rgba(96,165,250,0.08)' ? '#eff6ff' : '#faf5ff'}/>
                <div className="ax-tsm-d-center">
                  <span className="ax-tsm-d-abbr" style={{color:d.color}}>{d.abbr}</span>
                  <span className="ax-tsm-d-pct" style={{color:d.color}}>{d.bar}%</span>
                </div>
              </div>
              <div className="ax-tsm-d-info">
                <div className="ax-tsm-d-name">{d.name}</div>
                <div className="ax-tsm-d-amount" style={{color:d.color}}>약 {d.amount}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* E: 피라미드 */}
      {tab === 4 && (
        <div className="ax-tsm-design-e">
          <div className="ax-tsm-e-pyramid">
            {[...TSM_DATA].reverse().map((d, i) => (
              <div key={d.abbr} className="ax-tsm-e-layer"
                style={{background:d.bg, borderColor:d.border, width:`${40 + i * 30}%`}}>
                <span className="ax-tsm-e-abbr" style={{color:d.color}}>{d.abbr}</span>
                <span className="ax-tsm-e-amount" style={{color:d.color}}>약 {d.amount}</span>
              </div>
            ))}
          </div>
          <div className="ax-tsm-e-legend">
            {TSM_DATA.map((d) => (
              <div key={d.abbr} className="ax-tsm-e-legend-item">
                <span className="ax-tsm-e-dot" style={{background:d.color}}/>
                <div>
                  <strong style={{color:d.color}}>{d.abbr}</strong> {d.name}
                  <div className="ax-tsm-e-notes">{d.notes.map(n => <span key={n}>{n}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* F: 버블 */}
      {tab === 5 && (
        <div className="ax-tsm-design-f">
          <div className="ax-tsm-f-bubbles">
            {TSM_DATA.map((d, i) => {
              const sizes = [220, 150, 90];
              return (
                <div key={d.abbr} className="ax-tsm-f-bubble-wrap">
                  <div className="ax-tsm-f-bubble" style={{
                    width:sizes[i], height:sizes[i],
                    background:d.bg, border:`2.5px solid ${d.border}`,
                  }}>
                    <span className="ax-tsm-f-abbr" style={{color:d.color}}>{d.abbr}</span>
                    <span className="ax-tsm-f-amt" style={{color:d.color}}>약 {d.amount}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="ax-tsm-f-table">
            {TSM_DATA.map((d) => (
              <div key={d.abbr} className="ax-tsm-f-row">
                <span className="ax-tsm-f-label" style={{color:d.color, borderColor:d.border, background:d.bg}}>{d.abbr}</span>
                <span className="ax-tsm-f-name">{d.name}</span>
                <div className="ax-tsm-f-notes">{d.notes.map(n => <span key={n}>{n}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AXProject() {
  return (
    <div className="ax-page">
      {/* Nav */}
      <nav className="ax-nav">
        <Link href="/" className="ax-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          메인으로
        </Link>
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

      {/* Domain Expertise Section */}
      <section className="ax-section ax-white">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag green">도메인 역량</span>
            <h2 className="ax-section-title">산업안전 전문문서를<br />AI로 기능화하다</h2>
            <p className="ax-section-desc">정확성·최신성·근거성이 요구되는 고위험 도메인, 범용 AI의 한계를 넘어</p>
          </div>

          {/* Risk Banner */}
          <div className="ax-risk-banner">
            <div className="ax-risk-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="ax-risk-text">
              <strong>잘못된 정보·문서 누락 = 안전 리스크 + 법적 리스크</strong>
              <span>산업안전 분야는 정보의 정확성·최신성·근거성이 필수 — 범용 AI만으로는 대응 불가</span>
            </div>
          </div>

          {/* 3-column capability */}
          <div className="ax-cap-grid">
            <div className="ax-cap-card">
              <div className="ax-cap-header">
                <span className="ax-cap-num">01</span>
                <h3>도메인 중요도 인지</h3>
              </div>
              <p>산업안전 정보의 정확성·최신성·근거성이 현장 안전과 법적 리스크에 직결됨을 충분히 인지하고 있음</p>
            </div>
            <div className="ax-cap-card">
              <div className="ax-cap-header">
                <span className="ax-cap-num">02</span>
                <h3>전문지식 구조화 역량</h3>
              </div>
              <p>산업안전 전문지식을 현장 활용 가능한 기능 단위로 분해·체계화할 수 있는 역량 보유</p>
            </div>
            <div className="ax-cap-card">
              <div className="ax-cap-header">
                <span className="ax-cap-num">03</span>
                <h3>전문문서 RAG 체계화</h3>
              </div>
              <p>법령·가이드·매뉴얼·점검문서·교육자료를 AI RAG 시스템으로 통합하여 고도화</p>
            </div>
          </div>

          {/* 5 Functions */}
          <div className="ax-func-label">구현 가능한 기능</div>
          <div className="ax-func-grid">
            <div className="ax-func-card">
              <div className="ax-func-icon-wrap" style={{background:'#f0fdfa', color:'#0d9488'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  <line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/>
                </svg>
              </div>
              <strong>근거 기반 질의응답</strong>
              <span>법령·매뉴얼 출처 명시</span>
            </div>
            <div className="ax-func-card">
              <div className="ax-func-icon-wrap" style={{background:'#eff6ff', color:'#2563eb'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <strong>문서작성 지원</strong>
              <span>위험성 평가·안전계획 자동 생성</span>
            </div>
            <div className="ax-func-card">
              <div className="ax-func-icon-wrap" style={{background:'#fffbeb', color:'#d97706'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <strong>기준 안내</strong>
              <span>법적 기준·절차 즉시 제공</span>
            </div>
            <div className="ax-func-card">
              <div className="ax-func-icon-wrap" style={{background:'#fef2f2', color:'#dc2626'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <strong>리스크 점검</strong>
              <span>현장 상황 기반 위험 식별</span>
            </div>
            <div className="ax-func-card">
              <div className="ax-func-icon-wrap" style={{background:'#faf5ff', color:'#7c3aed'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <strong>진단형 응답</strong>
              <span>상황 분석 후 맞춤 대응 제시</span>
            </div>
          </div>
        </div>
      </section>

      {/* Readiness Section */}
      <section className="ax-section ax-white">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag blue">AI 에이전트 준비</span>
            <h2 className="ax-section-title">안전은 산업 전반의 정보를 포함합니다</h2>
            <p className="ax-section-desc">안전 관리는 단순 문서가 아닙니다. 현장의 공정·프로세스·위험요인이 모두 안전 체계 안에 녹아 있습니다</p>
          </div>

          {/* 칩 그리드 */}
          <div className="ax-ready-chips-center">
            {[
              {label:'작업계획', icon:'📋'},
              {label:'공정 흐름', icon:'⚙️'},
              {label:'위험요인', icon:'⚠️'},
              {label:'교육이력', icon:'📚'},
              {label:'사고사례', icon:'🔍'},
              {label:'법정 서류', icon:'📄'},
              {label:'안전대책', icon:'🛡️'},
              {label:'현장 맥락', icon:'🏗️'},
            ].map(({label, icon}) => (
              <span key={label} className="ax-ready-chip">{icon} {label}</span>
            ))}
          </div>

          {/* 연결 화살표 */}
          <div className="ax-ready-connector">
            <div className="ax-ready-connector-line" />
            <div className="ax-ready-connector-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19 12 12 19 5 12"/>
              </svg>
              산업 도메인 전반을 포괄하는 안전 체계
            </div>
            <div className="ax-ready-connector-line" />
          </div>

          {/* 결론 배너 */}
          <div className="ax-ready-conclusion">
            <div className="ax-ready-conclusion-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/>
                <path d="M8 12l3 3 5-5"/>
              </svg>
            </div>
            <div>
              <h3>산업 도메인 전반의 AI 에이전트 기술개발 준비 완료</h3>
              <p>안전 솔루션 운영을 통해 축적된 도메인 이해가 곧 AI 에이전트의 학습 기반이 됩니다</p>
            </div>
          </div>

          {/* AI 기능 카드 */}
          <div className="ax-ready-ai-grid">
            {[
              {title:'도메인 특화 질의응답', desc:'산업 전문지식 반영 근거 기반 응답', tc:'var(--teal-600)'},
              {title:'법정문서 작성 지원', desc:'위험성 평가·안전계획 자동 생성', tc:'#2563eb'},
              {title:'리스크 진단', desc:'현장 상황 기반 위험 요인 자동 식별', tc:'#dc2626'},
              {title:'유사사례 예방 가이드', desc:'사고사례 기반 맞춤 예방 지침', tc:'#d97706'},
              {title:'공정별 안전조치 추천', desc:'공정 흐름 연계 단계별 안전조치', tc:'#7c3aed'},
            ].map(({title, desc, tc}) => (
              <div key={title} className="ax-ready-ai-card">
                <div className="ax-ready-ai-dot" style={{background: tc}}/>
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Market Section */}
      <section className="ax-section ax-white">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag blue">시장규모 분석</span>
            <h2 className="ax-section-title">국내 AI 시장의 성장 기회</h2>
          </div>

          {/* 시장 성장 지표 */}
          <div className="ax-market-stats">
            <div className="ax-market-stat-card">
              <div className="ax-market-stat-source">IDC · 국내 주요 기관</div>
              <div className="ax-market-stat-num">3조 4,385억 원</div>
              <div className="ax-market-stat-desc">2025년 국내 AI 시장 규모</div>
              <div className="ax-market-stat-sub">
                <span className="ax-market-grow">+12.1%</span> 전년 대비 · CAGR <strong>14.3%</strong> · 2027년 <strong>4조 4,636억 원</strong> 전망
              </div>
            </div>
            <div className="ax-market-stat-card">
              <div className="ax-market-stat-source">Fortune Business Insights</div>
              <div className="ax-market-stat-num">71억 7,000만 달러</div>
              <div className="ax-market-stat-desc">2025년 국내 AI 시장 규모 (약 10조 원)</div>
              <div className="ax-market-stat-sub">
                2032년까지 CAGR <strong>33.4%</strong> 성장 전망
              </div>
            </div>
          </div>

          <TsmTabs />
        </div>
      </section>

      {/* Expansion Section */}
      <section className="ax-section ax-white">
        <div className="ax-section-inner" style={{maxWidth:'820px'}}>
          <div className="ax-section-header">
            <span className="ax-section-tag green">산업군 확장 가능성</span>
            <h2 className="ax-section-title">하나의 AI 엔진,<br />무한한 산업 확장</h2>
            <p className="ax-section-desc">동일한 AI Agent 엔진 위에 산업별 도메인 모듈만 교체·확장</p>
          </div>

          {/* 핵심 구조 */}
          <div className="ax-exp-layout">
            {/* 좌측: 도메인 모듈 */}
            <div className="ax-exp-modules">
              <div className="ax-exp-module-label">산업별 도메인 모듈</div>
              {[
                {name:'건설업', icon:'🏗️', desc:'법정 안전서류·공정 기준', active:true},
                {name:'제조업', icon:'⚙️', desc:'설비 매뉴얼·점검 기준'},
                {name:'화학·플랜트', icon:'🧪', desc:'위험물 법제도·도면'},
                {name:'에너지', icon:'⚡', desc:'운영 프로세스·안전규정'},
                {name:'물류·유통', icon:'📦', desc:'작업 표준·리스크 체계'},
                {name:'조선·해양', icon:'🚢', desc:'선박 설비·안전 기준'},
              ].map((m) => (
                <div key={m.name} className={`ax-exp-module${m.active ? ' active' : ''}`}>
                  <span className="ax-exp-module-icon">{m.icon}</span>
                  <div>
                    <strong>{m.name}</strong>
                    <span>{m.desc}</span>
                  </div>
                  {m.active && <span className="ax-exp-active-badge">현재</span>}
                </div>
              ))}
            </div>

            {/* 중앙 화살표 */}
            <div className="ax-exp-center">
              <div className="ax-exp-arrow-track">
                <div className="ax-exp-arrow-line" />
                <div className="ax-exp-arrow-head">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </div>
              <span className="ax-exp-arrow-label">모듈 연동</span>
            </div>

            {/* 우측: AI 엔진 */}
            <div className="ax-exp-engine">
              <div className="ax-exp-engine-card">
                <div className="ax-exp-engine-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
                    <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/>
                    <path d="M12 8v4l3 3"/>
                  </svg>
                </div>
                <div className="ax-exp-engine-title">AI Agent 엔진</div>
                <div className="ax-exp-engine-desc">질의 맥락 이해 · 문서 기반 응답 생성 · 도메인 지식 검색</div>
                <div className="ax-exp-engine-tags">
                  <span>RAG</span>
                  <span>VARCO LLM</span>
                  <span>에이전틱 AI</span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 인사이트 */}
          <div className="ax-exp-insight">
            <div className="ax-exp-insight-item">
              <div className="ax-exp-insight-icon" style={{background:'rgba(20,184,166,0.1)', color:'var(--teal-600)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                  <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>
                </svg>
              </div>
              <div>
                <strong>도메인 모듈화</strong>
                <span>법제도·매뉴얼·도면·점검 기준을 산업별 모듈로 구조화</span>
              </div>
            </div>
            <div className="ax-exp-insight-divider"/>
            <div className="ax-exp-insight-item">
              <div className="ax-exp-insight-icon" style={{background:'rgba(96,165,250,0.1)', color:'#2563eb'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                  <polyline points="17 1 21 5 17 9"/>
                  <path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/>
                  <path d="M21 13v2a4 4 0 01-4 4H3"/>
                </svg>
              </div>
              <div>
                <strong>엔진 재사용</strong>
                <span>동일한 AI 엔진으로 산업군별 전문지식만 교체·확장</span>
              </div>
            </div>
            <div className="ax-exp-insight-divider"/>
            <div className="ax-exp-insight-item">
              <div className="ax-exp-insight-icon" style={{background:'rgba(124,58,237,0.1)', color:'#7c3aed'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <strong>효율적 사업 확장</strong>
                <span>낮은 추가 비용으로 다양한 산업군 진출 가능</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="ax-section ax-white">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag green">지속가능성</span>
            <h2 className="ax-section-title">지속 성장하는<br />사업 구조를 만듭니다</h2>
          </div>

          <div className="ax-sus-grid">
            <div className="ax-sus-card">
              <div className="ax-sus-icon" style={{background:'rgba(20,184,166,0.1)', color:'var(--teal-600)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="ax-sus-num">01</div>
              <h3>확장 가능한 AI 구조</h3>
              <p>RAG 시스템과 Agent 구조는 새로운 산업 도메인 문서가 추가되어도 동일한 방식으로 탑재 가능</p>
              <div className="ax-sus-tag" style={{color:'var(--teal-700)', background:'rgba(20,184,166,0.08)', borderColor:'var(--teal-200)'}}>지속적 기능 확장</div>
            </div>

            <div className="ax-sus-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div className="ax-sus-card">
              <div className="ax-sus-icon" style={{background:'rgba(245,158,11,0.1)', color:'#d97706'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="ax-sus-num">02</div>
              <h3>시장 선점 기회</h3>
              <p>AI 기술 성숙과 함께 산업현장 수요가 빠르게 증가 — 초기 신뢰성 있는 레퍼런스 확보 기업이 시장 우위 선점</p>
              <div className="ax-sus-tag" style={{color:'#b45309', background:'rgba(245,158,11,0.08)', borderColor:'#fcd34d'}}>시장 우위 선점</div>
            </div>

            <div className="ax-sus-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div className="ax-sus-card">
              <div className="ax-sus-icon" style={{background:'rgba(124,58,237,0.1)', color:'#7c3aed'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="ax-sus-num">03</div>
              <h3>레퍼런스 → 사업 확산</h3>
              <p>현장 적용 사례가 후속 고객 확보와 사업화 확산의 핵심 기반 — 지속 가능한 서비스 모델의 출발점</p>
              <div className="ax-sus-tag" style={{color:'#6d28d9', background:'rgba(124,58,237,0.08)', borderColor:'#c4b5fd'}}>사업 확장 기반</div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="ax-section ax-white">
        <div className="ax-section-inner">
          <div className="ax-section-header">
            <span className="ax-section-tag blue">개발 로드맵</span>
            <h2 className="ax-section-title">단계별 구현 계획</h2>
          </div>

          <div className="ax-roadmap">
            <div className="ax-roadmap-track">
              {/* Step 1 */}
              <div className="ax-roadmap-node">
                <div className="ax-roadmap-card step1-card">
                  <div className="ax-roadmap-card-top">
                  <div className="ax-roadmap-card-icon" style={{background:'rgba(20,184,166,0.1)', color:'var(--teal-600)'}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="9" y1="13" x2="15" y2="13"/>
                      <line x1="9" y1="17" x2="13" y2="17"/>
                    </svg>
                  </div>
                  <div className="ax-roadmap-step-badge step1">Step 1</div>
                </div>
                  <h3>텍스트 기반 RAG 고도화 및 건설업 파일럿 검증</h3>
                  <div className="ax-roadmap-tags">
                    <span>RAG 파이프라인</span>
                    <span>건설업 파일럿</span>
                    <span>검증</span>
                  </div>
                </div>
                <div className="ax-roadmap-dot step1-dot" />
              </div>

              {/* 연결선 */}
              <div className="ax-roadmap-hline">
                <div className="ax-roadmap-hline-inner" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="ax-roadmap-node">
                <div className="ax-roadmap-card step2-card">
                  <div className="ax-roadmap-card-top">
                  <div className="ax-roadmap-card-icon" style={{background:'rgba(96,165,250,0.1)', color:'#2563eb'}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <div className="ax-roadmap-step-badge step2">Step 2</div>
                </div>
                  <h3>멀티모달 확장 및 진단형 응답 기능 구현</h3>
                  <div className="ax-roadmap-tags">
                    <span>멀티모달</span>
                    <span>진단형 응답</span>
                    <span>기능 확장</span>
                  </div>
                </div>
                <div className="ax-roadmap-dot step2-dot" />
              </div>

              {/* 연결선 */}
              <div className="ax-roadmap-hline">
                <div className="ax-roadmap-hline-inner" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="ax-roadmap-node">
                <div className="ax-roadmap-card step3-card">
                  <div className="ax-roadmap-card-top">
                  <div className="ax-roadmap-card-icon" style={{background:'rgba(124,58,237,0.1)', color:'#7c3aed'}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div className="ax-roadmap-step-badge step3">Step 3</div>
                </div>
                  <h3>산업 도메인 확장, PoC 최종 검증 및 상용화</h3>
                  <div className="ax-roadmap-tags">
                    <span>도메인 확장</span>
                    <span>PoC 검증</span>
                    <span>상용화</span>
                  </div>
                </div>
                <div className="ax-roadmap-dot step3-dot" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ax-footer">
        <p>© 2026 SEIIM. 초격차 스타트업 AX 프로젝트</p>
        <Link href="/" className="ax-back-link">← 메인페이지로 돌아가기</Link>
      </footer>
    </div>
  );
}
