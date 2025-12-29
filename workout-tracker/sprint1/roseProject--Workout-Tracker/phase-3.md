<center>

![Srinakharinwirot_Logo_TH_Color-1-300x300.jpg](/.attachments/Srinakharinwirot_Logo_TH_Color-1-300x300-744ba19b-9859-4669-827f-1a5aa5be25da.jpg)
</center>

<center><b>Workout Tracker</b></center>
<br>
<br>
<center>เสนอ</center>
<br>
<br>
<center>ผู้ช่วยศาสตราจารย์ ดร. วีรยุทธ เจริญเรืองกิจ</center>
<br>
<br>
<center>โดย</center>
<center>กลุ่ม rose</center>

<br>
<br>
<center> นายติณณภพ ทองหนุน รหัสนิสิต 66102010139</center>
<br>
<center>นางสาวไอลดา เกะผิง ชัว รหัสนิสิต 66102010159</center>
<br>
<center>นางสาวเรณุกา พลโลก รหัสนิสิต 66102010245</center>
<br>
<br>
<center>
โครงงานนี้เป็นส่วนหนึ่งของการศึกษารายวิชา คพ252</center>


<center>วิทยาศาสตร์คอมพิวเตอร์ มหาวิทยาลัยศรีนครินทรวิโรฒ</center>
<center>ภาคการศึกษาที่ 2 ปีการศึกษา 2567</center>
<br><br><br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br><br><br>

<center><b>New requirement & New design</b></center>

**New requirement**
- ผู้ใช้อยากให้มีหน้าสำหรับคำนวณ BMI ได้ในเว็บเลย โดยไม่ต้องเสียเวลาออกไปหาเว็บคำนวณจากที่อื่น

**New design**
- มีการเพิ่มหน้าคำนวณ BMI
- มีการทำหน้า schedule ที่มี calendar
- มีการทำหน้าสำหรับ add goal เพิ่ม
- มีการปรับเปลี่ยน UI ของบางหน้า เช่น ปรับตำแหน่งของปุ่ม
<br>
<br>
<br>

<center><b>Data Structure</B></center>
ใช้ users.json ในการเก็บข้อมูลของผู้ใช้ โดยใช้ data Structure: ArrayList ที่อนุญาตให้เพิ่มข้อมูลได้เร็ว (Arraylist that allow adding data quickly) <br>
ตัวอย่างของ users.json <br>
<br>

