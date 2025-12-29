import 'package:flutter/material.dart';
import 'package:project_diary_cp213/screens/home/loginScreen.dart';


class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  // ignore: unused_field
  String _name = '';
  String _email = '';
  String _password = '';
  String _confirmPassword = '';
  final bool _obscurePassword = true; // ✅ แก้ไข: เปลี่ยนเป็น final
  // ignore: unused_field
  final bool _obscureConfirmPassword = true; // ✅ แก้ไข: เปลี่ยนเป็น final
  bool _agreeToTerms = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFFFE4E1), Color(0xFFFADADD), Color(0xFFD8BFD8)],
          ),
        ),
        child: Scaffold(
          backgroundColor: Colors.transparent,
          body: SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
              child: Column(
                children: [
                  Text(
                    'Create Your Account',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: const Color(0xFFFFA7C4),
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 20),
                  Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        _inputField("Name", Icons.person, (value) => _name = value),
                        _inputField("Email Address", Icons.email, (value) => _email = value, isEmail: true),
                        _inputField("Password", Icons.lock, (value) => _password = value, isPassword: true),
                        _inputField("Confirm Password", Icons.lock, (value) => _confirmPassword = value, isPassword: true),
                        _termsCheckbox(),
                        _registerButton(),
                        _loginLink(),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _inputField(String hintText, IconData icon, Function(String) onSaved, {bool isPassword = false, bool isEmail = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white.withAlpha(230), // ✅ แก้ไข: ใช้ withAlpha() แทน withOpacity()
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(50), // ✅ แก้ไข: ใช้ withAlpha()
              blurRadius: 6,
              offset: const Offset(2, 3),
            ),
          ],
        ),
        child: TextFormField(
          obscureText: isPassword ? _obscurePassword : false,
          keyboardType: isEmail ? TextInputType.emailAddress : TextInputType.text,
          style: const TextStyle(color: Colors.black87, fontSize: 16),
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: const Color(0xFFFFA7C4)),
            hintText: hintText,
            hintStyle: const TextStyle(color: Colors.black54),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
              borderSide: BorderSide.none,
            ),
            contentPadding: const EdgeInsets.symmetric(vertical: 18, horizontal: 20),
          ),
          onSaved: (value) => onSaved(value!.trim()),
        ),
      ),
    );
  }

  Widget _termsCheckbox() {
    return Row(
      children: [
        Checkbox(
          value: _agreeToTerms,
          activeColor: const Color(0xFFFFA7C4),
          onChanged: (value) => setState(() => _agreeToTerms = value ?? false),
        ),
        const Text('I agree to the Terms & Conditions', style: TextStyle(color: Colors.white)),
      ],
    );
  }

  Widget _registerButton() {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFFFFA7C4),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          elevation: 6,
        ),
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            _formKey.currentState!.save();
            if (_password != _confirmPassword) {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Passwords do not match!')));
              return;
            }
            if (!_agreeToTerms) {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please accept the Terms & Conditions')));
              return;
            }
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Registering with $_email')));
          }
        },
        child: const Text("Register", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
      ),
    );
  }

  Widget _loginLink() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text('Already have an account?', style: TextStyle(color: Colors.white)),
        TextButton(
          onPressed: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const LoginScreen())),
          child: const Text("Log In", style: TextStyle(color: const Color(0xFFFFA7C4), fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }
}
