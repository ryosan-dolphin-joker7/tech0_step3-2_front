"use client"; // このコードがクライアントサイドで動作することを指定

import React, { useRef, useEffect, useState } from "react"; // Reactの基本機能に加えて、useRef、useEffect、useStateをインポート
import Grid from "@mui/material/Grid"; // MUIのGridコンポーネントをインポート。レイアウトに使用します。
import FullCalendar from "@fullcalendar/react"; // FullCalendarのメインコンポーネントをインポート。カレンダーを表示します。
import dayGridPlugin from "@fullcalendar/daygrid"; // 月表示用のプラグインをインポート。カレンダーの月ビューを提供します。
import interactionPlugin from "@fullcalendar/interaction"; // クリックやドラッグの操作を可能にするプラグインをインポート
import timeGridPlugin from "@fullcalendar/timegrid"; // 週表示や日表示用のプラグインをインポート
import Post_Todo from "@/components/posts/post_todo"; // フッターに表示するコンポーネントをインポート
import Table_Todo from "@/components/calendar_table_todo"; // カレンダーの下に表示するテーブルコンポーネントをインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート。データベースにアクセスするために使用します。

// Slide_Calendarコンポーネントを定義。カレンダーと関連コンテンツを表示します。
export default function Slide_Calendar() {
  const calendarRef = useRef(null); // カレンダーにアクセスするためのリファレンスを作成
  const [events, setEvents] = useState([]); // カレンダーに表示するイベントデータを保持するためのステートを定義

  // useEffectフックを使用して、コンポーネントがマウントされた後にカレンダーのサイズを更新
  useEffect(() => {
    if (calendarRef.current) {
      // カレンダーがマウントされた後にサイズを強制的にリフレッシュ
      calendarRef.current.getApi().updateSize();
    }
  }, []); // 依存配列が空のため、初回マウント時に一度だけ実行

  // useEffectフックを使用して、SupabaseからTodoデータを取得し、それをカレンダーに表示するイベントに変換
  useEffect(() => {
    const fetchEvents = async () => {
      // Supabaseから「todos」テーブルのデータを全件取得
      const { data, error } = await supabase.from("todos").select("*");

      if (error) {
        // データ取得にエラーが発生した場合は、エラーメッセージをコンソールに表示
        console.error("Error fetching events:", error);
      } else {
        // 取得したデータをFullCalendarで使用できる形式に変換
        const formattedEvents = data.map((item) => ({
          title: item.title, // Todoのタイトルをイベント名として設定
          start: item.end_date, // Todoの終了日をイベントの開始日に設定
          // 他にも必要に応じてイベントのプロパティを追加可能
        }));

        // 変換したイベントデータをステートに設定し、カレンダーに表示
        setEvents(formattedEvents);
      }
    };

    fetchEvents(); // データ取得関数を実行
  }, []); // 空の依存配列により、コンポーネントがマウントされたときにのみ実行

  return (
    <div>
      {/* カレンダーをグリッドレイアウトで中央に配置 */}
      <Grid container spacing={2} justifyContent="center">
        {/* グリッド内の1つのアイテムとしてカレンダーを配置 */}
        <Grid item xs={12} sm={10} md={8} lg={6}>
          {/* FullCalendarを囲むdiv要素でスタイルを適用 */}
          <div style={{ maxWidth: "100%", fontSize: "0.8em" }}>
            <FullCalendar
              ref={calendarRef} // カレンダーにリファレンスを設定して、後でアクセスできるようにする
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} // プラグインを使用してカレンダーの機能を追加
              initialView="dayGridMonth" // カレンダーの初期表示を「月」ビューに設定
              headerToolbar={{
                left: "prev,next today", // ヘッダーの左側に「前」「次」「今日」ボタンを配置
                center: "title", // ヘッダーの中央にカレンダーのタイトルを表示
                right: "dayGridMonth,timeGridWeek,timeGridDay", // ヘッダーの右側に「月」「週」「日」ビュー切り替えボタンを配置
              }}
              events={events} // Supabaseから取得したイベントをカレンダーに表示
              height={400} // カレンダー全体の高さを400ピクセルに設定
              contentHeight={400} // カレンダーのコンテンツ部分の高さを400ピクセルに設定
              aspectRatio={2} // カレンダーの縦横比を設定。セルのサイズを調整します。
              dayMaxEventRows={true} // イベントが多い場合にセル内で折り返して表示する設定
              windowResize={() => {
                // ウィンドウがリサイズされたときにもカレンダーのサイズを再計算
                if (calendarRef.current) {
                  calendarRef.current.getApi().updateSize();
                }
              }}
            />
          </div>
        </Grid>
      </Grid>

      {/* テーブルをグリッドレイアウトで中央に配置 */}
      <Grid container spacing={2} justifyContent="center">
        {/* グリッド内の1つのアイテムとしてテーブルを配置 */}
        <Grid item xs={12} sm={10} md={8} lg={6}>
          {/* テーブルコンポーネントを囲むdiv要素を作成 */}
          <div
            style={{
              textAlign: "center", // テーブル全体を中央揃えにする
              maxHeight: "300px", // テーブルの最大高さを300ピクセルに設定
              overflowY: "auto", // テーブルの高さを超えた部分にスクロールバーを表示
              fontSize: "0.8em", // テーブル内の文字サイズを小さめに設定
              padding: "10px", // テーブルの内側に余白を設定
            }}
          >
            <Table_Todo />{" "}
            {/* カレンダー下部に表示するテーブルコンポーネント */}
          </div>
        </Grid>
      </Grid>

      {/* フッターコンテンツをグリッドレイアウトで中央に配置 */}
      <Grid container spacing={2} justifyContent="center">
        {/* グリッド内の1つのアイテムとしてフッターを配置 */}
        <Grid item xs={12} sm={10} md={8} lg={6}>
          {/* フッターコンテンツを囲むdiv要素を作成 */}
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Post_Todo /> {/* フッター部分に表示するコンポーネント */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
