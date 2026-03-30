import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, Resizing
from tensorflow.keras.models import Sequential
import numpy as np

print("1. กำลังโหลดชุดข้อมูล CIFAR-10...")
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.cifar10.load_data()

print("2. กำลังเตรียมข้อมูลและจำลองความไม่สมบูรณ์...")
# จำลองภาพที่มี Noise เพื่อให้ข้อมูลมีความไม่สมบูรณ์ตาม Requirement ของอาจารย์
np.random.seed(42)
noise_factor = 0.2
noisy_indices = np.random.choice(len(X_train), size=int(len(X_train)*0.1), replace=False)
noise = np.random.normal(loc=0.0, scale=255.0, size=X_train[noisy_indices].shape)
X_train_noisy = X_train[noisy_indices] + noise_factor * noise
X_train[noisy_indices] = np.clip(X_train_noisy, 0, 255).astype('uint8')

# Normalization (หาร 255)
X_train_scaled = X_train.astype('float32') / 255.0
X_test_scaled = X_test.astype('float32') / 255.0

print("3. กำลังโหลดและสร้างโมเดล MobileNetV2...")
# กำหนด input_shape ให้ฐานของโมเดลเป็น 96x96 เพื่อป้องกัน Warning และเพิ่มประสิทธิภาพ
base_model = MobileNetV2(input_shape=(96, 96, 3), include_top=False, weights='imagenet')
base_model.trainable = False # แช่แข็งน้ำหนักไว้ก่อน

model = Sequential([
    # หัวใจสำคัญคือบรรทัดนี้: ขยายภาพจาก 32x32 เป็น 96x96 ก่อนเข้า Pre-trained model
    Resizing(96, 96),
    base_model,
    GlobalAveragePooling2D(),
    Dense(256, activation='relu'), # เพิ่ม Node จาก 128 เป็น 256 เพื่อให้โมเดลฉลาดขึ้น
    Dropout(0.3),
    Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

print("4. กำลังเริ่มเทรนโมเดล...")
# ปรับจาก 5 เป็น 10 Epochs เพื่อให้โมเดลเรียนรู้ได้ดีขึ้น (อาจจะใช้เวลาเทรนใน Colab ประมาณ 5-10 นาที)
history = model.fit(X_train_scaled, y_train,
                    epochs=5,
                    validation_data=(X_test_scaled, y_test),
                    batch_size=64)

print("5. กำลังประเมินผลบน Test Set...")
test_loss, test_acc = model.evaluate(X_test_scaled, y_test, verbose=0)
print(f"Test Accuracy: {test_acc:.4f}")

# บันทึกไฟล์เป็น .keras ซึ่งเป็นฟอร์แมตมาตรฐานใหม่และแก้ไข Warning ในเวอร์ชั่นเก่า
model.save('cifar10_cnn_pretrained.keras')
print("\nบันทึกไฟล์ 'cifar10_cnn_pretrained.keras' เรียบร้อยแล้ว กรุณาดาวน์โหลดไฟล์นี้ไปแทนไฟล์เดิมครับ")