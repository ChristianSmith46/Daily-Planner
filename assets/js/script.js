// Create some element variables
var saveButtonEl = $(".saveBtn");
var currentDayEl = $("#currentDay");

// Initial function
function init(){
    // Add the current day to the top of the page
    currentDayEl.text(moment().format("dddd, MMMM Mo"));
    // for loop to go over all the operating hours
    for (let i = 9; i <= 17; i++){
        // create some variables to store the element and id string
        var timeString = "time-" + i;
        var timeBlockEl = $("#"+ timeString);
        // if statements to determine what class to give the element based on the time
        if (moment().hour() > i){
            timeBlockEl.children("textarea").addClass("past");
        } else if (moment().hour() === i) {
            timeBlockEl.children("textarea").addClass("present");
        } else {
            timeBlockEl.children("textarea").addClass("future");
        }
        // get the string for this hour from local storage
        var dataString = localStorage.getItem(timeString);
        // if there is a string for this hour in local storage then display it
        if (dataString) {
            timeBlockEl.children("textarea")[0].value = dataString;
        }
    }
}

// Event listener for the save buttons
saveButtonEl.on("click", function() {
    // store parent element using this instead of event.target due to event.target taking the nested element if you click directly on the save icon
    var targetParentEl = $(this).parent();
    // store the id name to use in local storage
    var timeString = targetParentEl.attr("id");
    // save the value from the textarea
    var dataString = targetParentEl.children("textarea")[0].value;
    // store the value from the dataString into local storage
    if (dataString){
        localStorage.setItem(timeString, dataString);
    } else {
        localStorage.setItem(timeString, "");
    }

});


// Call initial function on load
init();