import AuthForm from "@/components/auth/AuthForm";

export default function RoleSelectorPage({ mode }: { mode: "login" | "register" }) {
  return <AuthForm mode={mode} />;
}