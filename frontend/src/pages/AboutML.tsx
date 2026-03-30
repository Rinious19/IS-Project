import { FiDatabase, FiCpu, FiList, FiBookOpen, FiAlertCircle } from 'react-icons/fi';

export default function AboutML() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Machine Learning Ensemble Model
      </h1>

      {/* 1. ข้อมูล Dataset */}
      <section className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiDatabase className="text-indigo-500" /> 1. ที่มาและรายละเอียดของ Dataset (NSL-KDD)
        </h2>
        <div className="ml-4 space-y-4 text-gray-600">
          <p>
            <strong>ที่มา:</strong> ดาวน์โหลดจาก Canadian Institute for Cybersecurity (CIC) มหาวิทยาลัย University of New Brunswick
            (<a href="https://www.unb.ca/cic/datasets/nsl.html" target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline">ลิงก์อ้างอิง</a>)
          </p>
          <p>
            <strong>รายละเอียด:</strong> NSL-KDD เป็นชุดข้อมูลมาตรฐานที่ใช้สำหรับการวิจัยด้านระบบตรวจจับการบุกรุก (Intrusion Detection System) ถูกพัฒนาต่อยอดมาจากชุดข้อมูล KDD Cup 99 เพื่อแก้ไขปัญหาข้อมูลซ้ำซ้อน (Redundant records) ซึ่งทำให้โมเดลเกิดความลำเอียง (Bias) ไปยังข้อมูลที่มีจำนวนมาก
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">รายละเอียด Feature ที่สำคัญ (รวม ~41 Features):</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-left font-medium text-gray-700">หมวดหมู่</th>
                  <th className="py-2 px-4 border-b text-left font-medium text-gray-700">ตัวอย่าง Feature</th>
                  <th className="py-2 px-4 border-b text-left font-medium text-gray-700">คำอธิบาย</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Basic Features</td>
                  <td className="py-2 px-4 border-b">
                    duration, protocol_type, service, flag, src_bytes, dst_bytes, land, wrong_fragment, urgent
                  </td>
                  <td className="py-2 px-4 border-b">
                    คุณลักษณะพื้นฐานของการเชื่อมต่อ เช่น ระยะเวลา ประเภทโปรโตคอล ปริมาณข้อมูล และสถานะของ packet
                  </td>
                </tr>

                <tr>
                  <td className="py-2 px-4 border-b">Content Features</td>
                  <td className="py-2 px-4 border-b">
                    hot, num_failed_logins, logged_in, num_compromised, root_shell, su_attempted,
                    num_root, num_file_creations, num_shells, num_access_files, is_host_login, is_guest_login
                  </td>
                  <td className="py-2 px-4 border-b">
                    คุณลักษณะที่เกี่ยวข้องกับ payload และพฤติกรรมผู้ใช้ เช่น การ login, การเข้าถึงไฟล์, การพยายาม root
                  </td>
                </tr>

                <tr>
                  <td className="py-2 px-4 border-b">Time-based Traffic Features</td>
                  <td className="py-2 px-4 border-b">
                    count, srv_count, serror_rate, srv_serror_rate, rerror_rate, srv_rerror_rate,
                    same_srv_rate, diff_srv_rate, srv_diff_host_rate
                  </td>
                  <td className="py-2 px-4 border-b">
                    สถิติการเชื่อมต่อในช่วงเวลา 2 วินาที เช่น จำนวน connection และ error rate
                  </td>
                </tr>

                <tr>
                  <td className="py-2 px-4 border-b">Host-based Traffic Features</td>
                  <td className="py-2 px-4 border-b">
                    dst_host_count, dst_host_srv_count, dst_host_same_srv_rate,
                    dst_host_diff_srv_rate, dst_host_same_src_port_rate,
                    dst_host_srv_diff_host_rate, dst_host_serror_rate,
                    dst_host_srv_serror_rate, dst_host_rerror_rate, dst_host_srv_rerror_rate
                  </td>
                  <td className="py-2 px-4 border-b">
                    วิเคราะห์ traffic ระดับ host ในช่วง connection ล่าสุด (ประมาณ 100 connections)
                  </td>
                </tr>

                <tr className="bg-indigo-50">
                  <td className="py-2 px-4 border-b font-semibold text-indigo-700">Target (Output)</td>
                  <td className="py-2 px-4 border-b font-semibold text-indigo-700">
                    attack / label
                  </td>
                  <td className="py-2 px-4 border-b text-indigo-700">
                    ประเภทการโจมตี (แปลงเป็น Binary: 0 = Normal, 1 = Attack หรือใช้ multi-class เช่น DoS, Probe, R2L, U2R)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. ความไม่สมบูรณ์ของ Dataset */}
      <section className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiAlertCircle className="text-indigo-500" /> 2. ความไม่สมบูรณ์ของ Dataset และการแก้ไข
        </h2>
        <p className="text-gray-600 mb-4 ml-4">
          ตามข้อกำหนด Dataset ที่นำมาใช้จะต้องมีความไม่สมบูรณ์ เพื่อแสดงถึงกระบวนการเตรียมข้อมูล เราได้พบและจัดการปัญหาดังนี้:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-8">
          <li><strong>Missing Values:</strong> ชุดข้อมูลต้นฉบับมีความสมบูรณ์สูง จึงได้ทำการจำลองค่าว่าง (NaN) ลงในข้อมูลบางส่วน <br /><span className="ml-5 text-indigo-600"> <em>วิธีแก้:</em> ทำ Data Imputation โดยเติมค่าที่หายไปดัวยค่ามัธยฐาน (Median)</span></li>
          <li><strong>Categorical Data:</strong> ข้อมูลบางส่วนเป็นข้อความ เช่น ชื่อโปรโตคอล ซึ่งคอมพิวเตอร์ไม่สามารถคำนวณได้ <br /><span className="ml-5 text-indigo-600"> <em>วิธีแก้:</em> ใช้เทคนิค Label Encoding แปลงข้อความเป็นตัวเลข</span></li>
          <li><strong>Feature Scale Imbalance:</strong> ข้อมูลแต่ละคอลัมน์มีช่วงค่าที่แตกต่างกันมาก เช่น ปริมาณ bytes เทียบกับ duration <br /><span className="ml-5 text-indigo-600"> <em>วิธีแก้:</em> ทำ Feature Scaling ด้วย StandardScaler เพื่อปรับค่าเฉลี่ยเป็น 0 และส่วนเบี่ยงเบนมาตรฐานเป็น 1</span></li>
        </ul>
      </section>

      {/* 3. แนวทางการพัฒนาและทฤษฎี */}
      <section className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiCpu className="text-indigo-500" /> 3. ทฤษฎีอัลกอริทึม
        </h2>
        <p className="text-gray-600 mb-4 ml-4">
          โปรเจคนี้ใช้ <strong>Ensemble Model แบบ Soft Voting</strong> ซึ่งเป็นการนำโมเดล Machine Learning 3 ประเภทมาทำงานร่วมกัน เพื่อเพิ่มความแม่นยำ (Accuracy) และลดความแปรปรวน (Variance)
        </p>
        <div className="ml-8 space-y-4 text-gray-600">
          <div>
            <h3 className="font-bold text-gray-800">1. Random Forest (RF)</h3>
            <p>เป็นอัลกอริทึมตระกูล Bagging ที่สร้าง Decision Tree (ต้นไม้ตัดสินใจ) จำนวนหลายต้นแบบสุ่ม จากนั้นนำผลลัพธ์จากทุกต้นมาโหวตหาคำตอบสุดท้าย ช่วยลดปัญหา Overfitting ได้อย่างมีประสิทธิภาพ</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">2. Gradient Boosting (GB)</h3>
            <p>เป็นอัลกอริทึมตระกูล Boosting ที่สร้าง Decision Tree แบบต่อเนื่อง (Sequential) โดยต้นไม้ต้นใหม่จะถูกสร้างขึ้นมาเพื่อเรียนรู้และแก้ไขข้อผิดพลาด (Error) ของต้นไม้ต้นก่อนหน้า ทำให้โมเดลมีความแม่นยำสูงขึ้นเรื่อยๆ</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">3. Support Vector Machine (SVM)</h3>
            <p>เป็นอัลกอริทึมที่พยายามสร้างเส้นแบ่ง (Hyperplane) ที่ดีที่สุดในพื้นที่หลายมิติ เพื่อแยกระหว่างข้อมูลที่เป็น Normal และ Attack โดยพยายามรักษาระยะห่าง (Margin) ระหว่างคลาสให้กว้างที่สุด</p>
          </div>
        </div>
      </section>

      {/* 4. ขั้นตอนการพัฒนา */}
      <section className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiList className="text-indigo-500" /> 4. ขั้นตอนการพัฒนา (Development Process)
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
          <li><strong>Data Ingestion:</strong> โหลดชุดข้อมูล KDDTrain+.txt</li>
          <li><strong>Data Preparation:</strong> ทำความสะอาดข้อมูล เติม Missing values และทำ Label Encoding</li>
          <li><strong>Feature Engineering:</strong> แบ่งชุดข้อมูล (Train/Test Split) และทำ Standardization สเกลข้อมูล</li>
          <li><strong>Model Training:</strong> สร้างโมเดลย่อย (RF, GB, SVM) และรวมกันด้วย VotingClassifier</li>
          <li><strong>Evaluation:</strong> ประเมินผลโมเดลด้วยค่า Accuracy, Precision, Recall และ F1-Score</li>
          <li><strong>Deployment:</strong> Export โมเดลที่ฝึกสอนเสร็จแล้วเป็นไฟล์ <code>.pkl</code> เพื่อนำไปใช้เป็น Backend API ต่อไป</li>
        </ol>
      </section>

      {/* 5. อ้างอิง */}
      <section>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiBookOpen className="text-indigo-500" /> 5. แหล่งอ้างอิง
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Canadian Institute for Cybersecurity. (n.d.). <em>NSL-KDD Dataset</em>.</li>
          <li>Scikit-learn Developers. (n.d.). <em>Ensemble methods - scikit-learn documentation</em>.</li>
        </ul>
      </section>
    </div>
  );
}