```
[
  {
    "username": "john",
    "email": "john@example.com",
    "password": "$2a$10$......",        // (hashed password)
    "image": "/uploads/profile123.jpg", // รูปโปรไฟล์
    "phone": "0123456789",              // ข้อมูลส่วนตัวเพิ่มเติม
    "birthday": "1990-01-01",
    "gender": "male",

    "tasks": [                          // 🔹 Goal/Task ของผู้ใช้
      {
        "id": 1712053394017,            // ใช้ Date.now() เป็น id
        "name": "Run 5km",
        "goal": "Cardio",
        "date": "2025-04-10",
        "notes": "Morning run",
        "status": "not_done"            // or 'done'
      }
    ],

    "bmiHistory": [                     // 🔸 ประวัติการคำนวณ BMI
      {
        "age": 30,
        "gender": "male",
        "weight": 70,
        "height": 1.75,
        "bmi": 22.86,
        "status": "Normal",
        "date": "2025-04-01T09:30:00.000Z"
      }
    ]
  }
]
```
<br>
<br>
<br>
<br>
<br>
<br>
<br>
1. ข้อมูลผู้ใช้ (User Info) <br>
<br>
<DIV  class="overflow-x-auto contain-inline-size"><TABLE><THEAD><TR><TH>Key</TH><TH>Type</TH><TH>Description</TH></TR></THEAD><TBODY><TR><TD><CODE>username</CODE></TD><TD><CODE>String</CODE></TD><TD>ชื่อผู้ใช้ (ใช้เป็น primary key ในระบบ)</TD></TR><TR><TD><CODE>email</CODE></TD><TD><CODE>String</CODE></TD><TD>อีเมลของผู้ใช้</TD></TR><TR><TD><CODE>password</CODE></TD><TD><CODE>String</CODE></TD><TD>รหัสผ่านที่ถูก hash แล้วด้วย bcrypt</TD></TR><TR><TD><CODE>image</CODE></TD><TD><CODE>String</CODE></TD><TD>path ของรูปโปรไฟล์ที่อัปโหลด</TD></TR><TR><TD><CODE>phone</CODE></TD><TD><CODE>String</CODE></TD><TD>เบอร์โทรศัพท์ (optional)</TD></TR><TR><TD><CODE>birthday</CODE></TD><TD><CODE>String</CODE></TD><TD>วันเกิดของผู้ใช้ (รูปแบบ yyyy-mm-dd)</TD></TR><TR><TD><CODE>gender</CODE></TD><TD><CODE>String</CODE></TD><TD>เพศ: <CODE>male</CODE>, <CODE>female</CODE>, <CODE>other</CODE> หรือว่างได้</TD></TR></TBODY></TABLE></DIV>
2. <CODE>tasks</CODE> (Goal List) <br>
<br>
<DIV  class="overflow-x-auto contain-inline-size"><TABLE><THEAD><TR><TH>Key</TH><TH>Type</TH><TH>Description</TH></TR></THEAD><TBODY><TR><TD><CODE>id</CODE></TD><TD><CODE>Number</CODE></TD><TD>ใช้ <CODE>Date.now()</CODE> เป็น ID เฉพาะของแต่ละ task</TD></TR><TR><TD><CODE>name</CODE></TD><TD><CODE>String</CODE></TD><TD>ชื่อกิจกรรม เช่น "Push-up 20 ครั้ง"</TD></TR><TR><TD><CODE>goal</CODE></TD><TD><CODE>String</CODE></TD><TD>ประเภทของเป้าหมาย เช่น "Strength", "Cardio"</TD></TR><TR><TD><CODE>date</CODE></TD><TD><CODE>String</CODE></TD><TD>วันที่ตั้งเป้า (แสดงใน calendar)</TD></TR><TR><TD><CODE>notes</CODE></TD><TD><CODE>String</CODE></TD><TD>หมายเหตุเพิ่มเติม (optional)</TD></TR><TR><TD><CODE>status</CODE></TD><TD><CODE>String</CODE></TD><TD><CODE>"done"</CODE> หรือ <CODE>"not_done"</CODE> เพื่อ track ความคืบหน้า</TD></TR></TBODY></TABLE></DIV>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
3. <CODE>bmiHistory</CODE> (ประวัติ BMI) <br>
<br>
<DIV  class="overflow-x-auto contain-inline-size"><TABLE><THEAD><TR><TH>Key</TH><TH>Type</TH><TH>Description</TH></TR></THEAD><TBODY><TR><TD><CODE>age</CODE></TD><TD><CODE>Number</CODE></TD><TD>อายุ ณ เวลาคำนวณ</TD></TR><TR><TD><CODE>gender</CODE></TD><TD><CODE>String</CODE></TD><TD>เพศที่เลือก</TD></TR><TR><TD><CODE>weight</CODE></TD><TD><CODE>Number</CODE></TD><TD>น้ำหนัก (kg)</TD></TR><TR><TD><CODE>height</CODE></TD><TD><CODE>Number</CODE></TD><TD>ส่วนสูง (m)</TD></TR><TR><TD><CODE>bmi</CODE></TD><TD><CODE>Number</CODE></TD><TD>ค่าที่คำนวณได้จากสูตร BMI</TD></TR><TR><TD><CODE>status</CODE></TD><TD><CODE>String</CODE></TD><TD>ประเภทเช่น <CODE>"Normal"</CODE>, <CODE>"Overweight"</CODE>, <CODE>"Obese"</CODE></TD></TR><TR><TD><CODE>date</CODE></TD><TD><CODE>String</CODE></TD><TD>วันที่และเวลาที่คำนวณ (ISO format)</TD></TR></TBODY></TABLE></DIV>
<br>
<center>Data Structures ที่ใช้ในระบบ Workout Tracker</center><br>
<DIV  class="overflow-x-auto contain-inline-size"><TABLE><THEAD><TR><TH>Data Structure</TH><TH>ใช้ที่ไหน (ไฟล์/ฟังก์ชัน)</TH><TH>หน้าที่/บทบาทหลัก</TH></TR></THEAD><TBODY><TR><TD><STRONG>Array (users array)</STRONG></TD><TD><CODE>users.json</CODE>, <CODE>index.js</CODE></TD><TD>เก็บข้อมูลผู้ใช้ทั้งหมดในระบบ</TD></TR><TR><TD><STRONG>Object (User object)</STRONG></TD><TD>ภายในแต่ละ element ของ <CODE>users[]</CODE></TD><TD>แสดงข้อมูลผู้ใช้แต่ละคน เช่น username, email, phone เป็นต้น</TD></TR><TR><TD><STRONG>Array (tasks)</STRONG></TD><TD><CODE>user.tasks[]</CODE>, <CODE>calendar</CODE>, <CODE>/add-task</CODE>, <CODE>/list</CODE></TD><TD>เก็บรายการเป้าหมาย (goals/tasks) ของผู้ใช้แต่ละคน</TD></TR><TR><TD><STRONG>Object (task)</STRONG></TD><TD>ภายใน <CODE>tasks[]</CODE></TD><TD>เก็บข้อมูลแต่ละ task เช่น id, name, date, status</TD></TR><TR><TD><STRONG>Array (bmiHistory)</STRONG></TD><TD><CODE>user.bmiHistory[]</CODE>, <CODE>/bmi/save</CODE>, <CODE>/bmi/history/:username</CODE></TD><TD>เก็บประวัติการคำนวณ BMI ของผู้ใช้</TD></TR><TR><TD><STRONG>Object (BMI entry)</STRONG></TD><TD>ภายใน <CODE>bmiHistory[]</CODE></TD><TD>เก็บข้อมูล BMI แต่ละครั้ง เช่น age, weight, height, status</TD></TR><TR><TD><STRONG>Session Object</STRONG></TD><TD><CODE>req.session.user</CODE></TD><TD>ใช้ระบุว่าใคร login อยู่ เพื่อควบคุมสิทธิ์และข้อมูลเฉพาะบุคคล</TD></TR><TR><TD><STRONG>localStorage (Array)</STRONG></TD><TD><CODE>workout_tracker.ejs</CODE>, <CODE>workout.ejs</CODE>, <CODE>bmi.ejs</CODE></TD><TD>เก็บข้อมูลชั่วคราวฝั่ง client เช่น workout ล่าสุด</TD></TR><TR><TD><STRONG>Array methods (<CODE>filter</CODE>, <CODE>sort</CODE>)</STRONG></TD><TD>ใช้ในหลายที่ เช่น <CODE>/calendar</CODE>, <CODE>/list</CODE>, frontend</TD><TD>ใช้ค้นหา จัดเรียง ลบ หรือแสดงข้อมูลจาก array</TD></TR></TBODY></TABLE></DIV>

