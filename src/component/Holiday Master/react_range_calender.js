import React from 'react';
import { DateRange } from 'react-date-range';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Card } from 'antd';
import { Input } from 'antd';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Inputantd from '../../formcomponent/inputantd';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';


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

    console.log("startDate",item.selection.startDate)
    console.log("endDate",item.selection.endDate)

    this.setState({
      rangevalue:[item.selection]
    })
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
