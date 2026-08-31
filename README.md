# Next.jsのサイトをWorkersにデプロイする

CodeGridの連載「Webサイトホスティングで使うCloudflare Workers」第3回のサンプルです。Next.jsで作ったサイトをCloudflare Workersにデプロイし、静的エクスポート（SSG）とOpenNextアダプターによるSSRの両方を動かすところまでを扱います。

記事の手順を1ステップずつコミットに分けていますので、`git log`を追いながら、どのファイルがどの段階で変わったのかを確認できます。

## コミットの流れ

| コミット | 内容 | 記事の対応箇所 |
| :--- | :--- | :--- |
| `Initial commit from create-next-app` | `npx create-next-app@latest`（App Router、TypeScript） | Next.jsの準備 |
| 静的エクスポートを有効にして… | `output: 'export'`と、`out`を配信する`wrangler.jsonc` | SSGの場合 |
| next/imageのデフォルトの… | `images.unoptimized`の指定 | 静的エクスポートと画像最適化 |
| OpenNextアダプターを導入して… | `npx opennextjs-cloudflare migrate`が生成した各ファイル | SSRの場合（OpenNext） |
| オンデマンドレンダリング（SSR）の… | `dynamic = 'force-dynamic'`の`/ssr`と、`/api/hello` | SSRアダプターの導入 |

なお、SSRに切り替える段階で、静的エクスポート用の設定（`output: 'export'`と`images.unoptimized`）は`next.config.ts`から削除しています。`migrate`コマンドはここまでは面倒を見てくれないので、残したままだとOpenNextのビルドが失敗します。

## 動かし方

依存パッケージをインストールします。

```
npm install
```

Next.jsの開発サーバーで確認する場合は次のとおりです。ただし、この方法ではWorkersのランタイム（workerd）は使われず、Node.jsで動きます。

```
npm run dev
```

workerd上での挙動を確認したい場合は、ビルドしてからWranglerの開発サーバーを起動します。`npm run preview`がその両方をまとめて実行します。

```
npm run preview
```

`/`は静的なページ、`/ssr`はリクエストのたびにレンダリングされるページです。リロードするたびに表示時刻が変わることを確認してみてください。`/api/hello?name=CodeGrid`は、リクエストの内容を読むRoute Handlerです。存在しないパス（`/no-such-page`など）にアクセスすると404が返ります。

## デプロイ

Cloudflareアカウントにログインした状態でデプロイします。

```
npm run deploy
```

いきなり本番に反映せず、プレビュー用のURLで確認したい場合は次のようにします。実行後に出力される`Version Preview URL:`のURLでプレビューできます。

```
npm run upload
```

なお、`wrangler.jsonc`の`name`は`2026-workers-hosting-nextjs`にしてありますので、自分のアカウントにデプロイする際は適宜変更してください。`services`の`WORKER_SELF_REFERENCE`は`name`と一致させる必要がある点に注意してください。

## 補足

`cloudflare-env.d.ts`は自動生成されるファイルのため、リポジトリには含めていません。型が必要な場合は次のコマンドで生成できます。

```
npm run cf-typegen
```
