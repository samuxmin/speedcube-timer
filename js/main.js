var timer = 0;
var timerInterval;
var isStarted = false;

const timerDom = document.getElementById("timer");
const timeList = document.querySelector(".time-list")
const avg = document.getElementById('average')

var times = JSON.parse(localStorage.getItem('times')) || [];

function getTimes (){
    timeList.innerHTML = ""

    times.forEach( (t, i) => {
        let time = document.createElement("li")
        time.innerHTML = t.seconds;
        let btn = document.createElement('button')
        btn.innerText = 'X'
        btn.onclick = function(){
            deleteTime(t.date)
        }
        time.appendChild(btn)
        timeList.appendChild(time)
    
    }
)
}

function deleteTime(date){
    times = times.filter(t => t.date.toString() !== date.toString())
    getTimes()
    calculateAvg()
}

function calculateAvg(){
    let sum = 0
    times.forEach(t => sum += parseFloat(t.seconds) )

    let average = sum / times.length
    return avg.innerHTML = average.toFixed(2);
}

function startTimer(){
    isStarted = true
    timerInterval = setInterval(() => {
        timer += 0.01;
        timerDom.innerText = timer.toFixed(2)
    }, 10)
}

function stopTimer () {
    if(!isStarted){
        return
    }
    clearInterval(timerInterval)
    isStarted = false;
    var newTime = {seconds:timer.toFixed(2), date: new Date()}
    times.push(newTime)
    localStorage.setItem('times', JSON.stringify(times))
    calculateAvg()
    getTimes()
    timer = 0
}

document.addEventListener('keyup', e => {
    if(e.code === "Space" && isStarted === false){
        return startTimer()
    }
    stopTimer()
})

getTimes()
calculateAvg()