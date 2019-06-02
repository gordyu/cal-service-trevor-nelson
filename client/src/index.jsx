import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import SearchWindow from './components/SearchWindow.jsx';
import ReservationConfirm from './components/ReservationConfirm.jsx';
import Reservations from './components/Reservations.jsx';

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
      bookedDates: { reservations: [] },
      // lastUnfiltered: {},
      // hotelRooms: { rooms: [] },
      startDate: '2019-06-3',
      endDate: '2019-06-5',
      startPoint: 0,
      endPoint: 0,
      currentReservation: {},
      numberOfGuests: 0,
      averagePrice: 0,
      selectedDates: [],
      total: 0,
      startCal: false,
      endCal: false,
      maxGuests: 0,
    }
    let startHolder = this.state.startDate;
    let endHolder = this.state.endDate;
    this.setCurrentReservation = this.setCurrentReservation.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.toggleCalendars = this.toggleCalendars.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.submitDates = this.submitDates.bind(this);
  }

  componentDidMount() {
    this.initializeListing()
  }

  initializeListing() {
    if (window.location.pathname === '/') {
      fetch(`/api/listings/1/reservations`)
      .then(response => response.json())
      .then(response => {
        console.log('RESPONSE IS ' + response)
        let clone = JSON.parse(JSON.stringify(response));
        // this.filterByDate(response);
        console.log('clone is *** ' + clone);
        console.log('clone.reservations is ' + clone.reservations)
        console.log(clone.reservations.length)
        console.log('clone.reservations/booking_start of the first listing is ' + clone.reservations[1].booking_start);
        var dateStrings = this.getStringBookedDates(clone.reservations);
        console.log('dates as strings is ' + dateStrings)
        // this.setState({ bookedDates: dateStrings });
        this.setState({ bookedDates: clone });


      })
    } else {
      console.log('listing not found could not return');
    }
    // } else {
    //   let path = window.location.pathname;
    //   fetch(`/api/listings${path}reservations`)
    //   .then(response => response.json())
    //   .then(response => {
    //     let clone = JSON.parse(JSON.stringify(response));
    //     this.setState({unfiltered: clone});
    //     this.filterByDate(response);
    //   })
    // }
  }

  // if (window.location.pathname === '/') {
  //   fetch(`/api/listings/1/reservations`)
  //   .then(response => response.json())
  //   .then(response => {
  //     let clone = JSON.parse(JSON.stringify(response));
  //     // this.filterByDate(response);
  //     console.log(clone.reservations)
  //     console.log(clone.reservations.length)
  //     console.log(clone.reservations[1].booking_start);
  //     var dateStrings = this.getStringBookedDates(clone.reservations);
  //     console.log(dateStrings)
  //     this.setState({ bookedDates: dateStrings });

  //   })
  // } else {
  //   console.log('listing not found could not return');
  // }

  getStringBookedDates(reservationsArr) {
    var outputArr = [];
    for (var i = 0; i < reservationsArr.length; i++) {
      let tuple = [];
      var starts = this.parseDate(reservationsArr[i].booking_start.split('T')[0]);
      var ends = this.parseDate(reservationsArr[i].booking_end.split('T')[0]);
      console.log('start date: ' + starts)
      console.log('end date: ' + ends)
      var betweenRange = ends - starts;
      tuple.push(starts);
      tuple.push(ends);
      console.log('range between end - start ' + betweenRange)
      tuple.push(betweenRange);
      outputArr.push(tuple)
    }
    console.log('PARSED DATES ARRAY IS ' + outputArr)
    return outputArr;
  }

  //puts dates into JS dates by using new Date() with string date as input
  // filterByDate(rawData) {
  //   const startDateList = rawData.reservations[0].booking_start;
  //   const endDateList = rawData.reservations[0].booking_end;
  //   startDateList.forEach((data, index) => {
  //     const date = data.date.split('T')[0];
  //     if(this.parseDate(date) === this.parseDate
  //     (this.state.startDate)) {
  //       this.setState({ startPoint: index});
  //     } else if (this.parse(date) === this.parseDate
  //     (this.state.endDate)) {
  //       this.setState({ endPoint: index });
  //     }
  //   })
  //   const reservationsList = rawData.reservations;
  //   reservatsionsList.map((reservations, index) => {
  //     reservations = reservations.slice(this.state.startPoint, this.state.endPoint + 1)
  //   });
  //   this.setState({ bookedDates: {reservations: reservationsList}});
  // }

  parseDate(string) {
    let date = string.split('-');
    let year = date[0];
    let month = date[1];
    let day = date[2];
    console.log('dates before parseDate function are ' + year, month, day)
    return new Date(year, month, day);
    // return new Date(year, month, day).getTime()
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

    days[index] = room;
    days[index].reservedBeds = guests;
    days[index].avg = avg;


    this.setState({
        selectedDates: days,
    })
    this.updateTotal(rooms);
  }

  updateTotal(days) {
    let total = 0;
    for(var i in days) {
      if (rooms[i].reservedBeds !=="Select") {
        total += rooms[i].reservedBeds * rooms[i].avg * rooms[i].length;
      }
    }
    this.setState({total: total});
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
                <H2>Check Availability</H2>
                  <Reservations>
                  </Reservations>
            <SearchWindow startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    startCal={this.state.startCal}
                    endCal={this.state.endCal}
                    toggler={this.toggleCalendars}
                    setStartDate={this.setStartDate}
                    setEndDate={this.setEndDate}
                    submitDates={this.submitDates}
                    startHolder={this.startHolder}
                    hotelRooms={this.state.hotelRooms}
                    unfiltered={this.state.unfiltered}
                    />
            <ReservationConfirm
                    room={this.state.currentRoom}
                    beds={this.state.numberOfBeds}
                    average={this.state.averagePrice}
                    selected={this.state.selectedRooms}
                    total={this.state.toal}/>
            </Container>
        </Styles>
    )
}
}

ReactDOM.render(<Booking />, document.getElementById('booking'));