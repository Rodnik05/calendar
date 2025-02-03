let firstDate = new Date(2025, 0, 1); // Start from February 1, 2025
let window_slide_increase = 1;
let days_in_column;
let window_size = 21;

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = ''; // Clear the current calendar

    // Add the day headers (Пн, Вт, Ср, etc.)
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Add the days of the month
    for (let i = 0; i < window_size; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        const currentDate = new Date(firstDate);
        currentDate.setDate(firstDate.getDate() + i);

        const dayName = daysOfWeek[currentDate.getDay()];
        const dayOfMonth = currentDate.getDate();
        
        dayElement.innerHTML = `
            <div class="calendar-day-name">${dayName}</div>
            <div class="calendar-day-number">${dayOfMonth}</div>
        `;
        
        if (isTheBegginingOfTheYear(currentDate)) {
            const month = monthNames[currentDate.getMonth()];
            const year = currentDate.getFullYear();
            dayElement.innerHTML = `${dayElement.innerHTML}
            <div class="calendar-full-date">${month} ${year}</div>`
        } else if (isTheBegginingOfTheMonth(currentDate)) {
            const month = monthNames[currentDate.getMonth()];
            dayElement.innerHTML = `${dayElement.innerHTML}
            <div class="calendar-full-date">${month}</div>`
        }   
        mainElement.appendChild(dayElement);
    }

    // Update the month and year in the header
    const monthYearElement = document.getElementById('monthYear');
    monthYearElement.textContent = `${monthNames[firstDate.getMonth()]} ${firstDate.getFullYear()}`;
}

function slideNext() {
    firstDate.setDate(firstDate.getDate() + 1); // Move to the next day
    renderCalendar();
}

function slidePrev() {
    firstDate.setDate(firstDate.getDate() - 1); // Move to the previous day
    renderCalendar();
}

function isTheBegginingOfTheMonth(date) {
    return date.getDate() == 1
}

function isTheBegginingOfTheYear(date) {
    return isTheBegginingOfTheMonth(date) && date.getMonth() == 0
}

function setDaysInRow(newColumnCount) {
    document.documentElement.style.setProperty('--grid-columns', newColumnCount.toString());
    document.getElementById('daysInRow').textContent = `Days in one line: ${newColumnCount}`;
    window_size = getDaysInRow() * getDaysInColumn();
    renderCalendar();
}

function getDaysInRow() {
    return parseInt(document.documentElement.style.getPropertyValue('--grid-columns'), 10);
}

function getDaysInColumn() {
    return days_in_column
}

function setDaysInColumn(new_days_in_column) {
    days_in_column = new_days_in_column
    document.getElementById('daysInColumn').textContent = `Days in one column: ${days_in_column}`;
    window_size = getDaysInRow() * getDaysInColumn();
    renderCalendar();
}
// Initial render
renderCalendar();
setDaysInRow(7);
setDaysInColumn(3);