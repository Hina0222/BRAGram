# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
pnpm dev              # 개발 서버 (포트 3001)
pnpm build            # 프로덕션 빌드
pnpm lint             # ESLint
pnpm format           # Prettier 포맷
pnpm format:check     # Prettier 체크만
```

## 아키텍처

### FSD(Feature-Sliced Design) 레이어 (`src/`)

- **`entities/`** — 도메인 모델별 Query Key 팩토리 (comment, feed, mission, pet, ranking, user)
- **`features/`** — 기능 단위 슬라이스. 각 feature는 `api/`, `hooks/`, `model/`, `ui/` 하위 구조
- **`pages/`** — 라우트별 페이지 컴포넌트. App Router의 `app/`에서 re-export
- **`shared/`** — 공용 유틸리티 (api, boundary, hooks, lib, store, ui)
- **`widgets/`** — 페이지 수준 재사용 컴포넌트 (bottom-nav, header, pet)

### 라우팅

`/app/` 디렉토리는 Next.js App Router 엔트리포인트이며, 실제 컴포넌트는 `/src/pages/`에서 re-export한다.

- `(tabs)` route group으로 탭 네비게이션 레이아웃 공유
- `@modal/(.)feed/[id]` — 피드 상세 인터셉팅 모달 (병렬 라우트)

### 데이터 페칭 패턴

**Query Key Factory** (`entities/[entity]/model/[entity].query-key.ts`):

```typescript
export const feedQueryKeys = {
  all: ['feeds'],
  list: (params?) => [...feedQueryKeys.all, params],
  detail: (id: number) => [...feedQueryKeys.all, 'detail', id],
};
```

**Query/Mutation Hook** (`features/[feature]/api/`):

- `useGet*Query()` / `useGet*InfiniteQuery()` — 데이터 조회
- `get*QueryOptions()` — ServerFetchBoundary에 전달할 옵션 팩토리
- Mutation hook은 `onSuccess`에서 관련 query를 invalidate

**서버 프리페치 + 클라이언트 하이드레이션**:

```tsx
<ServerFetchBoundary queryOptions={getFeedsInfiniteQueryOptions()}>
  <FeedList/> {/* useSuspenseInfiniteQuery로 하이드레이션된 데이터 사용 */}
</ServerFetchBoundary>
```

**무한 스크롤**: cursor 기반 페이지네이션 + `react-intersection-observer`

### Boundary 컴포넌트 조합

```typescript
export default withErrorBoundary(
  withSuspense(FeedList, <FeedListSkeleton / >),
  FeedListError
);
```

### API 클라이언트

- `shared/api/axios-instance.ts` — withCredentials, SSR 쿠키 전달, 401 자동 토큰 리프레시
- `shared/api/api-client.ts` — 제네릭 래퍼 (`apiClient.get<T>()`)
- `shared/api/api-routes.constants.ts` — 엔드포인트 상수 (동적 경로는 함수)
- 응답 인터셉터가 `response.data.data`를 반환하므로, 타입은 내부 data 기준으로 정의

### 인증

- **Zustand** `useAuthStore` — 유저 정보 + 초기화 플래그
- `AuthInitializer` — 앱 마운트 시 `/auth/refresh` → `/users/me` 호출
- 쿠키 기반 액세스 토큰, axios 인터셉터에서 자동 리프레시

### 폼 패턴

- React Hook Form + Zod (`zodResolver`) 조합
- feature별 커스텀 훅으로 폼 로직 캡슐화 (`useCreatePetForm`, `useProfileUpdateForm`)
- 스키마는 `features/[feature]/model/schema.ts`에 정의

### 스타일링

- Tailwind CSS v4 + shadcn/ui 컴포넌트 (`shared/ui/`)
- `cn()` 유틸리티 — `clsx` + `tailwind-merge`
- Pretendard Variable 폰트 (로컬)
- 다크/라이트 모드 지원 (`next-themes`)
- 토스트: `sonner`

## 개발 규칙

- 새 feature 추가 시 `features/[feature]/` 하위에 `api/`, `ui/`, `model/` 디렉토리 구조를 따른다
- Query Key는 반드시 `entities/`의 팩토리를 사용한다 — 문자열 직접 사용 금지
- 페이지 컴포넌트는 `src/pages/`에 작성하고 `app/` 라우트에서 re-export한다
- `ServerFetchBoundary`로 서버 프리페치 시 반드시 대응하는 `useSuspenseQuery`를 클라이언트에서 사용한다
- API 엔드포인트 추가 시 `api-routes.constants.ts`에 상수를 먼저 정의한다
