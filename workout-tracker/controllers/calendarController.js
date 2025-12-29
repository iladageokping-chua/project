const fs = require('fs');
const path = require('path');
const { startOfMonth, endOfMonth, eachDayOfInterval, getDay, format, subMonths, addMonths } = require('date-fns');
const usersFilePath = path.join(__dirname, '../users.json');

exports.getCalendar = (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  const today = new Date();
  const year = Number(req.query.year) || today.getFullYear();
  const month = Number(req.query.month) || today.getMonth() + 1;

  // Validate month and year
  if (month < 1 || month > 12 || year < 1900 || year > 2100) {
    return res.status(400).send('Invalid month or year');
  }

  const selectedDate = req.query.date || null; // Get selected date from query params

  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(startDate);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
  const firstDayOfWeek = getDay(startDate);
  const monthName = format(startDate, 'MMMM');

  // Calculate previous and next months
  const prevMonthDate = subMonths(startDate, 1);
  const nextMonthDate = addMonths(startDate, 1);
  const prevMonth = prevMonthDate.getMonth() + 1;
  const prevYear = prevMonthDate.getFullYear();
  const nextMonth = nextMonthDate.getMonth() + 1;
  const nextYear = nextMonthDate.getFullYear();

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser) return res.status(404).send('User not found'); // Add this check
    const tasks = currentUser.tasks || [];

    // Prepare allGoals for the calendar
    const allGoals = tasks.map(task => ({
      name: task.name,
      goal: task.goal,
      date: task.date,
      notes: task.notes,
      status: task.status
    }));

    res.render('calendar', {
      monthName,
      year,
      daysInMonth,
      firstDayOfWeek,
      tasks,
      user,
      prevMonth,
      prevYear,
      nextMonth,
      nextYear,
      selectedDate,
      allGoals // Pass allGoals to the view
    });
  });
};
