import React, { Component } from "react";
import plus from "../../images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./MediaUploadsMaster.css";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import MediaUploadsModal from "./MediaUploadsModal";
import MediaUploadsTable from "./MediaUploadsTable";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Input, Select, Icon } from 'antd';
import dateFormat from 'dateformat';
import Paper from '@material-ui/core/Paper';

const current_date = (dateFormat(new Date(), "dd mmm yyyy"))


export default class MediaUploadsMaster extends Component {
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
    console.log(dateFormat(new Date(), "dd mmm yyyy"))
    return (
      <div className="">
        <Paper>
          <div className="dashboard_header">
            <div className="titleuser">MEDIA UPLOADS</div>

            <div className="doctor_plus-container">

              <img
                className="plus-icon"
                src={plus}
                alt={"hi"}
                onClick={this.handleClickopen}
              />

            </div>
          </div>

          <MediaUploadsTable  truegetmethod={this.state.truegetmethod} falsegetmethod={()=>this.setState({truegetmethod:false})}   generateAlert={this.props.generateAlert} userId={this.props.userId} />
          <div className="Upload-modal-container">
            <Modalcomp
              visible={this.state.open}
              closemodal={this.handleClickclose}
              title={"New Media Uploads"}
            >
              <MediaUploadsModal visible={this.state.open}
                closemodal={this.handleClickclose}
                userId={this.props.userId}
              
            getTableData={()=>this.setState({truegetmethod:true})} 
            generateAlert={this.props.generateAlert}
              />
            </Modalcomp>
          </div>
        </Paper>
      </div>
    );
  }
}