
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './drawerpage.css'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge';
import bell from '../images/bell.png'
import Logo from '../images/Logo.png'
import Button from '@material-ui/core/Button';
import AdminUser from '../images/AdminUser.svg';
import Advertise from '../images/Advertise.svg';
import Approval from '../images/Approval.svg';
import CommissionSVG from '../images/CommissionSVG.svg';
import Doctor from "../images/Doctor.svg";
import GroupAccess from '../images/GroupAccess.svg';
import HealthTips from '../images/HealthTips.svg';
import HolidayMaster from '../images/HolidayMaster.svg';
import MediaUpload from '../images/MediaUpload.svg';
import Notification from '../images/Notification.svg';
import Revenue from '../images/Revenue.svg';
import TrainerSVG from '../images/TrainerSVG.svg';
import TrainingCenter from '../images/TrainingCenter.svg';
import Vendor from '../images/Vendor.svg';
import { Dropdown } from 'react-bootstrap'
import { Menulist, MenuItem, ListItemText, ListItemIcon, MenuList, } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactSVG from 'react-svg'
import Paper from '@material-ui/core/Paper';
// import Dashboard from '../component/dashboard';
import { Route, NavLink, withRouter, BrowserRouter as Router } from 'react-router-dom';
import Advertise_manage from '../component/Advertisement Management/Advertise_Manage';
import Media_upload from '../component/Media Upload/Media_upload';
import Approval_manage from '../component/Approval Management/Approval_manage';
import Doctor_spl from '../component/Doctor Speciality/Doctor_spl';
import Training_cat from '../component/Training Category/Training_cat';
import Training_center from '../component/Training Center/Training_center';
import Training_mode from '../component/Training Mode/Training_mode';
import Groupaccess from '../component/Groupaccess/groupaccess';
import VendorProfile from '../component/VendorProfile/VendorProfile';
import Commission from '../component/Commission Management/Commission';
import Health_tips from '../component/Health Tips/Health_tips'
import User_group from '../component/User Group/User_group';
import User_type from '../component/User Type/User_type';
import User_master from '../component/User Master/User_master';
import Trainer from '../component/Trainer/Trainer';
import Trainer_category from '../component/Trainer category/trainer_cat';
import Holiday_master from '../component/Holiday Master/Holiday_master';
import Revenue_payment from '../component/Revenue Payment/Revenue_payment';
import Notification_manage from '../component/Notification Management/Notification_manage';
import Moment from 'react-moment'
import Useraccess_rights from '../component/User Access/user_access_rights';
import Radio from '@material-ui/core/Radio';
import { Icon, message, Popconfirm } from "antd";
import { Collapse } from 'antd';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from 'react-bootstrap/Card';
import { apiurl } from "../App.js";

import "./drawerpage.css"
// import ShoppingAbout from '../component/Shoppinng/shoppingabout';
import DashboardMaster from '../component/Dashboard/DashboardMaster'
import Total_orders from '../component/Total Orders/Total_orders'
import CancelledOrdersMaster from '../component/Cancelorder/CancelledOrdersMaster'
import RevenueMaster from '../component/Revenue/RevenueMaster'
import ManageCatagoryMaster from '../component/Manage_Catagory/ManageCatagoryMaster'
import ManageSubCatagoryMaster from '../component/ManageSubcatagory/ManageCatagoryMaster'
import Product_UploadMaster from "../component/Product_upload/Product_UploadMaster";
import TrackingMaster from "../component/DeliveryTracking/TrackingMaster";
import MediaUploadsMaster from "../component/MediaUploads/MediaUploadsMaster";
import Stocklist from "../component/Stock/Stocklist";
import Preorderlist from "../component/Preorder/Preorderlist";
import ProfileComp from "../component/LabProfile/ProfileComp";
import Notification_Category from '../component/Notification/Notification'
import Notification_Event from '../component/NotificationEvent/NotificationEvent.jsx'
import Notification_variable from '../component/NotificationVariable/NotificationVariable.jsx'
import Notification_New from '../component/NotificationNew/NotificationNew.jsx'










const { Panel } = Collapse;
const axios = require('axios');
const history = createHistory()


