import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./DashboardMaster.css";
import Modalcomp from "../../helper/Modalcomp";
import DashboardTable from "./DashboardTable";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Input, Select, Icon } from 'antd';
import dateFormat from 'dateformat';
import Labelbox from '../../helper/labelbox/labelbox'
import Paper from '@material-ui/core/Paper';

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

export default class DashboardMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div className="shopping_dashboard">
        <Paper>
        <div className="uploadmasterheader">
              <div className="titleuser">SHOPPING DASHBOARD</div>           
             
        
               
              </div> 
      
      
        <DashboardTable />
        </Paper>
        
      </div>
    );
  }
}
