import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Td = styled.td`
  border: 1px solid #484848;
  white-space: nowrap;
  padding: .5rem;
`;

const DropDown = styled.select`
  type="text";
  position: relative;
  box-shadow: insert 0 1px 2px #484848;
  display: table;
  margin: auto;
  min-width: 100%;
  height: 30px;
  border-radius: 3px;
`;

class ReservationRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
    this.leastBedsLeft = this.leastBedsLeft.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.average = this.average.bind(this);
  }

  average() {
    let average = (this.props.room.reduce((a, b) => {
        if(!a) return b.price;
        if(!a.price) return a + b.price;
        return a.price + b.price;
    })/4).toFixed(2);
    return average;
}

leastBedsLeft(beds) {
    return beds.reduce((a, b) => {
        if(!a) return b.bedsLeft;
        if(!a.price) return a < b ? a : b.bedsLeft = a;
        return a.bedsLeft < b.bedsLeft ? a.bedsLeft : b.bedsLeft = a.bedsLeft;
    })
}

arrayOfAvailability(beds) {
    let current = 1;
    let final = [];
    while (current <= beds) {
        final.push(current)
        current += 1;
    }
    return final;
}

handleChange(e) {
    this.setState({value: e.target.value});
    this.props.set(this.props.room, e.target.value, this.average(), this.props.index)
}

render() {
    if (this.props.room.length > 0) {
    return (
        <tr>
            <Td>{this.props.room[0].maxBeds} Bed Room </Td>
            <Td>${this.average()}</Td>
            <Td>
                <DropDown onChange={this.handleChange}>
                    <option>Select</option>
                    {this.arrayOfAvailability(this.leastBedsLeft(this.props.room)).map((bed) => <option key={bed} value={bed}>{bed} bed(s)</option>)}
                </DropDown>
            </Td>
        </tr>
    )
    }
    return (null)
}
}

export default ReservationRow;