import React, { Component } from 'react';
import Paper from '@material-ui/core/Card'
import Logo from '../../images/Logo.png';
import TextField from '@material-ui/core/TextField';
import './ResetPassword.css'
import Grid from '@material-ui/core/Grid';
import Eye from '../../images/eye.svg'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pharmacy from '../../images/doctorlogin.jpg'
import CheckIcon from '@material-ui/icons/Check';
import Homepage from "../../drawerpage/drawerpage"
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Link
} from "react-router-dom";
import { apiurl } from "../../../src/App.js";
import { Spin, notification } from 'antd';
import "./ResetPassword.css"

const axios = require('axios');

export default class DoctorLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "",confirmPassword:"",hidden: true, open: false, confirmhidden: true }
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  toggleshow = () => {
    this.setState({ hidden: !this.state.hidden })
  }


  resetpassword = () => {


    if(this.state.password==="" && this.state.confirmPassword===""){
      this.setState({
        errmsg_newpass:"Password is required",
        errmsg_confirmpass:"Confirmpassword is required",
      })
      // notification.info({
      //   className: "show_frt",
      //   message: "Please fill password",
      // });
    }
    else if(this.state.password===""){
      this.setState({
        errmsg_newpass:"Password is required",
      })
      // notification.info({
      //   className: "show_frt",
      //   message: "Please fill confirmPassword",
      // });
    }
    else if(this.state.confirmPassword===""){
      this.setState({
        errmsg_confirmpass:"confirmPassword is required",
      })
    }
    else if(this.state.password.length<4 && this.state.confirmPassword.length<4){
      this.setState({
        errmsg_newpass:"Password must have atleast 4 character",
        errmsg_confirmpass:"Password must have atleast 4 character",
      })
      // notification.info({
      //   className: "show_frt",
      //   message: "Password must have atleast 4 character",
      // });
    } 
    else if(this.state.password.length<4 ){
      this.setState({
        errmsg_newpass:"Password must have atleast 4 character",
      })
    }
    else if(this.state.confirmPassword.length<4){
      this.setState({
        errmsg_confirmpass:"confirmPassword must have atleast 4 character",
      })
    }
    else if(this.state.password !== this.state.confirmPassword){
      this.setState({
        errmsg_confirmpass:"Password is not match",
      })
      // notification.info({
      //   className: "show_frt",
      //   message: "Password is not match",
      // });
    }else{
      const params = new URLSearchParams(window.location.search)
      const token=params.get("tk")
      const mail=params.get("ma")

      var self = this
      axios({
        method: 'post',
        url: `${apiurl}reset_password`,
        data:{
          "email":mail,
	        "password":this.state.confirmPassword
        },
        headers: {
          Authorization: "Bearer " + token
      }
      })
        .then(function (response) {

          localStorage.setItem('token', token);
          localStorage.setItem('email', mail);
  
          notification.success({
            className: "show_frt",
            message: "Password change sucessfully",
          });
          self.setState({})
        })
        .catch(function (error) {
        });

    }


  }

  confirmCheck = () => {
    this.setState({ confirmhidden: !this.state.confirmhidden })
  }

  passwordFun = (e) => {
    this.setState({ password: e.target.value,errmsg_newpass:"" })
  }

  confirmFun=(e)=>{
    this.setState({
      confirmPassword:e.target.value,
      errmsg_confirmpass:""
    })
  }

  render() {
    return (
      <div>
      {localStorage.getItem('token') ?
      <Router basename="superadmin/?/">
      {/* <Homepage /> */}
      <Route path="/Home" component={Homepage} />
      </Router>:
      <div className="pharmacy_login_container">
        <Grid container>
          <Grid item xs={12} md={7} className="pharmacy_image_grid">
            <div className="pharmacy_image_container">
              <div className="pharmacy_image_div">
                <div className="pharmacy_image_login">
                  <div>
                    <img src={Pharmacy} alt="1" className="pharmacy_image" />
                    {/* <p className="pharmacy_text">PHARMACY</p> */}
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={5} className="pharmacy_grid_container">
            <div className="pharmacy_main_container">

              <div className="pharmacy_paper_div">
                <div className="pharmacy_text_container">
                  <div className="logo_container"><div className="logo_div"><img className="logo_image" src={Logo} /></div></div>
                  <div className="pharmacy_Welcometext-container"><p className="Welcometext">RESET PASSWORD</p></div>
                  <div className="pharmacy_email_container"><TextField type="text" type={this.state.hidden ? "password" : "text"} onChange={this.passwordFun} value={this.state.password} label="New Password"
                  className={this.state.errmsg_newpass && "errmsg_newpass"}
                  autoFocus={true}
                  onKeyPress={(ev) => {
                    if (ev.key  === 'Enter') {
                      this.resetpassword()
                    }
                  }}

                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <img className="logineye_icon" src={Eye} onClick={this.toggleshow} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }} />
                    {this.state.errmsg_newpass ?
                        <span className="errmsgclr">{this.state.errmsg_newpass}</span> :
                        <div className="errmsgMB" />}
                  </div>

                  <div className="confirm_container"><TextField placeholder="" className="trrainer_password" label="Confirm Password" type={this.state.confirmhidden ? "password" : "text"} onChange={this.confirmFun} value={this.state.confirmPassword}
                    className={this.state.errmsg_confirmpass && "errmsg_confirmpass"}
                    onKeyPress={(ev) => {
                      if (ev.key  === 'Enter') {
                        this.resetpassword()
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <>

                          {/* <InputAdornment>
                            <IconButton>
                              <CheckIcon className="confirm_password" />
                            </IconButton>
                          </InputAdornment> */}

                          <InputAdornment>
                            <IconButton>
                              <img className="logineye_icon" src={Eye} onClick={this.confirmCheck} />
                            </IconButton>
                          </InputAdornment>
                          
                        </>
                      )
                    }} />
                    {this.state.errmsg_confirmpass ?
                        <span className="errmsgclr">{this.state.errmsg_confirmpass}</span> :
                        <div className="errmsgMB" />}

                  </div>
                  <div className="login_button_container">
                    <button className="login" onClick={this.resetpassword}>Submit</button>
                  </div>
                  <div className="cancel_container">
                    <a href="/">
                      <p className="cancelbutton">Cancel</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Grid>


        </Grid>
      </div>
      }
      </div>
    )
  }
}
