document.addEventListener("DOMContentLoaded", function () {
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");
  const currentMonthElement = document.getElementById("currentMonth");
  const calendarElement = document.getElementById("calendar");

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let selectedDay; // Variable para almacenar el día seleccionado

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

      dayElement.addEventListener("click", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id')
        window.location.href = "/turistas/calendario?id="+id;
        alert(`Dia seleccionado ${day} de ${getMonthName(currentMonth)} de ${currentYear}`);
      });
      calendarElement.appendChild(dayElement);
    }
      for (let day = 1; day <= lastDayOfMonth; day++) {
          const dayElement = document.createElement("div");
          dayElement.classList.add("day");
          dayElement.textContent = day;
          dayElement.setAttribute("data-day", day);

          if (day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
              dayElement.classList.add("current-day");
          }

          dayElement.addEventListener("click", function () {
              selectedDay = day;
              showDayModal(day, currentMonth, currentYear);
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

  function showDayModal(day, month, year) {
      const modal = document.getElementById("dayModal");
      const modalContent = modal.querySelector(".modal-body");
      const continueButton = modal.querySelector("#continueButton");
      const cancelButton = modal.querySelector("#cancelButton");

      modalContent.innerHTML = `Día seleccionado: ${day} de ${getMonthName(month)} de ${year}`;
      $('#dayModal').modal('show');

      continueButton.addEventListener("click", function () {
          $('#dayModal').modal('hide');
          showHourModal();
      });

      cancelButton.addEventListener("click", function () {
          $('#dayModal').modal('hide');
          // Puedes agregar lógica para deshacer la selección o realizar otras acciones de cancelación
      });
  }

  function showHourModal() {
      const hourModal = document.getElementById("hourModal");
      $('#hourModal').modal('show');
  }

  const confirmHourButton = document.getElementById("confirmHourButton");

  confirmHourButton.addEventListener("click", function () {
      const selectedHour = document.getElementById("selectedHour").value;

      const selectedDateInfo = `Día seleccionado: ${selectedDay} de ${getMonthName(currentMonth)} de ${currentYear}`;
      const selectedHourInfo = `Hora seleccionada: ${selectedHour}`;

      showInfoModal(selectedDateInfo, selectedHourInfo);

      // Cerrar el modal de selección de hora
      $("#hourModal").modal("hide");

      // Señalar la fecha en el calendario con color rojo
      const selectedDayElement = document.querySelector(`.day[data-day="${selectedDay}"]`);
      selectedDayElement.classList.add("selected-day");
  });

  function showInfoModal(dateInfo, hourInfo) {
      const infoModal = document.getElementById("infoModal");
      const infoModalBody = document.getElementById("infoModalBody");

      infoModalBody.innerHTML = `${dateInfo}<br>${hourInfo}`;
      $(infoModal).modal("show");
  }
  
});
