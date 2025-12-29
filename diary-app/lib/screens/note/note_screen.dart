import 'package:flutter/material.dart';

class NoteScreen extends StatefulWidget {
  const NoteScreen({super.key});

  @override
  _NoteScreenState createState() => _NoteScreenState();
}

class _NoteScreenState extends State<NoteScreen> {
  String selectedEmoji = '';

  final List<String> emojis = ['😊', '😢', '😍', '😡', '😴'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFFEDF3),
      appBar: AppBar(
        title: const Text(
          'New note',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: const Color(0xFFFFA7C4),
        iconTheme: const IconThemeData(color: Colors.white),
        elevation: 1,
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(15, 15, 15, 80),
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: emojis.map((emoji) {
              return GestureDetector(
                onTap: () {
                  setState(() {
                    selectedEmoji = emoji;
                  });
                },
                child: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: selectedEmoji == emoji ? const Color(0xFFFFA7C4).withOpacity(0.3) : Colors.transparent,
                  ),
                  child: Text(
                    emoji,
                    style: const TextStyle(fontSize: 28),
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 20),
          TextField(
            decoration: InputDecoration(
              hintText: 'Title',
              labelText: 'Title',
              prefixIcon: selectedEmoji.isNotEmpty
                  ? Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Text(selectedEmoji, style: const TextStyle(fontSize: 24)),
                    )
                  : const Icon(Icons.title),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
            ),
          ),
          const SizedBox(height: 15),
          TextField(
            maxLines: 15,
            decoration: InputDecoration(
              hintText: 'Start typing here...',
              labelText: 'Start typing here',
              alignLabelWithHint: true,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
            ),
          ),
        ],
      ),
      bottomSheet: Container(
        width: double.infinity,
        margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 20),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFFFA7C4),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.all(15),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
          onPressed: () {},
          child: const Text('Save', style: TextStyle(fontSize: 18)),
        ),
      ),
    );
  }
}