<br>
<br>
<center><b>Unit Test-Case</b></center>

| **Test Case ID**<br> | **Description**<br> | **Input**<br> | **Expected Output**<br> | **Actual Output**<br> | **Pass/Fail**<br><br><br> |
| --- | --- | --- | --- | --- | --- |
| TC01<br> | addTask()<br> | { name: 'Task 1', priority: 1, username: 'user1' }<br> | Task should be added to taskManager.tasks<br> | Task should be added to taskManager.tasks<br> | Pass<br> |
| TC02<br> | getAllTasks()<br> | { name: 'Task 1', priority: 1, username: 'user1'<br> | Encrypted username should be returned<br> | Encrypted username should be returned<br> | Pass<br> |
| TC03<br> | summarizeByPriority()<br> | [ { priority: 1 }, { priority: 2 }, { priority: 1 } ]<br> | { 1: 2, 2: 1 }<br> | { 1: 2, 2: 1 }<br> | Pass<br> |
| TC04<br> | sortByPriority()<br> | { name: "Push-up", goal: "30 reps", date: "2025-04-02", notes: "Same name" }<br> | [ { priority: 1 }, { priority: 2 }, { priority: 3 } ]<br> | [ { priority: 1 }, { priority: 2 }, { priority: 3 } ]<br> | Pass<br> |
| TC05<br> | searchByName()<br> | Search for "important" in [ { name: 'Important Task' }, { name: 'Task 2' } ]<br> | [ { name: 'Important Task' } ]<br> | [ { name: 'Important Task' } ]<br> | Pass<br> |
| TC06<br> | saveTasksToFile()<br> | Save { name: ‘Task 1’ } to tasks.json<br> | File should be written with correct content<br> | File should be written with correct content<br> | Pass<br> |
| TC07<br> | loadTasksFromFile()<br> | Load tasks.json containing [ { name: ‘Task 1’ } ]<br> | taskManager.tasks should contain [ { name: ‘Task 1’ } ]<br> | taskManager.tasks should contain [ { name: ‘Task 1’ } ]<br> | Pass<br> |
| TC08<br> | addTask()<br> | { priority: 1, username: ‘user1’ } (without name)<br> | Should throw an error “Task name is required”<br> | Should throw an error “Task name is required”<br> | failed<br> |
| TC09<br> | sortByPriority()<br> | [ { name: 'Task A', priority: 2 }, { name: 'Task B', priority: 2 }, { name: 'Task C', priority: 1 } ]<br> | [ { name: 'Task C', priority: 1 }, { name: 'Task A', priority: 2 }, { name: 'Task B', priority: 2 } ]<br> | [ { name: 'Task C', priority: 1 }, { name: 'Task A', priority: 2 }, { name: 'Task B', priority: 2 } ]<br> | Pass<br> |
| TC10<br> | loadTasksFromFile()<br> | Load non-existent file "nonexistent.json"<br> | taskManager.tasks should be [ ]<br> | taskManager.tasks should be [ ]<br> | Pass<br> |

<br>

![rose1.png](/.attachments/rose1-36e4077e-59de-4220-9a90-c20c70694bbb.png)
<br>
<br>    
<center><b>Static Analysis: index.js</b></center>
<br>

| ไฟล์<br> | Complexity<br> | SLOC (จำนวนบรรทัดโค้ด)<br> | Estimated Errors<br> | Lint Errors<br> |
| --- | --- | --- | --- | --- |
| index.js<br> | 31<br> | 231<br> | 2.02<br> | 15<br> |

- **Complexity** การวัดความซับซ้อนของโค้ดที่มีการใช้หลายฟังก์ชันจากหลาย library รวมถึงการจัดการข้อมูลของผู้ใช้ (authentication), การจัดการไฟล์, และการทำงานกับฐานข้อมูลแบบ JSON
- **SLOC** จำนวนบรรทัดโค้ดในไฟล์ index.js ซึ่งเป็นการรวมบรรทัดที่ใช้กำหนดเส้นทาง (routes) ของ API และฟังก์ชันที่เกี่ยวข้อง
- **Estimated Errors** ค่าประมาณข้อผิดพลาดที่อาจเกิดขึ้นจากการวิเคราะห์โค้ด เช่น การจัดการข้อผิดพลาดจากฟังก์ชันหรือการตรวจสอบข้อมูลไม่ครบถ้วน
- **Lint Errors** จำนวนข้อผิดพลาดที่ตรวจพบโดยตัว lint ซึ่งอาจเกี่ยวข้องกับรูปแบบโค้ดที่ไม่สอดคล้อง, การตั้งชื่อตัวแปรที่ไม่เหมาะสม, หรือโครงสร้างโค้ดที่ไม่สะอาด

      
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<center><b>Dynamic analysis</b></center>
<br>

| **Task**<br> | Time (ms)<br> |
| --- | --- |
| addTask<br> | 0.751–1.415<br> |
| deleteTask<br> | 0.47–0.97<br> |
| deleteMultipleTasks<br> | 0.5–1.0<br> |
| getTasks<br> | 0.5–1.2<br> |
| viewTask<br> | 0.4–1.0<br> |
| sortTasksByPriority<br> | 0.3–0.9<br> |
| searchTasksByName<br> | 0.4–1.0<br> |
 
<center><b>Mobile</b></center>

![rose2.png](/.attachments/rose2-a45e1d9f-a9f6-4590-91eb-5e7d14d3885e.png)

<center><b>Desktop</b></center>

![rose3.png](/.attachments/rose3-d9e5b387-3a7b-4579-b261-8c1275413d5e.png)



```
//ตัวอย่างของ test-case code
const fs = require('fs');

const Task = require('../models/taskModel');

const Encryption = require('../util');

  

jest.mock('fs');

  

describe('Task Model Unit Tests', () => {

let taskManager;

let mockEncrypt;

  

beforeEach(() => {

taskManager = new Task();

mockEncrypt = jest.spyOn(Encryption.prototype, 'encrypt').mockReturnValue('encrypted_username');

});

  

afterEach(() => {

jest.restoreAllMocks();

});

  

test('TC01: should add a task', () => {

const task = { name: 'Task 1', priority: 1, username: 'user1' };

taskManager.addTask(task);

expect(taskManager.tasks).toContainEqual(task);

});

  

test('TC02: should return encrypted username in getAllTasks', () => {

const task = { name: 'Task 1', priority: 1, username: 'user1' };

taskManager.addTask(task);

const tasks = taskManager.getAllTasks();

expect(tasks[0].username).toBe('encrypted_username');

});

  

test('TC03: should summarize tasks by priority', () => {

taskManager.addTask({ priority: 1 });

taskManager.addTask({ priority: 2 });

taskManager.addTask({ priority: 1 });

expect(taskManager.summarizeByPriority()).toEqual({ 1: 2, 2: 1 });

});

  

test('TC04: should sort tasks by priority', () => {

taskManager.addTask({ priority: 3 });

taskManager.addTask({ priority: 1 });

taskManager.addTask({ priority: 2 });

expect(taskManager.sortByPriority()).toEqual([

{ priority: 1 },

{ priority: 2 },

{ priority: 3 }

]);

});

  

test('TC05: should search for a task by name', () => {

taskManager.addTask({ name: 'Important Task', username: 'user1' });

taskManager.addTask({ name: 'Task 2', username: 'user2' });

const result = taskManager.searchByName('important');

expect(result).toHaveLength(1);

expect(result[0].name).toBe('Important Task');

});

  

test('TC06: should save tasks to a file', () => {

taskManager.addTask({ name: 'Task 1' });

taskManager.saveTasksToFile('tasks.json');

expect(fs.writeFileSync).toHaveBeenCalledWith(

'tasks.json',

JSON.stringify([{ name: 'Task 1' }], null, 2)

);

});

  

test('TC07: should load tasks from a file', () => {

fs.existsSync.mockReturnValue(true);

fs.readFileSync.mockReturnValue(JSON.stringify([{ name: 'Task 1' }]));

taskManager.loadTasksFromFile('tasks.json');

expect(taskManager.tasks).toEqual([{ name: 'Task 1' }]);

});

  

test('TC08: should not allow adding a task without a name', () => {

const task = { priority: 1, username: 'user1' };

expect(() => taskManager.addTask(task)).toThrow('Task name is required');

});

  

test('TC09: should maintain order when sorting tasks with same priority', () => {

taskManager.addTask({ name: 'Task A', priority: 2 });

taskManager.addTask({ name: 'Task B', priority: 2 });

taskManager.addTask({ name: 'Task C', priority: 1 });

expect(taskManager.sortByPriority()).toEqual([

{ name: 'Task C', priority: 1 },

{ name: 'Task A', priority: 2 },

{ name: 'Task B', priority: 2 }

]);

});

  

test('TC10: should handle loading from a non-existent file', () => {

fs.existsSync.mockReturnValue(false);

taskManager.loadTasksFromFile('nonexistent.json');

expect(taskManager.tasks).toEqual([]);

});

  

});
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<center><b>สิ่งที่ยังไม่เสร็จสมบูรณ์ เช่น bug, error</b></center>

- UI ที่สมบูรณ์ และมีความสวยงาม
- การดึงข้อมูลหน้า Progress
- การใช้ Priority
- Details เล็กน้อยของบางฟังก์ชัน บางหน้า

<center><b>Website screenshot</b></center>

![Screenshot 2568-04-03 at 18.28.35.png](/.attachments/Screenshot%202568-04-03%20at%2018.28.35-e1eb9875-150d-4a17-a99b-82867a52ea53.png)

![Screenshot 2568-04-03 at 18.28.42.png](/.attachments/Screenshot%202568-04-03%20at%2018.28.42-6509c867-9719-499d-bcff-7d1bf39a88b0.png)

![Screenshot 2568-04-03 at 18.29.12.png](/.attachments/Screenshot%202568-04-03%20at%2018.29.12-08f2a4f7-0ada-49fe-b9c0-545c74dcfd93.png)

![Screenshot 2568-04-03 at 18.29.33.png](/.attachments/Screenshot%202568-04-03%20at%2018.29.33-c78274af-53d1-4be2-a368-909b118e8354.png)

![Screenshot 2568-04-03 at 18.32.59.png](/.attachments/Screenshot%202568-04-03%20at%2018.32.59-a4d0c3e9-fb7e-402b-86cf-217841c69814.png)

![Screenshot 2568-04-03 at 18.29.42.png](/.attachments/Screenshot%202568-04-03%20at%2018.29.42-206fb04d-0edf-4196-b474-849a89213af3.png)

![Screenshot 2568-04-03 at 18.29.46.png](/.attachments/Screenshot%202568-04-03%20at%2018.29.46-ef336a10-399f-4cfc-be73-7dbf21e19dd8.png)

![Screenshot 2568-04-03 at 18.32.49.png](/.attachments/Screenshot%202568-04-03%20at%2018.32.49-9b0a0acc-fc48-4237-9fc5-8093b850aa81.png)

![Screenshot 2568-04-03 at 18.29.50.png](/.attachments/Screenshot%202568-04-03%20at%2018.29.50-1feda4c0-4a86-4a67-bf68-3f0a27effa4d.png)

![Screenshot 2568-04-03 at 18.29.57.png](/.attachments/Screenshot%202568-04-03%20at%2018.29.57-1a27591e-2362-40b1-ae53-34b3a0cf98cc.png)

![Screenshot 2568-04-03 at 18.33.05.png](/.attachments/Screenshot%202568-04-03%20at%2018.33.05-b139e65f-2768-4bbf-bf14-42c688224e8c.png)

![Screenshot 2568-04-03 at 18.30.02.png](/.attachments/Screenshot%202568-04-03%20at%2018.30.02-298ba5cf-4074-4204-bd37-fa8512c0460d.png)

![Screenshot 2568-04-03 at 18.30.06.png](/.attachments/Screenshot%202568-04-03%20at%2018.30.06-269f9a52-f7c7-4efc-ae20-10ff490b334a.png)

![Screenshot 2568-04-03 at 18.30.19.png](/.attachments/Screenshot%202568-04-03%20at%2018.30.19-01c413a1-02dc-4aef-a4db-c269516085bb.png)

![Screenshot 2568-04-03 at 18.31.14.png](/.attachments/Screenshot%202568-04-03%20at%2018.31.14-433a251c-c05a-48a5-b94c-99df980741b5.png)

![Screenshot 2568-04-03 at 18.30.23.png](/.attachments/Screenshot%202568-04-03%20at%2018.30.23-da0c0516-ebb7-4009-a7af-15d60fa4c0a1.png)

<center><b>อธิบายกระบวนการทำงาน โดยใช้ process, methods, and tools ที่เพิ่มเติมจาก phase 1 and 2 เช่น การบริหาร project, การ monitor build, การจัดการ bugs</b></center>
<br> 
<b>กระบวนการทำงานใน phase 1</b>
  <br>ในการพัฒนา Software ใน phase 1 ทางกลุ่มของเรามีการเริ่มพูดคุย และวางแผนการทำงานผ่าน Line, Discord และ Azure Devops และเริ่มทำ Requirement ค้นหาข้อมูลต่าง ๆ เพิ่มเติม และมีการแบ่งงานออกเป็นแต่ละ sprint เพื่อให้ง่ายต่อการทำงานร่วมกัน สุดท้ายมีการทำ Retrospectives เพื่อสรุปสิ่งที่กลุ่มเรากำลังจะทำ แผนงาน และเครื่องมือที่ใช้ในการพัฒนา Software ที่กำลังจะเกิดขึ้น<br><br>
<b>กระบวนการทำงานใน phase 2</b>
  <br>ในการพัฒนา Software ใน phase 2 ทางกลุ่มของเราได้มีการเริ่มออกแบบ UI โดยมีการออกแบบคร่าว ๆ ในแอพ Procreate และใช้ Figma ในการออกแบบเว็บไซต์ต่อจนเสร็จสมบูรณ์ และมีการใช้ Mermaid ในการออกแบบ Design Document ในส่วนของการพูดคุย ติดต่อ และประชุมมีการใช้ Line บ่อยมากขึ้น ผสมกับ Discord ร่วมด้วย และใช้ Azure Devops ในการทำรูปเล่มเอกสาร<br><br>

<b>สิ่งที่เปลี่ยนแปลงจาก  phase 1 และ phase 2</b>
    <br>ในระยะที่ 3 ของการพัฒนา มีการเพิ่มฟีเจอร์ใหม่และปรับปรุงโครงสร้างของระบบให้มีความเสถียรยิ่งขึ้น โดยมุ่งเน้นไปที่การพัฒนาฟังก์ชันการทำงานที่ช่วยอำนวยความสะดวกแก่ผู้ใช้ ควบคู่ไปกับการนำกระบวนการพัฒนาที่เป็นระบบมาใช้เพื่อให้สามารถติดตามความคืบหน้าได้อย่างมีประสิทธิภาพ นอกจากนี้ ยังมีการปรับปรุงคุณภาพของซอฟต์แวร์ในหลาย ๆ ด้านเพื่อให้รองรับการขยายตัวในอนาคต
*   **เพิ่มฟีเจอร์ใหม่**: เพิ่มเครื่องคำนวณ BMI, ปฏิทินกำหนดการออกกำลังกาย, ระบบตั้งเป้าหมาย และปรับปรุง UI
*   **กระบวนการ Agile**: ใช้ Scrum Framework แบ่งงานเป็น Sprint พร้อมการประชุม Planning, Daily Stand-up, Review และ Retrospective โดยใช้ Azure DevOps และ JIRA จัดการงาน
*   **การควบคุมคุณภาพโค้ด**: นำ CI/CD มาใช้ผ่าน GitHub Actions และ Jenkins ทำให้การ build, test และ deploy เป็นอัตโนมัติ ใช้ Docker, Kubernetes และ SonarQube
*   **ระบบจัดการข้อผิดพลาด**: ใช้ Sentry, LogRocket, Azure DevOps สำหรับติดตามบั๊ก และทำ Regression Testing พร้อมใช้ Postman, Selenium และ TestRail
*   **การจัดการข้อมูล**: ปรับปรุง users.json ให้รองรับข้อมูล BMI, Task และ Goal ใช้ ArrayList จัดการข้อมูล และเพิ่มการวิเคราะห์ประสิทธิภาพโค้ด

<br>
<center><b>Retrospective and Link to Retrospective YouTube video</b></center>

![Screenshot 2568-04-03 at 21.01.59.png](/.attachments/Screenshot%202568-04-03%20at%2021.01.59-de3b076a-0f86-4000-a973-9e78a08438c2.png)

link : [https://youtu.be/JkzDrR8cVp4](https://youtu.be/JkzDrR8cVp4)

**สรุปการประชุม**
- UI ที่เปลี่ยนจากของเดิม
- การเพิ่มหน้าจาก UI เดิม
- การ test-case ได้แก่ test-case data structure, Test coverage report, รายงาน Static profiling และ Dynamic profiling (Structural method)
- การใช้ data structure: array list
- What went well, What didn't go well, what can be improved (group)