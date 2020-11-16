var time = function (hours) {
    var ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours ? hours : 12;
    return hours + ampm;
  };
  let plannerdisplay = function () {
    let now = moment().format("dddd MMMM Do YYYY");
    $("#currentDay").text(now);
    for (let i = 10; i < 16; i++) {
      let timeblock = `<div class="row ">
          <div class="col-md-3 hour">
                  <p> ${time(i)} </p>
          </div>
          <div id=${i} class="col-md-6 description">
              <textarea id =input${i} placeholder="Add event here..."></textarea>
          </div>
          <div class="col-md-3 saveBtn">
              <button class="fas fa-save"></button>
          </div>
      </div>`;
      $(".container").append(timeblock);
    }
  };
  let retrieveEvents = function (key) {
    let value = localStorage.getItem(key);
    $(`#text${key}`).val(value);
  };
  let now = new Date().getHours();
  let timecolor = function () {
    $(".description").each(function () {
        var hours = parseInt($(this).attr("id"))
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

  $(document).on("click", ".saveBtn", function (e){
    e.preventDefault();

  });
  plannerdisplay();
  timecolor();
  setInterval(timecolor, 60000);