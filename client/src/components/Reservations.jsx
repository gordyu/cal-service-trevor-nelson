import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar.jsx';
import SearchWindow from './SearchWindow.jsx';
import styled from 'styled-components';


// const DropDown = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `

const Container = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
`
// const InlineA = styled.button`
//     cursor: pointer;
//     display: inline-block;
//     width: 100%;
//     height: 30px;
//     background-color: white;
//     box-shadow: inset 0 1px 2px #C4C4C4;
//     border-radius: 3px;
//     border: none;
//     text-align: center;
//     z-index: 2;
// `

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 30%;
  align: left;
  margin-bottom: 10pm;
  border 1px #d3d3d3;
`;

const StyledBody = styled.tbody`
  color: #484848;
  font-size: 9px;
  margin: 5px;
`;

const Td = styled.td`
  border: 1px solid #d3d3d3;
  white-space: nowrap;
  padding: .7rem;
`;

const Th = styled.th`
  border: 1px solid #d3d3d3;
  white-space: nowrap;
  padding: .7rem;
`;

const Tr = styled.tr`
  font-size: 12px;
  vertical-align: bottom;
  padding: .7rem;
`;

const ListingHeader = styled.th`
  white-space: nowrap;
  padding: .7rem;
  text-align: left;
`;

const NormalHeader = styled.th`
  border: 1px solid #d3d3d3;
  font-size: 9px;
  white-space: nowrap;
  padding: .7rem;
  color: #484848;
  text-align: left;

`;

const LargeHeader = styled.th`
  border: 1px solid #d3d3d3;
  white-space: nowrap;
  padding: .7rem;
  min-width: 150px;
`;

const H4 = styled.h4`
  color: #484848;
  font-size: 16px;
  font-weight: bold;
  margin: 2px;
`;

const H5 = styled.h5`
  color: #484848;
  font-size: 9px;
  font-weight: bold;
  margin: .7rem;
`;

const BookButton = styled.button`
  cursor: pointer;
  background-color: #ff5a5f; 
  border-color: #130269; 
  border: none;
  border-radius: 3px;
  width: 80%;
  height: 30px;
  color: white;
  font-weight: bold;
  margin-left: 0%;
  align: center;
`


class Reservations extends React.Component {
  constructor(props) {
    super(props);
    this.parseDate = this.parseDate.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  parseDate(input) {
    const yearMonthDay = '2019-01-05'.split('-');
    let date = new Date(yearMonthDay[0], yearMonthDay[1], yearMonthDay[2]);

    return date.toDateString();
  }

  clickHandler(event) {
    event.preventDefault();
    this.props.toggler(event);
  }

  render() {
    // let displayStart = this.props.startDate;
    return (
      <Container>
      </Container>
    )
  }
}

export default Reservations;

//styledbody
// {this.props.rooms.map((room, index) => {
//   let hasRoom = true;
//   room.room.forEach(date => {if (date.bedsLeft === 0) hasRoom = false;})
//   if (hasRoom) return <ReservationRow key={index} room={room.room} index={index}
//   set={this.props.set}/>
// })}

// in const Tr  color: rgb(211, 211, 211);