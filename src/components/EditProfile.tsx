// components/EditProfile.jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, LogOut, Settings, User } from "lucide-react" 
export default function EditProfile() {
  return (
    <div className="p-4 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <ChevronLeft className="w-6 h-6 text-gray-700" />
        <span className="text-base font-medium text-gray-700">Tom Lembong</span>
        <div className="w-6 h-6"></div> 
      </div>

      {/* Profile Info */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg font-bold">
          TL
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Tom Lembong</h2>
          <p className="text-sm text-muted-foreground">tom.lembong@gmail.com</p>
        </div>
      </div>

      {/* Edit Form Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="nama-lengkap">Nama Lengkap</Label>
          <Input id="nama-lengkap" value="Toni Lembong" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value="Toni Lembong" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value="toni.lembong@gmail.com" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value="********" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="ganti-bahasa">Ganti Bahasa</Label>
          <Input id="ganti-bahasa" value="English" className="mt-1" /> {/* Or a select dropdown */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 pt-6">
        <button className="flex items-center space-x-3 text-gray-700 hover:text-green-600">
          <User className="w-5 h-5" />
          <span>Edit</span>
        </button>
        <button className="flex items-center space-x-3 text-gray-700 hover:text-green-600">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="flex items-center space-x-3 text-red-500 hover:text-red-600">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}