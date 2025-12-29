
    
*   Website screenshot
       
![image.png](/.attachments/image-8dfacd1f-a8f9-4e20-a7de-b21502107551.png)
![image.png](/.attachments/image-f3615081-e0b2-43f9-a56e-fc63d09e9289.png)
![image.png](/.attachments/image-99279fa0-4e63-4f41-944a-0102d2da34c6.png)
![image.png](/.attachments/image-4270b528-10c3-4980-b878-02ad8497bb42.png)
![image.png](/.attachments/image-920c4fa5-ad86-459f-8b24-f944fb645755.png)
![image.png](/.attachments/image-573b08b2-3e99-4964-9eac-dd2599d5c3a2.png)
![image.png](/.attachments/image-1eb88bf6-5914-444a-8b2c-972003d9d3ea.png)
![image.png](/.attachments/image-887ae6e7-9b96-4a5b-8a9c-df8ed5a3c115.png)
![image.png](/.attachments/image-23343694-7284-4daf-8df6-26b83b283c07.png)
![image.png](/.attachments/image-35ecb5be-1dc7-43e2-a143-8693fa27e85b.png)
![image.png](/.attachments/image-3b44a89d-1eba-4cc8-8384-c40f71501b64.png)
![image.png](/.attachments/image-622a7759-b6af-4a32-b5dc-a4dd270a745b.png)
![image.png](/.attachments/image-34853d6b-368f-47b7-9389-381dd52cf66f.png)

    
*   สร้าง 5 UI testcases.✅
<br>![Screenshot 2025-04-26 140024.png](/.attachments/Screenshot%202025-04-26%20140024-54d94448-683d-45f9-b595-bc7ca711dd68.png)</br>
1.  **Test Login with Valid Credentials**
    *   ทดสอบการเข้าสู่ระบบด้วยข้อมูลที่ถูกต้อง (`username: ken`, `password: ken123`)
    *   ตรวจสอบว่า URL เปลี่ยนไปยัง `/workout_tracker` และชื่อหน้าเป็น "Workout Tracker"
2.  **Test Add Task for user**
    *   ทดสอบการเพิ่ม task ใหม่
    *   กรอกข้อมูล task (`name`, `goal`, `date`, `notes`) และส่งฟอร์ม
    *   ตรวจสอบว่า task ที่เพิ่มปรากฏในรายการ task
3.  **Test Search Task by Name for user**
    *   ทดสอบการค้นหา task โดยชื่อ
    *   ตรวจสอบว่า URL เปลี่ยนไปยัง `/list` และชื่อหน้าเป็น "Workout Tracker - Goal List"
4.  **Test Delete Task for user**
    *   ทดสอบการลบ task
    *   ตรวจสอบว่า URL เปลี่ยนไปยัง `/list` และชื่อหน้าเป็น "Workout Tracker - Goal List"
5.  **Test View BMI History for user**
    *   ทดสอบการดูประวัติ BMI
    *   ตรวจสอบว่ามีข้อมูล BMI (`20.31`) แสดงในรายการประวัติ BMI (`ul#bmiHistory`)

    
*   เช็คให้แน่ใจว่า testcases โดยที่ทุก testcase ต้องมี การเช็คค่าสำหรับ expected results✅
    
*   ผล profiling (Static profiling และ Dynamic profiling) เทีบยกับ phase 3✅
<br></br>
<br>    
<center><b>Static Analysis: index.js</b></center>
<br>
Static Profiling

### ผลลัพธ์:

*   **จำนวนบรรทัดโค้ด (Lines of Code):** 80 บรรทัด
    
*   **ความซับซ้อนเชิงตรรกะ (Cyclomatic Complexity):** ต่ำ (โค้ดส่วนใหญ่เป็น HTML และ EJS Template)
    
*   **การใช้ฟังก์ชันซ้ำซ้อน:** ไม่มี พบว่าไม่มีการเรียกใช้ฟังก์ชันซ้ำซ้อนเกินความจำเป็น
    
*   **การจัดรูปแบบโค้ด:** โครงสร้างโค้ดชัดเจน เป็นระเบียบ และอ่านเข้าใจง่าย
    

* * *

Dynamic Profiling
=================

### ผลลัพธ์:

*   **เวลาในการประมวลผล:**
    *   การแสดง Task List: เร็ว (ใช้เวลาน้อยกว่า 100 มิลลิวินาที)
        
    *   การเพิ่ม Task (`/add`): เวลาประมวลผลขึ้นอยู่กับฝั่งเซิร์ฟเวอร์ (Server Processing)
        
*   **การใช้หน่วยความจำ (Memory Usage):** ต่ำ (ไม่มีการโหลดข้อมูลขนาดใหญ่)
    
