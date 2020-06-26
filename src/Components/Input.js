import React from 'react'
import './Input.css';
import { InputGroup, Input } from 'reactstrap';
function MyInput(props) {
        let val =  props.val;

        return (
                <InputGroup>
                <Input placeholder={props.inputSource} onChange={(e)=>{props.filter(props.inputSource, e.target.value)}} value={val} className="input"/>
            </InputGroup>
        )
}

export default MyInput;