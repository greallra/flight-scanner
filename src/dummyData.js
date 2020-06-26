import moment from 'moment';
import { getRandomIntRange, getNumber, randomTime, addSomehours, getRandomPrice, getDurationBasedOnLoaction, filterCitiesFromAirports} from './myScripts';

var airlinesLogos = "https://raw.githubusercontent.com/dotmarn/Airlines/master/airlines.json"
var iataAirlines = "https://raw.githubusercontent.com/BesrourMS/Airlines/master/airlines.json";
// var iataAirports = "https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json"
var iataAirports2 = "https://raw.githubusercontent.com/L1fescape/airport-codes/master/airports.json";

let airlines;

class Quote {
  constructor(isDirect) {
    this.QuoteId = getRandomIntRange(0,10000);
    this.Direct = isDirect;
    this.QuoteDateTime = moment().unix()
    this.OutboundLeg = {
      
    }
    this.InboundLeg = {
      
    }
  }

  organizeData(data, isDirect, outBoundDateUnix, inBoundOptionalDateUnix = "") {
    let randomOriginIndex = getRandomIntRange(0,data.originCities.length - 1)
    let randomOriginCityAirport = data.originCities[randomOriginIndex];
    let randomOriginCarrier = data.airlines[getRandomIntRange(0, data.airlines.length -1)]
    let randomDestinationIndex = getRandomIntRange(0,data.destinationCities.length - 1) 
    let randomDestinationCityAirport = data.destinationCities[randomDestinationIndex];
    let randomDestinationCarrier = data.airlines[getRandomIntRange(0, data.airlines.length -1)]
    this.OutboundLeg.OriginAirport = randomOriginCityAirport.name;
    this.OutboundLeg.OriginCity = randomOriginCityAirport.city;
    this.OutboundLeg.OriginCountry= randomOriginCityAirport.country;
    this.OutboundLeg.OriginIataCode = randomOriginCityAirport.iata;
    this.OutboundLeg.DestinationIataCode = randomDestinationCityAirport.iata;
    this.OutboundLeg.price= getRandomPrice();
    this.OutboundLeg.currency= "pound";
    this.OutboundLeg.flightDuration = getDurationBasedOnLoaction();
    let timeStamp = 1234
    this.OutboundLeg.departureTimestamp= outBoundDateUnix;
    this.OutboundLeg.ArrivalTimestamp= inBoundOptionalDateUnix;
    this.OutboundLeg.DestinationAirport = randomDestinationCityAirport.name;
    this.OutboundLeg.DestinationCity = randomDestinationCityAirport.city;
    this.OutboundLeg.DestinationCountry= randomDestinationCityAirport.country;
    this.OutboundLeg.OriginCarrier = randomOriginCarrier.name;
    this.OutboundLeg.DestinationCarrier = randomDestinationCarrier.name;

    const carrierImgList = data.airlinesLogos.filter((o)=>{
      return o.id === randomOriginCarrier.code;
    })
    const CarrierImg = carrierImgList.length > 0 ? carrierImgList[0].logo: ""
    this.OutboundLeg.CarrierImg = CarrierImg;
    //destination
   
    if(!isDirect) {
      let randomOriginIndex = getRandomIntRange(0,data.destinationCities.length - 1);
      let randomOriginCityAirport = data.destinationCities[randomDestinationIndex];
      let randomOriginCarrier = getRandomIntRange(0,data.destinationCities.length - 1);
      let randomDestinationIndex2 = getRandomIntRange(0,data.originCities.length - 1) 
      let randomDestinationCityAirport2 = data.originCities[randomDestinationIndex2];
      let randomDestinationCarrier2 = data.airlines[getRandomIntRange(0, data.airlines.length -1)]
      this.InboundLeg.OriginAirport = randomOriginCityAirport.name;
      this.InboundLeg.OriginCity = randomOriginCityAirport.city;
      this.InboundLeg.OriginCountry= randomOriginCityAirport.country;
      this.InboundLeg.IataCode = randomOriginCityAirport.iata;
      this.InboundLeg.price= getRandomPrice();
      this.InboundLeg.currency= "pound";
      this.InboundLeg.flightDuration = getDurationBasedOnLoaction();
      let timeStamp = 1234
      this.InboundLeg.departureTimestamp= outBoundDateUnix;
      this.InboundLeg.ArrivalTimestamp= inBoundOptionalDateUnix;
      this.InboundLeg.DestinationAirport = randomDestinationCityAirport2.name;
      this.InboundLeg.DestinationCity = randomDestinationCityAirport2.city;
      this.InboundLeg.DestinationCountry= randomDestinationCityAirport2.country;
      this.InboundLeg.Carrier = randomDestinationCarrier2.name;
  
      const carrierImgList = data.airlinesLogos.filter((o)=>{
        return o.id === randomOriginCarrier.code;
      })
      const CarrierImg = carrierImgList.length > 0 ? carrierImgList[0].logo: ""
      this.InboundLeg.CarrierImg = CarrierImg;
    }
  }
}


