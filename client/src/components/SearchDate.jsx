import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar.jsx';

class SearchDate extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      details: false,
    }
  }

  displayCal() {
    console.log(this.state);
    var showOrNot = this.state.details?
    this.state.details: true;
    this.setState({
      details: showOrNot
    });
  };

  render() {
    // console.log(this.props);
    // const {cal} = this.props;

    // return(
    //   <div>
    //     <h4>calendar renders here {cal}</h4>
    //       <table>
    //           <thead>
    //             <tr>
    //               <th>NAME</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr key={cal}>
    //               <td onClick =
    //               {this.displayCal.bind(this)}>
    //               </td>
    //             </tr>
    //           </tbody>
    //       </table>
    //   </div>
    // )
  }

}