import 'package:flutter/material.dart';

class ItemNote extends StatelessWidget {
  final Color color;
  const ItemNote({super.key, required this.color, required String date, required String title, required String description});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            offset: const Offset(0, 5),
            // ignore: deprecated_member_use
            color: Theme.of(context).primaryColor.withOpacity(.2),
            spreadRadius: 2,
            blurRadius: 5
          )
        ]
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              color: color
            ),
            child: Column(
              children: [
                Text('MAY', style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Colors.white
                )),
                const SizedBox(height: 5),
                Text('05', style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    color: Colors.white
                )),
                const SizedBox(height: 5),
                Text('2023', style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Colors.white
                )),
              ],
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('This is sample title', style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: 5),
                  Text(
                      'We have indeed in the Messenger of Allah, a good example for anyone...',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey
                    ),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
