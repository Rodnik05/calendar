let firstDate = new Date(2025, 0, 1); // Start from February 1, 2025
let window_size = 21
let window_slide_increase = 1

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

function setGridColumns(newColumnCount) {
    document.documentElement.style.setProperty('--grid-columns', newColumnCount.toString());
    document.getElementById('gridSize').textContent = `Days in one line: ${newColumnCount}`;
}

function getGridColumns() {
    return parseInt(document.documentElement.style.getPropertyValue('--grid-columns'), 10);
}

function getWindowSize() {
    return window_size
}

function setWindowSize(new_window_size) {
    window_size = new_window_size
    document.getElementById('windowSize').textContent = `Days in one column: ${newColumnCount}`;
}
// Initial render
renderCalendar();
setGridColumns(7);