// components/Dashboard.jsx
import { Card, CardContent } from "@/components/ui/card"
import Sidebar from "@/constant/sidebar"
import { BadgeCheck } from "lucide-react"
import { ChevronRight } from "lucide-react" 


export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Dashboard Carbon Capture</h2>
          <div className="flex items-center space-x-3 bg-white p-2 rounded-full shadow-sm pr-4">
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
              TL
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Tom Lembong</p>
              <p className="text-xs text-muted-foreground">tidakbersalah@gmail.com</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Existing Estimation Value Card */}
          <Card className="col-span-1 bg-gradient-to-r from-green-500 to-green-300 text-white shadow-lg rounded-xl flex flex-col justify-between">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm">Existing Estimation Value</p>
                <ChevronRight className="w-5 h-5" /> {/* Arrow icon */}
              </div>
              <h3 className="text-4xl font-bold">6 ton/kg</h3>
              <p className="text-base">= Rp 500.000.000,00</p>
              <div className="flex justify-end pt-2">
                <BadgeCheck className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* List of Projects Card */}
          <Card className="col-span-2 rounded-xl shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-foreground">List of Projects</h3>
                <ChevronRight className="w-5 h-5 text-gray-500" /> {/* Arrow icon */}
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Project abc</span>
                  <span className="text-xs text-gray-500">- description</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Project abc</span>
                  <span className="text-xs text-gray-500">- description</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Project abc</span>
                  <span className="text-xs text-gray-500">- description</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Regional Map Card */}
        <Card className="rounded-xl shadow-md">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-foreground">Regional Map</h3>
            <p className="text-sm text-muted-foreground mb-4">Kota Bandung - description</p>
            <img alt="Bandung Map" className="rounded-xl border w-full h-96 object-cover" />
             {/* Map Legend */}
             <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-700">
                <p className="font-semibold mb-2">Legenda angka:</p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 bg-[#E0F2F1]"></span><span>318 - 649</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 bg-[#C8E6C9]"></span><span>650 - 1380</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 bg-[#A5D6A7]"></span><span>1381 - 1911</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 bg-[#81C784]"></span><span>1912 - 2442</span>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}