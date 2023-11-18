document.addEventListener("DOMContentLoaded", function () {
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const currentMonthElement = document.getElementById("currentMonth");
    const calendarElement = document.getElementById("calendar");
  
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
  
    updateCalendar();
  
    prevMonthBtn.addEventListener("click", function () {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateCalendar();
    });
  
    nextMonthBtn.addEventListener("click", function () {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateCalendar();
    });
  
    function updateCalendar() {
      currentMonthElement.innerHTML = "";
  
      const monthYearPicker = document.createElement("div");
      monthYearPicker.classList.add("month-year-picker");
  
      const monthSelect = document.createElement("select");
      const yearSelect = document.createElement("select");
  
      for (let i = 0; i < 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = getMonthName(i);
        monthSelect.appendChild(option);
      }
  
      for (let i = 2023; i <= 2025; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.appendChild(option);
      }
  
      monthSelect.selectedIndex = currentMonth;
      yearSelect.value = currentYear;
  
      monthSelect.addEventListener("change", function () {
        currentMonth = parseInt(monthSelect.value, 10);
        updateCalendar();
      });
  
      yearSelect.addEventListener("change", function () {
        currentYear = parseInt(yearSelect.value, 10);
        updateCalendar();
      });
  
      monthYearPicker.appendChild(monthSelect);
      monthYearPicker.appendChild(yearSelect);
      currentMonthElement.appendChild(monthYearPicker);
  
      calendarElement.innerHTML = "";
  
      const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  
      for (let i = 0; i < daysOfWeek.length; i++) {
        const dayOfWeekElement = document.createElement("div");
        dayOfWeekElement.classList.add("day", "day-of-week");
        dayOfWeekElement.textContent = daysOfWeek[i];
        calendarElement.appendChild(dayOfWeekElement);
      }
  
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
      for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("day", "empty");
        calendarElement.appendChild(emptyDay);
      }
  
      for (let day = 1; day <= lastDayOfMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = day;
        dayElement.addEventListener("click", function () {
          alert(`Dia seleccionado ${day} de ${getMonthName(currentMonth)} de ${currentYear}`);
        });
        calendarElement.appendChild(dayElement);
      }
    }
  
    function getMonthName(month) {
      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      return monthNames[month];
    }
  });
  