import { useState } from 'react';
import axios from 'axios';
import { FiShield, FiAlertTriangle, FiCpu} from 'react-icons/fi';

export default function PredictML() {
  const [formData, setFormData] = useState({
    protocol_type: 'tcp',
    service: 'http',
    flag: 'SF',
    duration: 0,
    src_bytes: 0,
    dst_bytes: 0,           // 1. เพิ่ม: ปริมาณข้อมูลตอบกลับ
    count: 1,           
    serror_rate: 0.0,   
    same_srv_rate: 1.0,     // 2. เพิ่ม: อัตราการใช้ Service เดิม
    logged_in: 0,           // 3. เพิ่ม: สถานะการล็อกอิน
    num_failed_logins: 0,   // 4. เพิ่ม: จำนวนครั้งที่ล็อกอินพลาด
  });
  
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. จำลองผู้ใช้งานปกติ (Normal)
  const fillNormalData = () => {
    setFormData({
      protocol_type: 'tcp',
      service: 'http',
      flag: 'SF',
      duration: 0,
      src_bytes: 215,
      dst_bytes: 8450,       // เซิร์ฟเวอร์ส่งหน้าเว็บกลับมาให้
      count: 5,          
      serror_rate: 0.0,  
      same_srv_rate: 1.0,    // ใช้งานเว็บอย่างต่อเนื่อง
      logged_in: 1,          // ล็อกอินเข้าใช้งานปกติ
      num_failed_logins: 0,  // ไม่มีประวัติล็อกอินพลาด
    });
    setResult(null);
  };

  // 2. จำลองการโจมตีแบบ DoS (Neptune / SYN Flood)
  const fillDoSAttack = () => {
    setFormData({
      protocol_type: 'tcp',
      service: 'private',
      flag: 'S0',
      duration: 0,
      src_bytes: 0,          // ไม่ได้ส่งข้อมูลจริง แค่ส่ง Request
      dst_bytes: 0,          // เซิร์ฟเวอร์ไม่ได้ตอบกลับ
      count: 250,        
      serror_rate: 1.0,  
      same_srv_rate: 0.05,   // ค่าต่ำเพราะเป็นการ Flood
      logged_in: 0,          // ไม่ได้ล็อกอิน
      num_failed_logins: 0,  
    });
    setResult(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      //! For Localhost: http://127.0.0.1:8000/predict/network
      //* 1. ดึงค่า Base URL จาก .env (ถ้าไม่มีให้ fallback เป็น localhost)
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      //* 2. นำ Base URL มาต่อกับ Endpoint ที่ต้องการ
      const endpoint = `${API_BASE_URL}/predict/network`;
      const response = await axios.post(endpoint, { 
        ...formData,
        // แปลงค่า string ให้เป็นตัวเลขทั้งหมด
        duration: Number(formData.duration),
        src_bytes: Number(formData.src_bytes),
        dst_bytes: Number(formData.dst_bytes),
        count: Number(formData.count),
        serror_rate: Number(formData.serror_rate),
        same_srv_rate: Number(formData.same_srv_rate),
        logged_in: Number(formData.logged_in),
        num_failed_logins: Number(formData.num_failed_logins),
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error predicting:", error);
      setResult("Error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FiShield className="text-indigo-500" />
          Network Intrusion Detection
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          วิเคราะห์แพ็คเกจข้อมูลเพื่อตรวจจับพฤติกรรม DoS, Port Scan หรือ Brute Force
        </p>
      </div>

      {/* ปุ่ม Auto-fill */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 pb-6 border-b border-gray-100">
        <button type="button" onClick={fillNormalData} className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2">
          <FiShield /> ปกติ (Normal)
        </button>
        <button type="button" onClick={fillDoSAttack} className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
          <FiAlertTriangle /> ถล่มเซิร์ฟเวอร์ (DoS)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* จัดกลุ่มเป็น 3 คอลัมน์เพื่อให้ดูไม่ยาวเกินไป */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Protocol Type</label>
            <select name="protocol_type" value={formData.protocol_type} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50">
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
              <option value="icmp">ICMP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
            <select name="service" value={formData.service} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50">
              <option value="http">http (Web)</option>
              <option value="private">private (Scanning)</option>
              <option value="ftp">ftp (File Transfer)</option>
              <option value="smtp">smtp (Email)</option>
              <option value="domain_u">domain (DNS)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flag (Status)</label>
            <select name="flag" value={formData.flag} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50">
              <option value="SF">SF (Normal Connection)</option>
              <option value="S0">S0 (SYN Flood / DoS Attempt)</option>
              <option value="REJ">REJ (Connection Rejected)</option>
              <option value="RSTR">RSTR (Connection Reset)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source Bytes (Tx)</label>
            <input type="number" name="src_bytes" value={formData.src_bytes} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dest Bytes (Rx)</label>
            <input type="number" name="dst_bytes" value={formData.dst_bytes} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Sec)</label>
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Connection Count</label>
            <input type="number" name="count" value={formData.count} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Same Service Rate</label>
            <input type="number" step="0.01" min="0" max="1" name="same_srv_rate" value={formData.same_srv_rate} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SYN Error Rate</label>
            <input type="number" step="0.01" min="0" max="1" name="serror_rate" value={formData.serror_rate} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logged In</label>
            <select name="logged_in" value={formData.logged_in} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Failed Logins</label>
            <input type="number" name="num_failed_logins" value={formData.num_failed_logins} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
          </div>

        </div>

        <button type="submit" disabled={loading} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-indigo-300 shadow-sm">
          {loading ? 'Analyzing Traffic...' : <><FiCpu className="text-lg" /> Analyze Network Traffic</>}
        </button>
      </form>

      {/* ส่วนแสดงผลลัพธ์ */}
      {result && (
        <div className={`mt-8 p-6 rounded-xl text-center border animate-in fade-in zoom-in duration-300 ${result === 'Normal' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-2">
            {result === 'Normal' ? <FiShield className="text-3xl" /> : <FiAlertTriangle className="text-3xl animate-pulse" />}
            {result === 'Normal' ? 'Traffic is Normal' : 'Attack Detected!'}
          </div>
          <p className="text-sm opacity-80 font-medium">
            {result === 'Normal' ? 'ระบบปลอดภัย ไม่พบความเสี่ยง' : 'พบพฤติกรรมผิดปกติ โมเดลประเมินว่าเป็น Threat!'}
          </p>
        </div>
      )}
    </div>
  );
}