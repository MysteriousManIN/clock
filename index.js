"use strict";

$(()=>{

	const CLOCK = new Clock(), STOPWATCH = new Stopwatch();
	let sw, laps = [0];

	window.setInterval(()=> { 

		let { hours, minutes, seconds, date, dayName, monthName } = CLOCK.dateTime;
		let ampm = hours < 12 ? "am" : "pm";

		let x, y;
		
		x = parseInt(hours) + parseInt(minutes)/60;
		y = parseInt(minutes) + parseInt(seconds)/60; 

		hours = hours <= 12 ? parseInt(hours) : parseInt(hours) - 12;
		hours = hours < 10 ? "0" + hours : hours;

		$("#clockTime").html(`<span>${hours}:</span><span>${minutes}</span><span>:${seconds} </span><span>${ampm}</span>`);
		$("#clockDate").html(`${dayName}, ${date} ${monthName}`);

		$("#svgClock > .seconds_hand").css({ "transform": `rotate(${(seconds/60)*360}deg)` });
		$("#svgClock > .minutes_hand").css({ "transform": `rotate(${(y/60)*360}deg)` });
		$("#svgClock > .minutes_hand_2").css({ "transform": `rotate(${(y/60)*360}deg)` });
		$("#svgClock > .hours_hand").css({ "transform": `rotate(${(x/12)*360}deg)` });
		$("#svgClock > .hours_hand_2").css({ "transform": `rotate(${(x/12)*360}deg)` });

	}, 0);

	$("#fullscreenBtn").on("click", function(){

		if(this.value === "fullscreen"){

			$("html")[0].requestFullscreen();
			this.innerText = "fullscreen-exit";
			this.title = "Exit fullscreen";
			this.value = "exitFullscreen";

		}else{

			document.exitFullscreen();
			this.innerText = "fullscreen";
			this.title = "fullscreen";
			this.value = "fullscreen";

		}

	});

	$("#stopwatchBtn").on("click", function(){
		$(this).toggleClass("remixicon_fs20");
		$(this).toggleClass("remixicon_os20");
		$("#clockBlock").toggleClass("is_compress");
		$("#stopwatchBlock").toggleClass("is_active");
	});

	$("#startAndStopSWBtn").on("click", function(){

		if(this.value === "start"){

			STOPWATCH.start();
			sw = window.setInterval(()=>{
				if(STOPWATCH.state.isRunning){

					let { hours, minutes, seconds, milliseconds } = STOPWATCH.time;
					let hm;
					
					hm = hours > 0 ? `${hours}:${minutes}` : minutes;

					$("#stopwatchTime").html(`<span>${hm}:</span><span>${seconds}</span><span>.${milliseconds}</span>`);

				}
			}, 0);

			$("#lapSWBtn").css({"display": "block"});
			$("#resetSWBtn").css({"display": "none"});

			$("#stopwatchBtn").addClass("is_running");
			$("#stopwatchBtn").removeClass("is_paused");

			this.value = "stop";
			this.innerText = "Stop";

		}else{

			STOPWATCH.stop();
			clearInterval(sw);

			$("#lapSWBtn").css({"display": "none"});
			$("#resetSWBtn").css({"display": "block"});

			$("#stopwatchBtn").removeClass("is_running");
			$("#stopwatchBtn").addClass("is_paused");

			this.value = "start";
			this.innerText = "Start";

		}

	});

	$("#resetSWBtn").on("click", ()=>{

		STOPWATCH.reset();
		clearInterval(sw);
		$("#startAndStopSWBtn").val("start");
		$("#startAndStopSWBtn").text("Start");

		$("#stopwatchTime").html("<span>00:</span><span>00</span><span>.000</span>");
		$("#stopwatchBtn").removeClass("is_paused");

		$("#resetSWBtn").css({"display": "none"});

		laps = [0];
		$("#lapsBlock").html("");

	});

	$("#lapSWBtn").on("click", ()=>{

		laps.push(STOPWATCH.milliseconds);

		let { hours:h0, minutes:m0, seconds:s0, milliseconds:ms0 } = __clock_funcvar.convertMilliseconds(laps.at(-1)),
			{ hours:h1, minutes:m1, seconds:s1, milliseconds:ms1 } = __clock_funcvar.convertMilliseconds(laps.at(-1) - laps.at(-2));

		$("#lapsBlock").prepend(`<div><span>${laps.length - 1}</span><span>${h0}:${m0}:${s0}.${ms0}</span><span>+${h1}:${m1}:${s1}.${ms1}</span></div>`);

	});

	$("#lapsBtn").on("click", ()=>{

		$("#lapsBtn").toggleClass("is_active");
		$("#lapsBlock").toggleClass("is_active");

	});


	const darkLight = window.matchMedia("(prefers-color-scheme: dark)");
	const changeMetaThemeColor = () => {
		let themeColor = $("meta[name=theme-color]");
		darkLight.matches ? themeColor.attr("content", "#1f1f1f") : themeColor.attr("content", "#ffd000"); };
	darkLight.onchange = () => { changeMetaThemeColor(); };
	changeMetaThemeColor();


if(('wakeLock' in navigator){

// screen wake lock
navigator.wakeLock.request('screen').then(lock => { });

}

        
});