const GreenRadio = withStyles({
  root: {
    color: '#86b149',
    '&$checked': {
      color:'#86b149',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const drawerWidth = 260;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 100,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Homepage extends React.Component {
  state = {
    open: false,
    logout: false,
    current_location: window.location.href,
    mode: false,
    category: false,
    activeKey: "1",
    iconopen: true,
    activeKeyTrainer: "1",
    iconopenTrainer: true,
    activeKeyUser: "1",
    iconopenUser: true,
    userdata: [],
    training_rotate:window.location.href.includes("/trainingcategory") || window.location.href.includes("/trainingcenter"),
    trainer_rotate:window.location.href.includes("/trainercategory") || window.location.href.includes("/trainer"),
    user_rotate:window.location.href.includes("/usermaster") || window.location.href.includes("/usergroup") || window.location.href.includes("/useraccess"),
    // shopping_rotate:window.location.href.includes("/dashboard") || window.location.href.includes("/totalorders")  || window.location.href.includes("/cancelorders")
    //  || window.location.href.includes("/revenue") || window.location.href.includes("/managecategory") || window.location.href.includes("/managesubcategory") 
    //  || window.location.href.includes("/productupload") || window.location.href.includes("/deliverytracking") || window.location.href.includes("/mediauploadshopping") 
    //  || window.location.href.includes("/stock") || window.location.href.includes("/preorder") || window.location.href.includes("/profile") || window.location.href.includes("/report")
  };

  handleDrawerOpen = () => {
    this.setState({ open: true, logout: false });
  };

  handleDrawerClose = () => {
    this.setState({ open: false, logout: false });
  };
  viewmodalOpen = () => {
    this.setState({ viewmodal: true })
  }
  viewmodalClose = () => {
    this.setState({ viewmodal: false })
  }
  logoutOpen = () => {
    this.setState({ logout: !this.state.logout })

  }

  componentDidMount() {
    this.setState({
      current_location: window.location.href
    })

    var self = this
    axios({
      method: 'get',
      url: `${apiurl}getuser`
    })
      .then(function (response) {
        var userdata = []
        var userid = response.data.data.filter((val) => {
          if (val.email === localStorage.getItem("email")) {
            userdata.push({ name: val.user_name, email: val.email })
            return val.id
          }

        })

        self.useraccess(userid[0].id)
        self.setState({ userdata: userdata })
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  useraccess = (id) => {
    var self = this
    axios({
      method: 'post',
      url: `${apiurl}get_mas_user_permission`,
      data: {
        "user_id": id
      }
    })
      .then(function (response) {
        console.log(response.data.data, "get_mas_user_permission");
        self.setState({ useraccessdata: response.data.data })
      })

      .catch(function (error) {
        console.log(error, "error");
      });
  }

  active_box = () => {
    this.setState({
      current_location: window.location.href, logout: false
    })
  }

  routeChange = (name) => {
    this.setState({
      logout: false
    })
    if (name === "mode") {
      this.setState({
        mode: true,
        category: false
      })
    }
    else if (name === "trainer") {
      this.setState({
        categoryTrainer: true
      })
    }
    else if (name === "userMaster") {
      this.setState({
        userMaster: true,
        userType: false,
        userGroup: false
      })
    } else if (name === "userType") {
      this.setState({
        userMaster: false,
        userType: true,
        userGroup: false
      })
    } else if (name === "userGroup") {
      this.setState({
        userMaster: false,
        userType: false,
        userGroup: true
      })
    }
    else {
      this.setState({
        mode: false,
        category: true
      })
    }
  }

  avoidFristClickChange = () => {
    if (this.state.current_location.includes("/trainingcategory") || this.state.current_location.includes("/trainingmode")) {
      this.setState({
        activeKey: "1",
        iconopen: false,

      })
    }
  }

  avoidFristClickChangeUser = () => {
    if (this.state.current_location.includes("/usermaster") || this.state.current_location.includes("/usertype") || this.state.current_location.includes("/usergroup")) {
      this.setState({
        activeKeyUser: "1",
        iconopenUser: false,

      })
    }
  }

  iconClick = () => {


    if (this.state.iconopen && this.state.current_location.includes("/trainingcategory") || this.state.iconopen && this.state.current_location.includes("/trainingmode")) {
      var active_key = "0"
    }
    else if (this.state.iconopen) {
      var active_key = "1"
    }
    else {
      var active_key = "0"
    }

    if (this.state.activeKey === "1") {
      this.setState({ activeKey: active_key, iconopen: false })
    } else {
      this.setState({ activeKey: "1", iconopen: false })
    }
  }

  iconClickUser = () => {


    if (this.state.iconopenUser && this.state.current_location.includes("/usermaster") || this.state.iconopenUser && this.state.current_location.includes("/usertype") || this.state.iconopenUser && this.state.current_location.includes("/usergroup")) {
      var active_keyUser = "0"
    }
    else if (this.state.iconopenUser) {
      var active_keyUser = "1"
    }
    else {
      var active_keyUser = "0"
    }

    if (this.state.activeKeyUser === "1") {
      this.setState({ activeKeyUser: active_keyUser, iconopenUser: false })
    } else {
      this.setState({ activeKeyUser: "1", iconopenUser: false })
    }
  }

  avoidFristClickChangeTrainer = () => {
    if (this.state.current_location.endsWith("/trainercategory")) {
      this.setState({
        activeKeyTrainer: "1",
        iconopenTrainer: false

      })
    }
  }

  iconClickTrainer = () => {

    if (this.state.iconopenTrainer && this.state.current_location.endsWith("/trainer")) {
      var active_keyTrainer = "0"
    }
    else if (this.state.iconopenTrainer) {
      var active_keyTrainer = "1"
    }
    else {
      var active_keyTrainer = "0"
    }


    if (this.state.activeKeyTrainer === "1") {
      this.setState({ activeKeyTrainer: active_keyTrainer, iconopenTrainer: false })
    } else {
      this.setState({ activeKeyTrainer: "1", iconopenTrainer: false })
    }

  }

  logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    history.push('?/')
    window.location.reload()
  }

  closeLogoutmodel = (insidemodel) => {
    this.setState({ logout: false })
  }

  arrowrotate=(data)=>{
    if(data === "training"){
      this.setState({training_rotate:!this.state.training_rotate})
    }else if(data === "trainer"){
      this.setState({trainer_rotate:!this.state.trainer_rotate})
    }else if(data === "user"){
      this.setState({user_rotate:!this.state.user_rotate})
    }else if(data === "shopping"){
      this.setState({shopping_rotate:!this.state.shopping_rotate})
    }
  }

  // wholeclick=(endpoint)=>{
  //   alert(`${this.props.match.path}/${endpoint}`)
  //   return <NavLink push to={`${this.props.match.path}/${endpoint}`} />
  // }

  render() {
    const { classes, theme, children } = this.props;
    const { current_location } = this.state
    let date = new Date();

    console.log(this.state.useraccessdata && this.state.useraccessdata[0].item[0].item, "useraccessstate")

    const useraccess = this.state.useraccessdata && this.state.useraccessdata[0].item[0].item
    var username = this.state.userdata[0] && this.state.userdata[0].name

    var defaultActiveKey = current_location.includes("/trainingcategory") || current_location.includes("/trainingcenter") ? ["1"] : null

    console.log(defaultActiveKey,"includestest")

    return (
      <div>
        {this.state.logout &&
          <div className="cardprofiledrawer">
            <Card>
              <Card.Body className="cardbodylogout">
                <div className="profiledetail">
                  <div>{this.state.userdata && this.state.userdata[0].name}</div>
                  <div>{this.state.userdata && this.state.userdata[0].email}</div>
                </div>
                <Divider />
                <Button variant="outlined" onClick={this.logout} className="logoutbtn">Logout</Button>

              </Card.Body>
            </Card>
          </div>
        }
        <div className="drawerpage_container" onClick={this.state.logout && this.closeLogoutmodel} >
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: this.state.open,
              })}
            >
              <Toolbar disableGutters={!this.state.open}>
                <div className="drawer-logo-container"><img className="logo" src={Logo} alt="logo" /></div>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, {
                    [classes.hide]: this.state.open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <div className="dropdown_container">
                  <Dropdown >
                    <Dropdown.Toggle variant="" id="dropdown-basic" onClick={this.logoutOpen}>
                      {username}
                    </Dropdown.Toggle>
                  </Dropdown>

                  <div className="date-wrapper1">
                    <div className="date-wrapper2">

                      <large className="date">  <Moment format='DD-MM-YYYY h:mm A'>{date}</Moment> </large>
                    </div>
                  </div>

                </div>
                {/* {this.state.logout &&
                  <div className="cardprofiledrawer">
                    <Card>
                      <Card.Body className="cardbodylogout">
                        <div className="profiledetail">
                          <div>{this.state.userdata && this.state.userdata[0].name}</div>
                          <div>{this.state.userdata && this.state.userdata[0].email}</div>
                        </div>
                        <Divider />
                        <Button variant="outlined" onClick={this.logout} className="logoutbtn">Logout</Button>

                      </Card.Body>
                    </Card>
                  </div>
                } */}

              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              className={classNames(classes.drawer, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              })}
              classes={{
                paper: classNames({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open,
                }),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />

              <MenuList className="appbar_sideicons" onClick={this.active_box}>

                {useraccess && useraccess[0].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/doctorspecial`} className={`${current_location.includes("doctorspecial") && "active_text_heading"} iconColorGrey`}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Doctor} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Doctor Speciality" />
                </MenuItem>}
              
              {useraccess && useraccess[1].allow_view === "Y" || useraccess && useraccess[2].allow_view === "Y" ? 
                <Collapse
                  defaultActiveKey={current_location.includes("/trainingcategory") || current_location.includes("/trainingcenter") ? ["1"] : null}
                  onChange={()=>this.arrowrotate("training")}
                  className="collapseclrNone"
                  expandIcon={({ isActive }) =>
                  <ReactSVG src={TrainingCenter} />}
                >
                  <Panel header="Training Center" key="1" extra={this.state.training_rotate?<ArrowDropDownIcon />:<ArrowRightIcon />}>
                    {useraccess && useraccess[1].allow_view === "Y" &&
                <NavLink to={`${this.props.match.path}/trainingcategory`} className="d-flex">
                  <div className={`${current_location.includes("/trainingcategory") &&"submodulealignactive"} submodulealign`}>
                        {/* <NavLink to={`${this.props.match.path}/trainingcategory`} className="d-flex"> */}
                          <GreenRadio
                            checked={this.state.category && current_location.includes("/trainingcategory") || current_location.includes("/trainingcategory")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("category")}
                          />
                        {/* </NavLink> */}

                        <MenuItem onClick={() => this.routeChange("category")} component={Link} to={`${this.props.match.path}/trainingcategory`} className={`${current_location.includes("/trainingcategory") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Training Category" />
                        </MenuItem>
                      </div>
                      </NavLink>}
                      {useraccess && useraccess[2].allow_view === "Y" &&
                      <NavLink to={`${this.props.match.path}/trainingcenter`} className="d-flex">
                      <div className={`${current_location.includes("/trainingcenter") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={this.state.category && current_location.includes("/trainingcenter") || current_location.includes("/trainingcenter")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("trainingcenter")}
                          />

                        <MenuItem onClick={() => this.routeChange("trainingcenter")} component={Link} to={`${this.props.match.path}/trainingcenter`} className={`${current_location.includes("/trainingcenter") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Training" />
                        </MenuItem>
                      </div>
                      </NavLink>
                    }
                  </Panel>
                </Collapse>:null
                }
  

                {/* {useraccess && useraccess[1].allow_view === "Y" && useraccess[2].allow_view === "Y" ? <MenuItem className={`${current_location.includes("/trainingcenter") ? "active_text_heading" : current_location.includes("/trainingcategory") ? "active_text_heading" : current_location.includes("/trainingmode") && "active_text_heading"} IconBaseline`} >
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={TrainingCenter} /></div>
                  </ListItemIcon>


                  <Collapse
                    bordered={false}

                    activeKey={this.state.iconopen ? [current_location.includes("/trainingcategory") ? "1" : current_location.includes("/trainingmode") && "1"] : [this.state.activeKey === "1" && "1"]}

                    expandIcon={({ isActive }) => <Icon onClick={this.iconClick} type="caret-right" rotate={isActive ? 90 : 0} />}
                    className="paperNone"
                    expandIconPosition={"right"}
                  >
                    <Panel header={<span onClick={this.avoidFristClickChange} >< NavLink title={"Training Center Program"} className={`texteclipsetrainingcenter ${current_location.includes("/trainingcenter") && "panelTextDrawerclr"} panelTextDrawer`} to={`${this.props.match.path}/trainingcenter`}>Training Center Program</NavLink></span>} key="1">
                      <div className="d-flex">
                        <NavLink to={`${this.props.match.path}/trainingcategory`} className="d-flex">
                          <GreenRadio
                            checked={this.state.category && current_location.includes("/trainingcategory") || current_location.includes("/trainingcategory")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("category")}
                          />
                        </NavLink>

                        <MenuItem onClick={() => this.routeChange("category")} component={Link} to={`${this.props.match.path}/trainingcategory`} className={`${current_location.includes("/trainingcategory") && "active_text_heading"} mttrainingCat`} >
                          <ListItemIcon>
                            <div className="icon-container">
                              <ReactSVG src={""} /></div>
                          </ListItemIcon>
                          <ListItemText primary="Training Category" />
                        </MenuItem>
                      </div>

                    </Panel>
                  </Collapse>
                </MenuItem> : useraccess && useraccess[2].allow_view === "Y" ?
                    <MenuItem component={Link} to={`${this.props.match.path}/trainingcenter`} className={current_location.includes("/trainingcenter") && "active_text_heading"}>
                      <ListItemIcon>
                        <div className="icon-container">
                          <ReactSVG src={TrainingCenter} /></div>
                      </ListItemIcon>
                      <ListItemText primary="Training Center" />
                    </MenuItem> : useraccess && useraccess[1].allow_view === "Y" &&
                    <MenuItem component={Link} to={`${this.props.match.path}/trainingcategory`} className={current_location.includes("/trainingcategory") && "active_text_heading"}>
                      <ListItemIcon>
                        <div className="icon-container">
                          <ReactSVG src={TrainingCenter} /></div>
                      </ListItemIcon>
                      <ListItemText primary="Training Category" />
                    </MenuItem>

                } */}

              {useraccess && useraccess[3].allow_view === "Y" || useraccess && useraccess[4].allow_view === "Y"  ?
                <Collapse
                  defaultActiveKey={current_location.includes("/trainercategory") || current_location.includes("/trainer") ? ["1"] : null}
                  onChange={()=>this.arrowrotate("trainer")}
                  className="collapseclrNone"
                  expandIcon={({ isActive }) =>
                  <ReactSVG src={TrainerSVG} />}
                >
                  <Panel header="Trainer" key="1" extra={this.state.trainer_rotate?<ArrowDropDownIcon />:<ArrowRightIcon />}>
                    {useraccess && useraccess[3].allow_view === "Y" &&
                  <NavLink to={`${this.props.match.path}/trainercategory`} className="d-flex">
                  <div className={`${current_location.includes("/trainercategory") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={this.state.category && current_location.includes("/trainercategory") || current_location.includes("/trainercategory")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("trainercategory")}
                          />

                        <MenuItem onClick={() => this.routeChange("trainercategory")} component={Link} to={`${this.props.match.path}/trainercategory`} className={`${current_location.includes("/trainercategory") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Training Category" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      }
                      {useraccess && useraccess[4].allow_view === "Y" &&

                      <NavLink to={`${this.props.match.path}/trainer`} className="d-flex">
                      <div className={`${current_location.endsWith("/trainer") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={this.state.category && current_location.endsWith("/trainer") || current_location.endsWith("/trainer")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("trainer")}
                          />

                        <MenuItem onClick={() => this.routeChange("trainer")} component={Link} to={`${this.props.match.path}/trainer`} className={`${current_location.endsWith("/trainer") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Training" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      }
                  </Panel>
                </Collapse>:null
  }

                {/* {useraccess && useraccess[3].allow_view === "Y" && useraccess[4].allow_view === "Y" ?
                  <MenuItem className={`${current_location.includes("/trainercategory") ? "active_text_heading" : current_location.endsWith("/trainer") && "active_text_heading"} IconBaseline`}>
                    <ListItemIcon>
                      <div className="icon-container">
                        <ReactSVG src={TrainerSVG} /></div>
                    </ListItemIcon>

                    <Collapse
                      bordered={false}

                      activeKey={this.state.iconopenTrainer ? [current_location.endsWith("/trainercategory") && "1"] : [this.state.activeKeyTrainer === "1" && "1"]}

                      expandIcon={({ isActive }) => <Icon onClick={this.
                        iconClickTrainer} type="caret-right" rotate={isActive ? 90 : 0} />}
                      className="paperNone paneltextmargin"
                      expandIconPosition={"right"}
                    >
                      <Panel header={<span onClick={this.avoidFristClickChangeTrainer} >< NavLink className={`${current_location.endsWith("/trainer") && "panelTextDrawerclr"} panelTextDrawer`} to={`${this.props.match.path}/trainer`}>Trainer Program</NavLink></span>} key="1" >
                        <div className="d-flex">
                          <NavLink to={`${this.props.match.path}/trainercategory`} className="d-flex">
                            <GreenRadio
                              checked={this.state.categoryTrainer && current_location.endsWith("/trainercategory") || current_location.endsWith("/trainercategory")}
                              className="greenCheckWid"
                              onClick={() => this.routeChange("trainercategory")}
                            />
                          </NavLink>

                          <MenuItem onClick={() => this.routeChange("trainercategory")} component={Link} to={`${this.props.match.path}/trainercategory`} className={`${current_location.endsWith("/trainercategory") && "active_text_heading"} mttrainerCat`} >
                            <ListItemIcon>
                              <div className="icon-container">
                                <ReactSVG src={""} /></div>
                            </ListItemIcon>
                            <ListItemText primary="Trainer Category" />
                          </MenuItem>
                        </div>
                      </Panel>
                    </Collapse>


                  </MenuItem> : useraccess && useraccess[3].allow_view === "Y" ?
                    <MenuItem component={Link} to={`${this.props.match.path}/trainercategory`} className={current_location.includes("/trainercategory") && "active_text_heading"}>
                      <ListItemIcon>
                        <div className="icon-container">
                          <ReactSVG src={TrainerSVG} /></div>
                      </ListItemIcon>
                      <ListItemText primary="Trainer Category" />
                    </MenuItem> : useraccess && useraccess[4].allow_view === "Y" &&
                    <MenuItem component={Link} to={`${this.props.match.path}/trainer`} className={current_location.endsWith("/trainer") && "active_text_heading"}>
                      <ListItemIcon>
                        <div className="icon-container">
                          <ReactSVG src={TrainerSVG} /></div>
                      </ListItemIcon>
                      <ListItemText primary="Trainer" />
                    </MenuItem>

                } */}

                {useraccess && useraccess[5].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/holidaymaster`} className={current_location.includes("/holidaymaster") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={HolidayMaster} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Holiday Master" />
                </MenuItem>}

                {useraccess && useraccess[6].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/advertisemanage`} className={current_location.includes("/advertisemanage") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Advertise} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Advertise Management" />
                </MenuItem>}

                {useraccess && useraccess[7].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/mediaupload`} className={current_location.includes("/mediaupload") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={MediaUpload} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Media Upload" />
                </MenuItem>}

                {useraccess && useraccess[8].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/approvalmanage`} className={current_location.includes("/approvalmanage") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Approval} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Approval Management" />
                </MenuItem>}

                {useraccess && useraccess[9].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/commission`} className={current_location.includes("/commission") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={CommissionSVG} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Commission Management" />
                </MenuItem>}

                {useraccess && useraccess[10].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/healthtips`} className={current_location.includes("/healthtips") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={HealthTips} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Health Tips" />
                </MenuItem>}

                {useraccess && useraccess[11].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/notification`} className={current_location.includes("/notification") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Notification} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Notification Management" />
                </MenuItem>}

                {useraccess && useraccess[12].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/revenuepayment`} className={current_location.includes("/revenuepayment") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Revenue} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Revenue Vendor Payment" />
                </MenuItem>}


                {useraccess && useraccess[14].allow_view === "Y" || useraccess && useraccess[15].allow_view === "Y" || useraccess && useraccess[16].allow_view === "Y" ?
                <Collapse
                  defaultActiveKey={current_location.includes("/usermaster") || current_location.includes("/usergroup") || current_location.includes("/useraccess") ? ["1"] : null}
                  onChange={()=>this.arrowrotate("user")}
                  className="collapseclrNone"
                  expandIcon={({ isActive }) =>
                  <ReactSVG src={TrainerSVG} />}
                >
                  <Panel header="User" key="1" extra={this.state.user_rotate?<ArrowDropDownIcon />:<ArrowRightIcon />}>
                    { useraccess && useraccess[16].allow_view === "Y" &&
                  <NavLink to={`${this.props.match.path}/usermaster`} className="d-flex">
                  <div className={`${current_location.includes("/usermaster") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={this.state.category && current_location.includes("/usermaster") || current_location.includes("/usermaster")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("userMaster")}
                          />

                        <MenuItem onClick={() => this.routeChange("userMaster")} component={Link} to={`${this.props.match.path}/usermaster`} className={`${current_location.includes("/usermaster") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="User Master" />
                        </MenuItem>
                      </div>
                      </NavLink>
                    }
                      { useraccess && useraccess[15].allow_view === "Y" &&
                      <NavLink to={`${this.props.match.path}/usergroup`} className="d-flex">
                      <div className={`${current_location.endsWith("/usergroup") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={this.state.category && current_location.endsWith("/usergroup") || current_location.endsWith("/usergroup")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("userGroup")}
                          />

                        <MenuItem onClick={() => this.routeChange("userGroup")} component={Link} to={`${this.props.match.path}/usergroup`} className={`${current_location.endsWith("/usergroup") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="User Group" />
                        </MenuItem>
                      </div>
                      </NavLink>
                        }
                        { useraccess && useraccess[14].allow_view === "Y" &&
                      <NavLink to={`${this.props.match.path}/useraccess`} className="d-flex">
                      <div className={`${current_location.endsWith("/useraccess") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={this.state.category && current_location.endsWith("/useraccess") || current_location.endsWith("/useraccess")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("userAccess")}
                          />

                        <MenuItem onClick={() => this.routeChange("useraccess")} component={Link} to={`${this.props.match.path}/useraccess`} className={`${current_location.endsWith("/useraccess") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="User Access Rights" />
                        </MenuItem>
                      </div>
                      </NavLink>
                        }
                  </Panel>
                </Collapse>:null
                }

                {/* {useraccess && useraccess[13].allow_view === "Y" && <MenuItem component={Link} to={`${this.props.match.path}/groupaccess`} className={current_location.includes("/groupaccess") && "active_text_heading"}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={GroupAccess} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Group Access Rights" />
                </MenuItem>}

                {useraccess && useraccess[14].allow_view === "Y" && useraccess[15].allow_view === "Y" && useraccess[16].allow_view === "Y" ?
                  <MenuItem className={`${current_location.includes("/useraccess") ? "active_text_heading" : current_location.includes("/usermaster") ? "active_text_heading" : current_location.includes("/usertype") ? "active_text_heading" : current_location.includes("/usergroup") && "active_text_heading"} IconBaseline`}>
                    <ListItemIcon>
                      <div className="icon-container">
                        <ReactSVG src={AdminUser} /></div>
                    </ListItemIcon>

                    <Collapse
                      bordered={false}

                      activeKey={this.state.iconopenUser ? [current_location.includes("/usermaster") ? "1" : current_location.includes("/usertype") ? "1" : current_location.includes("/usergroup") && "1"] : [this.state.activeKeyUser === "1" && "1"]}

                      expandIcon={({ isActive }) => <Icon onClick={this.iconClickUser} type="caret-right" rotate={isActive ? 90 : 0} />}
                      className="paperNone"
                      expandIconPosition={"right"}
                    >
                      <Panel header={<span onClick={this.avoidFristClickChangeUser} >< NavLink className={`${current_location.includes("/useraccess") && "panelTextDrawerclr"} panelTextDrawer`} to={`${this.props.match.path}/useraccess`}>User Access Rights</NavLink></span>} key="1" >


                        <div className="d-flex usermastterrelative" >
                          <NavLink to={`${this.props.match.path}/usergroup`} className="d-flex">
                            <GreenRadio
                              checked={this.state.userGroup && current_location.includes("/usergroup") || current_location.includes("/usergroup")}
                              className="greenCheckWidmode greenCheckWid"
                              onClick={() => this.routeChange("userGroup")}
                            />
                          </NavLink>

                          <MenuItem onClick={() => this.routeChange("userGroup")} component={Link} to={`${this.props.match.path}/usergroup`} className={`${current_location.includes("/usergroup") && "active_text_heading"} mttrainingmod `}>
                            <ListItemIcon>
                              <div className="icon-container">
                                <ReactSVG src={""} /></div>
                            </ListItemIcon>
                            <ListItemText primary="User Group" />
                          </MenuItem>
                        </div>

                        <div className="d-flex">
                          <NavLink to={`${this.props.match.path}/usermaster`} className="d-flex">
                            <GreenRadio
                              checked={this.state.userMaster && current_location.includes("/usermaster") || current_location.includes("/usermaster")}
                              className="greenCheckWid"
                              onClick={() => this.routeChange("userMaster")}
                            />
                          </NavLink>

                          <MenuItem onClick={() => this.routeChange("userMaster")} component={Link} to={`${this.props.match.path}/usermaster`} className={`${current_location.includes("/usermaster") && "active_text_heading"} mttrainingCat`} >
                            <ListItemIcon>
                              <div className="icon-container">
                                <ReactSVG src={""} /></div>
                            </ListItemIcon>
                            <ListItemText primary="User Master" />
                          </MenuItem>
                        </div>
                      </Panel>
                    </Collapse>
                  </MenuItem>

                  : useraccess && useraccess[15].allow_view === "Y" && useraccess[16].allow_view === "Y" ? (
                    <>
                      <MenuItem component={Link} to={`${this.props.match.path}/usergroup`} className={current_location.includes("/usergroup") && "active_text_heading"}>
                        <ListItemIcon>
                          <div className="icon-container">
                            <ReactSVG src={AdminUser} /></div>
                        </ListItemIcon>
                        <ListItemText primary="User Group" />
                      </MenuItem>
                      <MenuItem component={Link} to={`${this.props.match.path}/usermaster`} className={current_location.includes("/usermaster") && "active_text_heading"}>
                        <ListItemIcon>
                          <div className="icon-container">
                            <ReactSVG src={AdminUser} /></div>
                        </ListItemIcon>
                        <ListItemText primary="User Master" />
                      </MenuItem>
                    </>)
                    : useraccess && useraccess[14].allow_view === "Y" && useraccess[15].allow_view === "Y" ? (
                      <MenuItem className={`${current_location.includes("/useraccess") ? "active_text_heading" : current_location.includes("/usermaster") ? "active_text_heading" : current_location.includes("/usertype") ? "active_text_heading" : current_location.includes("/usergroup") && "active_text_heading"} IconBaseline`}>
                        <ListItemIcon>
                          <div className="icon-container">
                            <ReactSVG src={AdminUser} /></div>
                        </ListItemIcon>

                        <Collapse
                          bordered={false}

                          activeKey={this.state.iconopenUser ? [current_location.includes("/usermaster") ? "1" : current_location.includes("/usertype") ? "1" : current_location.includes("/usergroup") && "1"] : [this.state.activeKeyUser === "1" && "1"]}

                          expandIcon={({ isActive }) => <Icon onClick={this.iconClickUser} type="caret-right" rotate={isActive ? 90 : 0} />}
                          className="paperNone"
                          expandIconPosition={"right"}
                        >
                          <Panel header={<span onClick={this.avoidFristClickChangeUser} >< NavLink className={`${current_location.includes("/useraccess") && "panelTextDrawerclr"} panelTextDrawer`} to={`${this.props.match.path}/useraccess`}>User Access Rights</NavLink></span>} key="1" >
                            <div className="d-flex grouprightspos" >
                              <NavLink to={`${this.props.match.path}/usergroup`} className="d-flex">
                                <GreenRadio
                                  checked={this.state.userGroup && current_location.includes("/usergroup") || current_location.includes("/usergroup")}
                                  className="greenCheckWidmode greenCheckWid"
                                  onClick={() => this.routeChange("userGroup")}
                                />
                              </NavLink>

                              <MenuItem onClick={() => this.routeChange("userGroup")} component={Link} to={`${this.props.match.path}/usergroup`} className={`${current_location.includes("/usergroup") && "active_text_heading"} mttrainingmod`}>
                                <ListItemIcon>
                                  <div className="icon-container">
                                    <ReactSVG src={""} /></div>
                                </ListItemIcon>
                                <ListItemText primary="User Group" />
                              </MenuItem>
                            </div>

                          </Panel>
                        </Collapse>
                      </MenuItem>

                    )
                      : useraccess && useraccess[14].allow_view === "Y" && useraccess[16].allow_view === "Y" ? (
                        <MenuItem className={`${current_location.includes("/useraccess") ? "active_text_heading" : current_location.includes("/usermaster") ? "active_text_heading" : current_location.includes("/usertype") ? "active_text_heading" : current_location.includes("/usergroup") && "active_text_heading"} IconBaseline`}>
                          <ListItemIcon>
                            <div className="icon-container">
                              <ReactSVG src={AdminUser} /></div>
                          </ListItemIcon>

                          <Collapse
                            bordered={false}

                            activeKey={this.state.iconopenUser ? [current_location.includes("/usermaster") ? "1" : current_location.includes("/usertype") ? "1" : current_location.includes("/usergroup") && "1"] : [this.state.activeKeyUser === "1" && "1"]}

                            expandIcon={({ isActive }) => <Icon onClick={this.iconClickUser} type="caret-right" rotate={isActive ? 90 : 0} />}
                            className="paperNone"
                            expandIconPosition={"right"}
                          >
                            <Panel header={<span onClick={this.avoidFristClickChangeUser} >< NavLink className={`${current_location.includes("/useraccess") && "panelTextDrawerclr"} panelTextDrawer`} to={`${this.props.match.path}/useraccess`}>User Access Rights</NavLink></span>} key="1" >

                              <div className="d-flex">
                                <NavLink to={`${this.props.match.path}/usermaster`} className="d-flex">
                                  <GreenRadio
                                    checked={this.state.userMaster && current_location.includes("/usermaster") || current_location.includes("/usermaster")}
                                    className="greenCheckWid"
                                    onClick={() => this.routeChange("userMaster")}
                                  />
                                </NavLink>

                                <MenuItem onClick={() => this.routeChange("userMaster")} component={Link} to={`${this.props.match.path}/usermaster`} className={`${current_location.includes("/usermaster") && "active_text_heading"} mttrainingCat`} >
                                  <ListItemIcon>
                                    <div className="icon-container">
                                      <ReactSVG src={""} /></div>
                                  </ListItemIcon>
                                  <ListItemText primary="User Master" />
                                </MenuItem>
                              </div>

                            </Panel>
                          </Collapse>
                        </MenuItem>) : useraccess && useraccess[14].allow_view === "Y" && (
                          <MenuItem component={Link} to={`${this.props.match.path}/useraccess`} className={current_location.includes("/useraccess") && "active_text_heading"}>
                            <ListItemIcon>
                              <div className="icon-container">
                                <ReactSVG src={AdminUser} /></div>
                            </ListItemIcon>
                            <ListItemText primary="User Access Rights" />
                          </MenuItem>
                        )
                } */}

                {<MenuItem component={Link} to={`${this.props.match.path}/vendormaster`} className={`${current_location.includes("vendormaster") && "active_text_heading"} iconColorGrey`}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Doctor} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Vendor Master" />
                </MenuItem>}
                {<MenuItem component={Link} to={`${this.props.match.path}/category`} className={`${current_location.includes("category") && "active_text_heading"} iconColorGrey`}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Doctor} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Notification Category" />
                </MenuItem>}
                {<MenuItem component={Link} to={`${this.props.match.path}/event`} className={`${current_location.includes("event") && "active_text_heading"} iconColorGrey`}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Doctor} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Notification Event" />
                </MenuItem>}
                {<MenuItem component={Link} to={`${this.props.match.path}/variable`} className={`${current_location.includes("variable") && "active_text_heading"} iconColorGrey`}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Doctor} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Notification Variable" />
                </MenuItem>}
                {<MenuItem component={Link} to={`${this.props.match.path}/new_notification`} className={`${current_location.includes("new_notification") && "active_text_heading"} iconColorGrey`}>
                  <ListItemIcon>
                    <div className="icon-container">
                      <ReactSVG src={Doctor} /></div>
                  </ListItemIcon>
                  <ListItemText primary="Notification" />
                </MenuItem>}

                <Collapse
                  defaultActiveKey={current_location.includes("/dasboard") && current_location.includes("/dasboard") ? ["1"] : null}
                  onChange={()=>this.arrowrotate("shopping")}
                  className="collapseclrNone"
                  expandIcon={({ isActive }) =>
                  <ReactSVG src={TrainerSVG} />}
                >
                  {/* {console.log(current_location.includes("/shoppingabout"),"shoppingabout")} */}
                  <Panel header="Shopping" key="1" extra={this.state.shopping_rotate?<ArrowDropDownIcon />:<ArrowRightIcon />}>
                    
                  {/* <NavLink to={`${this.props.match.path}/shoppingabout`} className="d-flex">
                  <div className={`${current_location.includes("/shoppingabout") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/shoppingabout")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("shoppingabout")}
                          />

                        <MenuItem onClick={() => this.routeChange("shoppingabout")} component={Link} to={`${this.props.match.path}/shoppingabout`} className={`${current_location.includes("/shoppingabout") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Shopping About" />
                        </MenuItem>
                      </div>
                      </NavLink> */}
                      <NavLink to={`${this.props.match.path}/dashboard`} className="d-flex">
                  <div className={`${current_location.includes("/dashboard") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/dashboard")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("dashboard")}
                          />

                        <MenuItem onClick={() => this.routeChange("dashboard")} component={Link} to={`${this.props.match.path}/dashboard`} className={`${current_location.includes("/dashboard") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Dashboard" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/totalorders`} className="d-flex">
                  <div className={`${current_location.includes("/totalorders") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/totalorders")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("totalorders")}
                          />

                        <MenuItem onClick={() => this.routeChange("totalorders")} component={Link} to={`${this.props.match.path}/totalorders`} className={`${current_location.includes("/totalorders") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Total Orders" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/cancelorders`} className="d-flex">
                  <div className={`${current_location.includes("/cancelorders") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/cancelorders")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("cancelorders")}
                          />

                        <MenuItem onClick={() => this.routeChange("cancelorders")} component={Link} to={`${this.props.match.path}/cancelorders`} className={`${current_location.includes("/cancelorders") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Cancelled Orders" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      
                      <NavLink to={`${this.props.match.path}/revenue`} className="d-flex">
                  <div className={`${current_location.includes("/revenue") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/revenue")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("revenue")}
                          />

                        <MenuItem onClick={() => this.routeChange("revenue")} component={Link} to={`${this.props.match.path}/revenue`} className={`${current_location.includes("/revenue") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Revenue" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/managecategory`} className="d-flex">
                  <div className={`${current_location.includes("/managecategory") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/managecategory")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("managecategory")}
                          />

                        <MenuItem onClick={() => this.routeChange("managecategory")} component={Link} to={`${this.props.match.path}/managecategory`} className={`${current_location.includes("/managecategory") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Manage Category" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/managesubcategory`} className="d-flex">
                  <div className={`${current_location.includes("/managesubcategory") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/managesubcategory")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("managesubcategory")}
                          />

                        <MenuItem onClick={() => this.routeChange("managesubcategory")} component={Link} to={`${this.props.match.path}/managesubcategory`} className={`${current_location.includes("/managesubcategory") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Manage sub Category" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/productupload`} className="d-flex">
                  <div className={`${current_location.includes("/productupload") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/productupload")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("productupload")}
                          />

                        <MenuItem onClick={() => this.routeChange("productupload")} component={Link} to={`${this.props.match.path}/productupload`} className={`${current_location.includes("/productupload") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Product Upload" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/deliverytracking`} className="d-flex">
                  <div className={`${current_location.includes("/deliverytracking") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/deliverytracking")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("deliverytracking")}
                          />

                        <MenuItem onClick={() => this.routeChange("deliverytracking")} component={Link} to={`${this.props.match.path}/deliverytracking`} className={`${current_location.includes("/deliverytracking") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Product Upload" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/mediauploadshopping`} className="d-flex">
                  <div className={`${current_location.includes("/mediauploadshopping") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/mediauploadshopping")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("mediauploadshopping")}
                          />

                        <MenuItem onClick={() => this.routeChange("mediauploadshopping")} component={Link} to={`${this.props.match.path}/mediauploadshopping`} className={`${current_location.includes("/mediauploadshopping") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Media Upload" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/stock`} className="d-flex">
                  <div className={`${current_location.includes("/stock") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/stock")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("stock")}
                          />

                        <MenuItem onClick={() => this.routeChange("stock")} component={Link} to={`${this.props.match.path}/stock`} className={`${current_location.includes("/stock") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Stock" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/preorder`} className="d-flex">
                  <div className={`${current_location.includes("/preorder") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/preorder")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("preorder")}
                          />

                        <MenuItem onClick={() => this.routeChange("preorder")} component={Link} to={`${this.props.match.path}/preorder`} className={`${current_location.includes("/preorder") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Pre-Order" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/profile`} className="d-flex">
                  <div className={`${current_location.includes("/profile") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/profile")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("profile")}
                          />

                        <MenuItem onClick={() => this.routeChange("profile")} component={Link} to={`${this.props.match.path}/profile`} className={`${current_location.includes("/profile") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Profile" />
                        </MenuItem>
                      </div>
                      </NavLink>
                      <NavLink to={`${this.props.match.path}/report`} className="d-flex">
                  <div className={`${current_location.includes("/report") &&"submodulealignactive"} submodulealign`}>
                          <GreenRadio
                            checked={current_location.includes("/report")}
                            className="greenCheckWid"
                            onClick={() => this.routeChange("report")}
                          />

                        <MenuItem onClick={() => this.routeChange("report")} component={Link} to={`${this.props.match.path}/report`} className={`${current_location.includes("/report") && "active_text_heading"} mttrainingCat`} >
                          <ListItemText primary="Report" />
                        </MenuItem>
                      </div>
                      </NavLink>




                  </Panel>
                </Collapse>

              </MenuList>

            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <div>
                {children}

                {useraccess && useraccess[0].allow_view === "Y" && <Route exact path={`${this.props && this.props.match.path}/doctorspecial`} render={() => <Doctor_spl uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[1].allow_view === "Y" && <Route exact path={`${this.props.match.path}/trainingcategory`} render={() => <Training_cat uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[2].allow_view === "Y" && <Route exact path={`${this.props.match.path}/trainingcenter`} render={() => <Training_center uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[3].allow_view === "Y" && <Route exact path={`${this.props.match.path}/trainercategory`} render={() => <Trainer_category uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[4].allow_view === "Y" && <Route exact path={`${this.props.match.path}/trainer`} render={() => <Trainer uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[5].allow_view === "Y" && <Route exact path={`${this.props.match.path}/holidaymaster`} render={() => <Holiday_master uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[6].allow_view === "Y" && <Route exact path={`${this.props.match.path}/advertisemanage`} render={() => <Advertise_manage uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[7].allow_view === "Y" && <Route exact path={`${this.props.match.path}/mediaupload`} render={() => <Media_upload uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[8].allow_view === "Y" && <Route exact path={`${this.props.match.path}/approvalmanage`} render={() => <Approval_manage uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[9].allow_view === "Y" && <Route exact path={`${this.props.match.path}/commission`} render={() => <Commission uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[10].allow_view === "Y" && <Route exact path={`${this.props.match.path}/healthtips`} render={() => <Health_tips uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[11].allow_view === "Y" && <Route exact path={`${this.props.match.path}/notification`} render={() => <Notification_manage uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[12].allow_view === "Y" && <Route exact path={`${this.props.match.path}/revenuepayment`} render={() => <Revenue_payment uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[13].allow_view === "Y" && <Route exact path={`${this.props.match.path}/groupaccess`} render={() => <Groupaccess uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[14].allow_view === "Y" && <Route exact path={`${this.props.match.path}/useraccess`} render={() => <Useraccess_rights uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[15].allow_view === "Y" && <Route exact path={`${this.props.match.path}/usergroup`} render={() => <User_group uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                {useraccess && useraccess[16].allow_view === "Y" && <Route exact path={`${this.props.match.path}/usermaster`} render={() => <User_master uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />}

                <Route exact path={`${this.props.match.path}/vendormaster`} render={() => <VendorProfile uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />

                {/* <Route exact path={`${this.props.match.path}/shoppingabout`} render={() => <ShoppingAbout uservalue={this.state.useraccessdata && this.state.useraccessdata} />} /> */}

                <Route exact path={`${this.props.match.path}/dashboard`} render={() => <DashboardMaster uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/totalorders`} render={() => <Total_orders uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/cancelorders`} render={() => <CancelledOrdersMaster uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/revenue`} render={() => <RevenueMaster uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/managecategory`} render={() => <ManageCatagoryMaster uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/managesubcategory`} render={() => <ManageSubCatagoryMaster uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/productupload`} render={() => <Product_UploadMaster uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/deliverytracking`} render={() => <TrackingMaster uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/mediauploadshopping`} render={() => <MediaUploadsMaster uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/stock`} render={() => <Stocklist uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/preorder`} render={() => <Preorderlist uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/profile`} render={() => <ProfileComp uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/category`} render={() => <Notification_Category uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/event`} render={() => <Notification_Event uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/variable`} render={() => <Notification_variable uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />
                <Route exact path={`${this.props.match.path}/new_notification`} render={() => <Notification_New uservalue={this.state.useraccessdata && this.state.useraccessdata} />} />


                {/* <Route exact path={'/usertype'}  render={() => <User_type uservalue={this.state.useraccessdata && this.state.useraccessdata}/> } /> */}

                {/* <Route exact path={'/trainingmode'}  render={() => <Training_mode uservalue={this.state.useraccessdata && this.state.useraccessdata}/> } /> */}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Homepage);
