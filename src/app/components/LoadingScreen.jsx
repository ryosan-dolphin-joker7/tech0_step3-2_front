// components/LoadingScreen.jsx
import styles from "./LoadingScreen.module.css"; // CSSモジュールを使用
import { useState, useEffect } from "react";

const LoadingScreen = ({ minimumLoadingTime = 3000 }) => {
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を管理
  const [fadeOut, setFadeOut] = useState(false); // フェードアウト状態を管理

  useEffect(() => {
    const loadMinimumTime = new Promise((resolve) =>
      setTimeout(resolve, minimumLoadingTime)
    );

    loadMinimumTime.then(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 500); // フェードアウト後に非表示にする
    });
  }, [minimumLoadingTime]);

  if (!isLoading) {
    return null; // ローディングが終わったら画面を非表示にする
  }

  return (
    <div
      className={`${styles.container} ${
        fadeOut ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <h1 className={styles.title}>Wan Push</h1>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
