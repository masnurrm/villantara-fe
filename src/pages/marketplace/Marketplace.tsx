import { useState, useEffect } from "react"
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

type Role = "Villager" | "BUMDES" | "Corporate"

interface Project {
  id: number
  name: string
  priceRange: string
  description: string
  capacity: string
  type: "oneTime" | "contract" 
}

export default function Marketplace({ role = "BUMDES" }: { role?: Role }) {
  const [activeTab, setActiveTab] = useState<"oneTime" | "contract">("oneTime")
  const [projects, setProjects] = useState<Project[]>([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    name: "",
    priceRange: "",
    description: "",
    capacity: "",
  })

  useEffect(() => {
  const fetchMarketplaceItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/marketplace`)
      setProjects(res.data)
    } catch (err) {
      console.error("Failed to fetch marketplace items:", err)
    }
  }

  fetchMarketplaceItems()
}, [])

  const handleAddProject = async () => {
    const payload = {
      ...form,
      type: activeTab, // include type!
    }

    try {
      const res = await axios.post(`${API_URL}/marketplace`, payload)
      setProjects((prev) => [...prev, res.data]) // only push the actual one returned
      setForm({ name: "", priceRange: "", description: "", capacity: "" })
      setShowModal(false)
    } catch (err) {
      console.error("Failed to create project:", err)
    }
  }

  const filteredProjects = projects.filter((p) => p.type === activeTab)

  return (
    <div className="flex flex-col gap-4 h-full p-6">
      {/* Tabs */}
      <div className="bg-muted rounded-full p-1 flex w-full max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("oneTime")}
          className={`w-1/2 text-sm py-2 rounded-full ${
            activeTab === "oneTime" ? "bg-primary text-white" : "text-muted-foreground"
          }`}
        >
          One time
        </button>
        <button
          onClick={() => setActiveTab("contract")}
          className={`w-1/2 text-sm py-2 rounded-full ${
            activeTab === "contract" ? "bg-primary text-white" : "text-muted-foreground"
          }`}
        >
          Contract
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-muted/40 rounded-xl overflow-hidden">
            <div className="h-40 bg-gray-300" />
            <div className="p-4 space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">{project.name}</p>
              {activeTab === "oneTime" ? (
                <>
                  <p>Range harga: {project.priceRange}</p>
                  <p className="line-clamp-2">{project.description}</p>
                </>
              ) : (
                <ul className="list-disc pl-4">
                  <li>Harga: {project.priceRange}</li>
                  <li>Estimasi waktu: 2–3 bulan</li>
                  <li>Kapasitas: {project.capacity}</li>
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      {role === "BUMDES" && (
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-primary/90"
          >
            + Tambah Projects
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Tambah Projects</h2>
                <p className="text-sm text-gray-400">Isi data-data berikut.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-white text-xl font-bold">
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-sm">
              {["name", "priceRange", "capacity", "description"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-foreground">
                    {field === "name"
                      ? "Nama Project"
                      : field === "priceRange"
                      ? "Harga"
                      : field === "capacity"
                      ? "Kapasitas"
                      : "Deskripsi"}
                  </label>
                  {field === "description" ? (
                    <textarea
                      className="w-full border rounded px-3 py-2"
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  ) : (
                    <input
                      className="w-full border rounded px-3 py-2"
                      value={form[field as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end px-6 py-4">
              <button
                onClick={handleAddProject}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}