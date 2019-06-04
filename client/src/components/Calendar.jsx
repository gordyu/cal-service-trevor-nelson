import React from 'react';
import ReactDOM from 'react-dom';
import CalDate from './Date.jsx';
import styled, { keyframes } from 'styled-components';
import { css } from 'styled-components';

const slideIn = keyframes`
  0% {
    transform" scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
`

const slideUp = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-140%);
    opacity: 0%;
    display: none;
  }
}
`

const Cal = styled.div`
    margin-top: 35px;
    width: 275px;
    height: 280px;
    background-color: white;
    border: 1px solid #C4C4C4;
    box-shadow: 0 6px 18px 1px rgba(0,0,0,.12);
    position: absolute;
    z-index: 2;
    top: 15%;
    ${props => !props.id && css` animation: ${slideUp} .3s linear forwards;`}
    ${props => props.id && css` animation: ${slideIn} .3s linear;`}
`;

const FlexCal = styled.ul`
    margin: 0;
    display: flex;
    list-style: none;
    flex-flow: wrap;
    padding: 10px;
    padding-bottom: 0px;
`

const FlexMonth = styled.div`
    margin-top: 10px;
    text-align: center;
    display:block;
    padding: 10px;
`

const LeftArrow = styled.div`
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent; 
    border-right: 10px solid #484848;
    cursor: pointer;
    float: left;
`
const RightArrow = styled.div`
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent; 
    border-left: 10px solid #484848;
    cursor: pointer;
    float: right;
`

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      left: false,
      currentMonth: 0,
      currentYear: 0,
      currentDate: 0,
      firstDay: 0,
      clicked: false,
      standard: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      days: [],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      clickedDate: null,
    }

    this.leftOrRightCalendar = this.leftOrRightCalendar.bind(this);
    this.getFirstDay = this.getFirstDay.bind(this);
    this.oneClick = this.oneClick.bind(this);
    this.backMonth = this.backMonth.bind(this);
    this.forwardMonth = this.forwardMonth.bind(this);
    this.clickDate = this.clickDate.bind(this);
  }

  componentDidMount() {

    const date = this.props.date.split('-')
    const month = date[1];
    const year = date[0];
    const day = date[2];
    this.leftOrRightCalendar();
    this.getFirstDay(year, month, day);
    console.log('CALENDAR SHIT *** ' + (this.props))
  }

  leftOrRightCalendar() {
    if (!this.props.endDate) {
      this.setState({left: true})
    }
  }

  getFirstDay(year, month, day) {
    let first = new Date(year, month, 1).getDay();
    let temp = this.state.standard;
    let newDays = temp.slice();
    if (month == 1) {
      newDays.pop();
      newDays.pop();
    }
    while (first > 0) {
      newDays.unshift(' ');
      first -= 1;
    }
    while (newDays.length < 35) {
      newDays.push(' ');
    }
    this.setState({
      days: newDays,
      currentMonth: month,
      currentYear: year,
      currentDay: day,
      clicked: false,
      clickedDate: null,
    })
  }

  oneClick() {
    this.setState({ clicked: true })
  }

  clickDate(num) {
    this.setState({ clickedDate: num })
  }

  backMonth() {
    if(this.state.currentMonth > 0) {
      this.setState({ clicked: false })
      let newMonth = this.state.currentMonth;
      newMonth -= 1;
      if (newMonth < 10) {
        newMonth = '0' + newMonth;
      }
      this.getFirstDay(this.state.currentYear, newMonth)
    }
  }

  forwardMonth() {
    if(this.state.currentMonth < 11) {
      let newMonth = Number(this.state.currentMonth);
      newMonth += 1;
      if (newMonth < 10) {
        newMonth = '0' + newMonth;
      }
      this.getFirstDay(this.state.currentYear, newMonth, this.state.day)
      this.setState({ clicked: false })
    }
  }

  //some if these CalDate props don't belong or lead to anything.. had some ideas but wasn't sure where to go with them
  
  render() {
    return (
      <Cal id={this.props.id} className="nullClick">
        <FlexMonth className="nullClick">
          <LeftArrow className="nullClick" onClick={this.backMonth}></LeftArrow>
          {this.state.months[Number(this.state.currentMonth)]} {this.state.currentYear}
          <RightArrow className="nullClick" onClick={this.forwardMonth}></RightArrow>
        </FlexMonth>
        <FlexCal className="nullClick">
        {this.state.days.map((item, index) =>
          <CalDate key={index}
          id={this.props.id}
          day={item - this.state.firstDay}
          month={this.state.currentMonth}
          year={this.state.currentYear}
          setStartDate={this.props.setStartDate}
          setEndDate={this.props.setEndDate}
          dateSelected={this.state.clicked}
          oneClick={this.oneClick}
          clickDate={this.clickDate}
          clickedDate={this.state.clickedDate}
          startHolder={this.props.startHolder}
          bookedDates={this.props.bookedDates}
        />)}
        </FlexCal>
      </Cal>
    )
  }
}

export default Calendar;

