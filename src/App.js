import React from 'react';
import Homepage from './drawerpage/drawerpage.js';
import Login from "./component/Login/Login.jsx";
import Forgot from './component/Login/Forgot';
import ResetPassword from "./component/Login/ResetPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const apiurl="http://52.200.251.222:8158/api/v1/"

class App extends React.Component {


  render(){

    var pathname=["/advertisemanage","/mediaupload",'/approvalmanage','/doctorspecial','/trainer','/trainingcategory','/trainingcenter','/trainingmode','/vendormaster','/commission','/healthtips','/usergroup','/usertype','/usermaster','/holidaymaster','/revenuepayment','/groupaccess','/notification','/trainercategory','/useraccess']

    var patharr=[]

    for(let i=0;i<pathname.length;i++){
      patharr.push(<Route exact path={pathname[i]} component={Login} />)
    }

    const params = new URLSearchParams(window.location.search)
    const token=params.get("tk")
    const mail=params.get("ma")

    return (
      <div>
            {localStorage.getItem('token')?
            <Router><Homepage /></Router>
            :
            window.location.pathname==="/resetpassword" && token && mail
            ?
            <Router><Route path={"/resetpassword"} component={ResetPassword} exact /></Router>
            :
            <Router>
            <Route exact path="/" component={Login} />
            <Route path="/forgot" component={Forgot} exact />
            <Router><Route path={"/resetpassword"} component={Login} exact /></Router>
            {patharr}
          </Router>
        }

      </div>
    );
  }
}

export default App;
