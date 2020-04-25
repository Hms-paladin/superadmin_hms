
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import './drawerpage.css'
import { Dropdown } from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar'
import avatar from '../images/avatar.jpg'
import Badge from '@material-ui/core/Badge';
import bell from '../images/bell.png'
import Logo from '../images/Logo.png'

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

import { Menulist, MenuItem, ListItemText, ListItemIcon, MenuList, } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactSVG from 'react-svg'
import Paper from '@material-ui/core/Paper';
import Dashboard from '../component/dashboard';
import { Route, NavLink, withRouter, BrowserRouter as Router } from 'react-router-dom';
import Advertise_manage from '../component/Advertisement Management/Advertise_Manage';
import Media_upload from '../component/Media Upload/Media_upload';
import Approval_manage from '../component/Approval Management/Approval_manage';
import Doctor_spl from '../component/Doctor Speciality/Doctor_spl';
import Training_cat from '../component/Training Category/Training_cat';
import Training_center from '../component/Training Center/Training_center';
import Training_mode from '../component/Training Mode/Training_mode';
import Groupaccess from '../component/Groupaccess/groupaccess';
import Vendor_master from '../component/Vendor Master/Vendor_master';
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
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { Icon, message, Popconfirm } from "antd";
import { Collapse } from 'antd';
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router-dom';

const { Panel } = Collapse;
const history = createHistory()


