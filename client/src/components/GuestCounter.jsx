import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const Button = styled.button`
  cursor: pointer;
  background-color: #white; 
  border-color: #79CCCD; 
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: #79CCCD;
  font-color: #79CCCD;
  margin-right: 10px;
  margin-left: 10px;
  &:focus {
    border-color: #79CCCD; 
    outline: none !important;
    outline: 0 !important;
    outline-offset: 0  !important;
    background-image: none  !important;
    -webkit-box-shadow: none !important;
    box-shadow: none  !important;
  };
  align: center;
`

class GuestCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  incrementCount() {
    if(this.state.count < 10){
      this.setState(prevState => ({count: prevState.count + 1}))
    }
  }

  decrementCount() {
    if(this.state.count > 1){
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  render() {
    return (
      <div className="counter">
        <Button type="button" onClick={this.decrementCount}>-</Button>
        {this.state.count}
        <Button type="button" onClick={this.incrementCount}>+</Button>
      </div>
    );
  }
}

export default GuestCounter;