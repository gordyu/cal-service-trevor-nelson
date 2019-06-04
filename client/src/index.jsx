import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import SearchWindow from './components/SearchWindow.jsx';
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
  font-family: 'MontrealRegular', sans-serif;
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
      bookedDates: [],
      startDate: '2019-05-3',
      endDate: '2019-05-5',
      startPoint: 0,
      endPoint: 0,
      currentReservation: {},
      numberOfGuests: 0,
      averagePrice: 0,
      selectedDates: [],
      total: 0,
      startCal: false,
      endCal: false,
    }
    let startHolder = this.state.startDate;
    let endHolder = this.state.endDate;
    this.setCurrentReservation = this.setCurrentReservation.bind(this);
    // this.updateTotal = this.updateTotal.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.toggleCalendars = this.toggleCalendars.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.submitDates = this.submitDates.bind(this);
  }

  componentDidMount() {
    this.initializeListing()
  }

//response is the object coming in (see slack object)
//getting listing object at id 1
//turning into json object and cloning to send to rest of components

//clone.reservations is an array of booking objects with length of 10
  //{id: id, booking_end: isodate, booking_start: isodate, listing_id: id, booking record: 1}
  //each listing has 10 bookings (10 start dates, 10 end dates)
//

initializeListing() {
    fetch(`/api/listings/1/reservations`)
    .then(response => response.json())
    .then(response => {
      console.log(JSON.stringify(response))
      let clone = JSON.parse(JSON.stringify(response));
      // let stringifiedClone = (JSON.stringify(response));
      console.log(clone.reservations)
      var dateRange = this.getDaysInBetween(clone.reservations);
      console.log('EXAMPLE BOOKED TUPLE ' + dateRange);
      console.log(typeof dateRange);
      console.log(dateRange.length)
      this.setState({ bookedDates: dateRange })
    })
}


  getDaysInBetween(reservationsArr) {
    // var outputArr = [];
    let tuple = [];
    console.log('before millisecond conversion ' + reservationsArr[1].booking_start + 3)
    var starts = this.parseDate(reservationsArr[1].booking_start.split('T')[0]);
    var ends = this.parseDate(reservationsArr[1].booking_end.split('T')[0])
    var days = 1000 * 60 * 60 * 24 * reservationsArr[1].booking_duration;
    console.log('days after start in milliseconds is ' + days);
    tuple.push(starts);
    tuple.push(ends);
    console.log('TUPLES IN MILLISECONDS ' + tuple);
    return tuple;
  }


  parseDate(string) {
    let date = string.split('-');
    let year = date[0];
    let month = date[1];
    let day = date[2];
    console.log('dates before parseDate function are ' + year, month, day)
    return new Date(year, month, day).getTime();
  }


  //set current booking selections
  setCurrentReservation(room, guests, avg, index) {
    this.setState({
      currentReservation: room,
      numberOfGuests: guests,
      averagePrice: avg
    })
    let days = this.state.selectedDates;
    //days is an array that has  every string date
      //['2019-01-06', '2019-02-06', '2019-03-06', '2019-04-06']
    //count length as number to multiply by listing_price to get totalPrice
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
      console.log('endHolder is ' + this.endHolder)
  }

  submitDates() {
    if(this.startHolder !== 0 && this.endHolder !== 0 && this.startHolder < this.endHolder) {
      this.setState({
        startDate: this.startHolder,
        endDate: this.endHolder,
        selectedDates: [],
        total: 0,
      })
      this.initializeListing();
    }
  }


  render(){
    return (
        <Styles onClick={this.turnOff}>
            <Container>


            <SearchWindow startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    startCal={this.state.startCal}
                    endCal={this.state.endCal}
                    toggler={this.toggleCalendars}
                    setStartDate={this.setStartDate}
                    setEndDate={this.setEndDate}
                    submitDates={this.submitDates}
                    startHolder={this.startHolder}
                    bookedDates={this.state.bookedDates}
                    />
            <ReservationConfirm
                    guests={this.state.numberOfGuests}
                    average={this.state.averagePrice}
                    selected={this.state.selectedDates}
                    total={this.state.toal}/>
            </Container>
        </Styles>
    )
}
}

ReactDOM.render(<Booking />, document.getElementById('booking'));