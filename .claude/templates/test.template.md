# {기능명} 테스트 문서

> 작성자: QA 엔지니어 (QA Engineer)
> 작성일: {날짜}
> 상태: In Progress / Completed

## 1. 테스트 개요

### 1.1 테스트 목표
- {검증할 주요 기능}
- {품질 목표}
- {성공 기준}

### 1.2 관련 문서
- [기획 문서](링크)
- [디자인 문서](링크)
- [개발 문서](링크)

## 2. 테스트 범위

### 2.1 포함 사항 (In Scope)
- [ ] 기능 A: {설명}
- [ ] 기능 B: {설명}
- [ ] 기능 C: {설명}
- [ ] 비기능 요구사항 (성능, 보안, 접근성)

### 2.2 제외 사항 (Out of Scope)
- 외부 서비스 의존성
- 서드파티 라이브러리 내부 로직
- {기타 제외 사항}

## 3. 테스트 전략

### 3.1 테스트 레벨

#### Unit Testing (단위 테스트)
- **도구**: Jest / Vitest
- **커버리지 목표**: 80% 이상
- **담당**: 개발자

#### Integration Testing (통합 테스트)
- **도구**: Supertest / Playwright Component Testing
- **범위**: API 엔드포인트, 모듈 간 상호작용
- **담당**: 개발자 + QA

#### E2E Testing (종단간 테스트)
- **도구**: Playwright / Cypress
- **범위**: 전체 사용자 플로우
- **담당**: QA

#### Performance Testing (성능 테스트)
- **도구**: Lighthouse / k6
- **목표**: 페이지 로드 < 3초, API 응답 < 500ms
- **담당**: QA

#### Security Testing (보안 테스트)
- **도구**: OWASP ZAP / Snyk
- **범위**: 취약점 스캔, 인증/권한 테스트
- **담당**: QA + 개발자

## 4. 테스트 환경

### 4.1 환경 정보
| 항목 | 정보 |
|------|------|
| OS | macOS 14.0+ / Windows 11 / Ubuntu 22.04 |
| Browser | Chrome 120+, Safari 17+, Firefox 121+, Edge 120+ |
| Device | Desktop, Tablet (iPad), Mobile (iPhone/Android) |
| Network | WiFi / 4G / 3G (throttling) |

### 4.2 테스트 데이터
- **테스트 계정**: test@example.com / Test123!
- **샘플 데이터**: `/tests/fixtures/sample-data.json`
- **Mock API**: `/tests/mocks/api-responses.ts`

## 5. 테스트 케이스

### 5.1 기능 테스트

#### TC-001: 사용자 회원가입 - 성공 케이스

**우선순위**: High
**카테고리**: 인증

**전제조건**:
- 회원가입 페이지 접속
- 아직 등록되지 않은 이메일 사용

**테스트 단계**:
1. 이메일 입력: test@example.com
2. 이름 입력: John Doe
3. 비밀번호 입력: SecurePass123!
4. 비밀번호 확인 입력: SecurePass123!
5. "가입하기" 버튼 클릭

**예상 결과**:
- 회원가입 성공 메시지 표시
- 대시보드 페이지로 자동 이동
- 환영 메시지 표시

**실제 결과**:
{테스트 실행 후 기록}

**상태**: ⏳ Pending / ✅ Pass / ❌ Fail
**실행일**: {날짜}
**테스터**: {이름}

---

#### TC-002: 사용자 회원가입 - 중복 이메일

**우선순위**: High
**카테고리**: 인증

**전제조건**:
- 이미 등록된 이메일 존재

**테스트 단계**:
1. 이메일 입력: existing@example.com
2. 나머지 정보 입력
3. "가입하기" 버튼 클릭

**예상 결과**:
- "이미 사용 중인 이메일입니다" 에러 메시지 표시
- 회원가입 페이지에 유지

**실제 결과**:
{테스트 실행 후 기록}

**상태**: ⏳ Pending / ✅ Pass / ❌ Fail

---

#### TC-003: 사용자 로그인 - 성공 케이스

**우선순위**: High
**카테고리**: 인증

**전제조건**:
- 유효한 사용자 계정 존재
- 로그인 페이지 접속

**테스트 단계**:
1. 이메일 입력: test@example.com
2. 비밀번호 입력: SecurePass123!
3. "로그인" 버튼 클릭

**예상 결과**:
- 로그인 성공
- 대시보드로 이동
- 사용자 이름 표시

**실제 결과**:
{테스트 실행 후 기록}

**상태**: ⏳ Pending / ✅ Pass / ❌ Fail

---

### 5.2 경계값 테스트

#### TC-010: 비밀번호 최소 길이

**테스트 값**:
- 7자: ❌ 실패 예상
- 8자: ✅ 성공 예상
- 9자: ✅ 성공 예상

---

### 5.3 UI/UX 테스트

#### TC-020: 반응형 레이아웃 - Mobile

