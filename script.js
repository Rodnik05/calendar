let firstDate = new Date(2025, 0, 1); // Start from February 1, 2025
let window_slide_increase = 1;
const max_days_in_column = 5;
const max_days_in_row = 14;
const min_days_in_column = 1;
const min_days_in_row = 1;

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

setDaysInRow(7);
setDaysInColumn(3);


const slider = document.getElementById('moveBySlider');
const valueDisplay_c = document.getElementById('moveByValue');
const currentValue_c = document.getElementById('currentValue');
const dropdown = document.getElementById('sliderDropdown');

// Real-time value updates [1][7]
slider.addEventListener('input', (e) => {
    valueDisplay_c.textContent = e.target.value;
    currentValue_c.textContent = e.target.value;
});

// Toggle dropdown with click tracking [4]
function toggleSlider() {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown on outside click [4][6]
document.addEventListener('click', (e) => {
  if (!e.target.closest('.move-by-container') && !e.target.closest('.slider-dropdown')) {
    dropdown.style.display = 'none';
  }
});

// Final value confirmation [6]
slider.addEventListener('change', (e) => {
    setWindowSlideIncrease(parseInt(e.target.value));
});

renderCalendar();

function renderCalendar() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = ''; // Clear the current calendar

    // Add the day headers (Пн, Вт, Ср, etc.)
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var window_size = getWindowSize();
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
    updateMonthYear(firstDate, window_size);
}


function updateMonthYear(firstDate, window_size) {
    let lastDate = new Date(firstDate);
    lastDate.setDate(firstDate.getDate() + window_size - 1);

    // Get the elements
    const firstDateButton = document.getElementById('firstDateButton');
    const lastDateButton = document.getElementById('lastDateButton');

    // Update the text of the buttons
    firstDateButton.textContent = `${firstDate.getDate()} ${monthNames[firstDate.getMonth()]} ${firstDate.getFullYear()}`;
    lastDateButton.textContent = `${lastDate.getDate()} ${monthNames[lastDate.getMonth()]} ${lastDate.getFullYear()}`;

    // Add event listeners to the buttons
    firstDateButton.onclick = () => {
        alert(`First Date: ${firstDate.toDateString()}`); // Replace with your logic
    };

    lastDateButton.onclick = () => {
        alert(`Last Date: ${lastDate.toDateString()}`); // Replace with your logic
    };
}

function slideNext() {
    firstDate.setDate(firstDate.getDate() + window_slide_increase); // Move to the next day
    renderCalendar();
}

function slidePrev() {
    firstDate.setDate(firstDate.getDate() - window_slide_increase); // Move to the previous day
    renderCalendar();
}

function isTheBegginingOfTheMonth(date) {
    return date.getDate() == 1
}

function isTheBegginingOfTheYear(date) {
    return isTheBegginingOfTheMonth(date) && date.getMonth() == 0
}

function setDaysInRow(newColumnCount) {
    var new_days_in_row = newColumnCount;
    if (new_days_in_row >= max_days_in_row) {
        new_days_in_row = max_days_in_row;
    } else if (new_days_in_row <= min_days_in_row) {
        new_days_in_row = min_days_in_row;
    }
    document.documentElement.style.setProperty('--grid-columns', new_days_in_row.toString());
    document.getElementById('daysInRow').textContent = `Days in one line: ${new_days_in_row}`;

    console.log(`getDaysInRow() in setDaysInRow = ${getDaysInRow()}`);
    updateValues();
    renderCalendar();
}

function getDaysInRow() {
    return parseInt(document.documentElement.style.getPropertyValue('--grid-columns'), 10);
}

function setDaysInColumn(new_days_in_column) {
    var days_in_column;
    if (new_days_in_column >= max_days_in_column) {
        days_in_column = max_days_in_column;
    } else if (new_days_in_column <= min_days_in_column) {
        days_in_column = min_days_in_column;
    } else {
        days_in_column = new_days_in_column;
    }
    localStorage.setItem('days_in_column', JSON.stringify(days_in_column));
    document.getElementById('daysInColumn').textContent = `Days in one column: ${days_in_column}`;

    console.log(`getDaysInColumn() in setDaysInColumn = ${getDaysInColumn()}`);
    updateValues();
    renderCalendar();
}

function getDaysInColumn() {
    const stored = localStorage.getItem('days_in_column');
    return stored !== null ? JSON.parse(stored) : 3;
}

function getWindowSize() {
    return getDaysInColumn() * getDaysInRow();
}

function getWindowSlideIncrease() {
    return window_slide_increase;
}

function setWindowSlideIncrease(new_window_slide_increase){
    window_slide_increase = new_window_slide_increase;
}

function updateValues() {
    var window_size = getDaysInColumn() * getDaysInRow();
    console.log(`window_size in updateValues = ${window_size}`);
    const slider = document.getElementById("moveBySlider");
    slider.max = window_size;
    var valueDisplay = document.getElementById('moveByValue');
    var currentValue = document.getElementById('currentValue');
    console.log(`valueDisplay in updateValues = ${parseInt(valueDisplay.textContent)}`);
    console.log(`currentValue in updateValues = ${parseInt(currentValue.textContent)}`);
    console.log(`valueDisplay in updateValues = ${(Math.min(parseInt(valueDisplay.textContent), window_size))}`);
    console.log(`currentValue in updateValues = ${(Math.min(parseInt(currentValue.textContent), window_size))}`);   
    
    valueDisplay.textContent = Math.max(Math.min(parseInt(valueDisplay.textContent), window_size).toString(), 1);
    currentValue.textContent = Math.max(Math.min(parseInt(currentValue.textContent), window_size).toString(), 1);
    console.log(`valueDisplay in updateValues = ${Math.max(Math.min(parseInt(valueDisplay.textContent), window_size))}`);
    console.log(`currentValue in updateValues = ${Math.max(Math.min(parseInt(currentValue.textContent), window_size))}`);
}