let data =[
  {
    "QuoteId": 7100,
    "Direct": false,
    "QuoteDateTime": 1592146010447,
    "OutboundLeg":{
        "OriginAirport": "London-Corbin Airport-MaGee Field",
        "OriginCity": "London",
        "OriginCountry": "United States",
        "DestinationName": "London-Corbin Airport-MaGee Field",
        "DestinationCity": "London",
        "DestinationCountry": "United States",
        "IataCode": "LOZ",
        "price": 19.53,
        "currency": "pound",
        "timestamp": 1592146010447,
        "flightDuration": 3,
        "Carrier": "Afghan Jet International",
        "CarrierImg": "https://images.kiwi.com/airlines/64/HN.png"
      },
    "InboundLeg": {
      "OriginAirport": "London-Corbin Airport-MaGee Field",
      "OriginCity": "London",
      "OriginCountry": "United States",
      "DestinationName": "London-Corbin Airport-MaGee Field",
      "DestinationCity": "London",
      "DestinationCountry": "United States",
      "IataCode": "LOZ",
      "price": 19.53,
      "currency": "pound",
      "timestamp": 1592146010447,
      "flightDuration": 3,
      "Carrier": "Afghan Jet International",
      "CarrierImg": "https://images.kiwi.com/airlines/64/HN.png"
    },
  }

]
let data2 = [
  {
    "QuoteId": 7113,
    "Direct": true,
    "QuoteDateTime": 1592146010447,
    "OutboundLeg": {
      "originPlace": {
        "Name": "London-Corbin Airport-MaGee Field",
        "City": "London",
        "Country": "United States",
        "IataCode": "LOZ",
        "originPrice": 229.53,
        "currency": "pound",
        "Date": 1592146010447,
        "departureTime": "15:14",
        "flightDuration": 3,
        "Carrier": "Afghan Jet International",
        "CarrierImg": "https://images.kiwi.com/airlines/64/HN.png"
      },
      "destinationPlace": {
        "Name": "Stansted",
        "City": "London",
        "Country": "United Kingdom",
        "IataCode": "STN",
        "destinationPrice": "123.53",
        "Date": 1592146010447,
        "ArrivalTime": "00:35",
        "flightDuration": 3,
        "Carrier": "Manx2",
        "CarrierImg": "https://images.kiwi.com/airlines/64/NM.png"
      },
    },
  },
  {
    "QuoteId": 7114,
    "Direct": true,
    "QuoteDateTime": 1592146010447,
    "OutboundLeg": {
      "originPlace": {
        "Name": "London-Corbin Airport-MaGee Field",
        "City": "London",
        "Country": "United States",
        "IataCode": "LOZ",
        "originPrice": 229.53,
        "currency": "pound",
        "Date": 1592146010447,
        "departureTime": "15:14",
        "flightDuration": 3,
        "Carrier": "Afghan Jet International",
        "CarrierImg": "https://images.kiwi.com/airlines/64/HN.png"
      },
      "destinationPlace": {
        "Name": "Stansted",
        "City": "London",
        "Country": "United Kingdom",
        "IataCode": "STN",
        "destinationPrice": "123.53",
        "Date": 1592146010447,
        "ArrivalTime": "00:35",
        "flightDuration": 3,
        "Carrier": "Manx2",
        "CarrierImg": "https://images.kiwi.com/airlines/64/NM.png"
      },
    },
  },
  {
    "QuoteId": 7115,
    "Direct": true,
    "QuoteDateTime": 1592146010447,
    "OutboundLeg": {
      "originPlace": {
        "Name": "London-Corbin Airport-MaGee Field",
        "City": "London",
        "Country": "United States",
        "IataCode": "LOZ",
        "originPrice": 229.53,
        "currency": "pound",
        "Date": 1592146010447,
        "departureTime": "15:14",
        "flightDuration": 3,
        "Carrier": "Afghan Jet International",
        "CarrierImg": "https://images.kiwi.com/airlines/64/HN.png"
      },
      "destinationPlace": {
        "Name": "Stansted",
        "City": "London",
        "Country": "United Kingdom",
        "IataCode": "STN",
        "destinationPrice": "123.53",
        "Date": 1592146010447,
        "ArrivalTime": "00:35",
        "flightDuration": 3,
        "Carrier": "Manx2",
        "CarrierImg": "https://images.kiwi.com/airlines/64/NM.png"
      },
    },
  },
  {
    "QuoteId": 7115,
    "Direct": true,
    "QuoteDateTime": 1592146010447,
    "OutboundLeg": {
      "originPlace": {
        "Name": "London-Corbin Airport-MaGee Field",
        "City": "London",
        "Country": "United States",
        "IataCode": "LOZ",
        "originPrice": 49.53,
        "currency": "pound",
        "Date": 1592146010447,
        "departureTime": "15:14",
        "flightDuration": 3,
        "Carrier": "Afghan Jet International",
        "CarrierImg": "https://images.kiwi.com/airlines/64/HN.png"
      },
      "destinationPlace": {
        "Name": "Stansted",
        "City": "London",
        "Country": "United Kingdom",
        "IataCode": "STN",
        "destinationPrice": "123.53",
        "Date": 1592146010447,
        "ArrivalTime": "00:35",
        "flightDuration": 3,
        "Carrier": "Manx2",
        "CarrierImg": "https://images.kiwi.com/airlines/64/NM.png"
      },
    },
  },
  {
    "QuoteId": 7115,
    "Direct": true,
    "QuoteDateTime": 1592146010447,
    "OutboundLeg": {
      "originPlace": {
        "Name": "London-Corbin Airport-MaGee Field",
        "City": "London",
        "Country": "United States",
        "IataCode": "LOZ",
        "originPrice": 99.53,
        "currency": "pound",
        "Date": 1592146010447,
        "departureTime": "15:14",
        "flightDuration": 3,
        "Carrier": "Afghan Jet International",
        "CarrierImg": "https://images.kiwi.com/airlines/64/HN.png"
      },
      "destinationPlace": {
        "Name": "Stansted",
        "City": "London",
        "Country": "United Kingdom",
        "IataCode": "STN",
        "destinationPrice": "123.53",
        "Date": 1592146010447,
        "ArrivalTime": "00:35",
        "flightDuration": 3,
        "Carrier": "Manx2",
        "CarrierImg": "https://images.kiwi.com/airlines/64/NM.png"
      },
    },
  },
]
export {data2}

