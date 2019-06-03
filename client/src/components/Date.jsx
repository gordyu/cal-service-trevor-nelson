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
const Unavailable = Basic.extend`
    background-color: gray;
`

const Text = styled.p`
    margin-top: 10px;
`

class CalDate extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      available:true,
    }
    this.clickHandler = this.clickHandler.bind(this);
    // let unavailable = false;
  }

  // componentDidMount() {
  //   let test = new Date(this.props.year, this.props.month, this.props.day)
  //   let test2 = this.props.bookedDates[0];
  //   let test3 = test2.split('T')[0]
  //   let testfin = this.parseDate(test3)
  //   console.log('what is this shit *** bookedDates[0] ' + test2 + testfin)
  // }

  parseDate(input) {
    let string = input.split('T')[0];
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
    console.log('TEST TEST TEST ' + new Date(this.props.bookedDates[0]).toISOString().split('T')[0])
    console.log('INFO COMING IN FROM INDEX IS ' + this.props.bookedDates[0], this.props.bookedDates[1])
    let earliestDate = 0;
    //THIS IS A STRING FOR TESTING PURPOSES!!!! GET ELEMENTS FROM ARRAY LATER
    let data = new Date(this.props.bookedDates[0]).toISOString().split('T')[0];
    let endData = new Date(this.props.bookedDates[1]).toISOString().split('T')[0];
    // let daysAfter = (this.props.bookedDates[1] / (1000 * 60 * 60 * 24));
    // console.log('DAYS THAT NEED TO BE BLOCKED AFTER ' + daysAfter)
    //THIS IS A STRING FOR TESTING PURPOSES!!!!

    let lastFetchedDate = this.parseDate(data);
    console.log('THIS IS THE DATE THAT GETS UNAVAILABLE ' + lastFetchedDate)

    console.log(this.props.startHolder)
    if (this.props.startHolder) {
      earliestDate = new Date(...this.props.startHolder.split('-'))
    }
    let currentDate = new Date(this.props.year, this.props.month, this.props.day);
    if (currentDate > lastFetchedDate) {
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
    if (this.unavailable) {
        return (
            <Unavailable className="nullClick" onClick={this.clickHandler}>
                <Text className="nullClick">{this.props.day}</Text>
            </Unavailable>
        )
    }
    if (this.props.day === this.props.clickedDate) {
        return (
            <PinkDate className="nullClick" onClick={this.clickHandler}>
                <Text className="nullClick">{this.props.day}</Text>
            </PinkDate>
        )
    }
        return (
            
            <FlexDate className="nullClick" onClick={this.clickHandler}>
                <Text className="nullClick">{this.props.day}</Text>
            </FlexDate>
        )

  }
}

export default CalDate;