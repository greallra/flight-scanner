import React from 'react'
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { Button } from '@material-ui/core';
const topStyle = {
background: '#f50057',
textAlign: 'center',
padding: '40px 0'
}
const imgLogo = {
    width: '20px',
    height: '20px',
    marginRight: '7px'
}
export default function QuoteSelected(props) {
    const { OriginIataCode, DestinationIataCode, OriginCity, DestinationCity, CarrierImg, DestinationCarrier } = props.quoteSelected.OutboundLeg
    return <div>
        <div style={topStyle}>
                    <h2 style={{fontSize:'3rem',fontWeight:'800'}}>{DestinationCity}</h2>
                    <p style={{padding: '0'}}>{props.people ? props.people: "no people"}</p>
                    <p style={{padding: '0'}}>{props.isDirect ? 'One Way': 'Round Trip'} - {props.cabinCass ? props.cabinCass: "the class"}</p>

        </div>
        
        <div style={{padding: '10px', maxWidth: '450px', margin: 'auto'}}>
            <div>
                 {/* first column - outbound and date */}
                <div style={{ color:'black', padding: '10px'}}>
                    <span style={{fontWeight: '800'}}>Outbound: </span>
                    <span>{moment(props.quoteSelected.OutboundLeg.Date).format("dddd,Do MMMM  YYYY")}</span>

                </div>
                
                <Paper elevation={3} className="paper" >
                <div className="paper-inner-cont">
                    <div className="carrier">
                        <img src={CarrierImg ? CarrierImg:'https://images.kiwi.com/airlines/64/OK.png'} style={imgLogo} />
                        <div>{DestinationCarrier}</div>
                    
                    </div>
                </div>
                 {/* Same card as before */}
                <div className="outbound-cont" style={{padding: '20px'}}>
                    <div className="outbound-inner">
                        <div className="hr">{moment(props.quoteSelected.OutboundLeg.departureTimestamp).format('hh:mm')}</div>
                        <div className="flight-time">{props.quoteSelected.OutboundLeg.flightDuration} h</div>
                        <div className="hr">{moment(props.quoteSelected.OutboundLeg.ArrivalTimestamp).format('hh:mm')}</div>
                    </div>
                    <div className="outbound-inner"> <div className="line"></div><i class="fa fa-fighter-jet" aria-hidden="true" style={{marginLeft:'5px'}}></i></div>
                    <div className="outbound-inner">
                        <div className="city">{OriginIataCode ? OriginIataCode : OriginCity.slice(0,3)}</div> <div className="city">{DestinationIataCode ? DestinationIataCode : DestinationCity.slice(0,3)}</div>
                    </div>
                    <div className="outbound-inner direct">Direct</div>
                </div>
                
                </Paper>
                {props.isDirect ? <div></div>:
                <div>
                     {/* first column - outbound and date */}
                    <div style={{ color:'black'}}><span style={{fontWeight: '800', color:'rgba(0,0,0,0,8)'}}>Inbound: </span><span>{moment(props.quoteSelected.InboundLeg.Date).format("dddd,Do MMMM  YYYY")}</span></div>
                    <Paper elevation={3} className="paper" >
                    <div className="paper-inner-cont">
                    <div className="carrier">
                        <img src={props.quoteSelected.InboundLeg.CarrierImg ? props.quoteSelected.InboundLeg.CarrierImg:'https://images.kiwi.com/airlines/64/OK.png'} style={imgLogo} />
                        <div>{props.quoteSelected.InboundLeg.DestinationCarrier}</div>
                    
                        </div>
                    </div>
                    <div className="outbound-cont" style={{padding: '20px'}}>
                        <div className="outbound-inner">    
                            <div className="hr">{moment(props.quoteSelected.InboundLeg.departureTimestamp).format('hh:mm')}</div>
                            <div className="flight-time">{props.quoteSelected.InboundLeg.flightDuration} h</div>
                            <div className="hr">{moment(props.quoteSelected.InboundLeg.ArrivalTimestamp).format('hh:mm')}</div>
                        </div>
                        <div className="outbound-inner"> <div className="line"></div><i class="fa fa-fighter-jet" aria-hidden="true" style={{marginLeft:'5px'}}></i></div>
                        <div className="outbound-inner">
                        <div className="city">{props.quoteSelected.InboundLeg.OriginIataCode ? props.quoteSelected.InboundLeg.OriginIataCode : props.quoteSelected.InboundLeg.OriginCity.slice(0,3)}</div> 
                        <div className="city">{props.quoteSelected.InboundLeg.DestinationIataCode ? props.quoteSelected.InboundLeg.DestinationIataCode : props.quoteSelected.InboundLeg.DestinationCity.slice(0,3)}</div>
                        </div>
                        <div className="outbound-inner direct">Direct</div>
                    </div>
                    </Paper>
                </div>
                
                }
            </div>
     
        </div>
        <Button variant="outlined" color="secondary" onClick={(e)=>{props.changeSection(e,'allResultsSection');}}>Back to Results</Button>
        <Button variant="outlined" color="primary" onClick={()=>{alert("direct to booking")}}>Select</Button>
    </div>
}