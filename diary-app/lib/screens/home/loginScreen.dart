import 'package:flutter/material.dart';
import 'package:project_diary_cp213/screens/home/home.dart';
import 'package:project_diary_cp213/screens/home/widgets/register.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginState();
}

class _LoginState extends State<LoginScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(), // ปิดคีย์บอร์ดเมื่อแตะที่อื่น
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topRight,
            end: Alignment.bottomLeft,
            colors: [Color(0xFFFFE4E1), Color(0xFFFADADD), Color(0xFFD8BFD8)], // พื้นหลังพาสเทล
          ),
        ),
        child: Scaffold(
          backgroundColor: Colors.transparent,
          body: _page(),
        ),
      ),
    );
  }

  Widget _page() {
    return Center(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _icon(),
            const SizedBox(height: 20),
            _inputField("Username", _usernameController),
            _inputField("Password", _passwordController, isPassword: true),
            const SizedBox(height: 20),
            _loginButton(),
            const SizedBox(height: 10),
            _registerButton(),
          ],
        ),
      ),
    );
  }

  // 🔹 ไอคอนโปรไฟล์
  Widget _icon() {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.white, width: 2),
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 10,
            spreadRadius: 3,
          ),
        ],
      ),
      child: const Icon(Icons.person, color: Colors.white, size: 120),
    );
  }
  Widget _inputField(String hintText, TextEditingController controller, {bool isPassword = false}) {
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 30),
    child: Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.6), // ความขุ่น 60%
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2), // เงาสีดำเบา ๆ
            blurRadius: 6,
            offset: const Offset(2, 3), // เงาไปทางขวา-ล่าง
          ),
        ],
      ),
      child: TextField(
        controller: controller,
        obscureText: isPassword,
        style: const TextStyle(color: Colors.black87, fontSize: 18), // สีตัวอักษรเข้มขึ้น
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: const TextStyle(color: Colors.black54, fontSize: 16), // สีข้อความจางลง
          filled: true,
          fillColor: Colors.transparent, // ไม่ต้องใช้ fillColor เพราะ Container มีแล้ว
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(18),
            borderSide: BorderSide.none, // ไม่มีเส้นขอบ เพราะเราใช้เงาแทน
          ),
          contentPadding: const EdgeInsets.symmetric(vertical: 18, horizontal: 20), // ขยายช่องให้กดง่ายขึ้น
        ),
      ),
    ),
  );
}



  // 🔹 ปุ่ม Login
  Widget _loginButton() {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFFFA7C4),
        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
        ),
        elevation: 6,
      ),
      onPressed: () {
        if (_usernameController.text.isNotEmpty && _passwordController.text.isNotEmpty) {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const HomeScreen()),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Please enter username and password'),
              backgroundColor: Colors.redAccent,
            ),
          );
        }
      },
      child: const Text(
        'Login',
        style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
      ),
    );
  }

  // 🔹 ปุ่ม Register
  Widget _registerButton() {
    return TextButton(
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const RegisterScreen()),
        );
      },
child: RichText(
  text: TextSpan(
    text: "Don't have an account? ", // ข้อความปกติ
    style: const TextStyle(
      color: Colors.white, // สีของข้อความปกติ
      fontSize: 16,
      fontWeight: FontWeight.w500,
    ),
    children: [
      TextSpan(
        text: 'Register', // คำที่ต้องการเปลี่ยนสี
        style: const TextStyle(
          color:  Color(0xFFFFA7C4), // เปลี่ยนสีของคำว่า Register
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
      ),
    ],
  ),
),

    );
  }
}
