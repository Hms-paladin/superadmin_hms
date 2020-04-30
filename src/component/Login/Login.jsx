import React, { Component } from 'react';
import Logo from '../../images/Logo.png';
import TextField from '@material-ui/core/TextField';
import './Login.css'
import Grid from '@material-ui/core/Grid';
import Eye from '../../images/eye.svg'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Inbox from '../../images/inbox.svg'
import Doctor from '../../images/doctorlogin.jpg';
import { apiurl } from "../../../src/App.js";
import Homepage from "../../drawerpage/drawerpage"
import { BrowserRouter as Router, Link, NavLink, Redirect,Route } from "react-router-dom";
import { Spin, notification } from 'antd';

const axios = require('axios');


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", email: "", hidden: true, draweropen: false, errmsg_email: "" }
  }
  toggleshow = () => {
    this.setState({ hidden: !this.state.hidden })
    console.log("i am clicked", this.state.hidden)
  }
  handlechange = (e) => {
    this.setState({ [e.target.name]: e.target.value,errmsg_password:"" })
    if(e.target.name==="email"){
      this.setState({
        errmsg_email: ""
      })}else{
        this.setState({
          errmsg_password: ""
        })
      }
  }


  fogotpush = () => {
    return <Redirect to="/forgot" />
  }

  loginCheck = () => {
    if(this.state.email === ""){
      this.setState({
        errmsg_email: "Email is required"
      })
    }
    else if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)) {
      this.setState({
        errmsg_email: "Email is invalid"
      })
    }
    if (this.state.password === "") {
      this.setState({
        errmsg_password: "Password is required",
      })
    } else if (this.state.password.length < 4) {
      this.setState({
        errmsg_password: "Password must have 4 characters",
      })
    }

    else if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)) {
      var self = this
      axios({
          method: 'post',
          url: `${apiurl}login`,
          data: {
            "email":"kaveri2ganga@gmail.com",
            "password":"test123" 
            // email:this.state.email,
            // password:this.state.password
          }
      })
          .then(function (response) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.data[0].email);

            self.setState({
              draweropen:true,
              token:response.data.token,
              onceopen:true
            })
          }).catch(function (error) {
            notification.warning({
              className: "show_frt",
              message: "Email and Password does not match our records",
          });
            console.log(error, "loginerror");
        });
    }
  }
oncecallfun=()=>{
  return <Redirect to="home/doctorspecial" />
}
  render() {
    return (<div>
      {
      localStorage.getItem('token') === this.state.token ?
        <Router basename="superadmin/?/">
          {/* <Homepage /> */}
          <Route path="/Home" component={Homepage} />
          {this.oncecallfun()}
        </Router> :
        <div className="pharmacy_login_container">
          <Grid container>
            <Grid item xs={12} md={7} className="pharmacy_image_grid">
              <div className="pharmacy_image_container">
                <div className="pharmacy_image_div">
                  <div className="pharmacy_image_login">
                    <div>
                      <img src={Doctor} alt="1" className="pharmacy_image" />
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
                    <div className="pharmacy_Welcometext-container"><p className="Welcometext">WELCOMES YOU</p></div>
                    <div className="pharmacy_email_container"><TextField type="text" label="EMAIL"
                      autoFocus={true}
                      onChange={this.handlechange}
                      name={"email"}
                      className={this.state.errmsg_email && "errmsg_loginemail"}
                      onKeyPress={(ev) => {
                        console.log(ev.key,"ev")
                        if (ev.key  === 'Enter') {
                          this.loginCheck()
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton>
                              <img className="inbox_icon" src={Inbox} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }} />{this.state.errmsg_email ?
                        <span className="errmsgclr">{this.state.errmsg_email}</span> :
                        <div className="errmsgMB" />}
                    </div>

                    <div className="password_container"><TextField type={this.state.hidden ? "password" : "text"} onChange={this.handlechange} value={this.state.password} placeholder="" className="trrainer_password" label="PASSWORD" name={"password"}
                      className={this.state.errmsg_password && "errmsg_loginpass"}
                      onKeyPress={(ev) => {
                        console.log(ev.key,"ev")
                        if (ev.key  === 'Enter') {
                          this.loginCheck()
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
                      {this.state.errmsg_password ?
                        <span className="errmsgclr">{this.state.errmsg_password}</span> :
                        <div className="errmsgMB" />}

                    </div>
                    <div className="login_button_container">
                      <button className="login" onClick={this.loginCheck} >Login</button>
                    </div>
                    <div className="cancel_container">
                      <Link to="/forgot">
                        <p className="cancelbutton">Forgot Password?</p>
                      </Link>
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