const error = {
  error: false,
  errorMsg: ""
}

// let roundTripResponse, directTripResponse;
// export function test() {
//   const promiseA = new Promise( (resolutionFunc,rejectionFunc) => {
//     error.error = true;
//     error.errorMsg = "coudlnt get some data";
//     // resolutionFunc(error)
//     roundTripResponse = data;
//     directTripResponse = data2;
//     resolutionFunc(roundTripResponse)
//   });
//   return promiseA;
// }

export function quoteGenerator(origin, destination, outBoundDateUnix, isDirect, inBoundOptionalDateUnix) {
  let allFetchData = {}

  
  return fetch(iataAirports2)
  .then(r=>r.json())
  .then(airports=>{
    const filterOriginCities = filterCitiesFromAirports(airports,origin);
    const filterDestinationCities = filterCitiesFromAirports(airports,destination);
    allFetchData.originCities = filterOriginCities;
    allFetchData.destinationCities = filterDestinationCities;
    if(!filterOriginCities.length > 0 || !filterDestinationCities.length > 0) {
      error.error = true;
      let errString = `Problem with `;
      let orginErr = !filterOriginCities.length > 0 ? 'Origin Cities':''
      let destErr = !filterDestinationCities.length > 0 ? 'Destination Cities':''
      errString =errString +orginErr + destErr;
      throw errString;
    }
    return fetch(iataAirlines);
  })
  .then(r=>r.json())
  .then(airlines=>{
    allFetchData.airlines = airlines
    return fetch(airlinesLogos);
  })
  .then(r=>r.json())
  .then(airlinesLogos=>{
    allFetchData.airlinesLogos = airlinesLogos;
    let results = [];
    let randomRange = getRandomIntRange(3,13)
    if(!allFetchData.originCities || !allFetchData.destinationCities) {
      return error;
    }
   
    for(var i = 0;i < getRandomIntRange(3,13);i++) {
      let quote = new Quote(isDirect);
      quote.organizeData(allFetchData, isDirect, outBoundDateUnix, inBoundOptionalDateUnix)
      results.push({...quote})
    }

    return results;
  })
}

// quoteGenerator("madrid","paris",Date.now(), false,Date.now())
// .then((r)=>{
//   console.log(r)
// })
// .catch((e)=>{
//   if(typeof e === 'string') {
//     error.error = true;
//     error.errorMsg = e
//     console.log(error);
//   }
//    console.log("didnt catch error", e)
// })

let quotesExample = [
  {
    "QuoteId": 22, 
    "Direct": true,
    "QuoteDateTime": "2020-06-02T14:08:42+01:00",
    "OutboundLeg": {
      "place" : {
        "IataCode" : "YXU",
        "Name" : "John D Kennedy",
        "country" : "USA",
        "cityId" : "NYC",
        "Date" : "2020-06-05T15:09:13+01:00",
        "carrier" : "Transavia",
        "carrierImg" : "https://images.kiwi.com/airlines/64/TO.png"

      },
      "Carrier":{
        "CarrierCode": "OB",
        "CarrierName" : "Star Peru"
      },
      "price": {
        "amount" : 111.11,
        "currency" : "USD"
      },
      "flightTime": {
        "key" : "will be a random time on the data"
      }
    },
    "InboundLeg": {
      "place" : {
        "IataCode" : "YXU",
        "Name" : "John D Kennedy",
        "country" : "USA",
        "cityId" : "NYC",
        "Date" : "2020-06-05T15:09:13+01:00",
        "carrier" : "Transavia",
        "carrierImg" : "https://images.kiwi.com/airlines/64/TO.png"
      },
      "Carrier":{
        "CarrierCode": "OB",
        "CarrierName" : "Star Peru"
      },
      "price": {
        "amount" : 111.11,
        "currency" : "USD"
      },
      "flightTime": {
        "key" : "will be a random time on the data"
      }
    },
   
  }
]