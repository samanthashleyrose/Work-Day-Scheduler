// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

let currentDayOfWeek = dayjs().format('dddd D, YYYY')
$('#currentDay').text(currentDayOfWeek)

let onSchedule = $('#description');
let saveButton = $('#click-save')
let typed = []

// Function to print the typed information in the textarea 
let printSchedule = function(typed) {
  let enteredInfoEl = $('<ul>');
  let enteredInfoDetails = typed;
  enteredInfoEl.addClass('info-group-item').text(enteredInfoDetails);
  enteredInfoEl.appendTo(onSchedule);
}

// Function to printSchedule when save button is clicked
let handleSaveButton = function (event) {
  event.preventDefault();

  let scheduleInput = onSchedule.val();

  printSchedule(scheduleInput);
  storeSchedule();
  console.log(typed)
  console.log('save button pressed');
}

// Event listener for save button
saveButton.on('click', handleSaveButton);


// Function to run when page loads
function saveScheduleToLocalStorage(typed) {
  let storedText = JSON.parse(localStorage.getItem('schedule'));

  if (storedText !== null) {
    typed = storedText
  }

  printSchedule();
}

function storeSchedule() {
  localStorage.setItem('schedule', JSON.stringify(typed));
}

saveScheduleToLocalStorage();

$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  });