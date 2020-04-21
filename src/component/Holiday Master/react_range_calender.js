import React from 'react';
import { DateRange } from 'react-date-range';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Card } from 'antd';
import { Input } from 'antd';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Inputantd from '../../formcomponent/inputantd';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import moment from 'moment';
import { Calendar } from 'react-date-range';
import { apiurl } from "../../../src/App.js";
import { Spin, notification } from 'antd';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import "./react_range_calender.css"

const axios = require('axios');



class Range_Calendar extends React.Component {
  state = {
    rangevalue: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',

      }
    ],
    date: "",
    region: "",
    region_arr: [],
    block: [],
    correctDateFormat: [],
    regionText: [],
    onceOpen: false,
    editdataset: this.props.geteditdata && true,
    singleSelCalender: !this.props.singleSelCalender,
    regionEditData: this.props.regionEditData,
    changeRangeval: true,
    card0: this.props.geteditdata && this.props.geteditdata[0].holiday

  }


  seleteddate = (item) => {


    // find number of dates in given month and year

    var startDate = moment(item.selection.startDate).format('YYYY-MM');
    var mn_yr_startDate = moment(startDate, "YYYY-MM").daysInMonth();

    var endDate = moment(item.selection.endDate).format("YYYY-MM");
    var mn_yr_endDate = moment(endDate, "YYYY-MM").daysInMonth();

    console.log(item, "result")


    var st_date = moment(item.selection.startDate).format('DD')
    var st_month = moment(item.selection.startDate).format('MM')
    var st_year = moment(item.selection.startDate).format('YYYY')
    var en_date = moment(item.selection.endDate).format('DD')
    var en_month = moment(item.selection.endDate).format('MM')
    var en_year = moment(item.selection.endDate).format('YYYY')
    // alert(en_date+1)

    var one_mon_diff = en_month == 1 && st_month == 12 ? 13 : en_month
    var one_yr_diff = en_year == Number(st_year) + 1 ? Number(en_year) - 1 : en_year

    var block_arr = []
    var correctDateFormat = []


    if (st_month === en_month && st_year === en_year) {

      for (var i = st_date; i < Number(en_date) + 1; i++) {


        console.log(i + "-" + st_month + "-" + st_year)

        block_arr.push({ day: moment((st_year + "-" + st_month + "-" + i), "YYYY-MM-DD").format("ddd"), month: st_month, year: st_year }
        )
        correctDateFormat.push({ holiday: st_year + "-" + st_month + "-" + i })


      }

    }


    else if (Number(st_month) + 1 == one_mon_diff && st_year == one_yr_diff) {
      for (let j = st_date; j < Number(mn_yr_startDate) + 1; j++) {
        console.log(j + "-" + st_month + "-" + st_year)
        // block_arr.push(j+"-"+st_month+"-"+st_year)
        block_arr.push({ day: moment((st_year + "-" + st_month + "-" + j), "YYYY-MM-DD").format("ddd"), month: st_month, year: st_year })
        correctDateFormat.push({ holiday: st_year + "-" + st_month + "-" + j })

      }

      for (let k = 1; k < Number(en_date) + 1; k++) {
        console.log(k + "-" + en_month + "-" + en_year)
        // block_arr.push(k+"-"+en_month+"-"+en_year)
        block_arr.push({ day: moment((en_year + "-" + en_month + "-" + k), "YYYY-MM-DD").format("ddd"), month: en_month, year: en_year })
        correctDateFormat.push({ holiday: en_year + "-" + en_month + "-" + k })
      }

    }

    // else {
    //   var start=moment(st_date, "YYYY-MM").daysInMonth()
    //   var end=moment(endDate, "YYYY-MM").daysInMonth()
    //   var a = moment(item.selection.startDate, "YYYY-MM")
    //   var b = moment(item.selection.endDate, "YYYY-MM")

    //   var whole_block=[]


    //   if(!moment(startDate).isSame(endDate)){
    //     var diff_mon=a.diff(b, 'month')
    //   if(a.diff(b, 'month')<0){
    //     var diff_mon=a.diff(b, 'month') * -1
    //   }
    //   // alert(diff_mon)
    //   for(let a=st_date;a<Number(mn_yr_startDate)+1;a++){
    //     whole_block.push(a+"-"+st_month+"-"+st_year)
    //   }
    //     for(let r=1;r<=Number(diff_mon);r++){
    //         var set_yr_mon=Number(st_year)+"-"+(Number(st_month)+r)
    //       alert(set_yr_mon)  
    //       alert(moment(set_yr_mon,"YYYY-MM").daysInMonth())

    //     }
    //   }


    // }

    console.log("startDate", startDate)
    console.log("endDate", endDate)

    this.setState({
      rangevalue: [item.selection],
      block: block_arr,
      correctDateFormat: correctDateFormat,
      onceOpen: true,
    })
  }


  // Add Region Function

  add_region = () => {
    var arrval = []
    arrval.push(...this.state.region_arr === undefined ? "" : this.state.region_arr,

      <div className="region_tx_style mr-4 d-flex">
        <div>{this.state.region}</div><div>
          <CancelOutlinedIcon onClick={() => this.deleteRegionAdd(arrval.length)} className="crs_region_align" /></div>
      </div>
    )

    var regionText = []

    regionText.push(...this.state.regionText === undefined ? "" : this.state.regionText, this.state.region)


    this.setState({
      region_arr: arrval,
      regionText: regionText,
      region: "",
      onceOpen: true
    })
    console.log(arrval, "arrval")
  }

  // Delete Region Function

  deleteRegionAdd = (id) => {
    this.state.region_arr.splice(id - 1, 1)
    this.state.regionText.splice(id - 1, 1)

    var setRegionid = []

    for (let r = 0; r < this.state.region_arr.length; r++) {
      setRegionid.push(<div className="region_tx_style mr-4 d-flex">
        <div>{this.state.regionText[r]}</div><div>
          <CancelOutlinedIcon onClick={() => this.deleteRegionAdd(r + 1)} className="crs_region_align" /></div>
      </div>)
    }
    this.setState({
      region_arr: setRegionid,
      onceOpen: true

    })
  }


  changeDynamic = (data) => {
    this.setState({
      region: data
    })
  }


  inputcall = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      onceOpen: true
    })
  }


  addApiRegion = () => {

    var self = this
    axios({
      method: 'post',
      url: `${apiurl}add_holiday_region`,
      data: {
        holiday_master_id: this.props.regionAddId,
        region: this.state.region
      }
    })
      .then(function (response) {
        console.log(response.data, "resholidayGet")
        // self.setState({
        //   regionEditData:response.data
        // })
        self.getRegion_Recall()
      })
      .catch(function (error) {
        console.log(error, "error");
      });

  }


  getRegion_Recall = () => {
    var self = this
    axios({
      method: 'post',
      url: `${apiurl}get_holiday_region`,
      data: {
        holiday_master_id: this.props.regionAddId
      }
    })
      .then(function (response) {
        console.log(response.data, "holidayGet")
        self.setState({
          regionEditData: response.data,
          changeRangeval: false,
          region: ""
        })
      })
      .catch(function (error) {
        console.log(error, "error");
      });

  }

  deleteRegionApi = (id) => {
    var self = this
    axios({
      method: 'delete',
      url: `${apiurl}delete_holiday_region`,
      data: {
        region_id: id
      }
    })
      .then(function (response) {
        self.getRegion_Recall()
      })
  }

  singleselect_Cal = (item) => {
    console.log(item, "itemitem")
    var edit_block_arr = []
    edit_block_arr.push({ day: moment(item).format('ddd'), month: moment(item).format('MM'), year: moment(item).format('YYYY') })
    this.setState({
      date: item,
      onceOpen: true,
      editdataset: false,
      block: edit_block_arr,
    })
  }


  render() {
    console.log(this.state, "state")

    if (this.state.onceOpen) {
      this.props.setvalue_range(this.state, true)
      this.setState({
        onceOpen: false
      })
    }
    const today = new Date();
    var datearr = this.state.block && this.state.block.map((val, index) => {
      return (<Card className="mb-2">
        <div className="w-100 add_input_calran">
          <div className="cus_wid_input_calran_start">
            <div>{val.day}</div>
            <div>{val.month + "-" + val.year}</div>
          </div>
          <div className="cus_wid_input_calran_end">
            <Input className="input_cus_align_calran" name={"card" + index} onChange={(e) => this.inputcall(e)} value={this.state["card" + index]} />
          </div>
        </div>
      </Card>
      )
    })

    var RegionVariable

    if (this.state.changeRangeval) {
      RegionVariable = this.props.regionEditData && this.props.regionEditData
    } else {
      RegionVariable = this.state.regionEditData
    }

    const regionApidata = RegionVariable && RegionVariable.map((data) => {
      return (
        <div className="region_tx_style mr-4 d-flex">
          <div>{data.region}</div><div>
            <CancelOutlinedIcon onClick={() => this.deleteRegionApi(data.region_id)} className="crs_region_align" />
          </div>
        </div>
      )
    })

    return (
      <div className="range_calender wid_100_calrange">

        {this.state.editdataset && this.singleselect_Cal(new Date(this.props.geteditdata[0].day))}

        <Grid container spacing={10}>

          <Grid item xs={12} md={5} className="set_order_range">
            <div className="wid_40_calrange_first flex-2">
              <div className="date_tx_align_cal">
                <div>Date</div>
                <div>Holiday</div>
              </div>
              <div className="dotted_line_cal">
                {datearr}

              </div>

            </div>
          </Grid>
          <Grid item xs={12} md={7} className="calran_grid_nonebtm">
            <div className="wid_60_calrange_sec flex-1">
              {this.state.singleSelCalender ? <DateRange
                editableDateInputs={true}
                onChange={item => this.seleteddate(item)}
                moveRangeOnFirstSelection={false}
                ranges={this.state.rangevalue}
                fixedHeight={true}
                showDateDisplay={true}
                onShownDateChange={true}
                // initialFocusedRange={true}
                showPreview={true}
                // maxDate={new Date('2020-05-10')}
                minDate={today}
              /> : <Calendar onChange={(item) => this.singleselect_Cal(item)}
                date={this.state.date} />

              }
              <div className="holiday_align_cal"><span className="dot_icon_cal"><FiberManualRecordIcon /></span>Holiday</div>
            </div>

          </Grid>

          <Grid item xs={12} md={7} className="calran_grid_nonetop">
            <div className={"app_reg_flex"}>
              <div className="app_reg_tx_size">Application Region</div>
              <div><Inputantd className="cus_wid_app_calreg"
                changeData={(data) => this.changeDynamic(data)}
                value={this.state.region}
              /></div>
              <div><AddBoxIcon className="app_reg_icon_size" onClick={this.props.singleSelCalender === false ? this.add_region : this.addApiRegion} /></div>
            </div>
          </Grid>

          <Grid item md={12} className="val_app_reg_grid overflow_y_app_reg">
            <div className="d-flex ">

              {this.props.singleSelCalender === false ? this.state.region_arr : regionApidata}

            </div>
          </Grid>

        </Grid>
      </div>



    )
  }
}
export default Range_Calendar;


// {selection:{
//   startDate: new Date('2020-05-10'),
//   endDate: new Date('2020-05-10'),
//   key: 'selection',
// }}


// ranges={[{
//   startDate: new Date('2020-05-10'),
//   endDate: new Date('2020-05-10'),
//   key: 'selection',
// }]}
