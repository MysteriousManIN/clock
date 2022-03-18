"use strict";

const HMSMS = (h,m,s,ms) => {

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    ms = ms < 100 ? (ms < 10 ? "00" + ms : "0" + ms) : ms;

    h = h.toString();
    m = m.toString();
    s = s.toString();
    ms = ms.toString();

    return {
        h:h,
        m:m,
        s: s,
        ms: ms
    }

}

const ConvertMilliseconds = (milliseconds) => {

    let s, m, h, ms;

    ms = milliseconds;

    s = parseInt(ms /  1000);
    ms = ms % 1000;

    m = parseInt(s / 60);
    s = s % 60;

    h = parseInt(m / 60);
    m = m % 60;

    return HMSMS(h,m,s,ms);

}

class Clock{

    getTime(){
        const D = new Date();
        return HMSMS(D.getHours(), D.getMinutes(), D.getSeconds(), D.getMilliseconds());
    }

    getDate(){

        const D = new Date();
        return {
            day: D.getDay(),
            date: D.getDate(),
            month: D.getMonth(),
            year: D.getFullYear()
        }

    }

}

class Stopwatch{

    #startingTime = null;
    #previousTime = 0;

    start(){
        if(this.#startingTime === null){
            this.#startingTime = new Date();
        }
    }

    stop(){
        if(this.#startingTime !== null){
            this.#previousTime += (new Date()) - this.#startingTime;
            this.#startingTime = null;
        }
    }

    reset(){
        this.#startingTime = null;
        this.#previousTime = 0;
    }

    lap(){
        if(this.#startingTime !== null){
            return ConvertMilliseconds(this.#previousTime + ((new Date()) - this.#startingTime));
        }else{
            return null;
        }
    }

    getTime(){

        let time;

        if(this.#startingTime !== null){ time = this.#previousTime + ((new Date()) - this.#startingTime);
        }else{ time = this.#previousTime; }

        time = ConvertMilliseconds(time);
        return time;

    }

};
