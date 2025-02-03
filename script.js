let currentDate = new Date(2025, 0, 1); // Start from February 1, 2025
let window_size = 28
let window_slide_increase = 1

function renderCalendar() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = ''; // Clear the current calendar

    // Add the day headers (Пн, Вт, Ср, etc.)
    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    // Add the days of the month
    for (let i = 0; i < window_size; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        const dayNumber = new Date(currentDate);
        dayNumber.setDate(currentDate.getDate() + i);

        const dayName = daysOfWeek[dayNumber.getDay()];
        const dayOfMonth = dayNumber.getDate();
        const month = dayNumber.toLocaleString('ru', { month: 'long' }); // Full month name in Russian
        const year = dayNumber.getFullYear();

        dayElement.innerHTML = `
            <div class="calendar-day-header">${dayName}</div>
            <div class="calendar-day-number">${dayOfMonth}</div>
            <div class="calendar-full-date">${dayOfMonth} ${month} ${year}</div>
        `;
        mainElement.appendChild(dayElement);
    }

    // Update the month and year in the header
    const monthYearElement = document.getElementById('monthYear');
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    monthYearElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

function slideNext() {
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    renderCalendar();
}

function slidePrev() {
    currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
    renderCalendar();
}

function changeWindowSlide() {
    window_slide_increase
}

// Initial render
renderCalendar();