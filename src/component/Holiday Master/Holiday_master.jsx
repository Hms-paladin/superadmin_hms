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

import "./Holiday_master.css";

export default class Holiday_master extends React.Component{

    state={
        openview:false,
        insertmodalopen:true,
        props_loading:false
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

        modelopen=(data)=>{
            if(data==="view"){
                this.setState({openview:true})
            }
            else if(data==="edit"){
                this.setState({editopen:true})
            }
        }

        closemodal=()=>{
                this.setState({openview:false,editopen:false,insertmodalopen:false})
        }

        insertdata=()=>{
            this.setState({
                insertmodalopen:true
            })
        }


    render(){
         
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
  

            rowdata={[
                this.createData({holiday: "Eid Al Adha" , day: "Friday"}),
                this.createData({holiday: "Eid Al Adha" , day: "Sunday"}),
                this.createData({holiday: "Eid Ul Fitr" , day: "Tuesday"})
            ]}

            tableicon_align={""}
            modelopen={(e)=>this.modelopen(e)}
            VisibilityIcon="close"
            alignheading="cus_wid_commission_head"
            props_loading={this.state.props_loading}

   
  />

        <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
         
        </Modalcomp>


        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
               <h1>CALENDAR EDIT</h1>
        </Modalcomp>

        <Modalcomp customwidth_dialog="holiday_master_modal" visible={this.state.insertmodalopen} title={"CREATE HOLIDAY MASTER"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"lg"} 
        >
         <Range_Calendar/>
        </Modalcomp>
              

            </div>
        )
    }
}

