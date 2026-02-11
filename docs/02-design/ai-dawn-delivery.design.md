# AI 새벽배송 🌙🚚 디자인 문서

## 1. 디자인 목표

### 사용자 경험 목표
- **새벽의 신비로움**: 밤하늘과 별빛으로 새벽배송의 특별한 순간을 표현
- **AI의 미래감**: 첨단 기술과 따뜻한 서비스의 조화
- **신뢰와 안정감**: 어두운 배경이지만 편안하고 읽기 쉬운 UI
- **프리미엄 경험**: 컬리의 고품질 서비스 이미지 유지

### 시각적 목표
- 밤하늘 그라데이션으로 새벽 분위기 표현
- 반짝이는 별 애니메이션으로 생동감 부여
- 부드러운 카드 글로우 효과로 프리미엄 느낌
- 가독성 높은 화이트 텍스트와 보라색 포인트 컬러

### 브랜드 정렬
- 컬리의 보라색 브랜드 컬러 (#5F0080) 유지
- 신선함과 신속함을 상징하는 새벽배송 콘셉트
- AI 지식 배송이라는 독특한 포지셔닝

---

## 2. 사용자 플로우

### 주요 사용자 경로
```
랜딩 (밤하늘 헤더)
  → 사례 카드 탐색
  → 필터링/검색
  → 상세 모달 열기
  → 댓글 작성/확인
  → 새 사례 등록
```

### 예외 상황 처리
- 로딩 중: 보라색 스피너 + 새벽 배경
- 검색 결과 없음: 달과 트럭 일러스트 + 안내 메시지
- 에러: 별빛 배경 유지하며 친근한 에러 메시지

---

## 3. 화면 설계

### 3.1 헤더 (Dawn Delivery Header)

**목적**
- 브랜딩: "AI 새벽배송" 타이틀과 서브 카피 표시
- 액션: "새 배송지 등록" (새 사례 등록) 버튼

**주요 요소**
- 🌙 달 아이콘 + 🚚 트럭 아이콘
- "AI 새벽배송" 타이틀 (크고 선명한 화이트 텍스트)
- "오늘도 지식이 배송됩니다" 서브 카피 (부드러운 화이트)
- 보라색 그라데이션 버튼 (#5F0080 → #7B1FA2)

**와이어프레임**
```
┌────────────────────────────────────────────┐
│ 🌙 AI 새벽배송 🚚          [새 배송지 등록]  │
│    오늘도 지식이 배송됩니다                    │
└────────────────────────────────────────────┘
```

### 3.2 배경 (Night Sky Background)

**목적**
- 새벽 분위기 조성
- 시각적 깊이감 제공

**주요 요소**
- 네이비 그라데이션 (#1a1f3a → #2d3561)
- 반짝이는 별 애니메이션 (흰색, 다양한 크기)
- 부드러운 보라색 글로우 효과

**기술 구현**
- CSS linear-gradient
- CSS keyframes animation
- box-shadow for glow effect

### 3.3 검색 & 필터 바

**목적**
- 사례 검색 및 AI 도구별 필터링

**주요 요소**
- 반투명 다크 배경 (rgba(255,255,255,0.1))
- 화이트 텍스트 입력창
- 보라색 테두리 (포커스 시)
- 필터 칩: 어두운 배경 + 화이트 텍스트, 선택 시 보라색 배경

**와이어프레임**
```
┌────────────────────────────────────────┐
│ 🔍 [검색창 - 반투명]                     │
└────────────────────────────────────────┘
[전체] [ChatGPT] [Claude] [Gemini] ...
```

### 3.4 사례 카드 (Delivery Card)

**목적**
- 각 AI 활용 사례를 매력적으로 표시
- 클릭하여 상세 정보 확인

**주요 요소**
- 어두운 반투명 배경 (rgba(255,255,255,0.05))
- 보라색 테두리 + 글로우 효과
- 별빛 반짝이는 효과 (카드 상단)
- 화이트 타이틀 (읽음: 불투명도 60%)
- 회색 설명 텍스트 (#B0B0B0)
- AI 도구 배지 (보라색 그라데이션)
- 발표자 아바타 (보라색 원형)

**와이어프레임**
```
┌────────────────────────────┐
│ ✨ ✨ ✨                    │
│                            │
│ 🤖 ChatGPT        💬 5      │
│                            │
│ 고객 응대 자동화            │
│ ChatGPT로 응답 시간 50% ... │
│                            │
│ 김 김지원 │ 보기 →         │
│   고객지원팀                │
└────────────────────────────┘
```

### 3.5 상세 모달 (Detail View)

**목적**
- 사례 전체 내용 표시
- 댓글 작성 및 확인

**주요 요소**
- 화이트 배경 (모달만 밝게)
- 헤더: 보라색 타이틀
- 3단계 콘텐츠 블록 (왜 → 무엇 → 결과)
- 보라색 "발표 자료 보기" 버튼
- 댓글 섹션

**와이어프레임**
```
┌─────────────────────────────┐
│ [X]                         │
│ 고객 응대 자동화             │
├─────────────────────────────┤
│ 김 김지원 (고객지원팀) 🤖 GPT │
├─────────────────────────────┤
│ 💡 왜 했는지?               │
│ [파란 배경 블록]             │
│                             │
│ 🛠️ 무엇이 좋아졌는지?        │
│ [보라 배경 블록]             │
│                             │
│ ✨ 어떤 결과로 이어졌는지?    │
│ [초록 배경 블록]             │
│                             │
│ [발표 자료 보기] 버튼        │
│                             │
│ 💬 댓글 (3)                 │
│ ...                         │
└─────────────────────────────┘
```

---

## 4. 디자인 시스템

### 4.1 컬러 팔레트

#### 배경 색상
- **Primary Background**: `linear-gradient(180deg, #1a1f3a 0%, #2d3561 100%)`
- **Dark Navy**: `#1a1f3a` (상단)
- **Deep Blue**: `#2d3561` (하단)

#### 카드 색상
- **Card Background**: `rgba(255, 255, 255, 0.05)`
- **Card Border**: `rgba(149, 108, 255, 0.3)` (보라색 반투명)
- **Card Hover Glow**: `0 8px 32px rgba(149, 108, 255, 0.4)`

#### 텍스트 색상
- **Primary Text**: `#FFFFFF` (화이트)
- **Secondary Text**: `#E0E0E0` (연한 회색)
- **Tertiary Text**: `#B0B0B0` (중간 회색)
- **Muted Text**: `#808080` (어두운 회색)

#### 브랜드 색상
- **Kurly Purple**: `#5F0080` (메인 보라)
- **Light Purple**: `#7B1FA2` (밝은 보라)
- **Purple Glow**: `rgba(95, 0, 128, 0.6)`

#### 액센트 색상
- **Success Green**: `#10B981` (성공/완료)
- **Info Blue**: `#3B82F6` (정보)
- **Warning Orange**: `#F59E0B` (경고)
- **Moon Yellow**: `#FCD34D` (달 색상)

#### 별빛 색상
- **Star White**: `#FFFFFF`
- **Star Glow**: `rgba(255, 255, 255, 0.8)`

### 4.2 타이포그래피

#### 폰트 패밀리
```css
font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
```

#### 폰트 크기 & 무게
- **Hero Title**:
  - Size: `48px` (3rem)
  - Weight: `900` (Black)
  - Color: `#FFFFFF`
  - Letter-spacing: `-1px`

- **Page Title (H1)**:
  - Size: `32px` (2rem)
  - Weight: `700` (Bold)
  - Color: `#FFFFFF`

- **Section Title (H2)**:
  - Size: `24px` (1.5rem)
  - Weight: `700` (Bold)
  - Color: `#FFFFFF`

- **Card Title (H3)**:
  - Size: `18px` (1.125rem)
  - Weight: `700` (Bold)
  - Color: `#FFFFFF`

- **Body Text**:
  - Size: `16px` (1rem)
  - Weight: `400` (Regular)
  - Color: `#E0E0E0`
  - Line-height: `1.6`

- **Small Text**:
  - Size: `14px` (0.875rem)
  - Weight: `400` (Regular)
  - Color: `#B0B0B0`

- **Caption**:
  - Size: `12px` (0.75rem)
  - Weight: `500` (Medium)
  - Color: `#808080`

#### 서브 카피 스타일
- Font-size: `18px`
- Weight: `400`
- Color: `rgba(255, 255, 255, 0.7)`
- Letter-spacing: `0.5px`

### 4.3 간격 시스템

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

### 4.4 컴포넌트

#### Button (보라색 그라데이션)
```css
.dawn-btn-primary {
  background: linear-gradient(135deg, #5F0080 0%, #7B1FA2 100%);
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 16px rgba(95, 0, 128, 0.4);
  transition: all 0.3s ease;
}

.dawn-btn-primary:hover {
  box-shadow: 0 6px 24px rgba(95, 0, 128, 0.6);
  transform: translateY(-2px);
}
```

#### Input (반투명 다크)
```css
.dawn-input {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.dawn-input:focus {
  border-color: #956CFF;
  box-shadow: 0 0 0 3px rgba(149, 108, 255, 0.2);
}
```

#### Card (글로우 효과)
```css
.dawn-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(149, 108, 255, 0.3);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dawn-card:hover {
  border-color: rgba(149, 108, 255, 0.6);
  box-shadow: 0 8px 32px rgba(149, 108, 255, 0.4);
  transform: translateY(-4px);
}
```

#### Badge (AI 도구 배지)
```css
.dawn-badge {
  background: linear-gradient(135deg, #5F0080 0%, #7B1FA2 100%);
  color: #FFFFFF;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(95, 0, 128, 0.3);
}
```

#### Modal (밝은 배경)
```css
.dawn-modal {
  background: #FFFFFF;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  animation: fadeInUp 0.3s ease-out;
}
```

---

## 5. 반응형 디자인

### 브레이크포인트
- **Desktop**: `1280px+` - 3열 그리드
- **Tablet**: `768px - 1279px` - 2열 그리드
- **Mobile**: `< 768px` - 1열 그리드

### 모바일 최적화
- 헤더 타이틀 폰트 크기 축소 (48px → 32px)
- 서브 카피 숨김 (작은 화면)
- 카드 패딩 축소 (24px → 16px)
- 버튼 전체 너비
- 별 애니메이션 개수 축소 (성능 최적화)

---

## 6. 접근성

### WCAG 2.1 AA 준수
- ✅ 화이트 텍스트 on 다크 배경: 대비율 **15.3:1** (AAA)
- ✅ 회색 텍스트 (#B0B0B0) on 다크 배경: 대비율 **7.2:1** (AA)
- ✅ 보라색 버튼 (#5F0080) on 화이트: 대비율 **8.6:1** (AAA)

### 키보드 네비게이션
- Tab으로 모든 카드 접근
- Enter로 카드 열기
- Esc로 모달 닫기
- 포커스 표시: 보라색 링 (2px, 0.3 opacity)

### 스크린 리더 지원
- 이미지: `alt="AI 새벽배송 로고 - 달과 트럭"`
- 버튼: `aria-label="새 배송지 등록하기"`
- 모달: `role="dialog"`, `aria-modal="true"`
- 카드: `aria-label="ChatGPT 활용 사례 - 고객 응대 자동화"`

### 색상 의존 제거
- 아이콘과 텍스트 병행 사용
- 읽음 표시: 텍스트 불투명도 + "읽음" 배지
- 상태 표시: 색상 + 아이콘 + 텍스트

---

## 7. 인터랙션 & 애니메이션

### 별 반짝임 애니메이션
```css
@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.star {
  animation: twinkle 3s ease-in-out infinite;
  animation-delay: random; /* JS로 랜덤 delay */
}
```

### 카드 호버 효과
- 이동: `translateY(-4px)` (0.3s ease)
- 그림자: 보라색 글로우 증가
- 테두리: 밝기 증가
- 커서: `cursor: pointer`

### 버튼 클릭 효과
- Scale: `scale(0.98)` (0.1s)
- Shadow: 일시적 축소 후 복원

### 모달 진입 애니메이션
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 로딩 스피너
- 보라색 원형 스피너
- 회전: `360deg` (1s linear infinite)
- 배경: 어두운 밤하늘 유지

---

## 8. 에셋

### 아이콘 목록
- 🌙 **달** (헤더 왼쪽)
- 🚚 **트럭** (헤더 오른쪽)
- ✨ **별** (카드 상단 장식)
- 🤖 **로봇** (AI 도구 배지)
- 🔍 **돋보기** (검색창)
- 💬 **말풍선** (댓글)
- 💡 **전구** (왜 했는지)
- 🛠️ **렌치** (무엇이 좋아졌는지)
- ✅ **체크마크** (결과)
- 📊 **차트** (자료 링크)

### 이미지 사양
- 별 PNG: 16x16px, 24x24px (다양한 크기)
- 트럭 SVG: 벡터 아이콘
- 달 SVG: 노란색 (#FCD34D)

### 일러스트레이션
- 빈 상태: 달과 트럭이 함께 있는 일러스트
- 에러 상태: 별똥별 일러스트

---

## 9. 성능 최적화

### 이미지 최적화
- 별 PNG: WebP 포맷 사용
- Lazy loading 적용
- Sprite sheet로 별 이미지 통합

### CSS 최적화
- Critical CSS 인라인 삽입
- 별 애니메이션: `will-change: opacity, transform`
- GPU 가속: `transform: translateZ(0)`

### 애니메이션 최적화
- `requestAnimationFrame` 사용
- 뷰포트 밖 별 애니메이션 중지
- 모바일: 별 개수 축소 (50 → 20)

---

## 10. 디자인 핸드오프

### 개발자에게 전달 사항

#### CSS 변수 (테마)
```css
:root {
  /* Dawn Theme Colors */
  --dawn-bg-start: #1a1f3a;
  --dawn-bg-end: #2d3561;
  --dawn-card-bg: rgba(255, 255, 255, 0.05);
  --dawn-card-border: rgba(149, 108, 255, 0.3);
  --dawn-text-primary: #FFFFFF;
  --dawn-text-secondary: #E0E0E0;
  --dawn-text-tertiary: #B0B0B0;
  --dawn-purple: #5F0080;
  --dawn-purple-light: #7B1FA2;
  --dawn-glow: rgba(149, 108, 255, 0.4);
}
```

#### 컴포넌트 클래스
- `.dawn-header` - 헤더
- `.dawn-hero` - 히어로 타이틀
- `.dawn-card` - 사례 카드
- `.dawn-btn-primary` - 메인 버튼
- `.dawn-input` - 입력창
- `.dawn-badge` - 배지
- `.dawn-modal` - 모달
- `.star` - 별 애니메이션

#### 인터랙션 설명
1. **별 생성**: JS로 100개의 별을 랜덤 위치에 생성
2. **카드 호버**: CSS transition 0.3s
3. **모달 열기**: fadeInUp 애니메이션 0.3s
4. **검색 필터**: 실시간 필터링, debounce 300ms

#### 브레이크포인트
```css
/* Mobile */
@media (max-width: 767px) { ... }

/* Tablet */
@media (min-width: 768px) and (max-width: 1279px) { ... }

/* Desktop */
@media (min-width: 1280px) { ... }
```

---

## 11. 디자인 QA 체크리스트

### 시각적 검증
- [ ] 배경 그라데이션 방향 및 색상 정확성
- [ ] 별 애니메이션 부드러운 작동
- [ ] 카드 글로우 효과 올바른 표시
- [ ] 텍스트 가독성 (모든 색상 조합)
- [ ] 버튼 호버/액티브 상태 명확성

### 반응형 검증
- [ ] 320px (iPhone SE) - 1열 그리드
- [ ] 768px (iPad) - 2열 그리드
- [ ] 1280px (Desktop) - 3열 그리드
- [ ] 1920px+ (Large Desktop) - 최대 너비 유지

### 접근성 검증
- [ ] 키보드 탐색 가능
- [ ] 포커스 링 표시
- [ ] 색상 대비 WCAG AA 준수
- [ ] 스크린 리더 테스트 (VoiceOver/NVDA)

### 성능 검증
- [ ] 별 애니메이션 60fps 유지
- [ ] 카드 호버 지연 없음
- [ ] 모달 열기/닫기 부드러움
- [ ] 모바일에서 스크롤 버벅임 없음

---

## 12. 브랜드 스토리

### "AI 새벽배송"의 의미

#### 새벽배송
- 밤새 준비되어 아침에 신선하게 도착하는 컬리의 대표 서비스
- 빠르고 정확한 배송의 상징

#### AI 지식 배송
- PM들의 AI 활용 사례를 마치 새벽배송처럼 신선하게 전달
- 밤하늘을 달리는 트럭처럼 지식이 배달됨

#### 밤하늘 테마
- 새벽배송이 이루어지는 시간대
- 고요하지만 생동감 있는 분위기
- 별빛처럼 반짝이는 아이디어들

---

## 13. 향후 개선 사항

### Phase 2 기능
- [ ] 배송 트럭 애니메이션 (로딩 시 화면 가로지르기)
- [ ] 별자리 연결선 (관련 사례 연결)
- [ ] 다크모드/라이트모드 토글 (주간/야간 배송)
- [ ] 실시간 "배송 중" 알림

### 실험적 기능
- [ ] 3D 별빛 효과 (Three.js)
- [ ] 패럴랙스 스크롤링
- [ ] 마우스 따라 움직이는 별자리

---

**디자인 완료일**: 2026-02-11
**디자이너**: 든든팀 디자이너
**버전**: 1.0.0
