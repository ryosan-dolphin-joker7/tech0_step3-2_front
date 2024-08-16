"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function FormWrapper() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await signIn("user", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      // ログイン失敗時の処理
    } else {
      // ログイン成功時トップページへリダイレクト
      location.href = "/";
    }
  };

  return (
    <form
      className="max-w-[450px] w-full mx-auto border rounded-xl p-4 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-5">
        <label className="font-bold mb-2">メールアドレス</label>
        <input
          {...register("email")}
          type="email"
          className="border p-2 w-full"
          placeholder="メールアドレス"
        />
      </div>

      <div className="mb-5">
        <label className="font-bold mb-2">パスワード</label>
        <input
          {...register("password")}
          type="password"
          className="border p-2 w-full"
          placeholder="パスワード"
        />
      </div>

      <div className="flex justify-center">
        <button
          className="max-w-[250px] py-3 text-sm bg-blue-500 text-white rounded-lg"
          type="submit"
        >
          ログイン
        </button>
      </div>
    </form>
  );
}
