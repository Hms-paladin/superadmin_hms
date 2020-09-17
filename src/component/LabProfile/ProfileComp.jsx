import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import './ProfileComp.css'
import Paper from "@material-ui/core/Paper";
// import Calendar from './Calendar';
import Grid from "@material-ui/core/Grid";
import { TiLocation, MdLocationOn, MdLocalPhone,MdEmail } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Shopping from "../../images/shopping_background.png";
import Modalcomp from './ProfileModal'
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
class ProfileComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",open:false
    };
  }
  handleopen=()=>
  {
    this.setState({open:true})
  }
  handleClose=()=>
  {
    this.setState({open:false})
  }
  render() {
  

    return (
      <div className="deal_listcreatead">
         <Paper className="profile_background">
       <div className="profileback_first">PROFILE</div>
         
           
             <div className="profilepaper_container">
              <Paper className="profilebackground">
              <Grid container className="total">
            <Grid item xs={12} md={5}>
              <div className="trainee_image_container">
                <div className="trainee_image_div">
                  <img className="trainee_image" src={Shopping} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7} className="addtrainee_gridcontainer">
              <div className="addtraineee_containerdiv">
                <div className="icon_edit">
                  <EditIcon className="icon" onClick={this.handleopen}/>
                </div>
                <div>
                  <div className="trainee_head">Aridox Medical Services  </div>
                
                  <div className="profile_age_details">
                    <h5>
                      <MdLocationOn className="group_icons"/>
                    </h5>
                    <div className="trainee_text">
                      Jabariya<span className="elipse">...</span>
                    </div>
                  </div>
                  <div className="profile_age_details">
                    <h5>
                      <MdLocalPhone className="group_icons"/>
                    </h5>
                    <div className="trainee_text">+965 220000001</div>
                  </div>
                  <div className="profile_age_details">
                    <h5>
                      <MdEmail className="group_icons"/>
                    </h5>
                    <div className="trainee_text">Jameel@nurse.com.kw</div>
                  </div>
                  <div className="profile_age_details">
                    <h5>
                      <IoIosGlobe className="group_icons"/>
                    </h5>
                    <div className="trainee_text">AndrioxMedicalServices.com.kw</div>
                  </div>
                  {/* <div>
                    <h4 className="working_hours">
                      <b>Personal Details</b>
                    </h4>
                  </div>
                  <div className="working_detail">
                    <h4 className="working_hour_detail">Gender</h4>

                    <p className="working_times_detail">09.30 AM-12.30 PM</p>
                  </div>
                  <div>
                    <div className="working_detail">
                      <h4 className="working_hour_detail">Date of Birth</h4>
                      <p className="working_times_detail">09.30 AM-04.30 PM</p>
                    </div>
                  </div>
                  <div>
                    <div className="working_detail">
                      <h4 className="working_hour_detail">
                        Nationality
                      </h4>

                      <p className="working_times_detail">10.30 AM-05.30 PM</p>
                    </div>
                    <div className="working_detail">
                      <h4 className="working_hour_detail">
                        Speciality
                      </h4>

                      <p className="working_times_detail">Cardiologist,Dermatologist</p>
                    </div>
                  </div> */}
                </div>
              </div>
              <div>
                
              </div>

             
            
            </Grid>
          </Grid>
              </Paper>
              </div>
          </Paper>
          <Modalcomp  open={this.state.open} onClose={this.handleClose} title="gfffffffffffffh"/>
          </div>

      
    );
  }
}

export default ProfileComp;
