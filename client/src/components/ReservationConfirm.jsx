import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { css } from 'styled-components';

//NEVER GOT HERE. BUT THERE SHOULD BE A CONFIRMATION THAT RENDERS CONDITIONALLY WITH THE OVERALL NIGHTS AND TOTAL PRICE JUST PUT RANDOM THINGS HERE AS A PLACEHOLDER AND BRAIN DUMP OF THINGS THAT MAKE SENSE TO GO HERE


const slideIn = keyframes`
    0% {
        transform: translateY(-140%);
    }
    100% {
        transform: translateY(0%);
    }		
}
`

const slideUp = keyframes`
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-140%);
    }		
}
`

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const StyledBody = styled.tbody`
    background-color: rgb(255, 255, 255);
`;

const Th = styled.th`
    border: 1px solid #C4C4C4;
    white-space:nowrap;
    padding:.5rem;
`;

const Td = styled.td`
    border: 1px solid #C4C4C4;
    white-space:nowrap;
    padding:.5rem;
`;

const Tr = styled.tr`
    font-size: 12px;
    color: rgb(105, 105, 105);
    vertical-align: bottom;
`

const SubTotal = Th.extend`
    min-width: 40px;
    text-align: right;
`

const NormalHeader = Th.extend`
    border: 1px solid #C4C4C4;
    white-space:nowrap;
    padding:.5rem;
    min-width: 100px;
`

const H4 = styled.h4`
    color: black;
    font-size: 16px;
    margin:0px;
`

const Span = styled.span`
    float:right;
`;

//messing around with animations -- not on brand lol just wanted to see what it'd look like

const Transit = styled.div`
max-height: 500px;
position: relative;
visibility: ${props => !props.toggler ? 'hidden': 'visible' }
${props => props.total === 0 && css` animation: ${slideUp} .2s linear forwards;`}
${props => props.total > 0 && css` animation: ${slideIn} .2s linear;`}
`

const HeightCheck = styled.div`
overflow-y: hidden;
`

class ReservationConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggler: false
        }
        this.appear = this.appear.bind(this);
    }

    appear() {
        this.setState({ toggler: true })
    }


    render() {
        return (
            <HeightCheck>
            <Transit total={this.props.total} toggler={this.state.toggler}>
                <StyledTable>
                    <thead>
                        <Tr>
                            <H4>My Selection</H4>
                            <NormalHeader>Price Per Night</NormalHeader>
                            <Th>Nights</Th>
                            <SubTotal>Total</SubTotal>
                        </Tr>
                    </thead>
                    <StyledBody>

                    </StyledBody>
                </StyledTable>
                <StyledTable>
                    <StyledBody>
                        <tr>
                            <Td>Total:<Span>${this.props.total}</Span></Td>
                        </tr>
                    </StyledBody>
                </StyledTable>

            </Transit>
            </HeightCheck>
        )
    }
}

export default ReservationConfirm;
