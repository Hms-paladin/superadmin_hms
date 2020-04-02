import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import Dropdownantd from "../../formcomponent/dropdownantd";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Range_Calendar from "./react_range_calender";
import {apiurl} from "../../../src/App.js";
import moment from 'moment';



import "./Holiday_master.css";

const axios = require('axios');


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti=dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class Holiday_master extends React.Component{

    state={
        openview:false,
        insertmodalopen:false,
        props_loading:false,
        currentdata:[],
        onceOpen:true,
        editdataset:"",
        editdatasetopen:true

    }

    createData=(parameter) =>{
        var keys=Object.keys(parameter)
        var values=Object.values(parameter)
  
        var returnobj={}
        
        for(var i=0;i<keys.length;i++){
        returnobj[keys[i]]=values[i]
        }
        return(returnobj)
        }



        closemodal=()=>{
                this.setState({openview:false,editopen:false,insertmodalopen:false})
        }

        insertdata=()=>{
            this.setState({
                insertmodalopen:true,
                singleSelCalender_open:false
            })
        }

        componentDidMount(){
            var self=this
          axios({
            method: 'get',
            url: `${apiurl}get_mas_holiday_master`
          })
          .then(function (response) {
            var arrval=[]
            response.data.data.map((value)=>{
                arrval.push({holiday:value.holiday_name,day:value.holiday_date,id:value.id})
            })
            self.setState({
                currentdata:arrval,
                loading:false
            })
          })
          .catch(function (error) {
            console.log(error,"error");
          });
            
        }

    recall=()=>{
        var self=this
          axios({
            method: 'get',
            url: `${apiurl}get_mas_holiday_master`
          })
          .then(function (response) {
            var arrval=[]
            response.data.data.map((value)=>{
                arrval.push({holiday:value.holiday_name,day:value.holiday_date,id:value.id})
            })
            self.setState({
                currentdata:arrval,
                loading:false
            })
          })
          .catch(function (error) {
            console.log(error,"error");
          });
    }

    addData=()=>{
        var self=this
          axios({
            method: 'post',
            url: `${apiurl}insert_mas_holiday_master`,
            data:{
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

            self.setState({
                loading:false,
                insertmodalopen:false
            })
            self.recall()
            console.log(response,"res_holiday")
          })
          .catch(function (error) {
            console.log(error,"error");
          });
    }

    setvalue_range=(state,bollen)=>{
        console.log(state,"data")
        var holiday_arr=[]
        if(state.correctDateFormat){
        state.correctDateFormat.map((data,index)=>{
            holiday_arr.push({holiday_date:data.holiday,holiday_name:state["card"+index]})
        })
    }
        this.setState({
            holiday_arr:holiday_arr,
            applicable_region:state.regionText,
        })

        console.log(holiday_arr,"holiday_arr")
    }

    modelopen=(data,id)=>{
      if(data==="edit"){
        var geteditdata=this.state.currentdata.filter((val)=>{
          return val.id===id
        })

        var self=this
          axios({
            method: 'post',
            url: `${apiurl}get_holiday_region`,
            data:{
              holiday_master_id:id
            }
          })
          .then(function (response) {
            console.log(response.data,"holidayGet")
            self.setState({
              regionEditData:response.data
            })
          })
          .catch(function (error) {
            console.log(error,"error");
          });



         this.setState({editopen:true,
          insertmodalopen:true,
          editdatasetopen:true,
          singleSelCalender_open:true,
          geteditdata:geteditdata,
          regionAddId:id
         })
         
     }
 }

    render(){
        console.log(this.state,"thisstate")
        // if(this.state.editdatasetopen){
        //   this.setState({
        //     editdataset:[{
        //       startDate: new Date('2020-05-10'),
        //       endDate: new Date('2020-05-10'),
        //       key: 'selection',
        //     }],
        //     editdatasetopen:false

        //   })
        // }
         
        return(
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
                modelopen={(e,id)=>this.modelopen(e,id)}
                VisibilityIcon="close"
                alignheading="cus_wid_commission_head"
                props_loading={this.state.props_loading}
                />


        <Modalcomp customwidth_dialog="holiday_master_modal" visible={this.state.insertmodalopen} title={<div className="d-flex titleBtnFlex">
            <div>{this.state.editopen ?"EDIT HOLIDAY MASTER":"CREATE HOLIDAY MASTER"}</div>
            <div className="d-flex">
                
          <Button className="accessrights_button_cancel">Cancel</Button>
          {this.state.editopen?<Button className="accessrights_button_save" onClick={this.update}>Update</Button>:<Button className="accessrights_button_save" onClick={this.addData}>Create</Button>}
          
          </div>
          </div>
          } closemodal={(e)=>this.closemodal(e)}
        xswidth={"lg"} 
        >
         <Range_Calendar setvalue_range={(state)=>this.setvalue_range(state)} 
        //  editdataset={this.state.editdataset} 
        geteditdata={this.state.geteditdata} regionEditData={this.state.regionEditData}
         singleSelCalender={this.state.singleSelCalender_open} regionAddId={this.state.regionAddId}/>
        </Modalcomp>
              

            </div>
        )
    }
}

