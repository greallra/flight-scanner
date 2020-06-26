import React from 'react'
import './ResultCard.css';
import Loader from 'react-loader-spinner'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'font-awesome/css/font-awesome.min.css';
import FlightIcon from '@material-ui/icons/Flight';
import moment from 'moment';
import QuoteSelected from './QuoteSelected';
const imgLogo = {
    width: '20px',
    height: '20px',
    marginRight: '7px'
}
export function ResultCard(props) {

     const price = (outP, inP)=> {
         let sum = Number(outP) +  Number(inP);
        //  sum = sum.toString().split(".")
        
         //let x = sum[0] + "." + sum[1]
         console.log(sum.toFixed(2))
        return sum.toFixed(2)
     }
     const quoteSelected = props.quoteSelected;

    let list = props.quotes.map((o)=>{
        let {OriginIataCode, DestinationIataCode, OriginCity, DestinationCity} = o.OutboundLeg;
        return <div className="results">
        <Paper elevation={3} className="paper" >
        <div style={{padding: '10px', maxWidth: '350px', margin: 'auto'}}>
            
            <div className="paper-inner-cont">
                <div className="carrier"><img src={o.OutboundLeg.CarrierImg ? o.OutboundLeg.CarrierImg:'https://images.kiwi.com/airlines/64/OK.png'} style={imgLogo}></img>{o.OutboundLeg.Carrier}</div>
                <div></div>
            </div>
            {/* Direct */}
            <div className="outbound-cont">
                <div className="outbound-inner">
                    <div className="hr">{moment(o.OutboundLeg.departureTimestamp).format('hh:mm')}</div>
                    <div className="flight-time">{o.OutboundLeg.flightDuration} h</div>
                    <div className="hr">{moment(o.OutboundLeg.ArrivalTimestamp).format('hh:mm')}</div>
                </div>
                <div className="outbound-inner"> <div className="line"></div><i class="fa fa-fighter-jet" aria-hidden="true" style={{marginLeft:'5px'}}></i></div>
                <div className="outbound-inner">
                    <div className="city">{OriginIataCode ? OriginIataCode: OriginCity.slice(0,3)}</div> <div className="city">{DestinationIataCode ? DestinationIataCode: DestinationCity.slice(0,3)}</div>
                </div>
                <div className="outbound-inner direct">Direct</div>
            </div>
            {/* Return Only */}
            {props.isDirect ? <div></div>:
             <div className="outbound-cont">
                <div className="outbound-inner">
                    <div className="hr">{moment(o.InboundLeg.departureTimestamp).format('hh:mm')}</div>
                    <div className="flight-time">{o.InboundLeg.flightDuration} h</div>
                    <div className="hr">{moment(o.InboundLeg.ArrivalTimestamp).format('hh:mm')}</div>
                </div>
                <div className="outbound-inner"><i class="fa fa-fighter-jet" aria-hidden="true" style={{marginLeft:'5px'}}></i> <div className="line"></div></div>
                <div className="outbound-inner">
                <div className="city">{o.InboundLeg.OriginIataCode ? o.InboundLeg.OriginIataCode: o.InboundLeg.OriginCity.slice(0,3)}</div> <div className="city">{o.InboundLeg.DestinationIataCode ? o.InboundLeg.DestinationIataCode: o.InboundLeg.DestinationCity.slice(0,3)}</div>
                </div>
                <div className="outbound-inner direct">Direct</div>
            </div> 
            }
        </div>
        </Paper>
        <Paper elevation={3} className="paper">
            <div className="price-cont" >
        <div className="price">${o.totalPrice}</div>
                <Button variant="contained" color="primary" id={o.QuoteId} onClick={(e) => { props.handleQuoteSelected(e); props.changeSection(e,'quoteSelectedSection');}}>
                Select <i class="fa fa-arrow-right" aria-hidden="true" ></i>
                </Button>
                {/* <div className="select-btn"> </div> */}
            </div>
        </Paper>
    </div>})

    if(quoteSelected) {
        return <QuoteSelected  quoteSelected={quoteSelected} isDirect={props.isDirect} changeSection={props.changeSection}  people={props.people} cabinClass={props.cabinClass}/>
    }
    return(
       <div style={{padding: '20px'}}>
           {list}
        </div>
    )
    
}