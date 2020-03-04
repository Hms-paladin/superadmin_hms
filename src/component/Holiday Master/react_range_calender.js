import React from 'react';
import { DateRange } from 'react-date-range';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Card } from 'antd';
import { Input } from 'antd';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import "./react_range_calender.css"

class Range_Calendar extends React.Component{
  state={
    rangevalue:[
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
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


  render(){
    return(
        <div className="range_calender wid_100_calrange">
          <div className="wid_40_calrange_first">
            <div className="date_tx_align_cal">
              <div>Date</div>
              <div>Holiday</div>
            </div>
            <div className="dotted_line_cal">
            <Card style={{ width: 360 }}>
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
          <div className="wid_60_calrange_sec">
            <DateRange
            editableDateInputs={true}
            onChange={item => this.seleteddate(item)}
            moveRangeOnFirstSelection={false}
            ranges={this.state.rangevalue}
            fixedHeight={true}
        />
        <div className="holiday_align_cal"><span className="dot_icon_cal"><FiberManualRecordIcon /></span>Holiday</div>
        </div>
        </div>

    )
  }
}
export default Range_Calendar;
