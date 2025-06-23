import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

const schema = yup.object({
  email: yup
    .string()
    .required("メールアドレスは必須です")
    .email("有効なメールアドレスを入力してください"),
  password: yup
    .string()
    .required("パスワードは必須です")
    .min(6, "パスワードは6文字以上で入力してください"),
});

type LoginFormData = yup.InferType<typeof schema>;

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("ログインしました");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            管理画面にログイン
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register("email")}
              type="email"
              label="メールアドレス"
              error={errors.email?.message}
              autoComplete="email"
            />
            <Input
              {...register("password")}
              type="password"
              label="パスワード"
              error={errors.password?.message}
              autoComplete="current-password"
            />
          </div>

          <div>
            <Button type="submit" loading={loading} className="w-full">
              ログイン
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
