from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import tensorflow as tf
import numpy as np
import pandas as pd
from PIL import Image
import io

app = FastAPI()

# อนุญาตให้ React (Frontend) เรียกใช้งาน API นี้ได้ข้ามโดเมน
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading models...")
# โหลดโมเดลทั้งหมดที่ฝึกมา
ensemble_model = joblib.load('./models/nsl_kdd_ensemble.pkl')
scaler = joblib.load('./models/nsl_kdd_scaler.pkl')
encoders = joblib.load('./models/nsl_kdd_encoders.pkl')
cnn_model = tf.keras.models.load_model('./models/cifar10_cnn_pretrained.keras')
print("Models loaded successfully!")

# กำหนดชื่อคลาสของ CIFAR-10 เพื่อแปลงจากตัวเลขเป็นชื่อที่อ่านรู้เรื่อง
CIFAR10_CLASSES = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

@app.get("/")
def read_root():
    return {"message": "Hello from ML Backend API!"}

# --- Endpoint สำหรับโมเดลที่ 1: ตรวจจับการโจมตี (NSL-KDD) ---
@app.post("/predict/network")
async def predict_network(data: dict):
    try:
        # แปลงข้อมูล JSON จาก React เป็น DataFrame
        df = pd.DataFrame([data])
        
        # รายชื่อ Feature ที่โมเดลต้องการเรียงตามลำดับ (อ้างอิงจากตอนเทรน)
        expected_cols = (['duration','protocol_type','service','flag','src_bytes','dst_bytes','land','wrong_fragment','urgent','hot',
            'num_failed_logins','logged_in','num_compromised','root_shell','su_attempted','num_root','num_file_creations',
            'num_shells','num_access_files','num_outbound_cmds','is_host_login','is_guest_login','count','srv_count',
            'serror_rate','srv_serror_rate','rerror_rate','srv_rerror_rate','same_srv_rate','diff_srv_rate','srv_diff_host_rate',
            'dst_host_count','dst_host_srv_count','dst_host_same_srv_rate','dst_host_diff_srv_rate','dst_host_same_src_port_rate',
            'dst_host_srv_diff_host_rate','dst_host_serror_rate','dst_host_srv_serror_rate','dst_host_rerror_rate','dst_host_srv_rerror_rate'])
        
        # 1. แปลงตัวหนังสือเป็นตัวเลขด้วย Encoder
        cat_cols = ['protocol_type', 'service', 'flag']
        for col in cat_cols:
            if col in df.columns:
                # ถ้าผู้ใช้ส่งค่าแปลกๆ มา ให้ใช้ค่า default เพื่อไม่ให้ระบบพัง
                df[col] = df[col].apply(lambda x: x if x in encoders[col].classes_ else encoders[col].classes_[0])
                df[col] = encoders[col].transform(df[col])
        
        # 2. เติมค่า 0 ให้คอลัมน์ที่ผู้ใช้อาจจะไม่ได้ส่งมา (เพื่อไม่ให้หน้าเว็บต้องกรอกครบทั้ง 41 ช่อง)
        for col in expected_cols:
            if col not in df.columns:
                df[col] = 0.0
                
        # 3. จัดเรียงคอลัมน์ให้ตรงเป๊ะ และทำการ Scale ข้อมูล
        df = df[expected_cols]
        X_scaled = scaler.transform(df)
        
        # 4. ทำนายผล
        prediction = ensemble_model.predict(X_scaled)
        result = "Attack" if prediction[0] == 1 else "Normal"
        
        return {"status": "success", "prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Endpoint สำหรับโมเดลที่ 2: จำแนกรูปภาพ (CIFAR-10) ---
@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    try:
        # 1. อ่านไฟล์ภาพที่ผู้ใช้อัปโหลดมา
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # แปลงเป็น RGB เผื่อผู้ใช้อัปโหลดรูป PNG แบบโปร่งใสมา
        if image.mode != "RGB":
            image = image.convert("RGB")
            
        # 2. ย่อขนาดภาพให้เป็น 32x32 ก่อนส่งให้โมเดล 
        # (โมเดลจะไปใช้ layer Resizing(96, 96) ขยายต่อเองด้านใน)
        image = image.resize((32, 32))
        
        # 3. แปลงเป็น Array และ Normalize ค่าสี (หาร 255)
        img_array = np.array(image).astype('float32') / 255.0
        
        # เพิ่มมิติ batch_size (จาก 32x32x3 เป็น 1x32x32x3)
        img_array = np.expand_dims(img_array, axis=0)
        
        # 4. ทำนายผล
        predictions = cnn_model.predict(img_array)
        predicted_class_index = np.argmax(predictions[0])
        predicted_class_name = CIFAR10_CLASSES[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index])
        
        return {
            "status": "success", 
            "prediction": predicted_class_name,
            "confidence": f"{confidence*100:.2f}%"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))