*   **การเรียกใช้ I/O:**
    *   การดึงข้อมูล Task: ขึ้นอยู่กับความเร็วของฐานข้อมูล
        
    *   การค้นหา (`/search`): ประสิทธิภาพการค้นหาขึ้นอยู่กับประสิทธิภาพของการ Query ฐานข้อมูล
</br>



Static Analysis: `index.js`

| รายการ | ผลลัพธ์ |
| --- | --- |
| **Complexity** | 31 |
| **SLOC (จำนวนบรรทัดโค้ด)** | 231 บรรทัด |
| **Estimated Errors** | 2.02 |
| **Lint Errors** | 15 |
| **สรุป:** | ไฟล์มีการใช้งานหลายฟังก์ชันจากหลายไลบรารี เช่น การจัดการ Authentication, การจัดการไฟล์ และการทำงานกับฐานข้อมูล JSON ทำให้โค้ดมีความซับซ้อนปานกลาง แต่ยังอยู่ในเกณฑ์ควบคุมได้ |

* * *

Dynamic Analysis: Task Operation Times

| Task | เวลาประมวลผล (ms) |
| --- | --- |
| **addTask** | 0.751 – 1.415 |
| **deleteTask** | 0.47 – 0.97 |
| **deleteMultipleTasks** | 0.5 – 1.0 |
| **getTasks** | 0.5 – 1.2 |
| **viewTask** | 0.4 – 1.0 |
| **sortTasksByPriority** | 0.3 – 0.9 |
| **searchTasksByName** | 0.4 – 1.0 |
| **สรุป:** | ทุกฟังก์ชันทำงานได้เร็ว (< 1.5 ms) แสดงถึงประสิทธิภาพที่ดี ไม่มีจุดรอโหลดนาน |

* * *

สรุปเทียบ Static vs Dynamic
==============================

| หมวด | Static Analysis | Dynamic Analysis |
| --- | --- | --- |
| **จุดเด่น** | ตรวจพบซับซ้อนในโค้ดพอสมควรแต่ยังควบคุมได้, พบ Lint Errors 15 จุด | เวลาทำงานของแต่ละ Task ต่ำมาก (< 1.5 ms) |
| **ปัญหาที่พบ** | ความซับซ้อนจากการรวมหลายฟังก์ชัน + Lint Errors ที่ควรแก้ไข | ไม่มีปัญหาเด่นเรื่องประสิทธิภาพ |
| **ข้อเสนอแนะ** | ลดความซับซ้อนโค้ด และแก้ไข Lint Errors เพื่อความสะอาดของโค้ด | ไม่มีข้อเสนอเพิ่มเติม ด้าน performance ดีมากแล้ว |
    
*   อธิบายการทำ CI/CD ที่ใช้ในการทำ product โดยที่ CI (Pipeline) ให้ใช้ script ที่มีให้ (จำเป็นต้องมี free tier parallel job)   

       
**อธิบายการทำ** **CI/CD** **ที่ใช้ในการทำ** **product** **โดยที่** **CI (Pipeline)** **ให้ใช้** **script** **ที่มีให้ (จำเป็นต้องมี** **free tier parallel job)**

**ความหมายของ** **CI/CD**
•        **CI (Continuous Integration)** คือ การ "ตรวจสอบและ build" อัตโนมัติ **ทุกครั้งที่มีการ** **push code**
•        **CD (Continuous Deployment)** คือ การ "Deploy" เอา code ขึ้นไปยัง server อัตโนมัติหลังจากผ่านการ build สำเร็จ

**ขั้นตอนการทำ** **CI**
**ขั้นตอนที่ 1 เตรียม** **Project**
*   Source Code
*   มีไฟล์ package.json และโค้ดพร้อม

**ขั้นตอนที่** **2** **เตรียม** **Remote Git Repository**
*   ใช้ Git เช่น Azure Repos
*   ให้ push โปรเจกต์ขึ้นไป (ให้อยู่ใน branch เช่น main)

**ขั้นตอนที่** **3** **สร้าง** **Azure Pipeline** **ใหม่**
*   เข้าไปที่ Azure DevOps > Pipelines > New Pipeline
*   เชื่อมกับ Git Repo ของโปรเจกต์
*   เลือก **Starter Pipeline** (หรือ Node.js Template ก็ได้)
*   จากนั้นให้แก้ Script เป็นประมาณนี้ (Script มี template ให้อยู่แล้ว)
| # azure-pipelines.yml<br>trigger:<br>- main<br>pool:<br>  vmImage: 'ubuntu-latest'<br>steps:<br>- task: NodeTool@0<br>  inputs:<br>    versionSpec: '20.x'  # เลือกเวอร์ชัน Node.js ที่ต้องการ<br>  displayName: 'Install Node.js'<br>- script: |<br>    npm install<br>    npm run build<br>    npm test<br>displayName: 'Build and Test Project'<br> |
| --- |

