import React from 'react';
import { ResultCard } from '../Components/ResultCard';
import Loader from 'react-loader-spinner'
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import SearchIcon from '@material-ui/icons/Search';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './Results.css';


export default function Results(props) {

    const { quotes, loading, origin, destination, people, oDay, dDay, isDirect, handleDatechange, handleQuoteSelected, quoteSelected, sortFilterQuotes, sortBy, activeSection, filterBy, cheapest, best, fastest } = props;
    const paperStyle = {height: '100px', width: '100%'}
    return (
            
<div>
         <div className={`${activeSection !== 'allResultsSection' ? 'hide':''}`}>
         {quotes.length === 0 ? <div>no results</div>:<div></div>} 
         {/* Whole black Card Section */}
         <div className={`main-card ${activeSection !== 'allResultsSection' ? 'hide':''}`}>
            <Card style={{padding: '20px', overflow: 'visible', background: '#f50057'}} >
                
                <div className="inner-card-cont">
                    {/* column */}
                    <div className="inner-card">  
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{padding: '0 10px 0 0'}}>{origin.length > 0 ? origin:"No Origin"}</span>
                            <span style={{padding: '0 10px 0 0'}}> - </span>
                            <span style={{padding: '0 10px 0 0'}}>{destination.length > 0 ? destination:"No Destination"}</span>
                            <div>
                            <SearchIcon />
                            </div>
                        </div> 
                        <div className="">1 Adult (Economy)</div>
                        <div>{isDirect ? "Direct": "Round Trip"}</div>
                    </div>
                     {/* column */}
                    <div className="inner-card"> 
                        <div className="" className="pointer">
                        <ArrowLeftIcon onClick={handleDatechange} id="origin-decrement" />{oDay ? moment(oDay).format('ll'):"Wed, 13 Aug"}<ArrowRightIcon onClick={handleDatechange} id="origin-increment" />
                        <ArrowLeftIcon onClick={handleDatechange} id="dest-decrement" />{dDay ? moment(dDay).format('ll'):"Fri, 15 Aug"}<ArrowRightIcon  onClick={handleDatechange} id="dest-increment" />
                        </div>  
                    </div>
                    
                </div>    
            </Card>
        </div>
        <div className={`results-filters ${activeSection !== 'allResultsSection' ? 'hide':''}`}>
            <div className="results-num"><Button variant="contained">{quotes.length} results</Button> </div>
            <div style={{marginLeft: 'auto'}}><Button variant="contained" color="primary" onClick={(e)=>{props.changeSection(e, 'searchSection')}}>New Search</Button> </div>
        </div>
        <div className={`results-quick-filters ${activeSection !== 'allResultsSection' ? 'hide':''}`}>
            <ButtonGroup disableElevation variant="contained" className>
                <Button 
                    style={sortBy === 'cheapest' ? {background: '#f50057', color: '#fff'}: {}}
                    onClick={()=>{sortFilterQuotes('cheapest')}}
                 ><span className="quick-filter-cont"><span>Cheapest:</span><span>${cheapest}</span></span>
                </Button>   
                <Button 
                    style={sortBy === 'best' ? {background: '#f50057', color: '#fff'}: {}}
                     onClick={()=>{sortFilterQuotes('best')}}
                ><span className="quick-filter-cont"><span>Best:</span><span>${best}</span></span>
                </Button>
                <Button 
                    style={sortBy === 'fastest' ? {background: '#f50057', color: '#fff'}: {}}
                     onClick={()=>{sortFilterQuotes('fastest')}}
                    ><span className="quick-filter-cont"><span>Fastest:</span><span>${fastest}</span></span>
                </Button>
            </ButtonGroup>
        </div>     
         </div>
         {props.loading ?<Loader
         className="loader_cont"
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={5000} //3 secs
        />:<div><ResultCard 
           quotes={quotes} 
           isDirect={isDirect} 
           handleQuoteSelected={handleQuoteSelected} 
           quoteSelected={quoteSelected} 
           changeSection={props.changeSection}
           loading={props.loading}
           people={props.people}
           cabinClass={props.cabinClass}
           /></div>}
</div>
)

}