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
import { BrowserRouter as Router,Link, NavLink,Redirect } from "react-router-dom";

const axios = require('axios');


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", hidden: true,draweropen:false}
  }
  toggleshow = () => {
    this.setState({ hidden: !this.state.hidden })
    console.log("i am clicked", this.state.hidden)
  }
  onchange = (e) => {
    this.setState({ password: e.target.value })
  }


  fogotpush = () => {
    alert("test")
    return <Redirect to="/forgot" />
  }

  loginCheck = () => {

    var self = this
    axios({
        method: 'post',
        url: `${apiurl}login`,
        data: {
          "email":"ranjith@paladinsoftwares.com",
          "password":"test123" 
        }
    })
        .then(function (response) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', response.data.data[0].email);
          // history.replace('/advertisemanage')
          self.setState({
            draweropen:true
          })
            console.log(response.data, "logincheck")
        })
  }

  render() {

    return (<div>
      {localStorage.getItem('token') ?
      <Router>
      <Homepage />
      </Router>:
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

                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton>
                              <img className="inbox_icon" src={Inbox} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }} />
                    </div>

                    <div className="password_container"><TextField type={this.state.hidden ? "password" : "text"} onChange={this.onchange} value={this.state.password} placeholder="" className="trrainer_password" label="PASSWORD"

                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton>
                              <img className="logineye_icon" src={Eye} onClick={this.toggleshow} />

                            </IconButton>
                          </InputAdornment>
                        )
                      }} />

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
