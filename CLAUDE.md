# 프로젝트 개요
- 개인 블로그 웹사이트
- MDX 기반 콘텐츠 관리
- 다크모드 지원

## 주요 기술 스택
### 프레임워크 & 런타임
- Next.js 14 (App Router)
- React 18
- TypeScript

### 스타일링 & UI
- Tailwind CSS + Typography 플러그인
- shadcn/ui (Radix UI 기반 컴포넌트, 모달/다이얼로그/폼 등)
- Framer Motion (애니메이션)

### 콘텐츠 관리
- Contentlayer (MDX 관리)
- rehype/remark 플러그인 (코드 하이라이팅, 링크 처리)

### 기타
- next-themes (다크모드)
- dayjs (날짜/시간 처리)

## 빌드 및 실행
- 개발: `npm run dev`
- 빌드: `npm run build`
- 프로덕션: `npm start`
- 린트: `npm run lint` 또는 `npm run lint:fix`

## 프로젝트 구조
- `src/app`: Next.js App Router 페이지
  - `/posts`: 블로그 포스트 목록 및 상세
  - `/notes`: 노트 목록 및 상세
  - `/tags`: 태그별 포스트 분류
  - `/about`: 소개 페이지
- `src/components`: 재사용 가능한 컴포넌트
  - `post-detail/`: 포스트 상세 페이지 관련 컴포넌트
  - `ui/`: shadcn/ui 기반 UI 컴포넌트
- `src/constants`: 상수 정의 (네비게이션 링크 등)
- `src/utils`: 유틸리티 함수
- `src/api`: 포스트/노트 데이터를 조회하는 클라이언트 헬퍼 함수
- `content`: MDX 기반 포스트/노트 원본 콘텐츠

## 중요한 파일
- `contentlayer.config.ts`: MDX 콘텐츠 정의 및 설정
- `src/app/layout.tsx`: 전역 레이아웃
- `src/components/post-detail/mdx.tsx`: MDX 커스텀 컴포넌트
- `tailwind.config.ts`: Tailwind 설정

## 포스트 추가 가이드라인

- 새 포스트는 레포지토리 루트의 `content/posts` 디렉터리에 `kebab-case-slug.mdx` 형식의 파일로 추가한다.
  - 예: `vscode-profile.mdx`, `react-use-optimistic.mdx`, `vue-rendering.mdx`
- 파일 상단에는 아래와 같은 frontmatter 블록을 작성한다.

```md
---
title: "포스트 제목"
description: 포스트 내용을 한 줄로 요약하는 문장
date: YYYY-MM-DD HH:mm:ss
toc: true | false
tags:
  - 태그1
  - 태그2
---
```

- 필드 규칙:
  - `title` (필수): 포스트의 메인 제목으로 사용된다.
  - `description` (필수): 목록/메타 설명에 사용되므로 한두 문장으로 핵심 내용을 요약한다.
  - `date` (필수): 발행 기준 시각(한국 시간)을 `YYYY-MM-DD HH:mm:ss` 형식으로 작성한다.
  - `toc` (선택): 목차 노출 여부를 제어한다. 기본값은 `true`를 권장한다.
  - `tags` (선택): 검색/분류에 사용할 키워드를 배열로 작성한다. (예: `vscode`, `cursor`, `vscode profile`)

## 주의사항
- 반응형 디자인 필수
- 접근성 고려 (jsx-a11y)
- 새 포스트를 추가하거나 기존 포스트를 크게 수정한 경우, 가능하면 `npm run lint`와 `npm run build`를 실행해 타입/빌드 에러가 없는지 확인한다.
