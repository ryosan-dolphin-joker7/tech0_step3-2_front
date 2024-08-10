// src/app/test_component/page.jsx
"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/supabaseClient";
import OneCustomerInfoCard from "@/components/one_customer_info_card.jsx"; // 顧客情報を表示するコンポーネントをインポートしています。
import fetchCustomers from "@/fetchCustomers"; // 顧客データを取得する関数をインポートしています。

export default function Page() {
  const [customerInfos, setCustomerInfos] = useState([]); // 顧客情報を格納するための状態を初期化しています。

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // コンポーネントがマウントされたときに顧客データを取得して状態に設定する処理を定義しています。
  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomers(); // fetchCustomers関数を呼び出し、顧客データを取得しています。
        setCustomerInfos(customerData); // 取得した顧客データを状態に設定しています。
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchAndSetCustomer(); // コンポーネントがマウントされたときにfetchAndSetCustomer関数を実行します。
  }, []); // 第二引数に空配列を指定することで、このuseEffectはコンポーネントのマウント時に一度だけ実行されます。

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) throw error;
      setItems(data || []); // データがnullの場合に空配列を設定
    } catch (error) {
      setError("データの取得に失敗しました: " + error.message);
    }
  };

  return (
    <>
      <h1>宿題パッケージを使ったタスク画面</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="p-4">
        <Link href="/customers/create" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            NameCard_Create
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customerInfos.map((customerInfo, index) => (
          <div
            key={index} // 顧客情報の一意な識別子としてインデックスを使用しています。
            className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4"
          >
            <OneCustomerInfoCard {...customerInfo} />
            {/* 顧客情報を表示するコンポーネントをレンダリングしています。 */}
            <div className="card-body flex flex-col justify-between">
              <Link href={`/customers/read/${customerInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Read
                </button>
              </Link>
              <Link href={`/customers/update/${customerInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Update
                </button>
              </Link>
              <Link href={`/customers/delete/${customerInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Delete
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link href="/">
          <button className="btn btn-primary m-4 text-2xl">戻る</button>
        </Link>
      </div>
    </>
  );
}
