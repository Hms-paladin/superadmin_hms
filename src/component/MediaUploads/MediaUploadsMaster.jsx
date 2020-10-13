import React, { Component } from "react";
import "./MediaUploadsMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import MediaUploadsTable from "./MediaUploadsTable";
import MediaUploadsModal from "./MediaUploadsModal";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import { Input } from "antd";
import Button from '@material-ui/core/Button';
import Plus from '../../images/plus.png'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import dateFormat from 'dateformat';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Labelbox from "../../helper/labelbox/labelbox";
import Paper from '@material-ui/core/Paper';

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

export default  class MediaUploadsMaster extends Component {
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
      <div className="uploadmaster_doctor">
        <div className="media_uploadsmasterheader">
              <div className="titleuser_media_diet">MEDIA UPLOADS</div>
           
           
                <img
                  clasName="plus-icon-media"
                  src={Plus}
                  alt={"hi"}
                  onClick={this.handleClickopen}
                />
                
              </div>
        
      
        <MediaUploadsTable />
        <div className="Upload-modal-container">
          <Modalcomp
           clrchange="text_color"
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={"NEW MEDIA UPLOADS"}
            custommodalsize="media_newmedia"
         
          >
            <MediaUploadsModal 
            custommodalsize="media_uploadmodal"
            visible={this.state.open}
            closemodal={this.handleClickclose}
          />
          </Modalcomp>
        </div>
      </div>
    );
  }
}
