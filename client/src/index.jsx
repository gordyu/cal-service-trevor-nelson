import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';
import { CSSTransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import Reservations from './components/Reservations.jsx';
import ReservationConfirm from './components/ReservationConfirm.jsx';

const Container = styled.div.attrs({
  className: 'container'
})`

margin:auto;
max-width: 1110px;
z-index: -1;
`

const CalContainer = styled.div.attrs({
  className: 'calcontainer'
})`

margin: 400px;
max-width: 700px;
`

const H2= styled.h2`
  margin-top: 0;
`

const Styles=styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  width: 100%; 
  font-color: #484848;
  background-color: rgb(255, 255, 255); 
  padding-top: 30px;
  padding-bottom: 30px;
`

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unfiltered: {},
      lastUnfiltered: {},
      hotelRooms: { rooms: [] },
      startDate: '2019-05-28',
      endDate: '2019-05-30',
      startPoint: 0,
      endPoint: 0,
      currentRoom: {},
      numberOfBeds: 0,
      averagePrice: 0,
      selectedRooms: {},
      total: 0,
      startCal: false,
      endCal: false,
    }
    let startHolder = this.state.startDate;
    let endHolder = this.state.endDate;
    // this.setCurrentRoom = this.setCurrentRoom.bind(this);
    // this.updateTotal = this.updateTotal.bind(this);
    // this.turnOff = this.turnOff.bind(this);
    // this.toggleCalendars = this.toggleCalendars.bind(this);
    // this.setStartDate = this.setStartDate.bind(this);
    // this.setEndDate = this.setEndDate.bind(this);
    this.submitDates = this.submitDates.bind(this);
  }

  componentDidMount() {
    this.initializeRoom()
  }

  initializeRoom() {

  }

  turnOff(event) {
    if (!event.target.className.includes("nullClick")) {
        this.setState({
            startCal: false,
            endCal: false,
        })
    }
  }

  toggleCalendars(event) {
      event.preventDefault();
      if (this.state.startCal && event.target.id !== startCal) {
          this.setState({ startCal: false })
      }
      if (this.state.endCal && event.target.id !== endCal) {
          this.setState({ endCal: false })
      }
      this.setState({[event.target.id]: !this.state[event.target.id]})
  }

  setStartDate(year, month, day) {
      this.startHolder = year + '-' + month + '-' + day;
  }

  setEndDate(year, month, day) {
      this.endHolder =  year + '-' + month + '-' + day;
  }

  submitDates() {
    if(this.startHolder !== 0 && this.endHolder !== 0 && this.startHolder < this.endHolder) {
      this.setState({
        startDate: this.startHolder,
        endDate: this.endHolder,
        selectedRooms: [],
        total: 0,
      })
      this.initializeRoom();
    }
  }
  render() {
    return (
      <Styles onClick={this.turnOff}>
        
        <Container>
        <Reservations>
        </Reservations>
        <CalContainer>
          <Calendar>
          </Calendar>
        </CalContainer>
        <ReservationConfirm>
        </ReservationConfirm>
        </Container>
      </Styles>
    )
  }
}

ReactDOM.render(<Booking />, document.getElementById('booking'));
