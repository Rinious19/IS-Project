# 🚀 IS Project 2568 - Full-Stack Machine Learning Web Application

## 🌐 Frontend

![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.13.2-CA4245?style=flat&logo=reactrouter&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-5.6.0-61DAFB?style=flat&logo=react&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-1.14.0-5A29E4?style=flat&logo=axios&logoColor=white)

## ⚙️ Backend

![FastAPI](https://img.shields.io/badge/FastAPI-0.135.2-009688?style=flat&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-0.42.0-222222?style=flat&logo=uvicorn&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![python-multipart](https://img.shields.io/badge/python--multipart-0.0.22-3776AB?style=flat&logo=python&logoColor=white)

## 🧠 Machine Learning

![Scikit Learn](https://img.shields.io/badge/scikit--learn-1.8.0-F7931E?style=flat&logo=scikitlearn&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.21.0-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-3.0.1-150458?style=flat&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-2.3.2-013243?style=flat&logo=numpy&logoColor=white)
![Joblib](https://img.shields.io/badge/Joblib-1.5.3-374151?style=flat&logo=python&logoColor=white)

## 🖼️ Image Processing

![Pillow](https://img.shields.io/badge/Pillow-11.1.0-8CAAE6?style=flat&logo=python&logoColor=white)


โปรเจคนี้เป็นส่วนหนึ่งของรายวิชา Intelligent Systems (IS) ปีการศึกษา 2568 โดยเป็นการพัฒนาระบบ Web Application ที่รวบรวมการทำงานของโมเดลปัญญาประดิษฐ์ 2 ประเภท ได้แก่ Machine Learning (Ensemble) และ Neural Network (CNN) เข้าไว้ด้วยกัน ตั้งแต่กระบวนการเตรียมข้อมูล (Data Preparation) การฝึกสอนโมเดล ไปจนถึงการนำไปใช้งานจริง (Deployment) บน Cloud Server

---

## 📋 สารบัญ

1. [📌 ภาพรวมของระบบ](#-ภาพรวมของระบบ-features)
2. [📊 ข้อมูลและโมเดลที่ใช้](#-ข้อมูลและโมเดลที่ใช้-datasets--models)
3. [🛠️ เทคโนโลยีที่ใช้](#-เทคโนโลยีที่ใช้-tech-stack)
4. [📁 โครงสร้างโปรเจ็ค](#-โครงสร้างโปรเจ็ค)
5. [💻 วิธีการติดตั้งและรันโปรเจค](#-วิธีการติดตั้งและรันโปรเจค-getting-started)
6. [☁️ การนำขึ้นระบบ](#-การนำขึ้นระบบ-deployment)

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

## 📁 โครงสร้างโปรเจ็ค

```
📁 IS-Project
├── 📁 backend-api
│   ├── 📁 models
│   │   ├── 📄 cifar10_cnn_pretrained.keras
│   │   ├── 📄 nsl_kdd_encoders.pkl
│   │   ├── 📄 nsl_kdd_ensemble.pkl
│   │   └── 📄 nsl_kdd_scaler.pkl
│   ├── 🐳 Dockerfile
│   ├── 🐍 main.py
│   └── 📄 requirements.txt
├── 📁 frontend
│   ├── 📁 public
│   │   ├── 🖼️ favicon.svg
│   │   └── 🖼️ icons.svg
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   ├── 🖼️ hero.png
│   │   │   ├── 🖼️ react.svg
│   │   │   └── 🖼️ vite.svg
│   │   ├── 📁 components
│   │   │   └── 📄 Navbar.tsx
│   │   ├── 📁 pages
│   │   │   ├── 📄 AboutML.tsx
│   │   │   ├── 📄 AboutNN.tsx
│   │   │   ├── 📄 PredictML.tsx
│   │   │   └── 📄 PredictNN.tsx
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.tsx
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── ⚙️ tsconfig.app.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.node.json
│   ├── ⚙️ vercel.json
│   └── 📄 vite.config.ts
└── 📝 README.md
```

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
cd backend-api
pip install -r requirements.txt
```

---

### 3. ตั้งค่า Environment Variables

เพื่อความสะดวกในการสลับระหว่างการรันในเครื่อง (Local) และบนเซิร์ฟเวอร์จริง (Production) โปรเจคนี้จะใช้ไฟล์ .env ในการเชื่อมต่อ API:

1. เข้าไปที่โฟลเดอร์ frontend
```
cd frontend
```
2. คัดลอกไฟล์ .env.example แล้วสร้างเป็นไฟล์ใหม่ชื่อ .env (หรือใช้คำสั่งด้านล่าง)
```
cp .env.example .env
```
3. เปิดไฟล์ .env และตรวจสอบให้แน่ใจว่ากำหนด URL ชี้มาที่ Backend บนเครื่อง:
```
VITE_API_URL=http://localhost:8000
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

### 5. ปัญหาที่พบบ่อย (Troubleshooting)
หากรันคำสั่ง Backend ด้านบนไม่ได้ หรือ Terminal ฟ้องว่าไม่รู้จัก uvicorn (มักเกิดจากเครื่องมี Python หลายเวอร์ชัน หรือไม่ได้เซ็ต PATH) ให้รันคำสั่งเหล่านี้ทีละบรรทัดแทน:
```bash
cd backend-api
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```

---

## ☁️ การนำขึ้นระบบ (Deployment)

โปรเจคนี้ได้รับการนำขึ้นทำงานบน Cloud Server จริง ตามโครงสร้างแบบแยกส่วน:

| ส่วน | Platform | ลิงก์ |
|---|---|---|
| **Frontend** | Vercel | 🔗 https://is-project-two.vercel.app |
| **Backend** | Hugging Face | 🔗 https://rinious19-is-api.hf.space |

---

## 👨‍💻 ผู้จัดทำ (Author)

| รายการ | ข้อมูล |
|---|---|
| **ชื่อ-นามสกุล** | นายกรินทร์ สุขสอาด |
| **รหัสนักศึกษา** | 6704062612138 |
| **รายวิชา** | Intelligent Systems (IS) 2568 |