**디바이스**: iPhone 14 Pro (390 × 844)
**테스트 항목**:
- [ ] 레이아웃 깨짐 없음
- [ ] 모든 버튼 터치 가능 (최소 44px)
- [ ] 스크롤 정상 작동
- [ ] 이미지 로딩 정상

---

#### TC-021: 다크모드

**테스트 항목**:
- [ ] 다크모드 토글 정상 작동
- [ ] 모든 텍스트 가독성 확보
- [ ] 색상 대비 3:1 이상

---

### 5.4 성능 테스트

#### TC-030: 페이지 로드 시간

**목표**: < 3초
**측정 방법**: Lighthouse
**환경**: WiFi

**결과**:
| 페이지 | 로드 시간 | 상태 |
|--------|-----------|------|
| 홈 | {시간} | {Pass/Fail} |
| 로그인 | {시간} | {Pass/Fail} |
| 대시보드 | {시간} | {Pass/Fail} |

---

#### TC-031: API 응답 시간

**목표**: < 500ms
**측정 방법**: Network Tab

**결과**:
| API | 응답 시간 | 상태 |
|-----|-----------|------|
| GET /api/posts | {시간} | {Pass/Fail} |
| POST /api/auth/login | {시간} | {Pass/Fail} |

---

### 5.5 보안 테스트

#### TC-040: XSS 방지

**테스트 입력**:
```html
<script>alert('XSS')</script>
```

**예상 결과**:
- 스크립트 실행 안 됨
- 입력값 이스케이프 처리

---

#### TC-041: SQL Injection 방지

**테스트 입력**:
```sql
' OR '1'='1
```

**예상 결과**:
- 로그인 실패
- 에러 메시지 표시

---

#### TC-042: 인증 없이 보호된 페이지 접근

**테스트 단계**:
1. 로그인하지 않은 상태
2. /dashboard URL 직접 접근

**예상 결과**:
- 로그인 페이지로 리다이렉트
- 에러 메시지: "로그인이 필요합니다"

---

### 5.6 접근성 테스트

#### TC-050: 키보드 네비게이션

**테스트 항목**:
- [ ] Tab으로 모든 버튼/링크 접근 가능
- [ ] Enter로 버튼 활성화
- [ ] Esc로 모달 닫기
- [ ] 포커스 표시 명확

---

#### TC-051: 스크린 리더

**도구**: VoiceOver (macOS) / NVDA (Windows)

**테스트 항목**:
- [ ] 모든 이미지에 alt 텍스트
- [ ] 폼 필드에 label 연결
- [ ] 버튼 역할 명확히 전달
- [ ] 페이지 제목 읽기

---

### 5.7 브라우저 호환성

#### TC-060: 크로스 브라우저 테스트

| Browser | Version | 로그인 | 게시글 작성 | 댓글 | 상태 |
|---------|---------|--------|------------|------|------|
| Chrome | 120 | {Pass/Fail} | {Pass/Fail} | {Pass/Fail} | {Overall} |
| Safari | 17 | {Pass/Fail} | {Pass/Fail} | {Pass/Fail} | {Overall} |
| Firefox | 121 | {Pass/Fail} | {Pass/Fail} | {Pass/Fail} | {Overall} |
| Edge | 120 | {Pass/Fail} | {Pass/Fail} | {Pass/Fail} | {Overall} |

## 6. 자동화 테스트

### 6.1 Jest (단위 테스트)

```javascript
// tests/unit/auth.test.ts
import { validateEmail, validatePassword } from '@/lib/validation';

describe('Validation', () => {
  describe('validateEmail', () => {
    test('should accept valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    test('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('should accept password with 8+ characters', () => {
      expect(validatePassword('SecurePass123!')).toBe(true);
    });

    test('should reject password with < 8 characters', () => {
      expect(validatePassword('Short1!')).toBe(false);
    });
  });
});
```

---

### 6.2 Playwright (E2E 테스트)

```javascript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('user can register successfully', async ({ page }) => {
    await page.goto('/register');

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.fill('input[name="confirmPassword"]', 'SecurePass123!');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('user can login successfully', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123!');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
  });
});
```

## 7. 버그 리포트

### Bug #001: 로그인 버튼 중복 클릭 시 에러

**심각도**: High
**발견일**: 2026-02-11
**발견자**: QA Team

**재현 단계**:
1. 로그인 페이지 접속
2. 유효한 계정 정보 입력
3. 로그인 버튼 빠르게 2번 클릭

**예상 동작**:
- 한 번만 로그인 요청 전송
- 중복 클릭 방지

**실제 동작**:
- 로그인 요청 2번 전송
- "Server Error 500" 발생

**환경**:
- Browser: Chrome 120.0
- OS: macOS 14.1

**스크린샷**:
{첨부}

**우선순위**: High
**상태**: Open / In Progress / Fixed / Closed
**담당자**: {개발자 이름}

---

### Bug #002: 다크모드에서 텍스트 가독성 낮음

**심각도**: Medium
**발견일**: 2026-02-11

**재현 단계**:
1. 다크모드 활성화
2. 댓글 섹션 확인

