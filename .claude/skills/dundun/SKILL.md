---
name: dundun
description: |
  든든팀 통합 스킬. 기획-디자인-개발-테스트 전체 워크플로우를 관리합니다.
  팀 리더가 각 단계별로 적절한 팀원에게 작업을 분배합니다.

  Use proactively when user mentions project workflow, team collaboration,
  or multi-phase development.

  Triggers: dundun, 든든팀, 팀 개발, team, project, workflow, 프로젝트,
  ワークフロー, チーム開発, 工作流, 团队开发, flujo de trabajo,
  flux de travail, Arbeitsablauf, flusso di lavoro

  Do NOT use for: simple queries without team context.
argument-hint: "[action] [feature]"
user-invocable: true
agents:
  plan: dundun:planner
  design: dundun:designer
  develop: dundun:developer
  test: dundun:qa-engineer
  team: dundun:team-lead
  default: dundun:team-lead
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
  - AskUserQuestion
  - TodoWrite
imports:
  - ${PLUGIN_ROOT}/templates/plan.template.md
  - ${PLUGIN_ROOT}/templates/design.template.md
  - ${PLUGIN_ROOT}/templates/develop.template.md
  - ${PLUGIN_ROOT}/templates/test.template.md
next-skill: null
---

# 든든팀 (DunDun Team) 스킬

> 기획자, 개발자, 디자이너, QA가 협업하는 팀 개발 워크플로우

## 사용법

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `/dundun start [feature]` | 프로젝트 시작 | `/dundun start user-auth` |
| `/dundun plan [feature]` | 기획 문서 작성 | `/dundun plan user-auth` |
| `/dundun design [feature]` | 디자인 문서 작성 | `/dundun design user-auth` |
| `/dundun develop [feature]` | 개발 진행 | `/dundun develop user-auth` |
| `/dundun test [feature]` | 테스트 수행 | `/dundun test user-auth` |
| `/dundun status` | 현재 상태 확인 | `/dundun status` |
| `/dundun next` | 다음 단계 안내 | `/dundun next` |
| `/dundun team` | 팀 구성 보기 | `/dundun team` |

## 워크플로우

```
📋 기획 (Plan)
   ↓
🎨 디자인 (Design)
   ↓
💻 개발 (Develop)
   ↓
✅ 테스트 (Test)
   ↓
🚀 배포 (Deploy)
```

## 각 단계별 설명

### 1. 기획 (Plan)

**담당자:** 기획자 (planner)

**작업 내용:**
- 요구사항 분석
- 기능 명세 작성
- 우선순위 결정
- 인수 기준 정의

**산출물:**
- `docs/01-plan/{feature}.plan.md`

**다음 단계로 진행 조건:**
- 기획 문서 작성 완료
- 팀 리더 승인

### 2. 디자인 (Design)

**담당자:** 디자이너 (designer)

**작업 내용:**
- UI/UX 설계
- 와이어프레임 작성
- 디자인 시스템 정의
- 프로토타입 제작

**산출물:**
- `docs/02-design/{feature}.design.md`
- Figma/XD 링크
- 디자인 에셋

**다음 단계로 진행 조건:**
- 디자인 문서 작성 완료
- 개발자와 디자인 검토 완료
- 팀 리더 승인

### 3. 개발 (Develop)

**담당자:** 개발자 (developer)

**작업 내용:**
- 기능 구현
- 코드 작성
- 단위 테스트 작성
- 코드 리뷰

**산출물:**
- 구현 코드
- `docs/03-develop/{feature}.develop.md`
- API 문서

**다음 단계로 진행 조건:**
- 모든 기능 구현 완료
- 단위 테스트 통과
- 코드 리뷰 완료

### 4. 테스트 (Test)

**담당자:** QA 엔지니어 (qa-engineer)

**작업 내용:**
- 테스트 계획 수립
- 테스트 케이스 작성
- 테스트 실행
- 버그 리포팅

**산출물:**
- `docs/04-test/{feature}.test-plan.md`
- `docs/04-test/{feature}.test-report.md`
- 버그 리포트

**다음 단계로 진행 조건:**
- 모든 테스트 통과율 >= 95%
- Critical/High 버그 0개
- 팀 리더 최종 승인

### 5. 배포 (Deploy)

**담당자:** 개발자 + QA

**작업 내용:**
- 배포 준비
- 프로덕션 배포
- 모니터링
- 릴리즈 노트 작성

**산출물:**
- 배포 완료 보고서
- 릴리즈 노트

## 팀 구성

### 팀 리더 (team-lead)
- **역할:** 전체 프로젝트 총괄, 작업 분배, 품질 관리
- **모델:** opus
- **책임:** 방향 설정, 의사결정, 리스크 관리

### 기획자 (planner)
- **역할:** 요구사항 분석, 기획 문서 작성
- **모델:** sonnet
- **책임:** 범위 정의, 우선순위 결정, 인수 기준 작성

### 디자이너 (designer)
- **역할:** UI/UX 디자인, 디자인 시스템
- **모델:** sonnet
- **책임:** 와이어프레임, 프로토타입, 시각 디자인

### 개발자 (developer)
- **역할:** 기능 구현, 코드 작성
- **모델:** sonnet
- **책임:** 개발, 테스트 작성, 코드 리뷰

### QA 엔지니어 (qa-engineer)
- **역할:** 품질 보증, 테스트
- **모델:** sonnet
- **책임:** 테스트 계획, 실행, 버그 리포팅

## 사용 예시

