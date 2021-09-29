// copy right year
const date = new Date();
document.getElementById("year").innerText = date.getFullYear();

// detect item with function
const idDetect = (id) => {
  const item = document.getElementById(id);
  return item;
};

// default time
// const defaultTime = (id, time) => {
//   const item = document.getElementById(id);
//   if (time === 1) {
//     time = 0;
//   }
//   item.innerText = time;
//   if (time < 10) {
//     item.innerText = `0${time}`;
//   }
// };

// time incrementor
const timeIncrement = (secID, minID, hourID,catchHour) => {
  const second = idDetect(secID);
  const minute = idDetect(minID);
  const hour = idDetect(hourID);

  // let min = minTime;
  // let initialHour = hTime;
  let sec;
  let min;
  let initialHour

  if(minute !== null && hour !== null){
    min = Number(minute.innerText);
    initialHour = Number(hour.innerText);
    sec = Number(second.innerText)
  }

  // defaultTime(minID, minTime);
  // defaultTime(hourID, hTime);

  if(initialHour > 0 && catchHour === true){
    initialHour -= 1;
    hour.innerText = initialHour;
    if (min === 0){
      minute.innerText = '60'
      min = 60
    }
  }
  if(initialHour < 10){
    hour.innerText = `0${initialHour}`;
  }

  if(min > 0){
    minute.innerText = min -1;
    if (min < 10) {
      minute.innerText = `0${min-1}`;
    }
  }

  const interval = setInterval(() => {
    if (sec > 0) {
      sec -= 1;
      second.innerText = sec;
      if (sec < 10) {
        second.innerText = `0${sec}`;
      }
    } else if (sec === 0) {
      if(min > 1){
        sec = 60
      }
      if (min > 0) {
        min -= 1;
        minute.innerText = min;
        if (min < 10) {
          minute.innerText = `0${min}`;
        }
        if (min === 0) {
          if(initialHour > 0){
            min = 60;
          }
          if(initialHour > 0){
            initialHour -= 1;
          }
          hour.innerText = initialHour;

          if (initialHour < 10) {
            hour.innerText = `0${initialHour}`;
          }
          
          if (initialHour === 0 && min === 0 && sec === 0) {
            clearInterval(interval);
          }
        }
      }
    }
  }, 1000);
};

const idNumberBeforeCreateNewEvent = idDetect("preview").children.length + 1;
for (let i = 1; i <= idNumberBeforeCreateNewEvent; i++) {
  timeIncrement(`p_sec_${i}`, `p_min_${i}`, `p_hour_${i}`,true);
}

// create event
const eventCreator = () => {
  const {eventName,hour,minute,second} = catchEventInputValue();
  const id = idDetect("preview");
  const idNumber = id.children.length + 1;
  // let sec;
  let min;
  let initialHour

  if(hour > 0){
    initialHour = hour - 1;
    if (minute === 0){
      min = 60
    }else{
      min = minute
    }
  }else{
    initialHour = 0;
    min = minute
  }

  if (eventName === null || eventName === '' || eventName === undefined){
    alert('You Need to fill up Event Name Filed')
  }else{
    
    id.innerHTML += `
    <div class="singlePreview col-md-6 ">
    <div id="time">
     <h3>${eventName}</h3>
         <div class="time">
             <p><span id="p_hour_${idNumber}"> ${initialHour}</span><span>h</span></p>
         <p> <span class="separate"> : </span> <span id="p_min_${idNumber}"> ${min}</span><span>m</span></p>
         <p> <span class="separate"> : </span> <span id="p_sec_${idNumber}"> ${second}</span><span>s</span></p>
         </div>
     </div>
     <!-- delete event -->
  </div>
    `;
  }

  setEventData(idNumber)

  for (let i = 1; i <= idNumber; i++) {
    timeIncrement(`p_sec_${i}`, `p_min_${i}`, `p_hour_${i}`,true);
  }
};

setInterval(() => {
  const second = idDetect('p_sec_1')
  const minute = idDetect('p_min_1')
  const time = {'hour':1,'minute':minute.innerText,'second':second.innerText}
  window.localStorage.setItem('time1',JSON.stringify(time))
},1000)

// set new cerated event data 

const setEventData = (idNumber) => {
  const {eventName,hour,minute,second} = catchEventInputValue();

  if (eventName === null || eventName === ''){
    alert('You Need to fill up Event Name Filed')
  }

  const time = {'eventName':eventName,'hour':hour,'minute':minute,'second':second}
  window.localStorage.setItem(`time_${idNumber}`,JSON.stringify(time))
}

// get item from local storage and set

function getItem(id){
  const data = window.localStorage.getItem(`time${id}`);
  return data;
}

const getItemLocalStorage = () => {
    const data = getItem(1);
    const parseData = JSON.parse(data)
  console.log(parseData)
}

getItemLocalStorage()


// catch input value
function catchEventInputValue(){
  const eventName = idDetect(`eventName`).value;
  const hour = idDetect(`eventHour`).value || 0;
  const minute = idDetect(`eventMinute`).value || 0;
  const second = idDetect(`eventSec`).value || "60";
  return {eventName:eventName,hour:hour,minute:minute,second:second};
}

