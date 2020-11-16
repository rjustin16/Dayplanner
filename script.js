var time = function (hours) {
    var ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours ? hours : 12;
    return hours + ampm;
  };
  $(document).on("click", ".saveBtn", function (e){
    e.preventDefault();
    let eventtime = $(this).prev().attr("id");
    saveevent(eventtime);
});
let getevent = function (event) {
    let value = localStorage.getItem(event);
    $(`#text${event}`).val(value);
};
let saveevent = function (save) {
    let planitem = $(`#text${save}`).val().trim(); 
    let now = save;
    localStorage.setItem(now, planitem);
};
let plannerdisplay = function () {
    let currenttime = moment().format("dddd MMMM Do YYYY");
    $("#currentDay").text(currenttime);
    for (let i = 9; i < 16; i++) {
      let timeblock =    `<div class="row ">
      <div class=" col-sm-3  hour">
              <p> ${time(i)} </p>
      </div>
      <div id=${i} class=" col-sm-6  description">
          <textarea id =text${i} placeholder="Add Event"></textarea>
      </div>
      <div class=" col-sm-3  saveBtn">
          <button>Save Event</button>
      </div>
  </div>`
      $(".container").append(timeblock);
      getevent(i);
  };
};

let now = new Date().getHours();
let timecolor = function () {
    $(".description").each(function () {
        var hours = $(this).attr("id")
        if (hours == now) {
            $(this).removeClass("future past").addClass("present");
          
        } else if (hours > now) {
            $(this).removeClass("present past").addClass("future");
        }
      else{
        $(this).removeClass("present future").addClass("past"); 
      }
    });
  };
plannerdisplay();
timecolor();
setInterval(timecolor, 60000);
