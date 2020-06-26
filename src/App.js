import React from 'react';
import './App.css';
import Nav from './Sections/Nav';
import Landing from './Sections/Landing';
import { getData } from './fetches';


class App extends React.Component {
  state ={
    data:[]
  }

componentDidMount() {
  getData().then((res)=>{
    this.setState({data: res})
  })
}
  render() {
    return (
      <div className="App">
        <Nav></Nav>
        <Landing data={this.state.data}/>
      </div>
    );
  }
  
}

export default App;
