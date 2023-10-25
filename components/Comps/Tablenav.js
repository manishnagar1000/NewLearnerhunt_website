import React, { Component } from "react";

export default class Tablenav extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="custom-table-nav">
        <div className="left-div"></div>
        <div className="right-div" style={{width:"300px"}}>
          {this.props.Actions.Actions}
        </div>
      </div>
    );
  }
}
