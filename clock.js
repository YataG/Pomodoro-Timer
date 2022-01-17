// variables//

var minutes = 24;
var sessionTime = 24;
var seconds = 59;
var currentCycle = 'session'; //start clock in session mode//
var breakTime = 5; //5 mins in each break//

//function that resets minutes and seconds to declared variable//
function setMinsAndSecs() {
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}

//What happens when the update button is clicked//
function setData() {
  //value inputed in the focus time decreased by 1//
  var tempMins = document.getElementById('focusTime').value - 1;

  // if mins go below 0, output should be 0, if not go back to tempMins and decrease by 1//
  minutes = tempMins < 0 ? 0 : tempMins;
  sessionTime = minutes;
  var tempBreakTime = document.getElementById('breakTime').value - 1;
  breakTime = tempBreakTime < 0 ? 0 : tempBreakTime;
  document.getElementById('minutes').innerHTML = minutes;
}
//function for restart button//
function restart() {
  minutes = sessionTime;
  seconds = 59;
  setMinsAndSecs();
}
//function for start button//
function start() {
  setMinsAndSecs();

  var minutes_interval = setInterval(minutesTimer, 60000);
  var seconds_interval = setInterval(secondsTimer, 1000);

  function minutesTimer() {
    minutes = minutes - 1 < 0 ? 0 : minutes - 1;
    document.getElementById('minutes').innerHTML = minutes;
  }
  function secondsTimer() {
    seconds = seconds - 1;
    document.getElementById('seconds').innerHTML = seconds;

    if (seconds <= 0) {
      if (minutes <= 0) {
        if (currentCycle === 'session') {
          // clearInterval(minutes_interval);
          // clearInterval(seconds_interval);
          //if current cycle is in session, when time runs out cycle must change to break//
          currentCycle = 'break';
          //toggle break time countdown//
          minutes = breakTime;
          seconds = 59;
          setMinsAndSecs();

          document.getElementById('done').innerHTML =
            'Session Completed!! 😌 Take a Break 😌 !!';

          document.getElementById('done').classList.add('show_message');
        } else {
          currentCycle = 'session';
          minutes = sessionTime;
          seconds = 59;
          setMinsAndSecs();
          document.getElementById('done').innerHTML =
            'Break Time Over! 🤓 Focus Time!🤓 ';

          document.getElementById('done').classList.add('show_message');
        }
      }
      seconds = 60;
    }
  }
}
