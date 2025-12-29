import 'package:flutter/material.dart';
import 'package:project_diary_cp213/screens/home/loginScreen.dart';
//import 'package:project_diary_cp213/screens/home/home.dart';



void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Diary App',
      theme: ThemeData(
        //primarySwatch: Colors.teal,
      ),
      home: const LoginScreen(),
    );
  }
}
