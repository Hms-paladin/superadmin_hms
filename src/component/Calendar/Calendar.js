import React from "react";
import "./Calendar.css";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import dateFormat from 'dateformat';
import originalMoment from "moment";
import { extendMoment } from "moment-range";


const moment = extendMoment(originalMoment);
const Current_date=(dateFormat(new Date(),"ddd, dd mmm yyyy"))
export default class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
    currentdate:moment().format("mmm"),
    fulldate:"",
    datearr:'',
    rangearr:"",
  };
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    console.log(this.state.dateObject.format("Y"),"year")

    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    console.log(this.state.dateObject.format("Y"),"currentday")
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMM");
  };
  // showMonth = (e, month) => {
  //   this.setState({
  //     showMonthTable: !this.state.showMonthTable,
  //    showDateTable: !this.state.showDateTable
  //   });
  // };
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
  };
  MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearTable = e => {
    this.setState({
      showYearTable: !this.state.showYearTable,
      showDateTable: !this.state.showDateTable
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    });
  };
  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearTable: !this.state.showYearTable
    });
  };
  onYearChange = e => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = props => {
    let months = [];
    let nextten = moment()
      .set("year", props)
      .add("year", 12)
      .format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Yeah</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };
  onDayClick = (e, d) => {
    console.log(d,this.month(),this.year(),"insideclick")
    var datearr=[]
    var rangearr=[]

if(this.state.fulldate.length<=1){

    datearr.push(...this.state.fulldate,`selectedclr${d}_${this.month()}_${this.year()}`)
    rangearr.push(...this.state.rangearr,d+" "+this.state.dateObject.format("M")+" "+this.state.dateObject.format("Y"))
}
else{
  datearr.push(`selectedclr${d}_${this.month()}_${this.year()}`)
  rangearr.push(d+" "+this.state.dateObject.format("M")+" "+this.state.dateObject.format("Y"))
}

console.log(datearr,"datearr")
    this.setState(
      {
        selectedDay: d,
        fulldate:datearr,
        rangearr:rangearr,
      },
    );
  };
  render() {
    console.log(this.state.selectedDay,this.state.dateObject.format("MMM"),this.state.dateObject.format("Y"),"selectedDay")
    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty"></td>);
    }
    let daysInMonth = [];


    for (let d = 1; d <= this.daysInMonth(); d++) {
      const startdate=`selectedclr${d}_${this.state.dateObject.format("MMM")}_${this.state.dateObject.format("Y")}`
      let currentDay = d == this.currentDay() ? "today" : "";
      var firstdate=this.state.selectedDay+" "+this.state.dateObject.format("M")+" "+this.state.dateObject.format("Y")
      console.log((this.state.rangearr && this.state.rangearr[0].slice(0, 2)),"slice")



      // calculate for inter css

      var first_sel_val=this.state.rangearr && Number(this.state.rangearr[0].slice(0, 2))
      var second_sel_val=this.state.rangearr[1] && Number(this.state.rangearr[1].slice(0, 2))
      var final_dif_val=first_sel_val-second_sel_val
      if(final_dif_val<0){
        var final_dif_val=(final_dif_val*-1)-1
      }
    
    var swaparray=this.state.fulldate
     
      if(this.state.fulldate.length===2 && first_sel_val>second_sel_val){
          var swaparray=[]
          swaparray.push(this.state.fulldate[1],this.state.fulldate[0])
      }

      console.log(this.state.fulldate,"fulldate")
      console.log(swaparray,"swaparray")

        var inter_css=""

          if(this.state.fulldate.length===2){
          console.log(first_sel_val,"first_sel_val")

        if(d<second_sel_val && d>first_sel_val){
          var inter_css=`selectedclr${d}_${this.state.dateObject.format("MMM")}_${this.state.dateObject.format("Y")}`
        }
        
        else if(d>second_sel_val && d<first_sel_val)
        {
          var inter_css=`selectedclr${d}_${this.state.dateObject.format("MMM")}_${this.state.dateObject.format("Y")}`
        }
          }
          


      console.log(inter_css,"inter_css")
      daysInMonth.push(
        

        <td key={d} className={`calendar-day ${currentDay}`} >
          <div className="range_parent w-100">

          <div className="range_child w-25">
          </div>
          <div
          // className={`selectedclr${d}_${this.state.dateObject.format("MMM")}_${this.state.dateObject.format("Y")}`}
          // style={{backgroundColor:`${d===this.state.selectedDay && "table_fir_sel"}`}}
          // className={applycss}
          // className={startdate===inter_css && "table_fir_sel"}
          onClick={e => {
            this.onDayClick(e, d);
          }}
          className={`${startdate===swaparray[0] && "table_fir_sel" ||
          startdate===swaparray[1] && "table_sec_sel" || 
          startdate===inter_css  && "table_inter_sel"
         }` }


          >
          <span className="table-body"
           
          >
            {d}

          </span>
          </div>
          <div className="range_btm w-25">
          </div>
          </div>
         
          <div className="inner_totalslots">12</div>
           {/* <div className="inner_availslots">0</div> */}

        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <div className="tail-datetime-calendar">
        <div className="calendar-navi">
        <div>{Current_date}</div>
        <div  className="move_lft_rgt">
          <ChevronLeftIcon className="date_arrow" onClick={e => {this.onPrev(); }}/>
          {!this.state.showMonthTable && (
            <span
              // onClick={e => {
              //   this.showMonth();
              // }}
              class="calendar-label"
            >
              {this.month()}
            </span>
          )}
          {/* <span  onClick={e => this.showYearTable()}>{this.year()}</span> */}
          <span>{this.year()}</span>
           <ChevronRightIcon className="date_arrow" onClick={e => {this.onNext();}}/>
           </div>
        </div>

        <div className="calendar-date">
          {this.state.showYearTable && <this.YearTable props={this.year()} />}
          {this.state.showMonthTable && (
            <this.MonthList data={moment.months()} />
          )}
        </div>

       {this.state.showDateTable && (
          <div className="calendar-date">
            <table className="calendar-day">
              <thead className="weekday_shortname">
                <tr>{weekdayshortname}</tr>
              </thead>
              <tbody className="table_body">{daysinmonth}</tbody>



            </table>
            <div className="calslots_container">
          <div className="total_slots_div"><p className="total_slots"></p><span className="total_slots_text">Total Slots</span></div>
          {/* <div className="total_slots_div"><p className="avail_slots"></p><span className="total_slots_text">Available Slots</span></div> */}
          </div>

          </div>
        )}
      </div>
    );
  }
}
