# 🚀 IS Project 2568 - Full-Stack Machine Learning Web Application

![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-38B2AC?style=flat&logo=tailwind-css)
![React Icons](https://img.shields.io/badge/React_Icons-5.6.0-61DAFB?style=flat&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-7.13.2-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.14.0-5A29E4?style=flat&logo=axios&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-0.29-222222?style=flat&logo=uvicorn&logoColor=white)
![Scikit Learn](https://img.shields.io/badge/scikit--learn-1.4-F7931E?style=flat&logo=scikitlearn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-2.2-150458?style=flat&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-1.26-013243?style=flat&logo=numpy&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.16-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![python-multipart](https://img.shields.io/badge/python--multipart-latest-3776AB?style=flat&logo=python&logoColor=white)
![Pillow](https://img.shields.io/badge/Pillow-10.3-8CAAE6?style=flat&logo=python&logoColor=white)
![Joblib](https://img.shields.io/badge/joblib-1.4-374151?style=flat&logo=python&logoColor=white)

โปรเจคนี้เป็นส่วนหนึ่งของรายวิชา Intelligent Systems (IS) ปีการศึกษา 2568 โดยเป็นการพัฒนาระบบ Web Application ที่รวบรวมการทำงานของโมเดลปัญญาประดิษฐ์ 2 ประเภท ได้แก่ Machine Learning (Ensemble) และ Neural Network (CNN) เข้าไว้ด้วยกัน ตั้งแต่กระบวนการเตรียมข้อมูล (Data Preparation) การฝึกสอนโมเดล ไปจนถึงการนำไปใช้งานจริง (Deployment) บน Cloud Server

---

## 📌 ภาพรวมของระบบ (Features)

ระบบประกอบด้วยหน้าเว็บไซต์หลัก 4 หน้า

1. **About ML:** หน้าอธิบายทฤษฎีและขั้นตอนการพัฒนาโมเดล Ensemble
2. **About NN:** หน้าอธิบายทฤษฎีและขั้นตอนการพัฒนาโมเดล Neural Network
3. **Predict ML (Network Intrusion Detection):** หน้าทดสอบโมเดลเพื่อตรวจสอบภัยคุกคามทางเครือข่าย พร้อมปุ่มจำลองการโจมตี (DoS, Brute Force)
4. **Predict NN (Image Classification):** หน้าทดสอบโมเดลด้วยการอัปโหลดรูปภาพเพื่อแยกแยะหมวดหมู่

---

## 📊 ข้อมูลและโมเดลที่ใช้ (Datasets & Models)

โปรเจคนี้ใช้ชุดข้อมูล (Dataset) 2 ชุดที่มีความไม่สมบูรณ์เพื่อนำมาผ่านกระบวนการเตรียมข้อมูล และนำไปพัฒนาโมเดลดังนี้:

### 1. Machine Learning (Ensemble Model)

- **Dataset:** **NSL-KDD** (ชุดข้อมูลบันทึกการจราจรทางเครือข่าย)
- **การจัดการข้อมูล:** เติมค่า Missing Values ด้วยค่า Median, ทำ Label Encoding, และ Feature Scaling ด้วย StandardScaler
- **Algorithms:** ใช้เทคนิค **Soft Voting** นำโมเดล 3 ตัวมารวมกัน ได้แก่

  | โมเดล | คำอธิบาย |
  |---|---|
  | **Random Forest (RF)** | อัลกอริทึม Ensemble ที่สร้าง Decision Tree หลายต้นแล้วรวมผลการทำนายด้วยการโหวต เหมาะกับข้อมูลที่มีหลาย Feature และช่วยลดปัญหา Overfitting |
  | **Gradient Boosting (GB)** | อัลกอริทึม Ensemble แบบ Boosting ที่สร้างโมเดลย่อยทีละต้นโดยแต่ละต้นพยายามแก้ข้อผิดพลาดของต้นก่อนหน้า ให้ความแม่นยำสูง |
  | **Support Vector Machine (SVM)** | อัลกอริทึมที่หา Hyperplane เพื่อแบ่งแยกข้อมูลออกเป็นคลาสต่างๆ ทำงานได้ดีกับข้อมูลที่มิติสูงและมีความซับซ้อน |

### 2. Neural Network (Convolutional Neural Network)

- **Dataset:** **CIFAR-10** (ชุดข้อมูลรูปภาพ 10 หมวดหมู่ ขนาด 32×32 พิกเซล)

  โดย 10 คลาสของ CIFAR-10 ประกอบด้วย:
  `airplane` · `automobile` · `bird` · `cat` · `deer` · `dog` · `frog` · `horse` · `ship` · `truck`

- **การจัดการข้อมูล:** จำลองการเพิ่ม Noise และทำ Data Normalization
- **Algorithms:** CNN โดยใช้ **MobileNetV2** ซึ่งเป็น Pre-trained Model มาทำ Transfer Learning โดยแช่แข็งค่าน้ำหนักเดิม (Freeze weights) และเพิ่ม Custom Dense Layers สำหรับจำแนก 10 คลาส

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

**Frontend (Client-side):**
- React.js + TypeScript (Vite Build Tool)
- Tailwind CSS v4 (สำหรับการจัดหน้า UI สไตล์ Minimal)
- React Router DOM (จัดการ Routing)
- Axios (เชื่อมต่อ API)
- React Icons

**Backend (Server-side & ML API):**
- Python 3.10+
- FastAPI & Uvicorn (สร้าง RESTful API)
- Scikit-learn & Pandas (ประมวลผลโมเดล ML)
- TensorFlow / Keras (ประมวลผลโมเดล NN)
- Joblib (โหลดไฟล์โมเดล `.pkl`)

---

## 💻 วิธีการติดตั้งและรันโปรเจค (Getting Started)

### ข้อกำหนดเบื้องต้น (Prerequisites)

- ติดตั้ง [Node.js](https://nodejs.org/) (เวอร์ชัน 18 ขึ้นไป)
- ติดตั้ง [Python](https://www.python.org/) (เวอร์ชัน 3.10 ขึ้นไป)

---

### 1. โคลนโปรเจค (Clone Repository)

```bash
git clone https://github.com/Rinious19/IS-Project
cd IS-Project
```

---

### 2. ติดตั้ง Dependencies

**Frontend:**

```bash
cd frontend
npm install
```

**Backend:**

```bash
cd backend
pip install -r requirements.txt
```

---

### 3. แก้ไข API Endpoint

ก่อนรันโปรเจค ให้แก้ไข URL ของ API ในไฟล์ Frontend ให้ชี้มาที่ Backend ที่รันบนเครื่องของคุณ:

- **ไฟล์ `PredictML.tsx`** — แก้ URL เป็น:
  ```
  http://127.0.0.1:8000/predict/network
  ```

- **ไฟล์ `PredictNN.tsx`** — แก้ URL เป็น:
  ```
  http://127.0.0.1:8000/predict/image
  ```

---

### 4. รันโปรเจค

เปิด Terminal 2 หน้าต่างแยกกัน แล้วรันพร้อมกัน:

**รัน Frontend:**

```bash
cd frontend
npm run dev
```

เว็บไซต์จะพร้อมใช้งานที่ `http://localhost:5173`

**รัน Backend:**

```bash
cd backend-api
uvicorn main:app --reload
```

Backend API จะพร้อมใช้งานที่ `http://127.0.0.1:8000`

> 💡 **ทดสอบ API ได้ที่:** `http://127.0.0.1:8000/docs` (Swagger UI อัตโนมัติจาก FastAPI)

---

## ☁️ การนำขึ้นระบบ (Deployment)

โปรเจคนี้ได้รับการนำขึ้นทำงานบน Cloud Server จริง ตามโครงสร้างแบบแยกส่วน:

| ส่วน | Platform | ลิงก์ |
|---|---|---|
| **Frontend** | Vercel | 🔗 https://is-project-two.vercel.app |
| **Backend** | Railway | 🔗 https://is-project-production.up.railway.app |

---

## 👨‍💻 ผู้จัดทำ (Author)

| รายการ | ข้อมูล |
|---|---|
| **ชื่อ-นามสกุล** | นายกรินทร์ สุขสอาด |
| **รหัสนักศึกษา** | 6704062612138 |
| **รายวิชา** | Intelligent Systems (IS) 2568 |
