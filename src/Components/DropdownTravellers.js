import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import { Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const contStyle = {
    padding: '12px',
}

export default class DropdownTravellers extends React.Component {
    state = {
        cabinDropOpen: false,
        cabinClass: "Economy",
        adults: 1,
        children: 0
    }
    cabinToggle = (e)=>{
        console.log(e.target.innerHTML)
        this.setState({cabinDropOpen: !this.state.cabinDropOpen, cabinClass: e.target.innerHTML})
    }
    handleAddedPersons = (person, crement)=>{
        let sum = crement === '+' ? 1:-1
        this.setState((prevState)=>{
            let newState = {[person]: prevState[person] + sum}
            if(newState.adults === 0) {newState.adults = 1}
            if(newState.children === -1) {newState.children = 0}
            return newState
        })
    }
    passUpPeopleAndClass = ()=>{
        let passangers = this.state.adults + this.state.children;
        let strRsult = (this.state.adults + this.state.children) === 1 ? " adult": " passangers"
        
        console.log("pass up", passangers + strRsult)
        this.props.handlePeopleAndClass(passangers + strRsult, this.state.cabinClass)
    }

    render() {
        let {adults, children, cabinClass} = this.state;
       let {screenWidth} = this.props;
        
        return(
            <div>
            <Dropdown isOpen={this.props.dropdownOpen} toggle={this.props.toggle}>
                <DropdownToggle caret style={{backgroundColor: '#fff', color: 'rgba(0,0,0,0.5)', height: '40px', width: '100%'}} >
                {adults + children > 1 ? `${adults + children} passengers (${cabinClass})`: `1 Adults (${cabinClass})` }
                </DropdownToggle>
                <DropdownMenu style={this.props.screenWidth > 800 ? {  marginLeft: '-87px', minWidth: '19rem'}:{}}>
                    <div style={contStyle}>
                        <div style={{padding: '10px 0'}}>
                            {/* Dropdown 2 */}
                            Cabin Class
                            <Dropdown isOpen={this.state.cabinDropOpen} toggle={this.cabinToggle} >
                                <DropdownToggle caret 
                                style={{backgroundColor: '#fff', color: 'rgba(0,0,0,0.5)',
                                width: '100%',textAlign: 'left',border: '1px solid #ced4da', borderRadius: '.25rem'
                                }}>
                                {this.state.cabinClass}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem >Economy</DropdownItem>
                                    <DropdownItem>Business</DropdownItem>
                                    <DropdownItem>First Class</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            {/* Dropdown 2 */}
                            
                        </div>
                        <div className="dropRow">
                            <span>Adults</span>
                            <RemoveCircleOutlineIcon style={{fontSize: 50, fontColor: 'blue'}} onClick={()=>{this.handleAddedPersons('adults','-')}}/> 
                            <span style={{textAlign: 'center', minWidth: '20px',fontSize: 30}}>{adults}</span>
                            <AddCircleIcon style={{fontSize: 50}} onClick={()=>{this.handleAddedPersons('adults','+')}}/> 
                            <span style={{paddingLeft:'10px'}}>16+ years</span>
                        </div>
                        <div className="dropRow">
                            <span>Children</span>
                            <RemoveCircleOutlineIcon style={{fontSize: 50}} onClick={()=>{this.handleAddedPersons('children','-')}}/> 
                            <span style={{textAlign: 'center', minWidth: '20px',fontSize: 30}}>{children}</span>
                            <AddCircleIcon style={{fontSize: 50}} onClick={()=>{this.handleAddedPersons('children','+')}}/> 
                            <span style={{paddingLeft:'10px'}}>0-5 years</span>
                        </div>
                    </div>
                    <DropdownItem divider/>
                    <DropdownItem onClick={this.passUpPeopleAndClass}>Done</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>
        )
    }
}