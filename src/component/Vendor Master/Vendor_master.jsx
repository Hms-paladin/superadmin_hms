import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";

import "./Vendor_master.css";

export default class Vendor_master extends React.Component{

    state={
        openview:false,
        insertmodalopen:false
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
               <div className="vendor_master_header">
                   <div className="vendor_master_title"><h3>VENDOR MASTER</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "vendor", label: "Vendor" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({name: "Doctor"}),
                this.createData({name: "Diet Meal"}),
                this.createData({name: "Pharmacy"}),
                this.createData({name: "Lab"}),
                this.createData({name: "Trainer"}),
                this.createData({name: "Clinic"})  
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    // EditIcon="close"
    VisibilityIcon="close"
    alignheading="cus_wid_vendor_head"
  />

        <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <h1>HIIIIIIIIIII</h1>
        </Modalcomp>


        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            
        </Modalcomp>

        <Modalcomp className="vendor_master_modal" visible={this.state.insertmodalopen} title={"CREATE VENDOR"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <div className="create_master">
            <Inputantd label="Vendor Name" className="master_option" placeholder="" />
            <div className="master_button">
            <Button className="master_button_cancel" onClick={this.closemodal}>Cancel</Button>
            <Button className="master_button_create">Create</Button>
            </div>
            </div>
        </Modalcomp>
              

            </div>
        )
    }
}

