import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import Dropdownantd from "../../formcomponent/dropdownantd";
import Grid from '@material-ui/core/Grid';
import { Switch } from 'antd';
import Chip from '@material-ui/core/Chip';
import { apiurl } from "../../../src/App.js";
import { Spin, notification } from 'antd';
import DeleteMedia from "../../helper/deletemodel";

import "./User_master.css";

const axios = require('axios');

var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti = dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class User_master extends React.Component {

  state = {
    openview: false,
    insertmodalopen: false,
    status: true,
    props_loading: false,
    currentdata: [],
    usertype: [],
    usergroup: [],
    usertype_sel: "",
    usergroup_sel: "",
    nochan_type: "",
    nochan_grp: "",
    pass_arr: [],
    deleteopen: false,
    loading: true,
    errmsg:null,
  }

  componentDidMount() {
    var self = this
    axios({
      method: 'get',
      url: `${apiurl}getuser`
    })
      .then(function (response) {
        var arrval = []
        var get_pass = []
        response.data.data.map((value) => {
          arrval.push({ user_name: value.user_name, mobileno: value.mobileno, email: value.email, user_type: value.user_type, groupname: value.groupname, status: (value.active_flag === 1 ? <Chip label="Active" className="status_usermaster_active" variant="outlined" /> : <Chip label="In-Active" className="status_usermaster_inactive" variant="outlined" />), id: value.id })
          get_pass.push({ password: value.password, id: value.id })
        })
        console.log(response.data.data, "response")
        self.setState({
          currentdata: arrval,
          pass_arr: get_pass

        })
      })
      .catch(function (error) {
        console.log(error, "error");
      });


    axios({
      method: 'get',
      url: `${apiurl}getuserType`
    })
      .then(function (response) {
        var arrval = []
        response.data.data.map((value) => {
          arrval.push({ dropdown_val: value.user_type, id: value.id })
        })
        self.setState({
          usertype: arrval,
          loading: false,
          usertype_sel: arrval[0].dropdown_val,
          nochan_type: arrval[0].dropdown_val
        })
        console.log(arrval, "currentdata")

      })
      .catch(function (error) {
        console.log(error, "error");
      });

    axios({
      method: 'get',
      url: `${apiurl}getGroup`
    })
      .then(function (response) {
        var arrval = []
        response.data.data.map((value) => {
          arrval.push({ dropdown_val: value.groupname, id: value.id })
        })
        self.setState({
          usergroup: arrval,
          usergroup_sel: arrval[0].dropdown_val,
          loading: false,
          nochan_grp: arrval[0].dropdown_val,

        })
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }


  recall = (type, msgdyn) => {
    var self = this
    axios({
      method: 'get',
      url: `${apiurl}getuser`
    })
      .then(function (response) {
        var arrval = []
        var get_pass = []

        response.data.data.map((value) => {
          arrval.push({ user_name: value.user_name, mobileno: value.mobileno, email: value.email, user_type: value.user_type, groupname: value.groupname, status: (value.active_flag === 1 ? <Chip label="Active" className="status_usermaster_active" variant="outlined" /> : <Chip label="In-Active" className="status_usermaster_inactive" variant="outlined" />), id: value.id })
          get_pass.push({ password: value.password, id: value.id })
        })
        self.setState({
          currentdata: arrval,
          loading: false,
          props_loading: false,
          pass_arr: get_pass
        })

        notification[type]({
          className: "show_frt",
          message: "Record" + " " + msgdyn + " " + "successfully",
        });
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  add_data = () => {
    if (this.state.username === "") {
      this.setState({
        errmsg_name: "Username is required"
      })
    }
     if(this.state.password === ""){
    this.setState({
    errmsg_pass: "Password is required"
    })
    }

    else if(this.state.password.length < 4){
      this.setState({
        errmsg_pass: "Password must have 4 characters"
      })
      }

     if(this.state.mobile === ""){
    this.setState({
      errmsg_mobile: "Mobile no. is required"
    })
    }

    else if(isNaN(this.state.mobile)){
      this.setState({
        errmsg_mobile: "Mobile no. is invalid"
      })
    }

    else if(this.state.mobile.length<10){
      this.setState({
        errmsg_mobile: "Mobile no. is invalid"
      })
    }

    if(this.state.email === ""){
      this.setState({
        errmsg_email: "Email is required"
      })
      }

      else if(!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)){
        this.setState({
          errmsg_email: "Email is invaid"
        })
      }

      var callapi=[this.state.username !== "",this.state.password !== "",this.state.password.length >= 4,this.state.mobile !== "",!isNaN(this.state.mobile),this.state.mobile.length>=10,this.state.email !== "",new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)]

      
    if(callapi.every((parameter)=>parameter===true)) {
    this.setState({ props_loading: true })

    var userTypeId = this.state.usertype.filter((val) => {
      if (val.dropdown_val === this.state.usertype_sel) {
        return val.id
      } else if (val.id === this.state.usertype_sel) {
        return val.id
      }
    })

    var groupId = this.state.usergroup.filter((val) => {
      if (val.dropdown_val === this.state.usergroup_sel) {
        return val.id
      } else if (val.id === this.state.usergroup_sel) {
        return val.id
      }
    })

    var self = this
    axios({
      method: 'post',
      url: `${apiurl}insertuser`,
      data: {
        "username": this.state.username,
        "password": this.state.password,
        "mobileno": this.state.mobile,
        "email": this.state.email,
        "groupId": groupId[0].id,
        "userTypeId": userTypeId[0].id,
        "created_by": "1",
        "active_flag": "1"
      },
    })
      .then(function (response) {
        console.log(response, "add_res");

        self.recall("success", "added")

      })
      .catch(function (error) {
        console.log(error, "error");
      });

    this.setState({
      insertmodalopen: false,
      "username": "",
      "password": "",
      "mobile": "",
      "email": "",
      "usertype_sel": this.state.nochan_type,
      "usergroup_sel": this.state.nochan_grp,

    })
  }
  }


  update_data = () => {

    if (this.state.username === "") {
      this.setState({
        errmsg_name: "Field is Required"
      })
    }
     if(this.state.password === ""){
    this.setState({
    errmsg_pass: "Field is Required"
    })
    }

    else if(this.state.password.length < 4){
      this.setState({
        errmsg_pass: "Password must have 4 characters"
      })
      }

     if(this.state.mobile === ""){
    this.setState({
      errmsg_mobile: "Field is Required"
    })
    }

    else if(isNaN(this.state.mobile)){
      this.setState({
        errmsg_mobile: "Mobile no. is invalid"
      })
    }

    else if(this.state.mobile.length<10){
      this.setState({
        errmsg_mobile: "Mobile no. is invalid"
      })
    }

    if(this.state.email === ""){
      this.setState({
        errmsg_email: "Field is Required"
      })
      }

      else if(!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)){
        this.setState({
          errmsg_email: "Email is invaid"
        })
      }

      var callapi=[this.state.username !== "",this.state.password !== "",this.state.password.length >= 4,this.state.mobile !== "",!isNaN(this.state.mobile),this.state.mobile.length>=10,this.state.email !== "",new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)]

      
    if(callapi.every((parameter)=>parameter===true)) {
    this.setState({ props_loading: true })


    var userTypeId = this.state.usertype.filter((val) => {
      if (val.dropdown_val === this.state.usertype_sel) {
        return val.id
      } else if (val.id === this.state.usertype_sel) {
        return val.id
      }
    })

    var groupId = this.state.usergroup.filter((val) => {
      if (val.dropdown_val === this.state.usergroup_sel) {
        return val.id
      } else if (val.id === this.state.usergroup_sel) {
        return val.id
      }
    })


    var self = this
    axios({
      method: 'put',
      url: `${apiurl}edituser`,
      data: {
        "username": this.state.username,
        "password": this.state.password,
        "mobileno": this.state.mobile,
        "email": this.state.email,
        "groupId": groupId[0].id,
        "userTypeId": userTypeId[0].id,
        "modified_by": "1",
        "Id": this.state.current_edit_id,
        "active_flag": this.state.status === true ? 1 : 0
      }

    })
      .then(function (response) {
        self.recall("success", "edited")
      })
      .catch(function (error) {
        console.log(error, "edit_ed_err");
      });
    this.setState({
      insertmodalopen: false,
    })
    }
  }

  deleterow = () => {
    this.setState({ props_loading: true })

    var self = this
    axios({
      method: 'delete',
      url: `${apiurl}deleteuser`,
      data: {
        "id": this.state.iddata.toString(),
      }
    })
      .then(function (response) {

        self.recall("info", "deleted")
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    this.setState({
      insertmodalopen: false,
    })
  }




  modelopen = (data, id) => {
    var editdata = this.state.currentdata.filter((data) => {
      return data.id === id
    })

    let edit_pass = this.state.pass_arr.filter((val) => {
      return val.id === id
    })

    console.log(edit_pass, "editpass")
    this.setState({

      username: editdata[0].user_name,
      password: edit_pass[0].password,
      mobile: editdata[0].mobileno,
      email: editdata[0].email,
      usertype_sel: editdata[0].user_type,
      usergroup_sel: editdata[0].groupname,
      modeltype: "edit",
      insertmodalopen: true,
      current_edit_id: id,
      errmsg_name:null,
      errmsg_pass:null,
      errmsg_mobile:null,
      errmsg_email:null,

    })
  }

  closemodal = () => {
    this.setState({ openview: false, editopen: false, insertmodalopen: false, deleteopen: false })
  }

  insertdata = () => {
    this.setState({
      insertmodalopen: true,
      modeltype: "view",
      "username": "",
      "password": "",
      "mobile": "",
      "email": "",
      "usertype_sel": this.state.nochan_type,
      "usergroup_sel": this.state.nochan_grp,
      errmsg_name:null,
      errmsg_pass:null,
      errmsg_mobile:null,
      errmsg_email:null,
    })
  }

  handlechange = () => {
    this.setState({
      status: !this.state.status
    })
  }

  changeDynamic = (data, name) => {
    if(name){
      var errmsg=name==="username"?"errmsg_name":name==="password"?"errmsg_pass":name==="mobile"?"errmsg_mobile":name==="email"?"errmsg_email":null
    }
    this.setState({
      [name]: data,
      [errmsg]:null
    })
  }

  deleteopen = (type, id) => {
    this.setState({
      deleteopen: true,
      iddata: id
    })
  }

  render() {
    var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[4]

    return (
      <div>
        {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
          <div>
            <div className="user_master_header">
              <div className="user_master_title"><h3>USER MASTER</h3></div>
              <img className={`plus ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" && this.insertdata} src={PlusIcon} />
            </div>
            <Tablecomponent heading={[
              { id: "", label: "S.No" },
              { id: "user_name", label: "User Name" },
              { id: "mobile_no", label: "Mobile Number" },
              { id: "email_id", label: "E-mail Id" },
              { id: "user_type", label: "User Type" },
              { id: "user_group", label: "User Group" },
              { id: "status", label: "Status" },
              { id: "", label: "Action" }
            ]}

              rowdata={this.state.currentdata}
              tableicon_align={""}
              modelopen={(e, id) => this.modelopen(e, id)}
              props_loading={this.state.props_loading}
              alignheading="cus_wid_usermaster_head"
              VisibilityIcon="close"
              deleteopen={this.deleteopen}
              editpermission={useraccess && useraccess.allow_edit}
              deletepermission={useraccess && useraccess.allow_delete}
            />

            <Modalcomp customwidth_dialog="user_master_modal" visible={this.state.insertmodalopen}
              title={this.state.modeltype === "view" ? "ADD USER" : "Edit DETAILS"}
              closemodal={(e) => this.closemodal(e)}>
              <div className="usermaster_modal">
                <div className="master_content_one">

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      {/* {"test"} */}
                      <Inputantd label="Username" className="username_option" placeholder=""
                        changeData={(data) => this.changeDynamic(data, "username")}
                        value={this.state.username} autoFocus={true} 
                        errmsg={this.state.errmsg_name} onPressEnter={this.state.modeltype === "view" ?this.add_data:this.update_data}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Inputantd label="Password" className="usermaster_option" placeholder="" changeData={(data) => this.changeDynamic(data, "password")}
                        value={this.state.password} errmsg={this.state.errmsg_pass} onPressEnter={this.state.modeltype === "view" ?this.add_data:this.update_data}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Inputantd label="Mobile Number" className="usermaster_option" placeholder="" changeData={(data) => this.changeDynamic(data, "mobile")}
                        value={this.state.mobile} errmsg={this.state.errmsg_mobile} onPressEnter={this.state.modeltype === "view" ?this.add_data:this.update_data}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} className="content_master_two">
                    <Grid item xs={12} md={4}>
                      <Inputantd label="E-mail Id" className="usermaster_option" placeholder=""
                        changeData={(data) => this.changeDynamic(data, "email")}
                        value={this.state.email} errmsg={this.state.errmsg_email} onPressEnter={this.state.modeltype === "view" ?this.add_data:this.update_data}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Dropdownantd label="User Type" className="usermaster_drop" option={this.state.usertype}
                        changeData={(data) => this.changeDynamic(data, "usertype_sel")}
                        value={this.state.usertype_sel} />
                    </Grid>
                    <Grid item xs={12} md={4}>

                      <Dropdownantd label="User Group" className="usermaster_drop" option={this.state.usergroup}
                        changeData={(data) => this.changeDynamic(data, "usergroup_sel")}
                        value={this.state.usergroup_sel}
                      />
                    </Grid>

                    <Grid item xs={12} md={12} className="usermasrter_grid_three">
                      <div className="usermaster_switch">
                        {this.state.modeltype === "edit" &&
                          <>
                            <p>{this.state.status ? "Active" : "Inactive"}</p>
                            <Switch size="small" className="switch_grid" checked={this.state.status} onChange={this.handlechange}> </Switch></>}
                      </div>

                      <div>
                        <Button className="usermaster_button_cancel" onClick={this.closemodal}>Cancel</Button>
                        {this.state.modeltype === "view" ?
                          <Button className="group_button_create" onClick={this.add_data}>Create</Button> :
                          <Button className="group_button_create" onClick={this.update_data}>Update</Button>
                        }
                      </div>

                    </Grid>
                  </Grid>
                </div>
              </div>
            </Modalcomp>

            <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
              <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} content={"Are You Sure Want to Inactive This Record?"}/>
            </Modalcomp>

          </div>}
      </div>
    )
  }
}

