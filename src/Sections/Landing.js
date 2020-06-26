import React from 'react'
import './Landing.css';
import MyInput from '../Components/Input';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import Results from './Results';
import DropdownTravellers from '../Components/DropdownTravellers';
import FormControl from '@material-ui/core/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormLabel from '@material-ui/core/FormLabel';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import { getQuotes, testGetQuotes, airportsCitiesAutofill } from '../fetches';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import { Alert } from '@material-ui/lab';
import Loader from 'react-loader-spinner';
import { compareRoundTrip, compareBest, logTruthiness, validateDirectTrip, validateRoundTrip } from '../myScripts';
import {data2} from '../dummyData';

//https://stackoverflow.com/questions/47865256/modifying-width-of-input-field-in-react-day-picker-input
const dayPickerStyle ={ style: { height: '40px', boxSizing: 'border-box', width: '100%', border: '1px solid #ced4da', borderRadius: '.25rem'} }
const test = {
    height: "40px",
    width: '200px',
}
class Landing extends React.Component {
    state = {
        originVal: "",
        originDay: undefined,
        destinationVal: "",
        destinationDay: undefined,
        people: "",
        isDirect: false,
        searchResults: [],
        overlayVisible: false,
        listToRender: '',
        autoSuggestVisible: false,
        enableSearch: false,
        loading: false,
        quotes: [],
        filteredQuotes: [],
        quoteSelected: undefined,
        cheapest: 0,
        best: 0,
        fastest:0,
        errors: {
            areErrors: false,
            errorType: "",
            errorsMsgs: []
        },
        sortBy: 'cheapest',
        filterBy: '',
        activeSection: "searchSection", //searchSection || allResultsSection ||
        dropdownOpen: false,
        screenWidth: 0,
        cabinClass: ""
    }
    componentDidMount() {
        this.setState({screenWidth: window.visualViewport.width});
        window.addEventListener('resize',()=>{this.setState({screenWidth: window.visualViewport.width})})
        // this.handleSubmission()
    }

    handleClickFill = (e)=>{
        console.log(e.target)
        let newVal = e.target.innerHTML;
        if(e.target.localName === 'li') {
            newVal = e.target.childNodes[1].innerHTML
            console.log("boom", e.target.childNodes[1].innerHTML)
        }
        let inputToFill = this.state.listToRender === 'origin' ? 'originVal': 'destinationVal';
        console.log("inputToFill",inputToFill)
        this.setState({[inputToFill]: newVal, autoSuggestVisible: false});
    }
    handleDayChange = (day, inputSrc)=> {
        if(inputSrc === 'origin') {
            this.setState({
                originDay: day
            })
        }
        if(inputSrc === 'destination') {
            this.setState({
                destinationDay: day
            })
        }
        
    }
    handleDestinationDayChange = (day)=>{
        this.setState({ destinationDay: day});
    }

