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

    const monthSelect = createSelectMonth();
    const yearSelect = createSelect(18, currentYear, 2023);

    [monthSelect, yearSelect].forEach((select) => {
      select.addEventListener("change", function () {
        if (select === monthSelect) {
          currentMonth = parseInt(monthSelect.value, 10);
        } else if (select === yearSelect) {
          currentYear = parseInt(yearSelect.value, 10);
        }
        updateCalendar();
      });

      // select.addEventListener("mouseover", function () {
      //   select.style.backgroundColor = "#f3dbae";
      //   select.style.color = "#fff";
      // });

      // select.addEventListener("mouseout", function () {
      //   select.style.backgroundColor = "";
      //   select.style.color = "";
      // });

      monthYearPicker.appendChild(select);
    });

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

      if (day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
        dayElement.classList.add("current-day");
      }

      dayElement.addEventListener("click", function () {
        alert(`Dia seleccionado ${day} de ${getMonthName(currentMonth)} de ${currentYear}`);
      });
      calendarElement.appendChild(dayElement);
    }
  }

  function createSelectMonth() {
    const select = document.createElement("select");

    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril",
      "Mayo", "Junio", "Julio", "Agosto",
      "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    for (let i = 0; i < monthNames.length; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = monthNames[i];
      select.appendChild(option);
    }

    select.value = currentMonth;

    return select;
  }

  function createSelect(count, selectedValue, startYear = null) {
    const select = document.createElement("select");

    for (let i = 0; i < count; i++) {
      const option = document.createElement("option");
      option.value = startYear ? startYear + i : i;
      option.text = startYear ? startYear + i : i;
      select.appendChild(option);
    }

    select.value = selectedValue;

    return select;
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
