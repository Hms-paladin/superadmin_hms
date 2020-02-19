import React, { Component } from "react";
import "./Advertise_Manage.css";
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Dropdownantd from "../../formcomponent/dropdownantd";
import Inputantd from "../../formcomponent/inputantd";
import { FaCaretDown } from "react-icons/fa";


export default class Advertise_manage extends Component {
 render() {
    return (
      <div className="advertise_manage">
        <div className="advertise_manage_header">
            <div className="advertise_manage_titleuser"><h3>ADVERTISING MANAGEMENT</h3></div>
            <div className="advertise_manage_container">
			      <Button className="advertise_button_cancel">Cancel</Button>
            <Button className="advertise_button_create">Create</Button>
            </div>
          </div>
          <div className="advertise_image">
          <ExpansionPanel className="image_panel">
          <ExpansionPanelSummary
          expandIcon={<FaCaretDown className="advertise_icon" />} >
          <Typography>IMAGE SPECIFICATION</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="fields_data">
          <Dropdownantd label="" className="image_option" option={["Full"]} placeholder="Half" />
          <div className="advertise_image_two">
          <h4>Height (Pixel)</h4>
          <Inputantd label="Min"  className="image_option" placeholder="" />
          <Inputantd label="Max"  className="image_option" placeholder="" />
          </div>
          <div className="advertise_image_three">
          <h4>Width (Pixel)</h4>
          <Inputantd label=""  className="image_option" placeholder="" />
          <Inputantd label=""  className="image_option" placeholder="" />
          </div>
          <div className="advertise_image_four">
          <h4>Size (Kb / Mb)</h4>
          <Inputantd label=""  className="image_option" placeholder="" />
          <Inputantd label=""  className="image_option" placeholder="" />
          </div>
         <div className="advertise_image_five">
            <div>
          <span className="clrred">Resolution ( DPI )</span>
          </div><div>
          <Dropdownantd className="image-option" option={["Full"]} placeholder="Half" />
          </div>
          </div>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>

        
          <div className="advertise_display">
          <ExpansionPanel className="display_panel">
          <ExpansionPanelSummary
          expandIcon={<FaCaretDown className="advertise_icon"/>} >
          <Typography>DISPLAY DURATION</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="fields_data">
          <div className="advertise_display_two">
          <h4>Home Page Ad(Sec)</h4>
          <Inputantd   className="display_option" placeholder="" />
          </div>
          <div className="advertise_display_three">
          <h4>Vendor Page Ad(Sec)</h4>
          <Inputantd   className="display_option" placeholder="" />
          </div>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>

          <div className="advertise_rate">
          <ExpansionPanel className="rate_panel">
          <ExpansionPanelSummary
          expandIcon={<FaCaretDown className="advertise_icon"/>} >
          <Typography>RATE DURATION</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="fields_data">
          <div className="advertise_rate_two">
          <Dropdownantd label="Vendor" className="image_option" option={["Full"]} placeholder="ALL" />
          </div>
          <div className="advertise_rate_two">
          <Dropdownantd label="Placement" className="image_option" option={["Full"]} placeholder="" />
          </div>
          <div className="advertise_rate_three">
          <Inputantd  label="Size" className="rate_option" placeholder="" />
          </div>
          <div className="advertise_rate_three">
          <Inputantd  label="Rate (KWD)" className="rate_option" placeholder="" />
          </div>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>
          </div>
    );
  }
}
