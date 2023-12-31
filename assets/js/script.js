// Code is wrapped in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the HTML

$(function () {

  // Sets the date in the header to be the current day
  let currentDayOfWeek = dayjs().format('dddd D, YYYY');
  $('#currentDay').text(currentDayOfWeek);

  // Global varibales
  let saveButtons = $('.click-save');
  let deleteButtons = $('.click-delete');
  let textAreas = $('.description');
  // Hours array - Military time
  const hours = ['9AM', '10AM', '11AM', '12PM', '13PM', '14PM', '15PM', '16PM', '17PM'];

  // Loads scheduled activities from local storage and populates the textareas
  function loadSchedule() {
    hours.forEach((hour) => {
      let savedText = localStorage.getItem(hour);
      const textArea = $(`#${hour}`);
      textArea.val(savedText);
    });
  }
  // Save the event text to local storage
  function saveScheduleToLocalStorage(hour, text) {
    localStorage.setItem(hour, text);
  };

  // Event listener for save buttons
  saveButtons.on('click', function (event) {
    event.preventDefault();
    console.log('Save Button Clicked');

    // Breakdown of code below:
    // 'this' refers to the specific save button that was clicked
    // .siblings selects the textarea with the class "description" that is the sibling of the clicked button
    // .attr('id') retrieves the 'id' attribute of that element
    // .val retrieves the value of the textarea
    const hour = $(this).siblings('.description').attr('id');
    const text = $(this).siblings('.description').val();

    saveScheduleToLocalStorage(hour, text);
  });

  // Event listener for delete buttons
  deleteButtons.on('click', function (event) {
    event.preventDefault();
    console.log('Delete Button Clicked');

    // Makes the value of the selected textarea an empty string ''
    const hour = $(this).siblings('.description').attr('id');
    const text = $(this).siblings('.description').val('');

    // Removes saved item from local storage
    localStorage.removeItem(hour,text);
    });

  // Updates the color of the time blocks based off the current time of day
  function updatePastPresentFuture() {
    const currentHour = dayjs().format('H'); // Accesses the current hour of the day - Military time

    textAreas.each(function() {
      const textareaHour = parseInt($(this).attr('id')); // textareas 'id' is parsed to return the first integer

      // 'this' compares each textarea individually to the currrent hour and makes changes to them based on their 'id'
      if (textareaHour < currentHour){
        $(this).addClass('past');
      } else if (textareaHour == currentHour) {
        $(this).addClass('present');
      } else if (textareaHour > currentHour) {
        $(this).addClass('future');
      }
    });
  }
  
  loadSchedule();
  updatePastPresentFuture();
  });