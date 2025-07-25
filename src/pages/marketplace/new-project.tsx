import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import 

const API_URL = import.meta.env.VITE_API_URL; // Adjust as needed

interface VillagePayload {
  village_id: string;
  name: string;
  capacity: number;
  min_price: number;
  max_price: number;
  description: string;
  status: "Ditawarkan";
}

export default function Marketplace() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    min_price: "",
    max_price: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    const payload: VillagePayload = {
      village_id: uuidv4(),
      name: formData.name,
      capacity: parseFloat(formData.capacity),
      min_price: parseInt(formData.min_price),
      max_price: parseInt(formData.max_price),
      description: formData.description,
      status: "Ditawarkan"
    };

    try {
      const res = await axios.post(`${API_URL}/marketplace`, payload);
      console.log("Published:", res.data);
      // Optionally show success toast or update list
      setIsOpen(false);
      setFormData({ name: "", capacity: "", min_price: "", max_price: "", description: "" });
    } catch (err) {
      console.error("Failed to publish:", err);
      // Show error toast or message
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Publish New Village
      </button>

      {/* Popup Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
            <Dialog.Title className="text-xl font-semibold">Publish Village</Dialog.Title>
            <div className="space-y-2">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className="w-full border p-2 rounded"
              />
              <input
                name="min_price"
                type="number"
                value={formData.min_price}
                onChange={handleChange}
                placeholder="Min Price"
                className="w-full border p-2 rounded"
              />
              <input
                name="max_price"
                type="number"
                value={formData.max_price}
                onChange={handleChange}
                placeholder="Max Price"
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded resize-none"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button onClick={() => setIsOpen(false)} className="text-gray-500 px-4 py-2">Cancel</button>
              <button
                onClick={handlePublish}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Publish
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