### 새 프로젝트 시작

```bash
# 1. 프로젝트 시작
/dundun start user-authentication

# 팀 리더가 자동으로:
# - 프로젝트 디렉토리 생성
# - 기획자에게 기획 문서 작성 요청
# - 상태 추적 시작
```

### 기획 단계

```bash
# 2. 기획 문서 작성
/dundun plan user-authentication

# 기획자가:
# - 요구사항 분석
# - docs/01-plan/user-authentication.plan.md 작성
# - 팀 리더에게 검토 요청
```

### 디자인 단계

```bash
# 3. 디자인 문서 작성
/dundun design user-authentication

# 디자이너가:
# - 기획 문서 검토
# - UI/UX 설계
# - docs/02-design/user-authentication.design.md 작성
# - 팀 리더 및 개발자에게 검토 요청
```

### 개발 단계

```bash
# 4. 개발 진행
/dundun develop user-authentication

# 개발자가:
# - 디자인 문서 기반으로 구현
# - 단위 테스트 작성
# - docs/03-develop/user-authentication.develop.md 작성
# - 코드 리뷰 요청
```

### 테스트 단계

```bash
# 5. 테스트 수행
/dundun test user-authentication

# QA가:
# - 테스트 계획 수립
# - 테스트 실행
# - 버그 발견 및 리포팅
# - docs/04-test/user-authentication.test-report.md 작성
```

### 상태 확인

```bash
# 현재 프로젝트 상태 확인
/dundun status

# 출력 예시:
# 📊 든든팀 프로젝트 상태
# ─────────────────────────────
# Feature: user-authentication
# Phase: Develop (개발 중)
# Progress: 60%
# ─────────────────────────────
# [Plan] ✅ → [Design] ✅ → [Develop] 🔄 → [Test] ⏳ → [Deploy] ⏳
```

### 다음 단계 안내

```bash
# 다음에 할 일 안내
/dundun next

# 팀 리더가:
# - 현재 단계 확인
# - 다음 단계 제안
# - 필요한 작업 안내
```

## 프로젝트 구조

```
project/
├── docs/
│   ├── 01-plan/
│   │   └── {feature}.plan.md
│   ├── 02-design/
│   │   └── {feature}.design.md
│   ├── 03-develop/
│   │   └── {feature}.develop.md
│   └── 04-test/
│       ├── {feature}.test-plan.md
│       └── {feature}.test-report.md
├── src/
│   └── (실제 코드)
└── .dundun/
    ├── status.json
    └── team.json
```

## 상태 관리

### .dundun/status.json

```json
{
  "user-authentication": {
    "phase": "develop",
    "progress": 60,
    "startedAt": "2026-02-11T10:00:00Z",
    "updatedAt": "2026-02-11T15:30:00Z",
    "team": {
      "planner": "completed",
      "designer": "completed",
      "developer": "in_progress",
      "qa": "waiting"
    },
    "documents": {
      "plan": "docs/01-plan/user-authentication.plan.md",
      "design": "docs/02-design/user-authentication.design.md",
      "develop": "docs/03-develop/user-authentication.develop.md"
    }
  }
}
```

## 품질 게이트

각 단계는 다음 품질 기준을 충족해야 다음 단계로 진행:

| 단계 | 품질 기준 |
|------|-----------|
| Plan | 기획 문서 완성도, 팀 리더 승인 |
| Design | 디자인 완성도, 개발 가능성 검토 |
| Develop | 코드 품질, 단위 테스트 통과율 |
| Test | 테스트 통과율 >= 95%, Critical 버그 0개 |
| Deploy | 최종 승인, 모든 체크리스트 완료 |

## 협업 패턴

### 1. Leader 패턴
팀 리더가 작업을 분배하고 팀원이 실행
- 사용 시기: Plan, Deploy 단계

### 2. Council 패턴
여러 팀원의 관점이 필요한 경우
- 사용 시기: Design 단계 (디자이너 + 개발자)

### 3. Swarm 패턴
대규모 병렬 작업
- 사용 시기: Develop 단계 (여러 기능 동시 개발)

### 4. Pipeline 패턴
순차적 의존성
- 사용 시기: Plan → Design → Develop 전환

### 5. Watchdog 패턴
지속적 모니터링
- 사용 시기: Test 단계 (진행 중)

## 자동 트리거

다음 키워드 감지 시 자동으로 관련 작업 제안:

| 키워드 | 제안 작업 |
|--------|-----------|
| "기획", "요구사항", "계획" | `/dundun plan` |
| "디자인", "UI", "UX" | `/dundun design` |
| "개발", "구현", "코딩" | `/dundun develop` |
| "테스트", "QA", "버그" | `/dundun test` |
| "배포", "릴리즈" | 배포 단계 안내 |

## 팀 커뮤니케이션

### 일일 스탠드업
- 어제 한 일
- 오늘 할 일
- 장애물

### 주간 리뷰
- 완료된 작업
- 다음 주 계획
- 개선 사항

### 회고
- 잘된 점
- 개선할 점
- 액션 아이템

## 팁

1. **작은 단위로 진행**: 큰 기능은 여러 작은 기능으로 분할
2. **문서 우선**: 코드 작성 전 기획/디자인 문서 먼저
3. **지속적 소통**: 팀원 간 정기적으로 진행 상황 공유
4. **품질 우선**: 빠른 배포보다 안정적인 품질 우선
5. **피드백 반영**: 각 단계에서 받은 피드백 즉시 반영