### **ขั้นตอนที่** **4** **ขอ** **Free Tier Parallelism (****หรือใช้** **Self-hosted Agent)**

*   **ถ้าไม่มี** **free tier:** ต้องกดขอ Free Parallelism จาก Microsoft
*   **ถ้ามี** **Self-hosted agent:** ก็ติดตั้ง agent รันเองได้เลย

**ขั้นตอนที่** **5** **การทำงานของ** **CI Pipeline**
*   ทุกครั้งที่ push เข้า main
*   Azure Pipelines จะทำงานดังนี้:
-        เช็กว่าไฟล์ azure-pipelines.yml มีอยู่
-        สร้างเครื่องเสมือน (VM) ใช้ image ubuntu-latest
-        ติดตั้ง Node.js
-        ติดตั้ง npm package
-        รัน build
-        รัน test
*   ถ้า Build หรือ Test fail จะขึ้นแจ้งเตือนทันที
![image.png](/.attachments/image-22d76319-8674-496b-bfa0-61f4b2944964.png)

![image.png](/.attachments/image-2370db76-6dc7-4f58-8edc-bd4c0c66f70e.png)

![image.png](/.attachments/image-07099962-77f5-4147-9c1b-89955e56fe71.png)

**อธิบายกระบวนการทำงาน โดยใช้** **process, methods, and tools** **ที่เพิ่มเติมจาก** **phase 1,2 and 3** **เช่น การบริหาร** **project,** **การ** **monitor build,** **การจัดการ** **bug**

ในการพัฒนาซอฟต์แวร์ในระยะต่อเนื่องจาก Phase 1-3 ทีมได้เพิ่มเติมกระบวนการทำงานในเชิงลึกมากขึ้น โดยครอบคลุมด้านการบริหารโครงการ การตรวจสอบการ build และการจัดการข้อผิดพลาด ดังนี้

**1. การบริหารโปรเจกต์ (Project Management)**
*   ใช้ **Azure DevOps** ในการสร้าง **Epic**, **Feature**, **User Story**, และ **Task** เพื่อแบ่งงานย่อยและกำหนดความสำคัญของแต่ละงาน
*   วางแผน Sprint ด้วย **Sprint Planning Meeting** ทุกครั้งก่อนเริ่มรอบการทำงานใหม่

**2.** **การ** **Monitor Build (Build Monitoring)**
*   ใช้ **Azure Pipelines** เป็นเครื่องมือ CI/CD สำหรับตรวจสอบการ Build ของโค้ดทุกครั้งที่มีการ Push หรือ Merge
*   ตั้งค่า Pipeline ให้ทำขั้นตอนอัตโนมัติ ได้แก่:
-        npm install
-        npm run build
-        npm run test:ci
*   ระบบแจ้งเตือนผ่าน **Azure DevOps Notification** และ **Discord Webhook** เมื่อ Build สำเร็จหรือเกิดข้อผิดพลาด
*   มีการวิเคราะห์ผลการ Build ผ่านหน้าจอ Dashboard ของ Azure DevOps เช่น
-        จำนวนครั้งที่ Build สำเร็จ/ล้มเหลว
-        เวลาเฉลี่ยที่ใช้ในการ Build
-        Coverage Report จาก SonarQube / Jest
*   ทุกการ Build ถูก Archive ไว้เพื่อการตรวจสอบย้อนหลัง (Build Artifact)

**จากการปรับเปลี่ยนวิธีการทำงานใน** **Phase 4** **ส่งผลให้**
- Process ที่เพิ่มมานี้ช่วยให้โครงการมี **ความเป็นระบบ (Structured)** มากขึ้น
- ลดปัญหา **งานล่าช้า (Delay)** และ **ข้อผิดพลาดที่ไม่ถูกจัดการ (Unmanaged Bugs)** ในทีม
- ทำให้สามารถ **ขยายโครงการในอนาคต** ได้ง่ายและมีประสิทธิภาพ    

    
      

**Retrospective and Link to Retrospective YouTube video - Phase 4**

![image.png](/.attachments/image-ccf29ac6-fd03-4869-95ad-7a4cc273f868.png)
      
link : 
**[https://youtu.be/i5Clx7tK9wE?si=ruqwcv4DPwYiaJh9](https://youtu.be/UzWuHPtk4mw)**
*   การเปรียบเทียบการทำงาน กับ Phase 3
*   5 UI Testcases
*   Process Method Tools ที่เพิ่มเติมมา
*   What went well, What didn't go well, what can be improved (group)
    