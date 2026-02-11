# {기능명} 디자인 문서

> 작성자: 디자이너 (Designer)
> 작성일: {날짜}
> 상태: Draft / Review / Approved

## 1. 디자인 목표

### 1.1 사용자 경험 목표
- {UX 목표 1}
- {UX 목표 2}

### 1.2 시각적 목표
- {디자인 컨셉}
- {스타일 방향}

### 1.3 브랜드 정렬
- {브랜드 가이드라인 준수 사항}

## 2. 사용자 플로우

### 2.1 주요 사용자 경로

```
[시작 화면]
  ↓
[사용자 액션: 버튼 클릭]
  ↓
[화면 A 표시]
  ↓
[사용자 입력]
  ↓
[화면 B로 전환]
  ↓
[완료 화면]
```

### 2.2 예외 상황 처리
- **에러 상황 1**: {처리 방법}
- **에러 상황 2**: {처리 방법}

### 2.3 플로우 다이어그램
{플로우 다이어그램 이미지 또는 Figma 링크}

## 3. 화면 설계

### 3.1 화면 목록
1. 메인 화면
2. 상세 화면
3. 설정 화면
4. 에러 화면

---

### 3.2 메인 화면

#### 목적
{이 화면의 목적과 역할}

#### 주요 요소
- **헤더**: 로고, 네비게이션, 사용자 메뉴
- **본문**: {주요 콘텐츠}
- **푸터**: {링크 및 정보}

#### 와이어프레임
```
┌─────────────────────────────┐
│  Header                      │
│  [Logo]  [Nav]  [User Menu] │
├─────────────────────────────┤
│                             │
│  Main Content               │
│                             │
│  [Component A]              │
│  [Component B]              │
│                             │
├─────────────────────────────┤
│  Footer                      │
└─────────────────────────────┘
```

#### 목업 링크
- [Desktop 목업](Figma/XD 링크)
- [Tablet 목업](Figma/XD 링크)
- [Mobile 목업](Figma/XD 링크)

---

### 3.3 상세 화면
(반복)

## 4. 디자인 시스템

### 4.1 컬러 팔레트

#### Primary Colors
- **Primary**: `#3B82F6` (Blue)
- **Primary Light**: `#60A5FA`
- **Primary Dark**: `#2563EB`

#### Secondary Colors
- **Secondary**: `#8B5CF6` (Purple)
- **Secondary Light**: `#A78BFA`
- **Secondary Dark**: `#7C3AED`

#### Semantic Colors
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Orange)
- **Error**: `#EF4444` (Red)
- **Info**: `#3B82F6` (Blue)

#### Neutral Colors
- **Gray 50**: `#F9FAFB`
- **Gray 100**: `#F3F4F6`
- **Gray 200**: `#E5E7EB`
- **Gray 300**: `#D1D5DB`
- **Gray 400**: `#9CA3AF`
- **Gray 500**: `#6B7280`
- **Gray 600**: `#4B5563`
- **Gray 700**: `#374151`
- **Gray 800**: `#1F2937`
- **Gray 900**: `#111827`

### 4.2 타이포그래피

#### 폰트 패밀리
- **Primary**: Inter, sans-serif
- **Monospace**: JetBrains Mono, monospace

#### 텍스트 스타일
| 스타일 | 크기 | 굵기 | 줄 높이 | 용도 |
|--------|------|------|---------|------|
| H1 | 32px | 700 | 1.2 | 페이지 제목 |
| H2 | 24px | 700 | 1.3 | 섹션 제목 |
| H3 | 20px | 600 | 1.4 | 서브 제목 |
| H4 | 18px | 600 | 1.4 | 카드 제목 |
| Body | 16px | 400 | 1.5 | 본문 텍스트 |
| Small | 14px | 400 | 1.4 | 보조 텍스트 |
| Caption | 12px | 400 | 1.3 | 캡션, 라벨 |

### 4.3 간격 시스템 (Spacing)

```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
```

### 4.4 그림자 (Shadows)

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### 4.5 모서리 (Border Radius)

```
sm:  4px
md:  8px
lg:  12px
xl:  16px
full: 9999px
```

## 5. 컴포넌트 라이브러리

### 5.1 Button

#### 스타일 종류
- **Primary**: 주요 액션
- **Secondary**: 보조 액션
- **Outline**: 테두리만
- **Ghost**: 배경 없음
- **Link**: 링크 스타일

#### 크기
- **Large**: 48px 높이
- **Medium**: 40px 높이
- **Small**: 32px 높이

#### 상태
- Normal
- Hover
- Active
- Disabled

---

### 5.2 Input

#### 종류
- Text Input
- Email Input
- Password Input
- Number Input
- Textarea
- Select
- Checkbox
- Radio
- Toggle

#### 상태
- Default
- Focus
- Error
- Disabled

---

### 5.3 Card