**예상 동작**:
- 텍스트 명확히 읽힘
- 색상 대비 3:1 이상

**실제 동작**:
- 회색 텍스트가 어두운 배경에서 잘 안 보임
- 색상 대비 2.1:1 (기준 미달)

**스크린샷**:
{첨부}

**우선순위**: Medium
**상태**: Open

---

## 8. 테스트 메트릭

### 8.1 테스트 커버리지

| 유형 | 목표 | 실제 | 상태 |
|------|------|------|------|
| Statement | 80% | {%} | {Pass/Fail} |
| Branch | 75% | {%} | {Pass/Fail} |
| Function | 80% | {%} | {Pass/Fail} |
| Line | 80% | {%} | {Pass/Fail} |

### 8.2 테스트 결과 요약

| 카테고리 | 총 개수 | Pass | Fail | Pending | 통과율 |
|----------|---------|------|------|---------|--------|
| Unit | 50 | 48 | 2 | 0 | 96% |
| Integration | 30 | 28 | 1 | 1 | 93% |
| E2E | 20 | 18 | 2 | 0 | 90% |
| **Total** | **100** | **94** | **5** | **1** | **94%** |

### 8.3 버그 통계

| 심각도 | 발견 | 수정 | 미해결 |
|--------|------|------|--------|
| Critical | 0 | 0 | 0 |
| High | 3 | 2 | 1 |
| Medium | 5 | 4 | 1 |
| Low | 2 | 1 | 1 |
| **Total** | **10** | **7** | **3** |

## 9. 성능 메트릭

### 9.1 Lighthouse 스코어

| 페이지 | Performance | Accessibility | Best Practices | SEO |
|--------|-------------|---------------|----------------|-----|
| 홈 | {점수} | {점수} | {점수} | {점수} |
| 로그인 | {점수} | {점수} | {점수} | {점수} |
| 대시보드 | {점수} | {점수} | {점수} | {점수} |

**목표**: 모든 항목 90점 이상

---

### 9.2 Web Vitals

| 메트릭 | 목표 | 실제 | 상태 |
|--------|------|------|------|
| LCP (Largest Contentful Paint) | < 2.5s | {시간} | {Pass/Fail} |
| FID (First Input Delay) | < 100ms | {시간} | {Pass/Fail} |
| CLS (Cumulative Layout Shift) | < 0.1 | {값} | {Pass/Fail} |
| TTFB (Time to First Byte) | < 600ms | {시간} | {Pass/Fail} |

## 10. 배포 전 체크리스트

### 10.1 기능 테스트
- [ ] 모든 기능 요구사항 구현 완료
- [ ] 모든 Must/Should 기능 동작 확인
- [ ] 사용자 플로우 테스트 통과

### 10.2 품질 기준
- [ ] Critical/High 버그 0개
- [ ] 테스트 통과율 >= 95%
- [ ] 코드 커버리지 >= 80%

### 10.3 성능
- [ ] 페이지 로드 시간 < 3초
- [ ] API 응답 시간 < 500ms
- [ ] Lighthouse 성능 점수 >= 90

### 10.4 보안
- [ ] XSS 방지 확인
- [ ] SQL Injection 방지 확인
- [ ] 인증/권한 검증 완료
- [ ] HTTPS 적용

### 10.5 접근성
- [ ] WCAG 2.1 AA 준수
- [ ] 키보드 네비게이션 가능
- [ ] 스크린 리더 호환
- [ ] 색상 대비 기준 충족

### 10.6 호환성
- [ ] Chrome 테스트 통과
- [ ] Safari 테스트 통과
- [ ] Firefox 테스트 통과
- [ ] Edge 테스트 통과
- [ ] 모바일 반응형 확인

## 11. 테스트 종료 기준

다음 조건을 모두 충족 시 배포 승인:

1. ✅ Critical/High 버그 0개
2. ✅ 테스트 통과율 >= 95%
3. ✅ 코드 커버리지 >= 80%
4. ✅ 성능 기준 충족 (Lighthouse >= 90)
5. ✅ 보안 검증 완료
6. ✅ 접근성 기준 충족
7. ✅ 모든 브라우저 호환성 확인

## 12. 권고 사항

### 12.1 배포 승인 여부
✅ 승인 / ❌ 보류 / ⚠️ 조건부 승인

**의견**:
{QA 팀의 전반적인 평가 및 의견}

### 12.2 개선 사항
1. {개선이 필요한 부분}
2. {추가 테스트가 필요한 영역}
3. {향후 모니터링 항목}

### 12.3 리스크
- **리스크 1**: {설명}, 완화 방안: {방안}
- **리스크 2**: {설명}, 완화 방안: {방안}

## 13. 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| {날짜} | 1.0 | 초기 테스트 계획 | {이름} |
| {날짜} | 1.1 | 테스트 결과 업데이트 | {이름} |

---

## 승인

- [ ] QA 팀 승인
- [ ] 팀 리더 최종 승인

**승인자**: {이름}
**승인일**: {날짜}
