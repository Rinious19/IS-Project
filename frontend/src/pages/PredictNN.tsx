import { useState } from 'react';
import axios from 'axios';
import { FiImage, FiUploadCloud, FiAperture } from 'react-icons/fi';

export default function PredictNN() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{ prediction: string; confidence: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null); // เคลียร์ผลลัพธ์เก่าเมื่อเลือกรูปใหม่
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    // การส่งไฟล์ต้องใช้ FormData
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error predicting image:", error);
      alert("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FiImage className="text-indigo-500" />
          Image Classification (CIFAR-10)
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          อัปโหลดรูปภาพเพื่อทดสอบโมเดล CNN สามารถทำนายได้ 10 คลาส 
          ได้แก่ airplane, automobile, bird, cat, deer, dog, frog, horse, ship และ truck
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {previewUrl ? (
            <div className="flex flex-col items-center">
              <img src={previewUrl} alt="Preview" className="h-48 object-contain rounded-lg shadow-sm mb-4" />
              <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full">
                เปลี่ยนรูปภาพ
              </span>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center text-gray-500">
              <FiUploadCloud className="w-12 h-12 mb-3 text-indigo-400" />
              <p className="font-medium text-gray-700">คลิก หรือ ลากไฟล์รูปภาพมาวางที่นี่</p>
              <p className="text-sm mt-1">รองรับไฟล์ JPG, PNG, WEBP</p>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={!selectedFile || loading} 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : <><FiAperture /> Predict Image</>}
        </button>
      </form>

      {/* ส่วนแสดงผลลัพธ์ */}
      {result && (
        <div className="mt-8 p-6 rounded-xl text-center bg-indigo-50 border border-indigo-100 text-indigo-800">
          <p className="text-sm font-medium opacity-80 mb-1">ผลการทำนาย:</p>
          <div className="text-3xl font-bold uppercase tracking-wider mb-2">
            {result.prediction}
          </div>
          <p className="text-sm bg-white inline-block px-4 py-1.5 rounded-full shadow-sm font-medium">
            ความมั่นใจ: {result.confidence}
          </p>
        </div>
      )}
    </div>
  );
}