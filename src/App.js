import React from 'react';
import Homepage from './drawerpage/drawerpage.js';
import Login from "./component/Login/Login.jsx";
import Forgot from './component/Login/Forgot';
import ResetPassword from "./component/Login/ResetPassword";
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const apiurl="http://52.200.251.222:8158/api/v1/"

class App extends React.Component {

   tokenid=(length)=>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  render(){

    var pathname=["/advertisemanage","/mediaupload",'/approvalmanage','/doctorspecial','/trainer','/trainingcategory','/trainingcenter','/trainingmode','/vendormaster','/commission','/healthtips','/usergroup','/usertype','/usermaster','/holidaymaster','/revenuepayment','/groupaccess','/notification','/trainercategory','/useraccess']

    var patharr=[]

    for(let i=0;i<pathname.length;i++){
      patharr.push(<Route exact path={pathname[i]} component={Login} />)
    }

    const params = new URLSearchParams(window.location.search)
    const token=params.get("tk")
    const mail=params.get("ma")
    const tokenid=this.tokenid(10)
    localStorage.setItem("tokenid",tokenid)

    console.log(window.location.pathname,"href")
    if(localStorage.getItem('token') && localStorage.getItem('tokenid')===tokenid && window.location.pathname==="/superadmin/"){
      return (
      <Router basename="superadmin/">
        <Redirect to="/home/doctorspecial" />
        {this.setState({})}
      </Router>
        )
    }
    return (
      <div>
            {
            localStorage.getItem('token') && localStorage.getItem('tokenid')===tokenid?
            <Router basename="superadmin/">
              {/* <Homepage /> */}
              <Route path="/home" component={Homepage} />
              </Router>
            :
            window.location.pathname==="/superadmin/resetpassword" && token && mail
            ?
            <Router basename="superadmin/"><Route path={"/resetpassword"} component={ResetPassword} exact /></Router>
            :
            <Router basename="superadmin/">
            <Route exact path="/" component={Login}/>
            <Route path="/forgot" component={Forgot} exact />
            {/* <Router><Route path={"/resetpassword"} component={Login} exact /></Router> */}
            {/* {patharr} */}
          </Router>
        }

      </div>
    );
  }
}

export default App;
