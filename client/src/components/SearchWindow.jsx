import React from 'react';
import ReactDom from 'react-dom';
import Calendar from './Calendar.jsx';
import GuestCounter from './GuestCounter.jsx';
import ReservationConfirm from './ReservationConfirm.jsx';
import styled from 'styled-components';


const StyledBody = styled.tbody`
  color: #484848;
  font-size: 9px;
  margin: 5px;
`;

const Td = styled.td`

  white-space: nowrap;
  padding: .7rem;
`;

const Th = styled.th`

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

  font-size: 9px;
  white-space: nowrap;
  padding: .7rem;
  color: #484848;
  text-align: left;

`;


const H4 = styled.h4`
  color: #484848;
  font-size: 16px;
  font-weight: bold;
  margin: 2px;
`;

const H5 = styled.h5`

  font-size: 9px;
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
  &:focus {
    border-color: #ffffff; 
    outline: none !important;
`


const InlineP = styled.p`
    font-family: 'MontrealRegular', sans-serif;
    font-size: 9px;
    display: inline-block;
    text-align: center;
    margin-left: 1%;
    margin-right: 1%;
`

const BlockP = styled.p`
    font-family: 'MontrealRegular', sans-serif;
    font-size: 9px;
    display: block;
    text-align: left;
    margin-left: 1%;
    margin-right: 1%;
`

const InlineA = styled.button`
    cursor: pointer;
    display: inline-block;
    width: 100%;
    height: 30px;
    background-color: white;
    box-shadow: inset 0 1px 2px #C4C4C4;
    border-radius: 3px;
    border: none;
    text-align: center;
    z-index: 0;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  align: center;
  margin-bottom: 10pm;
  border 1px #d3d3d3;
`

const FindDisplay = styled.div`
    margin: .7rem;
    display: inline-block;
    width:25%
`

const Container = styled.div`
    display: inline-block;
    width: 50%;
    position:relative;
    border: 1px solid #d3d3d3;
    border-radius: 0px;
    margin-top: 15px;
    margin-bottom: 15px;
`

const DropDown = styled.div`
    font-family: 'MontrealRegular', sans-serif;
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 0;
`


class SearchWindow extends React.Component {
  constructor(props) {
      super(props);
      this.parseDate = this.parseDate.bind(this);
      this.clickHandler = this.clickHandler.bind(this);
  }

  parseDate(input) {
    const yearMonthDay = input.split('-');
    let date = new Date(yearMonthDay[0], yearMonthDay[1], yearMonthDay[2])

    return date.toDateString()
    }

  clickHandler(event) {
    event.preventDefault();
    this.props.toggler(event)
  }

  render() {
    let displayStart = this.props.startHolder || this.props.startDate
    return (
      <Container>
        <StyledTable>
        <thead>
            <Th>
              <ListingHeader><H4>$234</H4><StyledBody> per night</StyledBody>
              </ListingHeader>
            </Th>
          </thead>
<tr>
<NormalHeader>
  <H5>Dates</H5>
          <FindDisplay>
            <DropDown>
              <InlineA id="startCal" className="nullClick" onClick={this.clickHandler}>{this.parseDate(displayStart)}</InlineA>
              { this.props.startCal ?
                <Calendar startDate={this.props.startDate}
                  date={this.props.startDate}
                  setStartDate={this.props.setStartDate}
                  bookedDates={this.props.bookedDates}
                id="Calendar"/>
              : null }
            </DropDown> 
          </FindDisplay>
        <InlineP> > </InlineP>
          <FindDisplay>
            <DropDown>
              <InlineA id="endCal" className="nullClick" onClick={this.clickHandler}>{this.parseDate(this.props.endDate)}</InlineA>
              { this.props.endCal ?
                <Calendar
                  endDate={this.props.endDate}
                  date={this.props.endDate}
                  setEndDate={this.props.setEndDate}
                  startHolder={this.props.startHolder}
                  bookedDates={this.props.bookedDates}
                id="Calendar2"/>
                : null }
            </DropDown> 
          </FindDisplay>
</NormalHeader>

</tr>
<tr>
  <NormalHeader>
    <H5>Guests</H5>
            <FindDisplay>
                  <GuestCounter>
                  </GuestCounter>
              </FindDisplay>
  </NormalHeader>

  </tr>
  <tr>
  <NormalHeader>
    <ReservationConfirm>
    </ReservationConfirm>
  <center>
    <BookButton>Book</BookButton>
  </center>
  <br></br>
  <center><StyledBody>You won't be charged yet</StyledBody></center>
  </NormalHeader>
  </tr>
  <br></br>
  </StyledTable>
          </Container>



      )
    }
}  

export default SearchWindow;