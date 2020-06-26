//Number from 1 - 10,000 (QuoteId)
export function getRandomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
//Number from 1 - 10,000 (QuoteId)
export function getNumber(max) {
    return Math.round(max * Math.random());
}

export function randomTime(minHour, maxHour, format) {

  if(format === "24h") {
    let time =  "00:00"
    let randomHour = getRandomIntRange(minHour, maxHour).toString();
    if(randomHour.length === 1){ randomHour = "0" + randomHour}
    let randomMinute = getRandomIntRange(0, 59).toString();
    if(randomMinute.length === 1 && randomMinute < 10){ randomMinute = "0" + randomMinute;}
     if(randomMinute.length === 1 && randomMinute < 10){ randomMinute = randomMinute + 0;}
    time = randomHour + ":" + randomMinute;
    return time
  }
return "no parameteres given"
}

export function addSomehours(time, hours) {
    let newHour;
    let sliceHoursFromTime = Number(time.slice(0,2));
    let hoursPlusTime = sliceHoursFromTime + hours
    let sliceTimeSecondhalf = time.slice(3);
  
    let threshhold = 24;
    //if hours is greater than 24
    if(hoursPlusTime >= 24) {
      /*
        examples
        23.35 + 1 = 24.35
        22.42 + 7 = 29.41
      
        */
      let diffUnderthreshold = threshhold - sliceHoursFromTime;
      newHour = hours - diffUnderthreshold;
      newHour = "0" + newHour.toString() + ":" + sliceTimeSecondhalf
      return newHour;
    }
    newHour = sliceHoursFromTime + hours;
    return newHour.toString() + ":" + sliceTimeSecondhalf
}

export function getRandomPrice(min, max){
  /*
  pounds 30 - 500

  */
 let pound = getRandomIntRange(30, 500);
 let cents = getRandomIntRange(0, 99);
  if(cents < 10) {cents = "0" + cents}
  return pound + "." + cents;
}

export function getDurationBasedOnLoaction() {
  return 3;
}
//for sorting
export function compareRoundTrip(a, b) {
      //a is less than b by some ordering criterion
      if (a.totalPrice < b.totalPrice) {
        return -1;
      }
      //a is greater than b by the ordering criterion
      if (a.totalPrice > b.totalPrice) {
        return 1;
      }
      // a must be equal to b
      return 0;

}
export function compareBest(a, b) {
      //a is less than b by some ordering criterion
      if (a.totalPrice < b.totalPrice) {
        return 1;
      }
      //a is greater than b by the ordering criterion
      if (a.totalPrice > b.totalPrice) {
        return -1;
      }
      // a must be equal to b
      return 0;

}
export function compareFastest(a, b) {
    

}

export function filterCitiesFromAirports(airports, originOrDestination = "dublin") {
  let city;
  let country;
  if(originOrDestination.indexOf(',') > 0) { 
    city = originOrDestination.split(',')[0];
    country = originOrDestination.split(',')[1];
  }
  else {
    city = originOrDestination;
    country = originOrDestination;
  }
  let filterCities = airports.filter((o)=>{
  return o.city.toLowerCase() === city.toLowerCase().trim() && o.icao !== "\\N" || o.country.toLowerCase() === country.toLowerCase().trim() && o.icao !== "\\N";
  })

  return filterCities;
}

export function logTruthiness (val) {
  if (val) {
      return "Truthy!";
  } else {
      return "Falsy.";
  }
}
export function validateRoundTrip (val) {

}
export function validateDirectTrip (val) {
 
}