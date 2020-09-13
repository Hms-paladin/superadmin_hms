import React, { Component } from 'react';
import Logo from '../../images/Logo.png';
import TextField from '@material-ui/core/TextField';
import Doctor from '../../images/doctorlogin.jpg'
import './Forgot.css'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Inbox from '../../images/inbox.svg'
import { Link } from "react-router-dom";
import {apiurl} from "../../App.js";
import { Spin,notification } from 'antd';

const axios = require('axios');


export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", hidden: true,disablebtn:false }
  }
  toggleshow = () => {
    this.setState({ hidden: !this.state.hidden })
    console.log("i am clicked", this.state.hidden)
  }
  mailFun = (e) => {
    this.setState({ email: e.target.value ,errmsg_email:""})
  }

  sendMail=()=>{
    const key = 'updatable';

    if(this.state.email===""){
      this.setState({
        errmsg_email: "Email is required"
      })
    }
    else if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)) {
      this.setState({
        errmsg_email: "Email is invalid"
      })
    }
    else if (this.state.disablebtn){
      notification.success({
        key,
        className:"show_frt",
        message: "Mail already sent",
      });
    }
    else{

      var self = this

      axios({
        method: 'post',
        url: `${apiurl}sendresetpwdURL`,
        data:{
          "email":this.state.email
        }
      })
      .then(function (response) {
        notification.success({
            className:"show_frt",
            message: "Mail Sent Successfully",
          });
          self.setState({
            disablebtn:true
          })
      })
      .catch(function (error) {
        notification.info({
          className:"show_frt",
          message: "Invalid Mail ID",
        });
    });
    }
  }



  render() {

    return (
      <div className="pharmacy_forget_container">
        <Grid container>
          <Grid item xs={12} md={7} className="pharmacy_image_grid">
            <div className="pharmacy_image_container">
              <div className="pharmacy_image_div">
                <div className="pharmacy_image_login">
                  <img src={Doctor} alt="1" className="pharmacy_image" />
                  {/* <p className="pharmacy_text">PHARMACY</p> */}
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={5} className="pharmacy_grid_container">
            <div className="pharmacy_main_container">
              <div className="pharmacy_paper_div">
                <div className="pharmacy_text_container">
                  <div className="logo_container"><div className="logo_div"><img className="logo_image" src={Logo} /></div></div>
                  <div className="pharmacy_Welcometext-container"><p className="Welcometext">REQUEST NEW PASSWORD</p></div>

                  <div className="pas_msg">
                    Enter the current email address associated with your ONE MOMENT account, then click submit.We'll email you a link to a page where you can easily create a new password
                 </div>

                  <div className="pharmacy_email_container"><TextField type="text" onChange={this.mailFun} value={this.state.email} label="EMAIL"
                    autoFocus={true}
                    onKeyPress={(ev) => {
                      console.log(ev.key,"ev")
                      if (ev.key  === 'Enter') {
                        this.sendMail()
                      }
                    }}
                    className={this.state.errmsg_email && "errmsg_forgotemail"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <img className="inbox_icon" src={Inbox} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }} />
                    {this.state.errmsg_email ?
                        <span className="errmsgclr">{this.state.errmsg_email}</span> :
                        <div className="errmsgMB" />}
                  </div>

                  <div className="pharmacy_submit_container">
                    <button className="login"  onClick={this.sendMail}>Submit</button>
                    </div>

                  <div className="cancel_container">
                    <Link to="/">
                      <p className="cancelbutton">Cancel</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Grid>


        </Grid>
      </div>


    )
  }
}
