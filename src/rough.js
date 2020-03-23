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
import dateformat from 'dateformat';
// import format from 'date-fns/format';

// import getDaysInMonth from 'date-fns/get_days_in_month';


import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import "./react_range_calender.css"


class Range_Calendar extends React.Component{
  state={
    rangevalue:[
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        region:"",
        region_arr:[],
      }
    ]
  }


  seleteddate=(item)=>{
    

// find number of dates in given month and year

    var startDate = moment(item.selection.startDate).format('YYYY-MM');
    var mn_yr_startDate=moment(startDate, "YYYY-MM").daysInMonth();

    var endDate = moment(item.selection.endDate).format("YYYY-MM");
    var mn_yr_endDate=moment(endDate,"YYYY-MM").daysInMonth();

    console.log(mn_yr_endDate,"result")


    var st_date=moment(item.selection.startDate).format('DD')
    var st_month=moment(item.selection.startDate).format('MM')
    var st_year=moment(item.selection.startDate).format('YYYY')
    var en_date=moment(item.selection.endDate).format('DD')
    var en_month=moment(item.selection.endDate).format('MM')
    var en_year=moment(item.selection.endDate).format('YYYY')



    var bal_st_date=st_date-mn_yr_startDate
    if(bal_st_date<0){
      bal_st_date=bal_st_date*-1
    }


    var bal_en_date=en_date-mn_yr_endDate
    if(bal_en_date<0){
      bal_en_date=bal_en_date*-1
    }



    var diff_yr=(st_year-en_year)*12
    if(dif_mon<0){
      dif_mon=dif_mon*-1
    }

    var dif_mon=(st_month-en_month)+diff_yr
    if(dif_mon<0){
      dif_mon=dif_mon*-1
    }


    var total_val=Number(bal_st_date)+Number(en_date)+Number(diff_yr)+Number(dif_mon)

    // console.log(bal_st_date,"finaldata")
    // console.log(bal_en_date,"finaldata")
    // console.log(diff_yr,"finaldata")
    // console.log(dif_mon,"finaldata")




    var diff_date=st_date-en_date
    if(diff_date<0){
      diff_date=diff_date*-1+1
    }else if(diff_date>=0){
      diff_date=diff_date+1
    }


    // alert(dif_mon)


    console.log(bal_st_date,"bal_st_date")
    console.log(en_date,"bal_st_date")

    if(dif_mon===1){
      diff_date=Number(bal_st_date)+Number(en_date)+1
    }

    // alert(dif_mon)

    if(dif_mon>1){
      var add_data=Number(bal_st_date)+Number(en_date)+1

      for(let i=0;i<dif_mon-1;i++){

        var temp_mon_diff=Number(st_month)+i+1
        var add_yr
        if(temp_mon_diff===1){
         add_yr=add_yr+1
        }
        

        var temp_startDate = moment(`${Number(st_year)+add_yr}-${temp_mon_diff}`).format('YYYY-MM');
        alert(temp_startDate)
        var temp_mn_yr_startDate=moment(temp_startDate, "YYYY-MM").daysInMonth();
        alert(temp_mn_yr_startDate)


        // st_month+i

        // st_year


      }





    }


    
    

    // alert(diff_date)



    

    console.log("startDate",startDate)
    console.log("endDate",endDate)

    this.setState({
      rangevalue:[item.selection]
    })
  }
  onShownDateChange=(DateRange,Calendar)=>{
    console.log(DateRange,Calendar,"onShownDateChange")
  }

  changeDynamic=(data)=>{
        this.setState({
          region:data
        })
}

add_region=()=>{
  var arrval=[]
  arrval.push(...this.state.region_arr===undefined ?  "" : this.state.region_arr,
  
              <div className="region_tx_style mr-4 d-flex">
              <div>{this.state.region}</div><div><CancelOutlinedIcon className="crs_region_align" /></div>
              </div>
  )
  this.setState({
    region_arr:arrval,
    region:""
  })
  console.log(arrval,"arrval")
}


  render(){
    return(
      <div className="range_calender wid_100_calrange">

      <Grid container spacing={10}>

        <Grid item xs={12} md={5} className="set_order_range">
          <div className="wid_40_calrange_first flex-2">
            <div className="date_tx_align_cal">
              <div>Date</div>
              <div>Holiday</div>
            </div>
            <div className="dotted_line_cal">
            {/* <Card style={{ width: 360 }}> */}
            <Card>
            <div className="w-100 add_input_calran">
              <div className="cus_wid_input_calran_start">
              <div>Fri</div>
              <div>02 2020</div>
              </div>
              <div className="cus_wid_input_calran_end">
              <Input className="input_cus_align_calran"/>
              </div>
            </div>
          </Card>

            </div>
      
          </div>
          </Grid>
          <Grid item xs={12} md={7} className="calran_grid_nonebtm">
          <div className="wid_60_calrange_sec flex-1">
            <DateRange
            editableDateInputs={true}
            onChange={item => this.seleteddate(item)}
            moveRangeOnFirstSelection={false}
            ranges={this.state.rangevalue}
            fixedHeight={true}
            showDateDisplay={true}
            onShownDateChange={true}
            // initialFocusedRange={true}
            showPreview={true}
        />
        <div className="holiday_align_cal"><span className="dot_icon_cal"><FiberManualRecordIcon /></span>Holiday</div>
        </div>
        </Grid>

        <Grid item xs={12} md={7} className="calran_grid_nonetop">
          <div className={"app_reg_flex w-75"}>
            <div className="app_reg_tx_size">Application Region</div> 
            <div><Inputantd className="cus_wid_app_calreg"
            changeData={(data)=>this.changeDynamic(data)} 
            value={this.state.region}
            /></div>
            <div><AddBoxIcon className="app_reg_icon_size" onClick={this.add_region} /></div>
          </div>
        </Grid>
        
        <Grid item md={12} className="val_app_reg_grid overflow_y_app_reg">
          <div className="d-flex ">
              
              {/* <div className="region_tx_style mr-4 d-flex">
              <div>ali anhamdi</div><div><CancelOutlinedIcon className="crs_region_align" /></div>
              </div> */}

              {this.state.region_arr}

          </div>
        </Grid>
        
      </Grid>
      </div>



    )
  }
}
export default Range_Calendar;



  //   var monthIndex = month - 1; 
  //   // # 0..11 instead of 1..12
  // var names = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
  // var date = new Date(year, monthIndex, 1);
  // var result = [];
  // while (date.getMonth() == monthIndex) {
  //   result.push(date.getDate() + "-" + names[date.getDay()]);
  //   date.setDate(date.getDate() + 1);
  // }
  // console.log(result,"result")