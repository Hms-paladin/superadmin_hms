import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";

import "./Training_cat.css";

export default class training_cat extends React.Component{

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
               <div className="training_category_header">
                   <div className="training_category_title"><h3>TRAINING CATEGORY</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "training_category", label: "Training Category" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({name: "Indoor"}),
                this.createData({name: "Outdoor"}),
                this.createData({name: "Outdoor"}),
                this.createData({name: "On Campus"})  
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    EditIcon="close"
    alignheading="cus_wid_trainingcategory_head"
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

        <Modalcomp className="training_category_modal" visible={this.state.insertmodalopen} title={"CREATE TRAINING CATEGORY"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <div className="create_category">
            <Inputantd label="Category" className="category_option" placeholder="" />
            <div className="category_button">
            <Button className="category_button_cancel" onClick={this.closemodal}>Cancel</Button>
            <Button className="category_button_create">Create</Button>
            </div>
            </div>
        </Modalcomp>
              

            </div>
        )
    }
}

