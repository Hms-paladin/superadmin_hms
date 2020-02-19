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
          expandIcon={<ExpandMoreIcon />} >
          <Typography>IMAGE SPECIFICATION</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="fields_data">
          <Dropdownantd label="" className="image_option" option={["Full"]} placeholder="Half" />
          <div className="advertise_image_two">
          <h4>Height (Pixel)</h4>
          <Inputantd label="Min"  className="image_option" placeholder="Name" />
          <Inputantd label="Max"  className="image_option" placeholder="Name" />
          </div>
          <div className="advertise_image_three">
          <h4>Width (Pixel)</h4>
          <Inputantd label=""  className="image_option" placeholder="Name" />
          <Inputantd label=""  className="image_option" placeholder="Name" />
          </div>
          <div className="advertise_image_four">
          <h4>Size (Kb / Mb)</h4>
          <Inputantd label=""  className="image_option" placeholder="Name" />
          <Inputantd label=""  className="image_option" placeholder="Name" />
          </div>
          {/* <div className="advertise_image_five">
          <h4>Resolution ( DPI )</h4>
          <div>
          <Dropdownantd  divclass="w-100" className="w-100" labelclass="w-100" breakclass="w-100" option={["Full"]} placeholder="Half" />
          </div>
          </div> */}


          <div className="advertise_image_five">
            <div>
          <span className="clrred">Resolution ( DPI )</span>
          </div><div>
          <Dropdownantd className="w-50" option={["Full"]} placeholder="Half" />
          </div>

            </div>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>

        
          <div className="advertise_display">
          <ExpansionPanel className="display_panel">
          <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />} >
          <Typography>IMAGE SPECIFICATION</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="fields_data">
          <div className="advertise_display_two">
          <h4>Home Page Ad(Sec)</h4>
          <Inputantd   className="display_option" placeholder="Name" />
          </div>
          <div className="advertise_display_three">
          <h4>Vendor Page Ad(Sec)</h4>
          <Inputantd   className="display_option" placeholder="Name" />
          </div>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>
          </div>
    );
  }
}
