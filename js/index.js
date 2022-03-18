"use strict";

$(()=>{ 

  
  if(window.matchMedia("(prefers-color-scheme:dark)").matches){
    $("meta[name='theme-color']").attr("content", "hsl(0 0% 8%)");
  }else{
    $("meta[name='theme-color']").attr("content", "#ff0055");
  }

  window.matchMedia("(prefers-color-scheme:dark)").onchange = function(){
    if(this.matches){
      $("meta[name='theme-color']").attr("content", "hsl(0 0% 8%)");
    }else{
      $("meta[name='theme-color']").attr("content", "#ff0055");
    }
  };


  const MONTH = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  const DAY = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

  const CLOCK = new Clock();
  const ClockInterval = window.setInterval(()=>{

    let { h, m, s } = CLOCK.getTime();
    let { day, date, month, year } = CLOCK.getDate();

    let ampm = parseInt(h) < 12 ? "AM" : "PM";
    h = parseInt(h) <= 12 ? parseInt(h) : parseInt(h-12);
    h = h < 10 ? "0"+h : h;
    h = h.toString();
    
    $("#clock > .seconds").css({"transform": `rotate(${(parseInt(s)/60)*360}deg)`});
    $("#clock > .minutes").css({"transform": `rotate(${(parseInt(m)/60)*360}deg)`});
    $("#clock > .hours").css({"transform": `rotate(${(parseInt(h)/12)*360}deg)`});

    $("#dateAndTime > span:first-child").html(`${h}:${m}<span>:${s} ${ampm}</span>`);
    $("#dateAndTime > span:last-child").html(`${DAY[day]}, ${date} ${MONTH[month]} ${year}`);

  }, 0);


  const SW = new Stopwatch();
  let swInterval;

  $("#swStartAndStop").on("click", function(){

    if($(this).val() === "Start"){
      SW.start();
      swInterval = window.setInterval(()=>{
        let { h, m, s, ms } = SW.getTime();
        $("#swTime").html(`${h}:${m}:${s}<span>.${ms}</span>`);
      }, 0);
      $(this).val("Stop");
      $("#swStartAndStop > span:first-child").text("pause");
      $("#swStartAndStop > span:last-child").text("Stop");
    }else{
      SW.stop();
      clearInterval(swInterval);
      $(this).val("Start");
      $("#swStartAndStop > span:first-child").text("play_arrow");
      $("#swStartAndStop > span:last-child").text("Start");
    }

    $("#stopwatch_btn").addClass("is_sw");

  });

  $("#swReset").on("click", ()=>{
    SW.stop();
    clearInterval(swInterval);
    SW.reset();
    $("#swTime").html("00:00:00<span>.000</span>");
    $("#swStartAndStop").val("Start");
    $("#swStartAndStop > span:first-child").text("play_arrow");
    $("#swStartAndStop > span:last-child").text("Start");
    $("#stopwatch_btn").removeClass("is_sw");
  });

  $("#stopwatch_btn").on("click", ()=>{
    $("#clock_block").toggleClass("is_sw");
    $("#stopwatch_block").toggleClass("is_active");
  });


});