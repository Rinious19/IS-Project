# ใช้ Python 3.12 แบบเบา (ลดพื้นที่)
FROM python:3.12-slim

# สร้าง User ใหม่ชื่อ user (Hugging Face แนะนำให้ทำเรื่องสิทธิ์)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

# กำหนดโฟลเดอร์ทำงาน
WORKDIR $HOME/app

# สำคัญ: ย้าย Cache ของ Hugging Face/TensorFlow ไปไว้ที่ /tmp เพราะ Hugging Face อนุญาตให้เขียนข้อมูลได้แค่ที่ /tmp
ENV TRANSFORMERS_CACHE=/tmp \
    MPLCONFIGDIR=/tmp \
    TORCH_HOME=/tmp

# คัดลอกไฟล์ requirements ก่อนเพื่อทำ Caching
COPY --chown=user requirements.txt .

# ติดตั้งไลบรารี
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# คัดลอกไฟล์ทั้งหมด (รวมโมเดล) ไปที่ image
COPY --chown=user . .

# สั่งรัน FastAPI โดย Hugging Face บังคับให้ใช้พอร์ต 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]