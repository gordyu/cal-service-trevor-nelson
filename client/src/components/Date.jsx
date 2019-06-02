import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const Basic = styled.li`
    text-align: center;
    width: 13.69%;
    height: 35px;
    cursor: pointer;
`

const FlexDate = Basic.extend`
    &:hover {
      background-color: #79CCCD;
    }
    `
const SelectedDate = Basic.extend`
    color: white;
    background-color: #007D8C;
`

const Text = styled.p`
    margin-top: 10px
`

class CalDate extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    let unavailable = false;
  }

  // componentDidMount() {
  //   let test = new Date(this.props.year, this.props.month, this.props.day)
  //   let test2 = this.props.bookedDates
  //   let test3 = test2.split('T')[0]
  //   let testfin = this.parseDate(test3)
  // }

  componentDidMount() {
    console.log('DATE SHIT *** ' + this.props.clone)
    let test = new Date(this.props.year, this.props.month, this.props.day)
    let test2 = '2019-05-01'
    let test3 = test2.split('T')[0]
    let testfin = this.parseDate(test3)

  }


  // componentDidMount() {
  //   let test = new Date(this.props.year, this.props.month, this.props.day)
  //   let test2 = this.props.bookedDates.rooms[0].room[this.props.bookedDates.rooms[0].room.length - 1].Date
  //   let test3 = test2.split('T')[0]
  //   let testfin = this.parseDate(test3)
  // }

  parseDate(input) {
    let string = '2019-05-01'.split('T')[0];
    let date = string.split('-');
    let year = date[0];
    let month = date[1];
    let day = date[2];
    return new Date(year, month, day);
  }

  clickHandler(e) {
    if(!this.props.dateSelected && !this.unavailable) {
      if (this.props.id == 'Calendar')this.props.setStartDate(this.props.year, this.props.month, this.props.day)
      if (this.props.id == 'Calendar2') this.props.setEndDate(this.props.year, this.props.month, this.props.day)
      this.props.clickDate(this.props.day);
    }
    this.props.oneClick();
  }


  render() {
    let earliestDate = 0;
    let data = '2019-05-01';
    let lastFetchedDate = this.parseDate(data[data.length - 1].date);
    if (this.props.startHolder) {
      earliestDate = new Date(...this.props.startHolder.split('-'))
    }
    let currentDate = new Date(this.props.year, this.props.month, this.props.day);
    if(currentDate > lastFetchedDate) {
      this.unavailable = true;
    } else {this.unavailable = false;}
    if (earliestDate) {
      if (currentDate <= earliestDate || currentDate > lastFetchedDate) this.unavailable = true
      else this.unavailable = false;
    }
    if (!this.props.day) {
      return (
        <FlexDate className="nullClick"><Text> </Text></FlexDate>
      )
    }
    // if (this.unavailable) {
    //   return (
    //     <Unavailable className="nullclick" onClick={this.clickHandler}>
    //       <Text className="nullClick">{this.props.day}</Text>
    //     </Unavailable>
    //   )
    // }
    if (this.props.day === this.props.clickedDate) {
      return (
        <SelectedDate className="nullclick" onClick={this.clickHandler}>
          <Text className="nullclick">{this.props.day}</Text>
        </SelectedDate>
      )
    }
    return (
      <FlexDate className="nullClick" onClick={this.clickHandler}>
        <Text className="nullclick">{this.props.day}</Text>
      </FlexDate>
    )
  }
}


  // render() {
  //   let earliestDate = 0;
  //   let data = this.props.bookedDates.rooms[0].room;
  //   let lastFetchedDate = this.parseDate(data[data.length - 1].date);
  //   if (this.props.startHolder) {
  //     earliestDate = new Date(...this.props.startHolder.split('-'))
  //   }
  //   let currentDate = new Date(this.props.year, this.props.month, this.props.day);
  //   if(currentDate > lastFetchedDate) {
  //     this.unavailable = true;
  //   } else {this.unavailable = false;}
  //   if (earliestDate) {
  //     if (currentDate <= earliestDate || currentDate > lastFetchedDate) this.unavailable = true
  //     else this.unavailable = false;
  //   }
  //   if (!this.props.day) {
  //     return (
  //       <FlexDate className="nullClick"><Text> </Text></FlexDate>
  //     )
  //   }
  //   if (this.unavailable) {
  //     return (
  //       <Unavailable className="nullclick" onClick={this.clickHandler}>
  //         <Text className="nullClick">{this.props.day}</Text>
  //       </Unavailable>
  //     )
  //   }
  //   if (this.props.day === this.props.clickedDate) {
  //     return (
  //       <PinkDate className="nullclick" onClick={this.clickHandler}>
  //         <Text className="nullclick">{this.props.day}</Text>
  //       </PinkDate>
  //     )
  //   }
  //   return (
  //     <FlexDate className="nullClick" onClick={this.clickHandler}>
  //       <Text className="nullclick">{this.props.day}</Text>
  //     </FlexDate>
  //   )
  // }


export default CalDate;