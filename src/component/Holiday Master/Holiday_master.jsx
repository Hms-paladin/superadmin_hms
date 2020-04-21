import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Range_Calendar from "./react_range_calender";
import { apiurl } from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin, notification } from 'antd';
import moment from 'moment';

import "./Holiday_master.css";

const axios = require('axios');


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti = dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class Holiday_master extends React.Component {

  state = {
    openview: false,
    insertmodalopen: false,
    props_loading: false,
    currentdata: [],
    onceOpen: true,
    editdataset: "",
    editdatasetopen: true,
    loading:true

  }

  componentDidMount() {
    var self = this
    axios({
      method: 'get',
      url: `${apiurl}get_mas_holiday_master`
    })
      .then(function (response) {
        var arrval = []
        response.data.data.map((value) => {
          arrval.push({ holiday: value.holiday_name, day: value.holiday_date, id: value.id })
        })
        self.setState({
          currentdata: arrval,
          loading: false
        })
      })
      .catch(function (error) {
        console.log(error, "error");
      });

  }

  addData = () => {

    var holiday_namebol
    if (this.state.holiday_arr) {
      holiday_namebol = this.state.holiday_arr.filter((val) => {
        return (val.holiday_name === undefined || val.holiday_name === null)
      })
    }

    console.log(holiday_namebol, "holiday_namebol")

    if (this.state.ChildWholeState && this.state.ChildWholeState.rangevalue && holiday_namebol.length === 0 && this.state.applicable_region && this.state.applicable_region.length>0) {
      var self = this
    this.setState({props_loading:true})

      axios({
        method: 'post',
        url: `${apiurl}insert_mas_holiday_master`,
        data: {
          "holiday_date": this.state.holiday_arr,
          "applicable_region": this.state.applicable_region,
          "active_flag": "1",
          "created_by": "1",
          "created_on": current_da_n_ti,
          "modified_by": "1",
          "modified_on": current_da_n_ti
        }
      })
        .then(function (response) {
          console.log(response, "res_holiday")
          self.recall("success","added")
        })
        .catch(function (error) {
          console.log(error, "error");
        });

        this.setState({
          insertmodalopen: false,

        })
    }
    else if (this.state.holiday_arr && holiday_namebol.length > 0) {
      notification.warning({
        className: "show_frt",
        message: "Please fill all holiday fields",
      });
    }
    else if(this.state.applicable_region && this.state.applicable_region.length===0){
      notification.warning({
        className: "show_frt",
        message: "Please select the region",
      });
    }
     else {
      notification.warning({
        className: "show_frt",
        message: "Please select the date",
      });

    }
  }

  recall = (type,msgdyn) => {
    var self = this
    axios({
      method: 'get',
      url: `${apiurl}get_mas_holiday_master`
    })
      .then(function (response) {
        var arrval = []
        response.data.data.map((value) => {
          arrval.push({ holiday: value.holiday_name, day: value.holiday_date, id: value.id })
        })
        self.setState({
          currentdata: arrval,
          loading: false,
          props_loading:false
        })

        notification[type]({
          className:"show_frt",
          message: "Record" +" "+msgdyn+" "+"sucessfully",
        });

      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }


  update = () => {

    this.setState({props_loading:true})

    var self = this
    axios({
      method: 'put',
      url: `${apiurl}edit_mas_holiday_master`,
      data: {
        "holiday_date": moment(this.state.ChildWholeState.date).format('YYYY-MM-DD'),
        "holiday_name": this.state.ChildWholeState.card0,
        "holiday_master_id": this.state.regionAddId,
        "modified_by": "1",
        "modified_on": current_da_n_ti
      }
    })
      .then(function (response) {
        self.recall("success","edited")
        console.log(response, "edit_mas_holiday_master")
      })
      .catch(function (error) {
        console.log(error, "error");
      });


      this.setState({
        insertmodalopen: false
      })

  }



  deleterow = () => {
    this.setState({props_loading:true})


    var self = this
    axios({
      method: 'delete',
      url: `${apiurl}delete_mas_holiday_master`,
      data: {
        "holiday_master_id": this.state.deleteid,
      }
    })
      .then(function (response) {
        console.log(response, "deleteres")
        self.recall("info","deleted")

      })
      .catch(function (error) {
        console.log(error, "error");
      });
    this.setState({
      insertmodalopen: false
    })
  }


  closemodal = () => {
    this.setState({ openview: false, editopen: false, insertmodalopen: false, deleteopen: false })
  }

  insertdata = () => {
    this.setState({
      insertmodalopen: true,
      singleSelCalender_open: false
    })
  }

  deleteopen = (type, id) => {
    this.setState({
      deleteopen: true,
      deleteid: id
    })
  }


  modelopen = (data, id) => {
    
    if (data === "edit") {
      var geteditdata = this.state.currentdata.filter((val) => {
        return val.id === id
      })

      var self = this
      axios({
        method: 'post',
        url: `${apiurl}get_holiday_region`,
        data: {
          holiday_master_id: id
        }
      })
        .then(function (response) {
          console.log(response.data, "holidayGet")
          self.setState({
            regionEditData: response.data
          })
        })
        .catch(function (error) {
          console.log(error, "error");
        });

      this.setState({
        editopen: true,
        insertmodalopen: true,
        editdatasetopen: true,
        singleSelCalender_open: true,
        geteditdata: geteditdata,
        regionAddId: id
      })

    }
  }

  setvalue_range = (state, bollen) => {
    console.log(state, "data")
    var holiday_arr = []
    if (state.correctDateFormat) {
      state.correctDateFormat.map((data, index) => {
        holiday_arr.push({ holiday_date: data.holiday, holiday_name: state["card" + index] })
      })
    }
    this.setState({
      holiday_arr: holiday_arr,
      applicable_region: state.regionText,
      ChildWholeState: state
    })

    console.log(holiday_arr, "holiday_arr")
  }

  render() {
    console.log(this.state, "thisstate")

    return (
      <div>
                {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:

      <div>
        <div className="holiday_master_header">
          <div className="holiday_master_title"><h3>HOLIDAY MASTER</h3></div>
          <img className="plus" onClick={this.insertdata} src={PlusIcon} />
        </div>
        <Tablecomponent heading={[
          { id: "", label: "S.No" },
          { id: "holiday", label: "Holiday" },
          { id: "day", label: "Day" },
          { id: "", label: "Action" }
        ]}

          rowdata={this.state.currentdata && this.state.currentdata}
          tableicon_align={""}
          modelopen={(e, id) => this.modelopen(e, id)}
          deleteopen={this.deleteopen}
          VisibilityIcon="close"
          alignheading="cus_wid_commission_head"
          props_loading={this.state.props_loading}
        />


        <Modalcomp customwidth_dialog="holiday_master_modal" visible={this.state.insertmodalopen} title={<div className="d-flex titleBtnFlex">
          <div>{this.state.editopen ? "EDIT HOLIDAY MASTER" : "CREATE HOLIDAY MASTER"}</div>
          <div className="d-flex">

            <Button className="accessrights_button_cancel">Cancel</Button>
            {this.state.editopen ? <Button className="accessrights_button_save" onClick={this.update}>Update</Button> : <Button className="accessrights_button_save" onClick={this.addData}>Create</Button>}

          </div>
        </div>
        } closemodal={(e) => this.closemodal(e)}
          xswidth={"lg"}
        >
          <Range_Calendar setvalue_range={(state) => this.setvalue_range(state)}
            geteditdata={this.state.singleSelCalender_open ? this.state.geteditdata : null} regionEditData={this.state.regionEditData}
            singleSelCalender={this.state.singleSelCalender_open} regionAddId={this.state.regionAddId} />
        </Modalcomp>

        <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
          <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} />
        </Modalcomp>


      </div>
  }
  </div>
    )
  }
}

