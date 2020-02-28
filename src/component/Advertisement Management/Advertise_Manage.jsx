    import React, { Component } from "react";
    import "./Advertise_Manage.css";
    import Button from '@material-ui/core/Button';
    import ExpansionPanel from '@material-ui/core/ExpansionPanel';
    import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
    import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
    import Typography from '@material-ui/core/Typography';
    import Dropdownantd from "../../formcomponent/dropdownantd";
    import Inputantd from "../../formcomponent/inputantd";
    import Inputnumber from "../../formcomponent/inputnumberantd";
    import { FaCaretDown } from "react-icons/fa";
    import {AddBox} from '@material-ui/icons';
    import { withStyles } from '@material-ui/core/styles';
    import { green } from '@material-ui/core/colors';
    import Radio from '@material-ui/core/Radio';

   

    const GreenRadio = withStyles({
        root: {
          color: green[500],
          '&$checked': {
            color: green[500],
          },
        },
        checked: {},
      })(props => <Radio color="default" {...props} />);

    export default class Advertise_manage extends Component {
        state = {
            selectedValue:"a"
         
          };
          
        handleChange=(data)=>{
            this.setState({
                selectedValue:data
            })
        } 

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
    <ExpansionPanel className="image_panel" defaultExpanded>
    <ExpansionPanelSummary
    expandIcon={<FaCaretDown className="advertise_icon" />} >
    <Typography>IMAGE SPECIFICATION</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className="fields_data">

      <div className="radio_head">
          <div className="radio_head_one">
        <GreenRadio
        checked={this.state.selectedValue === 'a'}
        onChange={(e)=>this.handleChange("a")}
        value="a"
        name="radio-button-one"
        inputProps={{ 'aria-label': 'C' }}
        className="radio_one" />
        <h4>Half</h4>
        </div>

        <div className="radio_head_two">
        <GreenRadio
        checked={this.state.selectedValue === 'b'}
        onChange={(e)=>this.handleChange("b")}
        value="b"
        name="radio-button-two"
        label="full"
        inputProps={{ 'aria-label': 'C' }}
        className="radio_two" />
         <h4>Full</h4>
         </div>

      </div>


    <div className="advertise_image_two">
    <h4>Height (Pixel)</h4>
    <Inputnumber label="Min"  className="image_option"  />
    <Inputnumber label="Max"  className="image_option" />
    </div>
    <div className="advertise_image_three">
    <h4>Width (Pixel)</h4>
    <Inputnumber  className="image_option"  />
    <Inputnumber  className="image_option"  />
    </div>
    <div className="advertise_image_four">
    <h4>Size (Kb / Mb)</h4>
    <Inputnumber   className="image_option"  />
    <Inputnumber   className="image_option"  />
    </div>
    <div className="advertise_image_five">
    <h4>Resolution(DPI)</h4>
    <div>
    <Dropdownantd className="image-option w-50" divclass={"cus_wid_dpi"} option={["Full"]} placeholder="Half" />
    </div>
    </div>
    </ExpansionPanelDetails>
    </ExpansionPanel>
    </div>


    <div className="advertise_display">
    <ExpansionPanel className="display_panel" >
    <ExpansionPanelSummary
    expandIcon={<FaCaretDown className="advertise_icon"/>} >
    <Typography>DISPLAY DURATION</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className="fields_data">
    <div className="advertise_display_two">
    <h4>Home Page Ad(Sec)</h4>
    <Inputnumber   className="display_option"  />
    </div>
    <div className="advertise_display_three">
    <h4>Vendor Page Ad(Sec)</h4>
    <Inputnumber   className="display_option" />
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
    <ExpansionPanelDetails className="advertise_rate_data">
    <div className="advertise_rate_two">
    <Dropdownantd label="Vendor" className="rate_option_one"  option={["Full"]} placeholder="ALL" />
    </div>
    <div className="advertise_rate_three">
    <Dropdownantd label="Placement" className="rate_option_one" option={["Full"]} placeholder="" />
    </div>
    <div className="advertise_rate_four">
    <Inputnumber  label="Size" className="rate_option" />
    </div>
    <div className="advertise_rate_five">
    <Inputnumber  label="Rate (KWD)" className="rate_option" />
    </div>
    <AddBox  className="rate_icon" />
    </ExpansionPanelDetails>
    </ExpansionPanel>
    </div>

    </div>
    );
    }
    }
