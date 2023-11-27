document.addEventListener('DOMContentLoaded', () => {
    const itinerary = [
        {day: 'Friday', date: 'October 13, 2023'},
        {day: 'Saturday', date: 'October 14, 2023'},
        {day: 'Sunday', date: 'October 15, 2023'},
        {day: 'Monday', date: 'October 16, 2023'}
    ];

    const itineraryElement = document.getElementById('itinerary');

    itinerary.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = `${day.day} - ${day.date}`;
        itineraryElement.appendChild(dayElement);
    });

    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        itineraryElement.innerHTML = '';
    });
});

window.addEventListener("message", function (event) {
    const selectedDayInfoElement = document.getElementById("selectedDayInfo");
  
    if (event.data) {
      const selectedDayInfo = event.data;
      selectedDayInfoElement.innerHTML = `<p>Día seleccionado: ${selectedDayInfo.day} de ${selectedDayInfo.month} de ${selectedDayInfo.year}</p>`;
    }
  });
  