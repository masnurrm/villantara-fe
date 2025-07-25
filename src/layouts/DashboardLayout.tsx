import Sidebar from "@/constant/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const ROLES = ["BUMDES", "Villager", "Corporate"] as const;
type Role = (typeof ROLES)[number];

function isValidRole(role: any): role is Role {
  return ROLES.includes(role);
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const fallbackRole: Role = "BUMDES";
  const role = isValidRole(user?.role) ? user?.role : fallbackRole;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
