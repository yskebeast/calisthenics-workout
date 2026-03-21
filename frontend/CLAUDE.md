@AGENTS.md

## Stack

- Next.js 16.2.0 — App Router のみ使用。`pages/` ディレクトリは作らない
- React 19.2.4
- TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss` 方式。`tailwind.config.js` は存在しない)
- better-auth v1.x — 認証ライブラリ
- pnpm — パッケージマネージャ。`npm install` / `yarn add` は使わない
- MySQL — better-auth のセッションDB (mysql2/promise で接続)

## Directory Structure

```
app/                    # App Router ルート
  api/auth/[...all]/    # better-auth の Route Handler
  signin/               # サインイン・サインアップページ
  mypage/               # 認証済みユーザーページ
lib/
  auth.ts               # better-auth サーバー設定 (Server側のみ import)
  auth-client.ts        # better-auth クライアント設定 (Client側のみ import)
```

## Server / Client Component の使い分け

- デフォルトは **Server Component**
- `useState`, `useEffect`, イベントハンドラが必要な場合のみ `"use client"` を付ける
- Server Component からは `@/lib/auth` を import する
- Client Component からは `@/lib/auth-client` を import する

## 認証 (better-auth)

**サーバーサイドでのセッション取得:**
```ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({ headers: await headers() });
if (!session) redirect("/signin");
```

**クライアントサイドでのセッション取得:**
```ts
import { authClient } from "@/lib/auth-client";

const { data: session } = authClient.useSession();
```

**ログイン / サインアップ:**
```ts
await authClient.signIn.email({ email, password });
await authClient.signUp.email({ email, password, name });
await authClient.signOut();
```

## コンポーネント構成

コンポーネントはフォルダ単位で作成する。

```
ComponentName/
  index.tsx      # コンポーネント本体 (JSXのみ、ロジックは持たない)
  useHooks.ts    # カスタムフック (state・ロジック・イベントハンドラ)
```

**ルール:**
- JSX は `index.tsx` に書き、ロジックは `useHooks.ts` のカスタムフックに切り出す
- `index.tsx` はカスタムフックを呼び出して props/handlers を受け取るだけにする
- ページ固有のコンポーネントは `app/<route>/ComponentName/` に置く
- 複数ページで使う共通コンポーネントは `components/ComponentName/` に置く

**例:**
```ts
// SignInForm/useHooks.ts
export function useSignInForm() {
  const [email, setEmail] = useState("");
  // ...
  return { email, setEmail, handleSubmit };
}

// SignInForm/index.tsx
export default function SignInForm() {
  const { email, setEmail, handleSubmit } = useSignInForm();
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## スタイリング

- Tailwind CSS v4 のユーティリティクラスのみ使用
- カラーパレットは `zinc` 系を基調とする (既存ページに合わせる)
- CSS Modules / styled-components / inline style は使わない

## 環境変数

`.env` はリポジトリルート (`../`) に置かれており、`next.config.ts` で `dotenv.config` により読み込まれる。

| 変数名 | 用途 |
|---|---|
| `NEXT_PUBLIC_APP_URL` | better-auth クライアントのベースURL |
| `DB_HOST` / `DB_USER` / `DB_PASSWORD` / `DB_NAME` / `DB_PORT` | MySQL接続情報 |

## Export スタイル

- ページ・レイアウト: `export default function` (Next.js の要件)
- コンポーネント: `export function ComponentName()` (named export、`{}` でimport)
- カスタムフック・ユーティリティ: `export function useHooks()`
- `export const` + アロー関数はコンポーネント・フックには使わない

## API クライアント (orval)

`schema/openapi/openapi.yaml` から orval で fetch クライアントを自動生成する。

```bash
pnpm generate:api   # lib/api/ を再生成
```

生成物:
- `lib/api/calisthenicsWorkout.schemas.ts` — 型定義
- `lib/api/default/default.ts` — fetch 関数

使い方:
```ts
import { userProfileShow, userProfileCreate } from "@/lib/api/default/default";
```

APIスキーマを変更したときは `schema/` で `pnpm build` → `frontend/` で `pnpm generate:api` の順で実行する。

## Do NOT

- `pages/` ディレクトリを作成しない
- `tailwind.config.js` を新規作成しない (v4では不要)
- `lib/auth.ts` を Client Component から import しない (サーバー専用)
- `lib/auth-client.ts` を Server Component / Route Handler から import しない
- `lib/api/` を直接編集しない (orval の生成物。`pnpm generate:api` で上書きされる)
