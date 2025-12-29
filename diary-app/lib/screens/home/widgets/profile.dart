import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFFFA7C4),
        title: const Text(
          'Profile',
          style:TextStyle(
      color: Colors.white,  // สีข้อความ
      fontSize: 24,  // ขนาดฟอนต์
      fontWeight: FontWeight.bold, // หนา
    ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context); // ย้อนกลับไปหน้า Home
          },
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // รูปโปรไฟล์
              Center(
                child: CircleAvatar(
                  radius: 60,
                  backgroundColor: Colors.grey[300],
                  child: ClipOval(
                    child: Image.asset(
                      'assets/images/kuromi.jpg', // เปลี่ยนเป็น path ของโปรไฟล์คุณ
                      fit: BoxFit.cover,
                      width: 120,
                      height: 120,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 16),

              // ชื่อผู้ใช้
              Center(
                child: Text(
                  'inaoo',
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey[800],
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Center(
                child: Text(
                  'nongnao@gmail.com',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey[600],
                  ),
                ),
              ),

              const SizedBox(height: 32),

              // รายการเมนู
              _profileOption(
                icon: Icons.account_circle,
                title: 'My Profile',
                onTap: () {
                  // TODO: ไปที่หน้าโปรไฟล์
                },
              ),
              _profileOption(
                icon: Icons.logout,
                title: 'Logout',
                onTap: () {
                  // TODO: เพิ่มฟังก์ชัน logout
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Widget สำหรับเมนูแต่ละตัวใน Profile
  Widget _profileOption({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Row(
          children: [
            Icon(
              icon,
              color: const Color(0xFFFFA7C4),
            ),
            const SizedBox(width: 16),
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: Colors.black87,
              ),
            ),
            const Spacer(),
            const Icon(
              Icons.arrow_forward_ios,
              size: 18,
              color: Colors.black54,
            ),
          ],
        ),
      ),
    );
  }
}