    filter = (inputSrc, userInput)=>{
        let results = [];
        let input = inputSrc === 'origin' ? 'originVal':'destinationVal';

        // If no text just render empty array and set value of input source, no need to loop
        if(userInput === "") {
            return this.setState({searchResults: [],[input]: userInput})
        }
        this.setState({[input]: userInput,listToRender: inputSrc})

        airportsCitiesAutofill(userInput)
        .then((filterCities)=>{
            filterCities.forEach((o)=>{
                results.push(`${o.city}, ${o.country}`)
            })


            // set the right val
            //get search results
            //render right list
            //autosuggestvisible to hide list after selection
            this.setState({searchResults: results,  autoSuggestVisible: true},()=>{this.generateHtmlList()})
        })

    }
    validateInputs = ()=> {
        // console.clear();
        //this will disable button and do constant checks
        const {originVal, destinationVal, originDay, destinationDay, isDirect, people} = this.state
        // console.log("originVal test:", logTruthiness(originVal))
        // console.log("originDay test:", logTruthiness(originDay))
        // console.log("destinationVal test:", logTruthiness(destinationVal))
        // console.log("destinationDay test:", logTruthiness(destinationDay))
        // console.log("people test:", logTruthiness(people))

        //enable button when no errors : direct
        if(isDirect && originVal && destinationVal && originDay && people){
            return this.setState({enableSearch: true});
        }
        if(!isDirect && originVal && destinationVal && originDay && destinationDay && people) {
            return this.setState({enableSearch: true});
        }
        this.setState({searchResults: []})
    }
    handleSubmission = ()=> {
        const {originVal,destinationVal, originDay, destinationDay, isDirect} = this.state;
        this.setState({loading: true})
            // getQuotes("madrid", "paris", moment("Mon Jun 22 2020 12:00:00 GMT+0100 (Irish Standard Time)").unix(), this.state.isDirect, moment("Mon Jun 22 2020 15:00:00 GMT+0100 (Irish Standard Time)").unix())
            getQuotes(originVal, destinationVal, originDay, isDirect,  destinationDay)
            .then((r)=>{
                console.log(r)
                if(r.error) {
                //query error
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        errors: {
                            ...prevState.errors,
                            areErrors: true,
                            errorType: "fetch data error",
                            errorsMsgs: [...prevState.errors.errorsMsgs]
                        }
                    }
                })
                return;
                }
                //success
                this.setState({quotes: r, activeSection: 'allResultsSection'},()=>{this.getTotalPrices()})    
            })
            //catch error
            .catch((e)=>{
            console.log(e)
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    errors: {
                        ...prevState.errors,
                        loading: false,
                        areErrors: true,
                        errorType: e,
                        errorsMsgs: [...prevState.errors.errorsMsgs]
                    }
                }
            })
            })
    }
    generateHtmlList = ()=>{
        //just generates html based on search results, nothing else
        if(this.state.searchResults.length === 0) {
            return <ul className={`list ${this.state.autoSuggestVisible ? 'donthide':'hide'}`}></ul>
        }
        else if(this.state.searchResults.length > 0) {
            let listItemCountries;
           if(this.state.searchResults.length >= 5) {
            listItemCountries = this.state.searchResults.slice(0,5).map((city,i)=>{
                return <li key={i}><AirplanemodeActiveIcon style={{fontSize: '10px'}}/><span onClick={this.handleClickFill}>{city}</span></li>
            })
           }
           else {
            listItemCountries = this.state.searchResults.map((city,i)=>{
                return <li onClick={this.handleClickFill} key={i}><AirplanemodeActiveIcon /><span onClick={this.handleClickFill}>{city}</span></li>
            })
           }
            return <ul className={`list ${this.state.autoSuggestVisible ? 'donthide':'hide'}`}>{listItemCountries}</ul>
        }
        return <ul className={`list ${this.state.autoSuggestVisible ? 'donthide':'hide'}`}><li>uno</li><li>uno</li><li>uno</li></ul>
    }
    changeSection = (e, section)=>{
        console.log(e.target)
        this.setState({activeSection: section})
        if(e.target.innerHTML === "Back to Results") {
            this.setState({quoteSelected: undefined})
        }
        if(e.target.innerHTML === "New Search") {
            console.log("si")
            this.setState({quotes: [], filteredQuotes:[]})
        }
        
    }
    handleRadioBox = (val) =>{
        console.log("e",val);
        
        if(val === "One Way"){ 
            this.setState({isDirect: true})
         } 
         else {
            this.setState({isDirect: false})
         }
    }
    handlePeopleAndClass = (ppl, cabinClass) =>{
        this.setState({people : ppl, cabinClass: cabinClass},()=>{this.validateInputs()})
    }
    handleQuoteSelected = (e)=>{
        let id = e.target.id;
       if(e.target.localName === "span"){
        id = e.target.parentNode.id;
       }
       if(e.target.localName === "i"){
        id = e.target.parentNode.parentNode.id;
       }
        const filterSelectedQuote = this.state.quotes.filter((o)=>{
            return o.QuoteId == id;
        })
        if(filterSelectedQuote.length > 0) {
            this.setState({quoteSelected: filterSelectedQuote[0]})
        } 
    }
    handleDatechange = (e)=>{
        console.clear();
        let elId = e.target.id;
        console.log(elId);
        
        if(e.target.localName === 'path'){
            elId = e.target.parentNode.id;
            console.log(elId)
        } else {
            console.log(elId)
        }

        switch(elId){
            case 'origin-increment': 
            this.setState(prevState =>{
                return{
                     ...prevState, originDay: moment(prevState.originDay).add(1, 'days')._d
                }
             }, this.handleSubmission())  
            break;
            case 'origin-decrement':
                this.setState(prevState =>{
                    return{
                         ...prevState, originDay: moment(prevState.originDay).subtract(1, 'days')._d
                    }
                 }, this.handleSubmission())  
            break;
            case 'dest-increment': 
                this.setState(prevState =>{
                    return{
                        ...prevState, destinationDay: moment(prevState.destinationDay).add(1, 'days')._d
                    }
                }, this.handleSubmission())  
            break;
            case 'dest-decrement': 
            this.setState(prevState =>{
                return{
                    ...prevState, destinationDay: moment(prevState.destinationDay).subtract(1, 'days')._d
                }
            }, this.handleSubmission())
            break;
            default: console.log("didnt catch");
            
        }
    }

       //filter/sort quotes
    getTotalPrices = ()=>{
        //add totalprices to quotes
        let addPrices = this.state.quotes.map((o,i)=>{
            //total price
            let sum;
            if(o.Direct) {
                sum =Number(o.OutboundLeg.price)
            }else {
                sum = Number(o.OutboundLeg.price) + Number(o.InboundLeg.price);
            }
            return {...o, totalPrice: sum.toFixed()};
        })
        //add cheapeast,best to root state
        let cheapest = 1000;
        let best =0;
        let fastest =0;
        addPrices.map((o,i)=>{
            let tp = Number(o.totalPrice)
            //cheapest
            if(tp < cheapest ){cheapest = tp}
            //best
            best = addPrices[addPrices.length-1].totalPrice
            //fastest
            fastest = addPrices[addPrices.length-1].totalPrice
        })
        
        this.setState({quotes: addPrices, cheapest, best, fastest},()=>{this.sortFilterQuotes()})
    }
    sortFilterQuotes = (sortBy = 'cheapest', filterBy)=>{
        this.setState({loading: true});
        console.log("sortBy", sortBy);
        let copyQuotes = [...this.state.quotes];

        if(sortBy === 'cheapest') {
            const sortem = copyQuotes.sort(compareRoundTrip);
            this.setState({filteredQuotes: sortem, sortBy, loading: false});
        }
        if(sortBy === 'best' || sortBy === 'fastest') {
            const sortem = copyQuotes.sort(compareBest);
            this.setState({filteredQuotes: sortem, sortBy, loading: false});
        } 

    }
    toggle = ()=>{
        this.setState({dropdownOpen: !this.state.dropdownOpen})
    }
    handleOrgDestSwitch = ()=>{
        this.setState((prevState)=>{
            return {
                ...prevState,
                originVal:  prevState.destinationVal,
                destinationVal:  prevState.originVal,
            }
        })
    }
       
    render() {
        const { originVal, originDay, destinationVal, destinationDay, isDirect, errors, activeSection } = this.state;
        const quotes = this.state.filteredQuotes.length === 0 ? this.state.quotes : this.state.filteredQuotes;
      
        return (
<div className="landing" onClick={this.validateInputs}>
    {/* Render this div when errors are true , render results when errors are false*/}
    <div class={`${activeSection === 'searchSection' ? '':'hide'}`}>
        {/* Invaluid Data */}
        {errors.areErrors ? <Alert severity="error">{errors.errorType}</Alert>:<div></div>}
        {/* {this.state.errors.errorsList.length > 0 ? <Alert severity="error">{this.state.errors.errorsList[0]}</Alert>:<div></div>} */}
        <div className="main-card">
            <Card style={{padding: '20px', overflow: 'visible', backgroundColor: '#f50057'}} >
            {/* Its own column */}
            <div className="radio-cont" style={{color:'#fff'}}>
                    <FormGroup check style={{paddingRight: '10px'}}>
                    <Label check>
                        <Input type="radio" name="radio1" value="Return"  onChange={this.handleRadioBox}/>{' '}
                        Return
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1"  value="One Way" onChange={()=>{this.handleRadioBox('One Way')}}/>{' '}
                        One Way
                    </Label>
                    </FormGroup>
            </div>
            {/* FUll screen all on the same row */}
            {/* Small screen stacked except dates */}
            <div className="inputs-cont">
                {/* Origin - arrow - dest */}
                <div className="input-cont">  
                    <div className="org-dest">
                        <div className="list-cont">
                            <MyInput filter={this.filter} val={this.state.originVal} onFocus={this.onFocus} inputSource={"origin"} style={{backgroundColor: 'white'}}/>
                            {/* below is the autcomplete */}
                            {this.state.listToRender === 'origin'? <div>{this.generateHtmlList()}</div>:<div></div>}
                        </div>
                        <SyncAltIcon  style={{color:'#fff'}} onClick={this.handleOrgDestSwitch}/>
                        <div className="list-cont">
                            <MyInput filter={this.filter} val={this.state.destinationVal} onFocus={this.onFocus} inputSource={"destination"}/>
                            {/* below is the autcomplete */}
                            {this.state.listToRender === 'destination'? <div>{this.generateHtmlList()}</div>:<div></div>}
                        </div>  
                    </div>
                </div>
                <div className="input-cont">
                    <div className="dates" style={{}}>
                    {/* Depature date */}
                    <DayPickerInput 
                        inputProps={dayPickerStyle} 
                        onDayChange={(day)=>{this.handleDayChange(day, 'origin')}} 
                        dayPickerProps={{modifiers: {disabled: [{before: new Date()}]}}}/>
                    {/* Return date */}
                    {isDirect ?<div style={{width: '0'}}></div>:
                    <DayPickerInput  
                    inputProps={dayPickerStyle}
                    onDayChange={(day)=>{this.handleDayChange(day, 'destination')}}
                    dayPickerProps={{modifiers: {disabled: [{before: this.state.originDay}]}}}/>
                    }
                    </div>
                </div>
                <div className="input-cont"> 
                    {/* People */}
                    <DropdownTravellers  dropdownOpen={this.state.dropdownOpen} toggle={this.toggle} handlePeopleAndClass={this.handlePeopleAndClass} screenWidth={this.state.screenWidth}/>
                </div>
        </div>
        {/* Search button has its own row */}
        <div style={{margin: '20px 0', display: 'flex'}}>
                    <Button variant="contained" color="primary" onClick={this.handleSubmission} disabled={!this.state.enableSearch} style={this.state.screenWidth > 500 ? {marginLeft: 'auto'}:{margin: 'auto'}}>
                            Search
                    </Button>
                    {/* <Button variant="contained" color="secondary" onClick={this.handleSubmission}  disabled={true}>
                            static test
                    </Button> */}
        </div>
        </Card>
        </div>   
        </div>
        <Results 
            origin={originVal}
            oDay={originDay}
            destination={destinationVal}
            dDay={destinationDay}
            isDirect={isDirect}
            quotes={quotes}
            changeSection={this.changeSection}
            activeSection={this.state.activeSection}
            handleDatechange={this.handleDatechange}
            handleQuoteSelected={this.handleQuoteSelected}
            quoteSelected={this.state.quoteSelected}
            sortFilterQuotes={this.sortFilterQuotes}
            sortBy={this.state.sortBy}
            filterBy={this.state.filterBy}
            best={this.state.best}
            fastest={this.state.fastest}
            cheapest={this.state.cheapest}
            loading={this.state.loading}
            screenWidth={this.state.screenWidth}
            people={this.state.people}
            cabinClass={this.state.cabinClass}
        />
</div>
        )
    }
}

export default Landing;

