// Code is wrapped in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

$(function () {

  // Dets the date in the header to be the current day
  let currentDayOfWeek = dayjs().format('dddd D, YYYY');
  $('#currentDay').text(currentDayOfWeek);

  // Global varibales
  let saveButtons = $('.click-save');
  let deleteButtons = $('.click-delete');
  let textAreas = $('.description');
  // Hours array
  const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM','10PM', '11PM'];

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
    // 'this' refers to the specific save button that was clicked.
    // .siblings selects elements with the class "description" that are siblings of the clicked button.
    // .attr('id') retrieves the 'id' attribute of that element.
    // .val retrieves the value of the input element
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

  // Updates the color of the hour block based off the current time of day
  function updatePastPresentFuture() {
    const currentHour = dayjs().format('H'); // Accesses the current hour of the day

    textAreas.each(function() {
      const hour = parseInt($(this).attr('id')); // 'this' accesses the specific element being processed and retrieves its 'id' attribute which is parsed to return the first integer

      // 'this' is a reference to the current textArea element as you iterate over them. Works with each textArea individually and makes changes to them based on their attributes
      if (hour < currentHour){
        $(this).parent().removeClass('present future').addClass('past');
      } else if (hour === currentHour) {
        $(this).parent().removeClass('past future').addClass('present');
      } else {
        $(this).parent().removeClass('past present').addClass('future');
      }
    });
  }
  
  loadSchedule();
  updatePastPresentFuture();
  });