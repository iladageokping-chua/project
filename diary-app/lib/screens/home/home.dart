import 'package:flutter/material.dart';
import 'package:project_diary_cp213/screens/home/widgets/profile.dart';
import '../note/note_screen.dart';
import '../note/table_calendar.dart';
import 'widgets/item_note.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // ขนาดหน้าจอ
    // ignore: unused_local_variable
    final size = MediaQuery.of(context).size;

    return Scaffold(
      // พื้นหลังของหน้าจอ
      backgroundColor: const Color(0xFFFFEDF3),

      // ---------------------
      // ส่วนหัว (AppBar แบบกำหนดเอง)
      // ---------------------
appBar: AppBar(
  backgroundColor: const Color(0xFFFFA7C4), // สีชมพู
  title: Text(
    'Diary App',
    style: TextStyle(
      color: Colors.white,  // สีข้อความ
      fontSize: 24,  // ขนาดฟอนต์
      fontWeight: FontWeight.bold, // หนา
    ),
  ),
  actions: [
    // ไอคอน Profile ที่มุมขวาบน
    IconButton(
      icon: const Icon(Icons.account_circle),
      onPressed: () {
        // ไปหน้า Profile
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const ProfileScreen()),
        );
      },
    ),
  ],
),


      // ---------------------
      // ส่วนแสดงเนื้อหาหลักของหน้า Home
      // ---------------------
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16), // เว้นระยะห่างจากขอบ
          child: Column(
            children: [
              // ส่วน Top Bar ที่มี Avatar ด้านซ้าย
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Row(
                  children: [
                    // Avatar ผู้ใช้
                    CircleAvatar(
                      radius: 24,
                      backgroundColor: Colors.grey[300],
                      child: ClipOval(
                        child: Image.asset(
                          'assets/images/kuromi.jpg',
                          fit: BoxFit.cover,
                          width: 48,
                          height: 48,
                        ),
                      ),
                    ),
                    const Spacer(),
                  ],
                ),
              ),

              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Welcome to Diary App !',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFF4A4A4A), // สีเทาเข้ม
                    ),
                  ),
                ),
              ),

              // ข้อความรอง
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    "Don't let a bad day make you feel like you have a bad life",
                    style: TextStyle(
                      fontSize: 14,
                      color: Color(0xFF7D7D7D), // สีเทาอ่อน
                    ),
                  ),
                ),
              ),

              // ---------------------
              // ส่วนแสดงรายการ Note
              // ---------------------
              buildMonthSection(
                context,
                monthTitle: 'Aug 2023',
                memoryCount: 2,
                notes: const [
                  ItemNote(
                    color: Color(0xFFEECEDA), // สีชมพู
                    title: 'Hard day AF',
                    date: '03 Aug',
                    description: 'I had a wonderful day! today was...',
                  ),
                  ItemNote(
                    color: Color(0xFFCCDCEB), // สีเขียวอ่อน
                    title: 'B-Day Party!',
                    date: '02 Aug',
                    description: 'I had a wonderful day! today was...',
                  ),
                ],
              ),
              buildMonthSection(
                context,
                monthTitle: 'Jul 2023',
                memoryCount: 3,
                notes: const [
                  ItemNote(
                    color: Color(0xFFE0D4E7), // สีฟ้าอ่อน
                    title: 'Silly day',
                    date: '29 Jul',
                    description: 'I had a wonderful day! today was...',
                  ),
                  ItemNote(
                    color: Color(0xFFEECEDA), // สีเขียวอ่อน
                    title: 'AMAZING INTERVIEW!',
                    date: '24 Jul',
                    description: 'I had a wonderful day! today was...',
                  ),
                  ItemNote(
                    color: Color(0xFFBDD2E4),
                    title: 'Picnic with Friends',
                    date: '22 Jul',
                    description: 'I had a wonderful day! today was...',
                  ),
                ],
              ),
              // เพิ่มส่วนอื่น ๆ ตามต้องการ
              const SizedBox(height: 80), // เว้นที่ด้านล่างเผื่อ Bottom Bar
            ],
          ),
        ),
      ),

      // ---------------------
      // Bottom Navigation Bar แบบกำหนดเอง
      // ---------------------
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // ไปหน้าสร้าง Note
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const NoteScreen()),
          );
        },
        backgroundColor: const Color(0xFFFFBCDA), // สีชมพู
        child: const Icon(Icons.add),
      ),
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 6.0,
        color: Colors.white,
        elevation: 10,
        child: SizedBox(
          height: 56,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              // ไอคอนซ้าย (เปลี่ยนจากกล้องเป็นบ้าน)
              IconButton(
                icon: const Icon(Icons.home),
                onPressed: () {
                  // ไปหน้า Home หรือทำอะไรก็ได้
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const HomeScreen()),
                  );
                },
              ),
              // เว้นที่ตรงกลางสำหรับปุ่ม + (FAB)
              const SizedBox(width: 40),
              // ไอคอนขวา (ไปหน้าปฏิทิน)
              IconButton(
                icon: const Icon(Icons.calendar_today),
                onPressed: () {
                  // ไปหน้าปฏิทิน
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const CalendarScreen()),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  /// Widget สำหรับสร้าง Section ของแต่ละเดือน พร้อมหัวข้อและจำนวน memories
  Widget buildMonthSection(
    BuildContext context, {
    required String monthTitle,
    required int memoryCount,
    required List<Widget> notes,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // หัวข้อเดือน
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Row(
              children: [
                Text(
                  monthTitle,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey[800],
                  ),
                ),
                const SizedBox(width: 10),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    '$memoryCount memories',
                    style: const TextStyle(
                      fontSize: 12,
                      color: Colors.black54,
                    ),
                  ),
                ),
              ],
            ),
          ),
          // รายการ Note
          Column(
            children: notes,
          ),
        ],
      ),
    );
  }
}
