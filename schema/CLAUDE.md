# Schema (TypeSpec)

TypeSpec でAPIスキーマを定義し、OpenAPI 経由で Rails の enums を生成するサブプロジェクト。

## Stack

- TypeSpec (`@typespec/compiler`, `@typespec/http`, `@typespec/openapi3`)
- pnpm

## ディレクトリ構成

```
src/
  main.tsp           # エントリポイント。@service と @route の定義
  models/            # モデル・リクエスト/レスポンス型の定義
  routes/            # インターフェース (エンドポイント) の定義
openapi/
  openapi.yaml       # コンパイル生成物 (編集しない)
scripts/
  generate_rails_enums.js  # openapi.yaml → backend/app/constants/enums.rb
```

## コマンド

```bash
pnpm build           # TypeSpec → OpenAPI → enums.rb (すべて実行)
pnpm compile         # TypeSpec → openapi/openapi.yaml のみ
pnpm generate:enums  # openapi.yaml → backend/app/constants/enums.rb のみ
```

## ファイル追加の手順

新しいリソースを追加するときは以下の順で作成する。

1. `src/models/<resource>.tsp` — モデル・リクエスト型を namespace で定義
2. `src/routes/<resource>.tsp` — `interface` でエンドポイントを定義
3. `src/main.tsp` — import を追加し、`@service` namespace 内に `@route` + `interface` を追加

**重要: `main.tsp` の `@service` namespace に `@route` + `op` として登録しないと、`components/schemas` に出力されず enums も生成されない。**

## 命名規則

- ファイル名: snake_case (`user_profile.tsp`)
- namespace: PascalCase (`UserProfileModel`)
- モデル名: PascalCase (`UserProfile`, `CreateUserProfileRequest`)
- インターフェース名: PascalCase + `Routes` suffix (`UserProfileRoutes`)

## レスポンス型の書き方

```tsp
@get
show(): {
  @statusCode statusCode: 200;
  @body data: SomeModel.SomeModel;
} | {
  @statusCode statusCode: 404;
  @body error: { error: string };
};
```

## Do NOT

- `openapi/openapi.yaml` を直接編集しない (コンパイルで上書きされる)
- `backend/app/constants/enums.rb` を直接編集しない (スクリプトで上書きされる)
- モデルを `main.tsp` の `@service` に繋げずに定義だけしない (OpenAPIに出力されない)
