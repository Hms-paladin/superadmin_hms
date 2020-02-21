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

import "./Commission.css";

export default class Commission extends React.Component{

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
               <div className="commission_header">
                   <div className="commission_title"><h3>COMMISSION MANAGEMENT</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "vendor", label: "Vendor" },
                    { id: "commission", label: "Commission %" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({vendor: "Doctor" , commission: "2"}),
                this.createData({vendor: "Diet Meal" , commission: "5"}),
                this.createData({vendor: "Pharmacy" , commission: "5"}),
                this.createData({vendor: "Lab" , commission: "10"}),
                this.createData({vendor: "Trainer" , commission: "2"}),
                this.createData({vendor: "Clinic" , commission: "5"})
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    EditIcon="close"
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

        <Modalcomp customwidth_dialog="commission_modal" visible={this.state.insertmodalopen} title={"ADD COMMISSIONS"} closemodal={(e)=>this.closemodal(e)}
       >
          <div className="commission_modal_content">
              <div className="header_modal">

                  <div className="head_one_title">
                  <h3>Vendor</h3>
                  <h3>Commission %</h3>
                  </div>

                  <div className="blank_one"></div>

                  <div className="head_one">
                      <h4>Doctor</h4>
                      <Inputantd className="box_one"  placeholder="" />
                  </div>

                  <div className="head_one">
                      <h4>Diet Meal</h4>
                      <Inputantd className="box_two"  placeholder="" />
                  </div>

                  <div className="head_one">
                      <h4>Pharmacy</h4>
                      <Inputantd className="box_three"  placeholder="" />
                  </div>

              </div>
              <div className="blank_two"></div>

              <div className="header_modal_two">

                <div className="head_one_title">
                <h3>Vendor</h3>
                <h3>Commission %</h3>
                </div>

                <div className="blank_one"></div>

                <div className="head_one">
                    <h4>Lab</h4>
                    <Inputantd className="box_four"  placeholder="" />
                </div>

                <div className="head_one">
                    <h4>Trainer</h4>
                    <Inputantd className="box_five"  placeholder="" />
                </div>

                <div className="head_one">
                    <h4>Clinic</h4>
                    <Inputantd className="box_six"  placeholder="" />
                </div>

                </div>
               
            

          </div>
          <div className="commission_button">
                <Button className="commission_button_cancel" onClick={this.closemodal}>Cancel</Button>
                <Button className="commission_button_create">Create</Button>
                </div>
        </Modalcomp>
              

            </div>
        )
    }
}

