import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Td = styled.td`
  border: 1px solid #484848;
  white-space: nowrap;
  padding: .5rem;
`;

const DropDown = styled.select`
  type = "text";
  position: relative;
  box-shadow: insert 0 1px 2px #484848;
  display: table;
  margine: autl;
  min-width: 100%;
  height: 30px;
  border-radius: 3px;
`;

class GuestCount extends React.Componet {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
    this.guestNumDisplay = this.guestNumDisplay.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  minNum() {
    //get number from getrequest via listing.listing_price
  }

  guestNumDisplay(num) {
    return num.reduce((a, b) => {
      if (!a) return b.guestsLeft;
      if (!)
    })
  }




}

export default GuestCount;