#### 구조
```
┌─────────────────┐
│  Header         │
├─────────────────┤
│                 │
│  Content        │
│                 │
├─────────────────┤
│  Footer         │
└─────────────────┘
```

---

### 5.4 Modal

#### 종류
- Info Modal
- Confirm Modal
- Form Modal

---

### 5.5 기타 컴포넌트
- Alert / Toast
- Badge
- Breadcrumb
- Dropdown
- Navigation
- Pagination
- Progress Bar
- Skeleton
- Spinner
- Table
- Tabs
- Tooltip

## 6. 반응형 디자인

### 6.1 브레이크포인트

```
Mobile:  < 640px
Tablet:  640px - 1023px
Desktop: >= 1024px
Wide:    >= 1280px
```

### 6.2 레이아웃 변화

#### Desktop (>= 1024px)
- 3-column 레이아웃
- 사이드바 항상 표시
- 호버 효과 활성

#### Tablet (640px - 1023px)
- 2-column 레이아웃
- 사이드바 토글 가능
- 터치 영역 확대

#### Mobile (< 640px)
- 1-column 레이아웃
- 햄버거 메뉴
- 풀스크린 모달

### 6.3 터치 최적화
- 버튼 최소 크기: 44px × 44px
- 터치 영역 간격: 최소 8px
- 스와이프 제스처 지원

## 7. 접근성 (Accessibility)

### 7.1 WCAG 2.1 AA 준수

#### 색상 대비
- 텍스트: 최소 4.5:1
- 큰 텍스트 (18pt+): 최소 3:1
- UI 컴포넌트: 최소 3:1

#### 키보드 네비게이션
- Tab으로 모든 인터랙티브 요소 접근
- Enter/Space로 버튼 활성화
- Esc로 모달 닫기

#### 스크린 리더
- 의미 있는 alt 텍스트
- ARIA 레이블 사용
- 적절한 HTML 시맨틱

### 7.2 접근성 체크리스트
- [ ] 색상 대비 검증
- [ ] 키보드만으로 전체 기능 접근 가능
- [ ] 스크린 리더 호환성 테스트
- [ ] 포커스 표시 명확
- [ ] 에러 메시지 명확히 전달

## 8. 인터랙션

### 8.1 애니메이션

#### 기본 타이밍
```
--duration-fast: 150ms
--duration-base: 200ms
--duration-slow: 300ms
--easing: cubic-bezier(0.4, 0, 0.2, 1)
```

#### 인터랙션 유형
- **Hover**: 배경색 변화 (200ms)
- **Click**: Scale 효과 (150ms)
- **Page Transition**: Fade (300ms)
- **Modal**: Slide up (250ms)

### 8.2 피드백

#### 로딩 상태
- 버튼: Spinner 표시
- 페이지: Skeleton UI
- 데이터: Progress Bar

#### 에러 상태
- 입력 필드: 빨간 테두리 + 에러 메시지
- 폼: 상단에 에러 알림
- 페이지: 에러 화면 표시

#### 성공 상태
- Toast 알림
- 성공 아이콘 표시
- 색상 변화

## 9. 에셋

### 9.1 아이콘
- **라이브러리**: Heroicons / Lucide
- **크기**: 16px, 20px, 24px
- **형식**: SVG

### 9.2 이미지
- **형식**: WebP (fallback: JPG)
- **최대 크기**: 1920px
- **압축**: 80% 품질

### 9.3 일러스트레이션
- {일러스트레이션 스타일}
- {사용 위치}

## 10. 디자인 핸드오프

### 10.1 개발자 전달 사항

#### Figma/XD 파일
- [Figma 링크](링크)
- Developer Mode 활성화
- 모든 에셋 Export 준비

#### 디자인 토큰
- `design-tokens.json` 파일
- CSS Variables 정의
- Tailwind Config 설정

#### 컴포넌트 명세
- 각 컴포넌트별 props 정의
- 상태별 스타일 가이드
- 인터랙션 설명

#### 에셋 파일
- `/assets/icons/` - SVG 아이콘
- `/assets/images/` - 이미지 파일
- `/assets/fonts/` - 폰트 파일

### 10.2 체크리스트
- [ ] 모든 화면 디자인 완료
- [ ] 반응형 레이아웃 정의
- [ ] 컴포넌트 라이브러리 완성
- [ ] 디자인 시스템 문서화
- [ ] 에셋 파일 준비
- [ ] 개발자 리뷰 완료

## 11. 참고 자료

- [디자인 가이드라인](링크)
- [브랜드 아이덴티티](링크)
- [UI 인스피레이션](링크)

## 12. 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| {날짜} | 1.0 | 초안 작성 | {이름} |
| {날짜} | 1.1 | 개발자 피드백 반영 | {이름} |

---

## 승인

- [ ] 개발자 검토 완료
- [ ] 팀 리더 승인

**승인자**: {이름}
**승인일**: {날짜}
