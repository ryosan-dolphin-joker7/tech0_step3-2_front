import styles from "./LoadingScreen.module.css"; // CSSモジュールをインポート
import { useState, useEffect } from "react"; // ReactのuseStateとuseEffectフックをインポート

const LoadingScreen = ({ minimumLoadingTime = 3000 }) => {
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を管理するステート
  const [fadeOut, setFadeOut] = useState(false); // フェードアウト状態を管理するステート

  useEffect(() => {
    // 指定された時間が経過したらフェードアウトを開始するタイマーを設定
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true); // フェードアウト状態をtrueにする
    }, minimumLoadingTime);

    // フェードアウトが完了した後にローディング画面を非表示にするタイマーを設定
    const hideTimer = setTimeout(() => {
      setIsLoading(false); // ローディング状態をfalseにする
    }, minimumLoadingTime + 500); // フェードアウト時間(500ms)を考慮

    // クリーンアップ関数：コンポーネントがアンマウントされる時にタイマーをクリア
    return () => {
      clearTimeout(fadeOutTimer); // フェードアウトタイマーをクリア
      clearTimeout(hideTimer); // 非表示タイマーをクリア
    };
  }, [minimumLoadingTime]); // minimumLoadingTimeが変更された場合にuseEffectを再実行

  // ローディングが終わったら、nullを返してコンポーネントを非表示にする
  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`${styles.container} ${
        fadeOut ? styles.fadeOut : styles.fadeIn // フェードイン・フェードアウトのクラスを切り替え
      }`}
    >
      <h1 className={styles.title}>Wan Push</h1>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
