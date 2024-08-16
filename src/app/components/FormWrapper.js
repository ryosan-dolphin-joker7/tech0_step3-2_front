"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function FormWrapper() {
  // フォーム関連の変数定義
  const { control, handleSubmit } =
    useForm <
    InputProps >
    {
      defaultValues: {
        email: "",
        password: "",
      },
    };

  // フォーム送信処理
  const onSubmit = async (data) => {
    const result = await signIn("user", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      // ログイン失敗時処理
    } else {
      // ログイン成功時トップページへリダイレクト
      location.href = "/";
    }
  };

  return (
    <>
      <form
        className="max-w-[450px] w-full mx-auto border rounded-xl p-4 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <div className="font-bold mb-2">メールアドレス</div>
          <div className="flex items-start gap-8">
            <InputControl name="email" type="email" control={control} />
          </div>
        </div>

        <div className="mb-5">
          <div className="font-bold mb-2">パスワード</div>
          <div className="flex items-start gap-8">
            <InputControl name="password" type="password" control={control} />
          </div>
        </div>

        <div className="flex justify-center">
          <GreenButton
            element="button"
            className="max-w-[250px] py-3 text-sm"
            type="submit"
          >
            ログイン
          </GreenButton>
        </div>
      </form>
    </>
  );
}
