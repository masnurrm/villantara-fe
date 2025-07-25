import { cn } from "@/lib/utils"
import React from "react"
import {
  Home,
  Map,
  ShoppingCart,
  Settings,
  LogOut,
  List,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

type Role = "BUMDES" | "Villager" | "Corporate"

interface NavItem {
  name: string
  icon: React.ReactNode
  path: string
  roles: Role[]
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <Home size={18} />,
    roles: ["Villager", "BUMDES"],
  },
  {
    name: "Estimate Capture",
    path: "/estimate",
    icon: <Map size={18} />,
    roles: ["BUMDES"],
  },
  {
    name: "Recommendation",
    path: "/recommendation",
    icon: <List size={18} />,
    roles: ["BUMDES"],
  },
  {
    name: "Marketplace",
    path: "/marketplace",
    icon: <ShoppingCart size={18} />,
    roles: ["BUMDES", "Villager", "Corporate"], 
  },
]

export default function Sidebar({ role = "BUMDES" }: { role?: Role }) {
  const { pathname } = useLocation()

  return (
    <aside className="h-screen w-60 bg-white border-r flex flex-col justify-between py-6 px-4 rounded-tr-3xl rounded-br-3xl">
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-foreground">
          <img src="/icons/leaf-icon.svg" alt="Logo" className="w-6 h-6" />
          Villantara
        </div>

        {/* Navigation */}
        <ul className="space-y-4">
          {navItems.map(({ name, icon, path, roles }) => {
            const isAllowed = roles.includes(role)
            const isActive = pathname === path
            return (
              <li key={name}>
                <Link
                  to={isAllowed ? path : "#"}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    isAllowed
                      ? isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-primary"
                      : "text-gray-300 cursor-not-allowed"
                  )}
                >
                  {icon}
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Bottom */}
      <div className="space-y-4">
        <Link
          to="/settings"
          className="flex items-center gap-2 text-sm text-foreground hover:text-primary"
        >
          <Settings size={18} />
          Settings
        </Link>
        <button className="flex items-center gap-2 text-sm text-foreground hover:text-destructive">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
