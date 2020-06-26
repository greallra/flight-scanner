
import {quoteGenerator} from './dummyData';
//For location autofill
const url = 'https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json';
export function getData() {
    return fetch(url)
    .then((res)=>{
        return res.json()
    })
}
//for random quotes
export function getQuotes(origin, destination, outBoundDate, isDirect, inBoundOptionalDate) {                
    return quoteGenerator(origin, destination, outBoundDate, isDirect, inBoundOptionalDate);
}
export function testGetQuotes() {                
    return test();
}

export async function airportsCitiesAutofill(searchTerm) {
    let data = await fetch('https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json');
    if(data.status === 200) {
        let jsonify = await data.json()
        let filterCity = jsonify.filter((o)=>{
            return o.city.toLowerCase().startsWith(searchTerm.toLowerCase())
        })
        
        return filterCity;
    }
    
    
}
