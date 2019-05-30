import React from 'react';
import ReactDom from 'react-dom';
import Calendar from './Calendar.jsx';
import styled from 'styled-components';


const InlineP = styled.p`
    display: inline-block;
    text-align: center;
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
    z-index: 2;
`

const FindDisplay = styled.div`
    display: inline-block;
    width:25%
`

const Container = styled.div`
    display: inline-block;
    width: 100%;
    position:relative;
`

const DropDown = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const FindButton = styled.button`
cursor: pointer;
background-color: #FF6600; 
border-color: #130269; 
border: none;
border-radius: 3px;
width: 25%;
height: 30px;
color: white;
margin-left: 2%;
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
                <InlineP>Dates:</InlineP>
                    <FindDisplay>
                        <DropDown>
                            <InlineA id="startCal" className="nullClick" onClick={this.clickHandler}>{this.parseDate(displayStart)}</InlineA>
                                { this.props.startCal ?
                                    <Calendar startDate={this.props.startDate}
                                        date={this.props.startDate}
                                        setStartDate={this.props.setStartDate}
                                        hotelRooms={this.props.hotelRooms}
                                        unfiltered={this.props.unfiltered}
                                    id="Calendar"/>
                                : null }
                        </DropDown> 
                    </FindDisplay>
                <InlineP> - </InlineP>
                <FindDisplay>
                        <DropDown>
                            <InlineA id="endCal" className="nullClick" onClick={this.clickHandler}>{this.parseDate(this.props.endDate)}</InlineA>
                            { this.props.endCal ?
                                <Calendar
                                    endDate={this.props.endDate}
                                    date={this.props.endDate}
                                    setEndDate={this.props.setEndDate}
                                    startHolder={this.props.startHolder}
                                    selectedRooms={this.props.selectedRooms}
                                    unfiltered={this.props.unfiltered}
                                id="Calendar2"/>
                            : null }
                        </DropDown> 
                </FindDisplay>
                <FindButton id="submit" onClick={this.props.submitDates}>Find</FindButton>
            </Container>
        )
    }
}

export default SearchWindow;