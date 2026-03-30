import { FiImage, FiLayers, FiTool, FiLink, FiAlertCircle } from 'react-icons/fi';

export default function AboutNN() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Neural Network (CNN) Model
      </h1>

      {/* 1. ข้อมูล Dataset */}
      <section className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiImage className="text-indigo-500" /> 1. ที่มาและรายละเอียดของ Dataset (CIFAR-10)
        </h2>
        <div className="ml-4 space-y-4 text-gray-600">
          <p>
            <strong>ที่มา:</strong> จัดทำโดย Canadian Institute for Advanced Research (CIFAR) โหลดผ่านไลบรารี <code>tf.keras.datasets</code> 
            (<a href="https://www.cs.toronto.edu/~kriz/cifar.html" target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline">ลิงก์อ้างอิง</a>)
          </p>
          <p>
            <strong>รายละเอียด:</strong> CIFAR-10 เป็นชุดข้อมูลภาพสี (RGB) ขนาดเล็กที่นิยมใช้ในการฝึกสอนและทดสอบอัลกอริทึม Computer Vision ประกอบด้วยรูปภาพทั้งหมด 60,000 รูป แบ่งเป็นชุดฝึกสอน (Train) 50,000 รูป และชุดทดสอบ (Test) 10,000 รูป
          </p>
          
          <h3 className="font-semibold text-gray-800 mt-4 mb-2">โครงสร้างของข้อมูล (Features):</h3>
          <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
            <li><strong>Input Shape:</strong> รูปภาพขนาด 32x32 พิกเซล แบบ 3 Channels (Red, Green, Blue)</li>
            <li><strong>Output (Target):</strong> แบ่งออกเป็น 10 Classes อย่างชัดเจน (Mutually exclusive) ได้แก่: 
              <br/><span className="inline-block mt-2 px-3 py-1 bg-gray-100 rounded text-sm font-mono">
                airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. ความไม่สมบูรณ์ของ Dataset */}
      <section className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiAlertCircle className="text-indigo-500" /> 2. ความไม่สมบูรณ์ของ Dataset และการแก้ไข
        </h2>
        <p className="text-gray-600 mb-4 ml-4">
          สำหรับการทำงานกับภาพ (Unstructured Data) เราพบข้อจำกัดบางประการของข้อมูล ดังนี้:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-8">
          <li><strong>Low Resolution & Noise:</strong> ภาพมีขนาดเล็กเพียง 32x32px ทำให้สูญเสียรายละเอียด และมีการจำลองแทรก Gaussian Noise เข้าไปในภาพ 10% เพื่อจำลองความไม่สมบูรณ์ <br/><span className="ml-5 text-indigo-600"><em>วิธีแก้:</em> การใช้ Pre-trained Model ที่มีประสิทธิภาพในการดึง Feature ในระดับลึก (Deep Features)</span></li>
          <li><strong>Pixel Value Imbalance:</strong> ค่าสีพิกเซลดิบมีค่าตั้งแต่ 0-255 ซึ่งกว้างเกินไป ทำให้ Gradient Descent ทำงานได้ช้า <br/><span className="ml-5 text-indigo-600"><em>วิธีแก้:</em> ทำการ Normalize พิกเซล (หารด้วย 255.0) ให้อยู่ในช่วง 0 ถึง 1</span></li>
          <li><strong>Size Incompatibility:</strong> Pre-trained model ทั่วไปต้องการภาพขนาดอย่างน้อย 96x96px <br/><span className="ml-5 text-indigo-600"><em>วิธีแก้:</em> เพิ่ม Layer <code>Resizing(96, 96)</code> ในโครงสร้างของโมเดลก่อนส่งเข้า Base model</span></li>
        </ul>
      </section>

      {/* 3. แนวทางการพัฒนาและทฤษฎี */}
      <section className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiLayers className="text-indigo-500" /> 3. ทฤษฎีอัลกอริทึม
        </h2>
        <div className="ml-4 space-y-4 text-gray-600">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Convolutional Neural Network (CNN)</h3>
            <p>
              CNN เป็นสถาปัตยกรรมโครงข่ายประสาทเทียมที่ออกแบบมาสำหรับวิเคราะห์รูปภาพโดยเฉพาะ อาศัยหลักการ 2 อย่างหลักๆ คือ:
            </p>
            <ul className="list-disc list-inside mt-2 ml-4">
              <li><strong>Convolution Layer:</strong> ใช้ตัวกรอง (Filters/Kernels) กวาดไปบนภาพเพื่อสกัดลักษณะเด่น (Feature Extraction) เช่น ขอบ, สี, และพื้นผิว</li>
              <li><strong>Pooling Layer:</strong> ทำการลดขนาดความละเอียดของข้อมูล (Dimensionality Reduction) เพื่อลดภาระการคำนวณและดึงมาเฉพาะ Feature ที่สำคัญที่สุด</li>
              <li><strong>Flatten Layer:</strong> ทำหน้าที่แปลงข้อมูลจากรูปแบบหลายมิติ (เช่น feature map จาก convolution ที่เป็น 2D หรือ 3D) ให้กลายเป็นเวกเตอร์ 1 มิติ เพื่อเตรียมข้อมูลสำหรับส่งเข้า Fully Connected Layer</li>
              <li><strong>Fully Connected Layer (Dense Layer):</strong> เป็นชั้นที่เชื่อมต่อทุก neuron เข้าด้วยกัน ใช้สำหรับเรียนรู้ความสัมพันธ์เชิงลึกของ Feature ที่สกัดมา และทำหน้าที่ตัดสินใจจำแนกประเภทของข้อมูล โดยในชั้นสุดท้ายมักใช้ฟังก์ชัน Softmax เพื่อแปลงผลลัพธ์เป็นความน่าจะเป็นของแต่ละคลาส</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg mt-4">Pretrained Model: MobileNetV2</h3>
            <p>
              ตามเงื่อนไขของการพัฒนาโมเดล โปรเจคนี้เลือกใช้ <strong>MobileNetV2</strong> เป็น Base Model ด้วยเทคนิค Transfer Learning 
              เนื่องจากเป็นโมเดลที่ Lightweight (ใช้ทรัพยากรน้อย) ใช้เทคนิค <em>Depthwise Separable Convolutions</em> ทำให้มีความเร็วในการประมวลผลสูง เหมาะสมเป็นอย่างยิ่งสำหรับการนำมา Deploy บนระบบ Cloud หรือ API ที่มีทรัพยากรจำกัด
            </p>
          </div>
        </div>
      </section>

      {/* 4. ขั้นตอนการพัฒนา */}
      <section className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiTool className="text-indigo-500" /> 4. ขั้นตอนการพัฒนา (Development Process)
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
          <li><strong>Load Dataset:</strong> ดาวน์โหลด CIFAR-10 ผ่าน Keras API</li>
          <li><strong>Preprocessing:</strong> เพิ่ม Noise และปรับสเกลพิกเซล (Normalization)</li>
          <li><strong>Transfer Learning:</strong> โหลดโมเดล MobileNetV2 (ตัด Layer ท้ายออก) และตั้งค่าเป็น Freeze Weights (ไม่แก้ไขน้ำหนักเดิม)</li>
          <li><strong>Fine-Tuning:</strong> เติม Custom Layers ต่อท้าย ได้แก่ GlobalAveragePooling2D, Dense, และ Dropout เพื่อทำหน้าที่จำแนก 10 คลาสใหม่</li>
          <li><strong>Evaluation:</strong> เทรนโมเดลผ่าน Optimizer 'Adam' และประเมินค่า Accuracy</li>
          <li><strong>Deployment:</strong> บันทึกเป็นไฟล์ <code>.keras</code> เพื่อใช้สำหรับการ Inference ผ่าน API Backend</li>
        </ol>
      </section>

      {/* 5. อ้างอิง */}
      <section>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b pb-2">
          <FiLink className="text-indigo-500" /> 5. แหล่งอ้างอิง
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Krizhevsky, A. (2009). <em>The CIFAR-10 dataset</em>.</li>
          <li>TensorFlow Documentation. (n.d.). <em>tf.keras.applications.MobileNetV2</em>.</li>
          <li>Sandler, M., et al. (2018). <em>MobileNetV2: Inverted Residuals and Linear Bottlenecks</em>.</li>
        </ul>
      </section>
    </div>
  );
}