const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
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
    current_location: "",
    mode: false,
    category: false,
    activeKey: "1",
    iconopen: true,
    activeKeyTrainer: "1",
    iconopenTrainer: true,
    activeKeyUser: "1",
    iconopenUser: true,

  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  viewmodalOpen = () => {
    this.setState({ viewmodal: true })
  }
  viewmodalClose = () => {
    this.setState({ viewmodal: false })
  }
  logoutOpen = () => {
    this.setState({ logout: true })

  }
  logoutClose = () => {
    this.setState({ logout: false })
  }

  componentDidMount() {
    this.setState({
      current_location: window.location.pathname
    })
  }

  active_box = () => {
    this.setState({
      current_location: window.location.pathname
    })
  }

  routeChange = (name) => {
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
    if (this.state.current_location === "/trainingcategory" || this.state.current_location === "/trainingmode") {
      this.setState({
        activeKey: "1",
        iconopen: false,

      })
    }
  }

  avoidFristClickChangeUser = () => {
    if (this.state.current_location === "/usermaster" || this.state.current_location === "/usertype" || this.state.current_location === "/usergroup") {
      this.setState({
        activeKeyUser: "1",
        iconopenUser: false,

      })
    }
  }



  iconClick = () => {


    if (this.state.iconopen && this.state.current_location === "/trainingcategory" || this.state.iconopen && this.state.current_location === "/trainingmode") {
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

  /* useraccess,usermaster,usertype,usergroup */

  iconClickUser = () => {


    if (this.state.iconopenUser && this.state.current_location === "/usermaster" || this.state.iconopenUser && this.state.current_location === "/usertype" || this.state.iconopenUser && this.state.current_location === "/usergroup") {
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
    if (this.state.current_location === "/trainer") {
      this.setState({
        activeKeyTrainer: "1",
        iconopenTrainer: false

      })
    }
  }

  iconClickTrainer = () => {

    if (this.state.iconopenTrainer && this.state.current_location === "/trainer") {
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


  render() {
    const { classes, theme, children } = this.props;
    const { current_location } = this.state
    let date = new Date();

    //  var current_location=window.location.pathname
    console.log(this.state.current_location, "current_location")
    console.log(this.state, "state")

    if (window.location.pathname === "/") {
      return <Redirect to="/doctorspecial" />
    }


    return (
      <div className="drawerpage_container">
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


              {/* <div className={`${this.state.open ? "dropdown-container" : "dropdown-container_close"}`}>
                <Dropdown >

                  <Badge color="secondary" variant="dot" className={classes.margin}>
                    <div className="notification-icon"> <img className="notification" src={bell} /></div>
                  </Badge>
                  <Dropdown.Toggle variant="my_style" id="dropdown-basic" onClick={this.logoutOpen}>
                    My Profile
                </Dropdown.Toggle>

                   <Dropdown.Menu className="dropdown-menu" >
                          <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Log out</Dropdown.Item> 
                        </Dropdown.Menu>  
                </Dropdown>

                <div className="date-wrapper1">
                  <div className="date-wrapper2">

                    <large className="date">  <Moment format='DD-MM-YYYY h:mm A'>{date}</Moment> </large>
                  </div>
                </div>
              </div> */}


              {/* <Avatar className="Avatar-image" alt="avatar-missing" src={avatar} onClick={this.viewmodalOpen} className={classes.avatar} /> */}

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

              <MenuItem component={Link} to="/doctorspecial" className={`${current_location === "/doctorspecial" && "active_text_heading"} iconColorGrey`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Doctor} /></div>
                </ListItemIcon>
                <ListItemText primary="Doctor Speciality" />
              </MenuItem>

              {/* component={Link} to="/trainingcenter" */}
              <MenuItem className={`${current_location === "/trainingcenter" ? "active_text_heading" : current_location === "/trainingcategory" ? "active_text_heading" : current_location === "/trainingmode" && "active_text_heading"} IconBaseline`} >
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={TrainingCenter} /></div>
                </ListItemIcon>


                <Collapse
                  bordered={false}

                  activeKey={this.state.iconopen ? [current_location === "/trainingcategory" ? "1" : current_location === "/trainingmode" && "1"] : [this.state.activeKey === "1" && "1"]}

                  expandIcon={({ isActive }) => <Icon onClick={this.iconClick} type="caret-right" rotate={isActive ? 90 : 0} />}
                  className="paperNone"
                  expandIconPosition={"right"}
                >
                  <Panel header={<span onClick={this.avoidFristClickChange} >< NavLink className={`${current_location === "/trainingcenter" && "panelTextDrawerclr"} panelTextDrawer`} to="/trainingcenter">Training Center</NavLink></span>} key="1" >
                    <div className="d-flex">
                      <NavLink to="/trainingcategory" className="d-flex">
                        <GreenRadio
                          checked={this.state.category && current_location === "/trainingcategory" || current_location === "/trainingcategory"}
                          className="greenCheckWid"
                          onClick={() => this.routeChange("category")}
                        />
                      </NavLink>

                      <MenuItem onClick={() => this.routeChange("category")} component={Link} to="/trainingcategory" className={`${current_location === "/trainingcategory" && "active_text_heading"} mttrainingCat`} >
                        <ListItemIcon>
                          <div className="icon-container">
                            <ReactSVG src={""} /></div>
                        </ListItemIcon>
                        <ListItemText primary="Training Category" />
                      </MenuItem>
                    </div>


                    <div className="d-flex" >
                      <NavLink to="/trainingmode" className="d-flex">
                        <GreenRadio
                          checked={this.state.mode && current_location === "/trainingmode" || current_location === "/trainingmode"}
                          className="greenCheckWidmode greenCheckWid"
                          onClick={() => this.routeChange("mode")}
                        />
                      </NavLink>

                      <MenuItem onClick={() => this.routeChange("mode")} component={Link} to="/trainingmode" className={`${current_location === "/trainingmode" && "active_text_heading"} mttrainingmod`}>
                        <ListItemIcon>
                          <div className="icon-container">
                            <ReactSVG src={""} /></div>
                        </ListItemIcon>
                        <ListItemText primary="Training Mode" />
                      </MenuItem>
                    </div>
                  </Panel>
                </Collapse>
              </MenuItem>


              {/* <MenuItem component={Link} to="/trainingcategory" className={current_location==="/trainingcategory" &&"active_text_heading"}>
              <ListItemIcon>
              <div className="icon-container">
                <ReactSVG  src={""}  /></div>  
               </ListItemIcon>
              <ListItemText  primary="Training Category" />
            </MenuItem>

            <MenuItem component={Link} to="/trainingmode" className={current_location==="/trainingmode" &&"active_text_heading"}>
              <ListItemIcon>
              <div className="icon-container">
                <ReactSVG  src={""}  /></div>  
               </ListItemIcon>
              <ListItemText  primary="Training Mode" />
            </MenuItem> */}

              <MenuItem className={`${current_location === "/trainercategory" ? "active_text_heading" : current_location === "/trainer" && "active_text_heading"} IconBaseline`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={TrainerSVG} /></div>
                </ListItemIcon>

                <Collapse
                  bordered={false}

                  activeKey={this.state.iconopenTrainer ? [current_location === "/trainer" && "1"] : [this.state.activeKeyTrainer === "1" && "1"]}

                  expandIcon={({ isActive }) => <Icon onClick={this.
                    iconClickTrainer} type="caret-right" rotate={isActive ? 90 : 0} />}
                  className="paperNone"
                  expandIconPosition={"right"}
                >
                  <Panel header={<span onClick={this.avoidFristClickChangeTrainer} >< NavLink className={`${current_location === "/trainercategory" && "panelTextDrawerclr"} panelTextDrawer`} to="/trainercategory">Trainer Category</NavLink></span>} key="1" >
                    <div className="d-flex">
                      <NavLink to="/trainer" className="d-flex">
                        <GreenRadio
                          checked={this.state.categoryTrainer && current_location === "/trainer" || current_location === "/trainer"}
                          className="greenCheckWid"
                          onClick={() => this.routeChange("trainer")}
                        />
                      </NavLink>

                      <MenuItem onClick={() => this.routeChange("trainer")} component={Link} to="/trainer" className={`${current_location === "/trainer" && "active_text_heading"} mttrainerCat`} >
                        <ListItemIcon>
                          <div className="icon-container">
                            <ReactSVG src={""} /></div>
                        </ListItemIcon>
                        <ListItemText primary="Trainer" />
                      </MenuItem>
                    </div>
                  </Panel>
                </Collapse>


              </MenuItem>

              {/* <MenuItem component={Link} to="/trainer" className={current_location==="/trainer" &&"active_text_heading"}>
              <ListItemIcon>
              <div className="icon-container">
                <ReactSVG  src={""}  /></div>  
               </ListItemIcon>
              <ListItemText  primary="Trainer" />
            </MenuItem> */}

              <MenuItem component={Link} to="/holidaymaster" className={current_location === "/holidaymaster" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={HolidayMaster} /></div>
                </ListItemIcon>
                <ListItemText primary="Holiday Master" />
              </MenuItem>

              <MenuItem component={Link} to="/advertisemanage" className={current_location === "/advertisemanage" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Advertise} /></div>
                </ListItemIcon>
                <ListItemText primary="Advertise Management" />
              </MenuItem>

              <MenuItem component={Link} to="/mediaupload" className={current_location === "/mediaupload" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={MediaUpload} /></div>
                </ListItemIcon>
                <ListItemText primary="Media Upload" />
              </MenuItem>

              <MenuItem component={Link} to="/approvalmanage" className={current_location === "/approvalmanage" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Approval} /></div>
                </ListItemIcon>
                <ListItemText primary="Approval Management" />
              </MenuItem>

              <MenuItem component={Link} to="/vendormaster" className={current_location === "/vendormaster" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Vendor} /></div>
                </ListItemIcon>
                <ListItemText primary="Vendor Master" />
              </MenuItem>

              <MenuItem component={Link} to="/commission" className={current_location === "/commission" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={CommissionSVG} /></div>
                </ListItemIcon>
                <ListItemText primary="Commission Management" />
              </MenuItem>

              <MenuItem component={Link} to="/healthtips" className={current_location === "/healthtips" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={HealthTips} /></div>
                </ListItemIcon>
                <ListItemText primary="Health Tips" />
              </MenuItem>

              <MenuItem component={Link} to="/notification" className={current_location === "/notification" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Notification} /></div>
                </ListItemIcon>
                <ListItemText primary="Notification Management" />
              </MenuItem>

              <MenuItem component={Link} to="/revenuepayment" className={current_location === "/revenuepayment" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Revenue} /></div>
                </ListItemIcon>
                <ListItemText primary="Revenue vendor payment" />
              </MenuItem>


              <MenuItem component={Link} to="/groupaccess" className={current_location === "/groupaccess" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={GroupAccess} /></div>
                </ListItemIcon>
                <ListItemText primary="Group Access Rights" />
              </MenuItem>


              {/* <Collapse
                  bordered={false}

                  activeKey={this.state.iconopen ? [current_location === "/trainingcategory" ? "1" : current_location === "/trainingmode" && "1"] : [this.state.activeKey === "1" && "1"]}

                  expandIcon={({ isActive }) => <Icon onClick={this.iconClick} type="caret-right" rotate={isActive ? 90 : 0} />}
                  className="paperNone"
                  expandIconPosition={"right"}
                >*/}
              {/* useraccess,usermaster,usertype,usergroup */}

              <MenuItem className={`${current_location === "/useraccess" ? "active_text_heading" : current_location === "/usermaster" ? "active_text_heading" : current_location === "/usertype" ? "active_text_heading" : current_location === "/usergroup" && "active_text_heading"} IconBaseline`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={AdminUser} /></div>
                </ListItemIcon>
                {/* <ListItemText primary="User Access Rights" /> */}


                <Collapse
                  bordered={false}

                  activeKey={this.state.iconopenUser ? [current_location === "/usermaster" ? "1" : current_location === "/usertype" ? "1" : current_location === "/usergroup" && "1"] : [this.state.activeKeyUser === "1" && "1"]}

                  expandIcon={({ isActive }) => <Icon onClick={this.iconClickUser} type="caret-right" rotate={isActive ? 90 : 0} />}
                  className="paperNone"
                  expandIconPosition={"right"}
                >
                  <Panel header={<span onClick={this.avoidFristClickChangeUser} >< NavLink className={`${current_location === "/useraccess" && "panelTextDrawerclr"} panelTextDrawer`} to="/useraccess">User Access Rights</NavLink></span>} key="1" >

                    <div className="d-flex">
                      <NavLink to="/usermaster" className="d-flex">
                        <GreenRadio
                          checked={this.state.userMaster && current_location === "/usermaster" || current_location === "/usermaster"}
                          className="greenCheckWid"
                          onClick={() => this.routeChange("userMaster")}
                        />
                      </NavLink>

                      <MenuItem onClick={() => this.routeChange("userMaster")} component={Link} to="/usermaster" className={`${current_location === "/usermaster" && "active_text_heading"} mttrainingCat`} >
                        <ListItemIcon>
                          <div className="icon-container">
                            <ReactSVG src={""} /></div>
                        </ListItemIcon>
                        <ListItemText primary="User Master" />
                      </MenuItem>
                    </div>


                    <div className="d-flex" >
                      <NavLink to="/usertype" className="d-flex">
                        <GreenRadio
                          checked={this.state.userType && current_location === "/usertype" || current_location === "/usertype"}
                          className="greenCheckWidmode greenCheckWid"
                          onClick={() => this.routeChange("userType")}
                        />
                      </NavLink>

                      <MenuItem onClick={() => this.routeChange("userType")} component={Link} to="/usertype" className={`${current_location === "/usertype" && "active_text_heading"} mttrainingmod`}>
                        <ListItemIcon>
                          <div className="icon-container">
                            <ReactSVG src={""} /></div>
                        </ListItemIcon>
                        <ListItemText primary="User Type" />
                      </MenuItem>
                    </div>


                    <div className="d-flex" >
                      <NavLink to="/usergroup" className="d-flex">
                        <GreenRadio
                          checked={this.state.userGroup && current_location === "/usergroup" || current_location === "/usergroup"}
                          className="greenCheckWidmode greenCheckWid"
                          onClick={() => this.routeChange("userGroup")}
                        />
                      </NavLink>

                      <MenuItem onClick={() => this.routeChange("userGroup")} component={Link} to="/usergroup" className={`${current_location === "/usergroup" && "active_text_heading"} mttrainingmod`}>
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

              {/* <MenuItem component={Link} to="/usermaster" className={current_location==="/usermaster" &&"active_text_heading"}>
              <ListItemIcon>
              <div className="icon-container">
                <ReactSVG  src={""}  /></div>  
               </ListItemIcon>
              <ListItemText  primary="User Master" />
            </MenuItem>

            <MenuItem component={Link} to="/usertype" className={current_location==="/usertype" &&"active_text_heading"}>
              <ListItemIcon>
              <div className="icon-container">
                <ReactSVG  src={""}  /></div>  
               </ListItemIcon>
              <ListItemText  primary="User Type" />
            </MenuItem>

            <MenuItem component={Link} to="/usergroup" className={current_location==="/usergroup" &&"active_text_heading"}>
              <ListItemIcon>
              <div className="icon-container">
                <ReactSVG  src={""}  /></div>  
               </ListItemIcon>
              <ListItemText  primary="User Group" />
            </MenuItem> */}

              <MenuItem component={Link} to="/" className={current_location === "/" && "active_text_heading"}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={""} /></div>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>


              {/* <MenuItem button className={classes.nested} component={Link} to="/Home/Dashboard">
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="DashBoard" />
            </MenuItem> */}

            </MenuList>

          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
              {children}
              {/* <Route exact path={`/`} component={Dashboard} /> */}

              <Route exact path={'/doctorspecial'} component={Doctor_spl} />

              <Route exact path={"/advertisemanage"} component={Advertise_manage} />

              <Route exact path={"/mediaupload"} component={Media_upload} />

              <Route exact path={'/approvalmanage'} component={Approval_manage} />

              <Route exact path={'/trainer'} component={Trainer} />

              <Route exact path={'/trainingcategory'} component={Training_cat} />

              <Route exact path={'/trainingcenter'} component={Training_center} />

              <Route exact path={'/trainingmode'} component={Training_mode} />

              <Route exact path={'/vendormaster'} component={Vendor_master} />

              <Route exact path={'/commission'} component={Commission} />

              <Route exact path={'/healthtips'} component={Health_tips} />

              <Route exact path={'/usergroup'} component={User_group} />

              <Route exact path={'/usertype'} component={User_type} />

              <Route exact path={'/usermaster'} component={User_master} />

              <Route exact path={'/holidaymaster'} component={Holiday_master} />

              <Route exact path={'/revenuepayment'} component={Revenue_payment} />

              <Route exact path={'/groupaccess'} component={Groupaccess} />

              <Route exact path={'/notification'} component={Notification_manage} />

              <Route exact path={'/trainercategory'} component={Trainer_category} />

              <Route exact path={'/useraccess'} component={Useraccess_rights} />




            </div>
          </main>
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
