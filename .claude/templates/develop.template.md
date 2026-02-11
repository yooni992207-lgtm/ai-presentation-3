# {기능명} 개발 문서

> 작성자: 개발자 (Developer)
> 작성일: {날짜}
> 상태: In Progress / Completed

## 1. 개발 개요

### 1.1 기능 요약
{구현할 기능에 대한 간단한 설명}

### 1.2 관련 문서
- [기획 문서](링크)
- [디자인 문서](링크)

## 2. 기술 스택

### 2.1 프론트엔드
- **프레임워크**: React 18 / Next.js 14
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 3
- **상태 관리**: Zustand / Redux Toolkit
- **폼**: React Hook Form + Zod
- **HTTP**: Axios / Fetch API

### 2.2 백엔드
- **런타임**: Node.js 20 / Python 3.11
- **프레임워크**: Express / FastAPI
- **언어**: TypeScript / Python
- **ORM**: Prisma / TypeORM / SQLAlchemy
- **API**: REST / GraphQL

### 2.3 데이터베이스
- **RDBMS**: PostgreSQL 15
- **NoSQL**: MongoDB / Redis
- **캐싱**: Redis

### 2.4 인프라
- **호스팅**: Vercel / AWS / GCP
- **CI/CD**: GitHub Actions
- **모니터링**: Sentry / DataDog

## 3. 프로젝트 구조

```
project/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   └── layout.tsx
│   ├── components/             # 재사용 컴포넌트
│   │   ├── ui/                 # 기본 UI 컴포넌트
│   │   ├── forms/              # 폼 컴포넌트
│   │   └── layouts/            # 레이아웃 컴포넌트
│   ├── lib/                    # 유틸리티 함수
│   │   ├── api.ts              # API 클라이언트
│   │   ├── auth.ts             # 인증 로직
│   │   └── utils.ts            # 헬퍼 함수
│   ├── hooks/                  # Custom Hooks
│   ├── store/                  # 상태 관리
│   ├── types/                  # TypeScript 타입
│   └── styles/                 # 전역 스타일
├── public/                     # 정적 파일
├── tests/                      # 테스트 파일
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                       # 문서
├── .env.example                # 환경 변수 예시
├── .eslintrc.js                # ESLint 설정
├── .prettierrc                 # Prettier 설정
├── tsconfig.json               # TypeScript 설정
├── next.config.js              # Next.js 설정
├── package.json
└── README.md
```

## 4. 데이터베이스 스키마

### 4.1 ERD (Entity Relationship Diagram)

```
┌─────────────┐         ┌─────────────┐
│    User     │         │    Post     │
├─────────────┤         ├─────────────┤
│ id          │────┐    │ id          │
│ email       │    │    │ title       │
│ name        │    │    │ content     │
│ password    │    └────│ userId      │
│ createdAt   │         │ createdAt   │
└─────────────┘         └─────────────┘
```

### 4.2 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}
```

## 5. API 엔드포인트

### 5.1 인증 API

#### POST /api/auth/register
회원가입

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "clx123...",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### POST /api/auth/login
로그인

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "clx123...",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 5.2 게시글 API

#### GET /api/posts
게시글 목록 조회

**Query Parameters:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 개수 (기본값: 10)

**Response (200):**
```json
{
  "posts": [
    {
      "id": "clx456...",
      "title": "First Post",
      "content": "Content...",
      "author": {
        "id": "clx123...",
        "name": "John Doe"
      },
      "createdAt": "2026-02-11T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

---

#### POST /api/posts
게시글 작성

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "title": "New Post",
  "content": "Post content..."
}
```

**Response (201):**
```json
{
  "post": {
    "id": "clx789...",
    "title": "New Post",
    "content": "Post content...",
    "createdAt": "2026-02-11T10:00:00Z"
  }
}
```

## 6. 주요 컴포넌트

### 6.1 LoginForm

**경로:** `src/components/forms/LoginForm.tsx`

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // 로그인 로직
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

---

### 6.2 PostList

**경로:** `src/components/PostList.tsx`

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/api';

export function PostList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {data?.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

## 7. 환경 변수

### 7.1 .env.example

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Auth
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"

# API
API_URL="http://localhost:3000/api"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# External Services
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 7.2 환경별 설정

| 환경 | 파일 | 용도 |
|------|------|------|
| Development | `.env.local` | 로컬 개발 |
| Test | `.env.test` | 테스트 환경 |
| Production | `.env.production` | 프로덕션 |

## 8. 구현 체크리스트

### 8.1 기능 구현
- [ ] 사용자 인증 (회원가입, 로그인, 로그아웃)
- [ ] 게시글 CRUD
- [ ] 댓글 기능
- [ ] 검색 기능
- [ ] 페이지네이션

### 8.2 보안
- [ ] 입력 검증 (Zod)
- [ ] XSS 방지
- [ ] CSRF 토큰
- [ ] Rate Limiting
- [ ] SQL Injection 방지 (ORM 사용)

### 8.3 성능 최적화
- [ ] 이미지 최적화 (Next.js Image)
- [ ] 코드 스플리팅
- [ ] 레이지 로딩
- [ ] 캐싱 (Redis)
- [ ] CDN 설정

### 8.4 테스트
- [ ] 단위 테스트 (Jest)
- [ ] 통합 테스트
- [ ] E2E 테스트 (Playwright)
- [ ] 테스트 커버리지 >= 80%

### 8.5 문서화
- [ ] README 작성
- [ ] API 문서 (Swagger/OpenAPI)
- [ ] 코드 주석
- [ ] 배포 가이드

## 9. 개발 가이드

### 9.1 설치 및 실행

```bash
# 의존성 설치
npm install

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

### 9.2 코드 스타일

```bash
# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format

# 타입 체크
npm run type-check
```

### 9.3 Git 워크플로우

```bash
# 새 기능 브랜치 생성
git checkout -b feature/user-authentication

# 작업 커밋
git add .
git commit -m "feat: add user login functionality"

# 푸시
git push origin feature/user-authentication

# Pull Request 생성 후 리뷰
```

## 10. 배포 가이드

### 10.1 Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### 10.2 환경 변수 설정
Vercel Dashboard에서 Environment Variables 설정

### 10.3 도메인 연결
- Custom Domain 추가
- DNS 설정

## 11. 트러블슈팅

### 11.1 일반적인 문제

#### 문제: 데이터베이스 연결 실패
**해결방법:**
```bash
# DATABASE_URL 확인
echo $DATABASE_URL

# Prisma 재생성
npx prisma generate
```

#### 문제: 빌드 에러
**해결방법:**
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

## 12. 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Prisma 문서](https://www.prisma.io/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [React 문서](https://react.dev/)

## 13. 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| {날짜} | 1.0 | 초기 구현 완료 | {이름} |
| {날짜} | 1.1 | 버그 수정 및 최적화 | {이름} |

---

## 코드 리뷰

- [ ] 자체 리뷰 완료
- [ ] 동료 리뷰 완료
- [ ] QA 테스트 통과

**리뷰어**: {이름}
**리뷰일**: {날짜}
