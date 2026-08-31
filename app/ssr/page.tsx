import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import styles from "./page.module.css";

// このページはリクエストのたびにレンダリングする（SSR）
export const dynamic = "force-dynamic";

export default async function SsrPage() {
  const renderedAt = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
  // Workersのリクエスト情報（cfプロパティ）はアダプター経由で取得する
  const { cf } = getCloudflareContext();

  return (
    <main className={styles.main}>
      <h1>オンデマンドレンダリングのページ</h1>
      <p>
        このページはリクエストのたびにWorkers上でレンダリングされます。リロードするたびに、下の時刻が変わります。
      </p>
      <dl className={styles.info}>
        <dt>レンダリング時刻</dt>
        <dd>{renderedAt}</dd>
        <dt>リクエストを受けたデータセンター</dt>
        <dd>{cf?.colo ?? "（ローカルでは取得できません）"}</dd>
        <dt>リクエスト元の国</dt>
        <dd>{cf?.country ?? "（ローカルでは取得できません）"}</dd>
      </dl>
      <Link href="/">トップページへ戻る</Link>
    </main>
  );
}
