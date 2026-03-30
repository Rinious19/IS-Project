import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report, accuracy_score
import joblib

# 1. โหลดข้อมูล
# หมายเหตุ: ไปดาวน์โหลดไฟล์ KDDTrain+.txt จากเว็บไซต์ต้นทาง และอัปโหลดลง Colab ก่อนรัน
columns = (['duration','protocol_type','service','flag','src_bytes','dst_bytes','land','wrong_fragment','urgent','hot',
            'num_failed_logins','logged_in','num_compromised','root_shell','su_attempted','num_root','num_file_creations',
            'num_shells','num_access_files','num_outbound_cmds','is_host_login','is_guest_login','count','srv_count',
            'serror_rate','srv_serror_rate','rerror_rate','srv_rerror_rate','same_srv_rate','diff_srv_rate','srv_diff_host_rate',
            'dst_host_count','dst_host_srv_count','dst_host_same_srv_rate','dst_host_diff_srv_rate','dst_host_same_src_port_rate',
            'dst_host_srv_diff_host_rate','dst_host_serror_rate','dst_host_srv_serror_rate','dst_host_rerror_rate','dst_host_srv_rerror_rate',
            'attack','level'])

df = pd.read_csv('KDDTrain+.txt', names=columns)

# 2. EDA & Data Preparation
print("รูปร่างของ Dataset:", df.shape)

# จำลองสถานการณ์ความไม่สมบูรณ์ของข้อมูลตามข้อกำหนดอาจารย์
# โดยการสุ่มใส่ค่า NaN ไปในคอลัมน์ 'duration' จำนวน 1% ของข้อมูล
np.random.seed(42)
nan_indices = np.random.choice(df.index, size=int(len(df)*0.01), replace=False)
df.loc[nan_indices, 'duration'] = np.nan

# จัดการข้อมูลที่ไม่สมบูรณ์ (Imputation) ด้วยค่ามัธยฐาน
df['duration'] = df['duration'].fillna(df['duration'].median())

# แปลงผลลัพธ์ (Target) ให้เป็น Binary Classification: Normal (0) vs Attack (1)
df['attack_class'] = np.where(df['attack'] == 'normal', 0, 1)
df = df.drop(['attack', 'level'], axis=1)

# แยก Features (X) และ Target (y)
X = df.drop('attack_class', axis=1)
y = df['attack_class']

# ทำ Label Encoding สำหรับ Categorical Data
cat_cols = ['protocol_type', 'service', 'flag']
label_encoders = {}
for col in cat_cols:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    label_encoders[col] = le

# แบ่งข้อมูล Train/Test โดยใช้ข้อมูลแค่บางส่วนเพื่อประหยัดเวลาเทรน SVM
# (ถ้าต้องการรันจริงจังให้ปรับ train_size เพิ่มขึ้น)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, train_size=0.1, random_state=42)

# ทำ Feature Scaling (จำเป็นมากสำหรับ SVM)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 3. สร้าง Ensemble Model (RF, GB, SVM)
print("กำลังเตรียมโมเดล...")
rf = RandomForestClassifier(n_estimators=50, random_state=42)
gb = GradientBoostingClassifier(n_estimators=50, random_state=42)
# กำหนด max_iter เพื่อป้องกันไม่ให้ SVM ใช้เวลาเทรนนานเกินไปบน Colab
svm = SVC(kernel='rbf', probability=True, max_iter=2000, random_state=42)

ensemble_model = VotingClassifier(
    estimators=[('rf', rf), ('gb', gb), ('svm', svm)],
    voting='soft'
)

# 4. เทรนโมเดล
print("กำลังเทรน Ensemble Model...")
ensemble_model.fit(X_train_scaled, y_train)

# 5. ประเมินผลโมเดล
print("กำลังประเมินผล...")
y_pred = ensemble_model.predict(X_test_scaled)
print("\nAccuracy Score:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# 6. บันทึกโมเดลและเครื่องมือต่างๆ ไว้ใช้บน Backend (Railway)
joblib.dump(ensemble_model, 'nsl_kdd_ensemble.pkl')
joblib.dump(scaler, 'nsl_kdd_scaler.pkl')
# บันทึก Label Encoders เผื่อต้องใช้แปลงค่าจากเว็บ
joblib.dump(label_encoders, 'nsl_kdd_encoders.pkl')

print("\nบันทึกไฟล์ .pkl ทั้งหมดเรียบร้อยแล้ว กรุณาดาวน์โหลดไฟล์เก็บไว้ครับ")