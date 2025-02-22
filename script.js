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

slider.addEventListener('input', (e) => {
    valueDisplay_c.textContent = e.target.value;
    currentValue_c.textContent = e.target.value;
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('eventModal');
    const overlayBtn = document.querySelector('.overlay-button');
    const span = document.querySelector('.close');


    overlayBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.getElementById('eventDate').valueAsDate = new Date();
    });

    span.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    document.getElementById('eventForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const eventData = {
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            description: document.getElementById('eventDescription').value
        };
        
        console.log('New event:', eventData);
        alert('Event added successfully!');
        modal.style.display = 'none';
        const dateInput = document.getElementById('eventDate');
        const dateString = dateInput.value;

        console.log("dateString:", dateString);
        console.log("localStorage.getItem(dateString) before:", localStorage.getItem(dateString));
        if (localStorage.getItem(dateString) === null) {
            const eventsList = [eventData];
            let dataAsString = JSON.stringify(eventsList);
            localStorage.setItem(dateString, dataAsString);
        } else {
            const eventsList = JSON.parse(localStorage.getItem(dateString));
            eventsList.push(eventData);
            let dataAsString = JSON.stringify(eventsList);
            localStorage.setItem(dateString, dataAsString);
        }
        console.log("localStorage.getItem(dateString) after:", localStorage.getItem(dateString));
    
        document.getElementById('eventForm').reset();
    });
});


function toggleSlider() {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.move-by-container') && !e.target.closest('.slider-dropdown')) {
    dropdown.style.display = 'none';
  }
});


slider.addEventListener('change', (e) => {
    setWindowSlideIncrease(parseInt(e.target.value));
});

renderCalendar();

function renderCalendar() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';


    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var window_size = getWindowSize();

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

    const firstDateButton = document.getElementById('firstDateButton');
    const lastDateButton = document.getElementById('lastDateButton');

    firstDateButton.textContent = `${firstDate.getDate()} ${monthNames[firstDate.getMonth()]} ${firstDate.getFullYear()}`;
    lastDateButton.textContent = `${lastDate.getDate()} ${monthNames[lastDate.getMonth()]} ${lastDate.getFullYear()}`;

    firstDateButton.onclick = () => {
        alert(`First Date: ${firstDate.toDateString()}`);
    };

    lastDateButton.onclick = () => {
        alert(`Last Date: ${lastDate.toDateString()}`);
    };
}

function slideNext() {
    firstDate.setDate(firstDate.getDate() + window_slide_increase);
    renderCalendar();
}

function slidePrev() {
    firstDate.setDate(firstDate.getDate() - window_slide_increase);
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
