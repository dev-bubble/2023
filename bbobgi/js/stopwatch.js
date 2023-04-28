var time = 0;
var starFlag = true;
$(document).ready(function(){
  buttonEvt();
});

function init(){
  document.getElementById("time").innerHTML = "00:00:00";
}

function buttonEvt(){
  var hour = 0;
  var min = 0;
  var sec = 0;
  var milliSec = 0;
  var timer;

  // start btn
  $("#startbtn").click(function(){

    if(starFlag){
      $(".fa").css("color","#FAED7D")
      this.style.color = "#4C4C4C";
      starFlag = false;

      if(time == 0){
        init();
      }

      timer = setInterval(function(){
        time++;

		milliSec = time%100;
		sec = Math.floor(time/100)%60;
        min = Math.floor(Math.floor(time/100)/60);
		/*
		if(min == 99){
			clearInterval(timer);
		}
		*/
        //hour = Math.floor((min/100)%60);

        //var th = hour;
        var tm = min;
        var ts = sec;
		var tms = milliSec;
		
        //if(th<10){
        //th = "0" + hour;
        //}
        if(tm < 10){
        tm = "0" + min;
        }
        if(ts < 10){
        ts = "0" + sec;
        }
		if(tms < 10){
        tms = "0" + milliSec;
        }

        document.getElementById("time").innerHTML = tm + ":" + ts + ":" + tms;
      }, 10);
    }
  });

  // pause btn
  $("#pausebtn").click(function(){
    if(time != 0){
      $(".fa").css("color","#FAED7D")
      this.style.color = "#4C4C4C";
      clearInterval(timer);
      starFlag = true;
    }
	$("#recordbtn").click();
  });

  // stop btn
  $("#stopbtn").click(function(){
    if(time != 0){
      $(".fa").css("color","#FAED7D")
      this.style.color = "#4C4C4C";
      clearInterval(timer);
      starFlag = true;
      time = 0;
      init();
    }
  });
  
    $("#recordbtn").click(function(){
		if(starFlag){
			var recordTime = document.getElementById("time").innerHTML;
			var li = document.createElement("li");
			li.innerHTML = recordTime;
			document.getElementById("recordList").append(li);
		}
	});
	
	$(document).on('keydown', function() {
		var keyCode = event.keyCode ? event.keyCode : event.which;
		
		if(keyCode == 32){
			if(starFlag){
				$("#startbtn").click();
			} else {
				$("#pausebtn").click();
			}
			$("#recordbtn").click();
		}
	})
}