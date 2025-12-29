import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key});

  @override
  _CalendarScreenState createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  late final ValueNotifier<DateTime> _focusedDay;

  final Map<DateTime, String> emojiByDay = {
    DateTime.utc(2025, 3, 5): '😊',
    DateTime.utc(2025, 3, 6): '😢',
    DateTime.utc(2025, 3, 7): '😍',
    DateTime.utc(2025, 3, 8): '😡',
    DateTime.utc(2025, 3, 9): '😴',
    DateTime.utc(2025, 3, 14): '😡',
  };

  @override
  void initState() {
    super.initState();
    _focusedDay = ValueNotifier(DateTime.now());
  }

  @override
  void dispose() {
    _focusedDay.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Calendar',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: const Color(0xFFFFA7C4),
        centerTitle: true,
        elevation: 2,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFFFFE4E1),
              Color(0xFFFADADD),
              Color(0xFFD8BFD8)
            ],
          ),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  color: Colors.white.withAlpha(230),
                  padding: const EdgeInsets.all(8.0),
                  child: TableCalendar(
                    firstDay: DateTime.utc(2020, 01, 01),
                    lastDay: DateTime.utc(2025, 12, 31),
                    focusedDay: _focusedDay.value,
                    headerStyle: const HeaderStyle(
                      formatButtonVisible: false,
                      titleCentered: true,
                      titleTextStyle: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFFFFA7C4),
                      ),
                    ),
                    calendarStyle: CalendarStyle(
                      selectedDecoration: const BoxDecoration(
                        color: const Color(0xFFFFA7C4),
                        shape: BoxShape.circle,
                      ),
                      todayDecoration: BoxDecoration(
                        color: const Color(0xFFFFA7C4).withOpacity(0.5),
                        shape: BoxShape.circle,
                      ),
                      defaultTextStyle: const TextStyle(fontSize: 16),
                      weekendTextStyle: const TextStyle(color: Colors.red),
                    ),
                    calendarBuilders: CalendarBuilders(
                      defaultBuilder: (context, date, _) {
                        final emoji = emojiByDay[DateTime.utc(date.year, date.month, date.day)];
                        return Container(
                          alignment: Alignment.center,
                          child: emoji != null
                              ? Text(
                                  emoji,
                                  style: const TextStyle(fontSize: 22),
                                )
                              : Text('${date.day}', style: const TextStyle(fontSize: 16)),
                        );
                      },
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}