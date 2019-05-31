import React from 'react';
import ReactDOM from 'react-dom';
import ReservationRow from './ReservationRow.jsx';
import styled from 'styled-components';

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
  }

  render() {
    return (
      <div>
        <StyledTable>
          <thead>
            <Th>
              <ListingHeader><H4>$234<StyledBody> per night</StyledBody></H4>
              </ListingHeader>
            </Th>
          </thead>
          <tr>
            <NormalHeader><H5>Dates</H5></NormalHeader>
            <br></br>
            <br></br>
            <br></br>
          </tr>
          <tr>
            <NormalHeader><H5>Guests</H5></NormalHeader>
            <br></br>
            <br></br>
            <br></br>
          </tr>
          <tr>
          <NormalHeader>
            <br></br>
            <center>
              <BookButton>Book</BookButton>
            </center>
          <br></br>
          <center>You won't be charged yet</center>
          </NormalHeader>
          </tr>
          <br></br>
          <StyledBody><center>Report this listing</center>
          </StyledBody>
        </StyledTable>
      </div>
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