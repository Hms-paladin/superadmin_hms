import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";

import "./User_type.css";

export default class User_type extends React.Component{

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
               <div className="user_type_header">
                   <div className="user_type_title"><h3>USER TYPE</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "type_name", label: "Type Name" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({name: "Admin"}),
                this.createData({name: "Vendor"})  
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    // EditIcon="close"
    VisibilityIcon="close"
  />

        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            
        </Modalcomp>

        <Modalcomp className="user_type_modal" visible={this.state.insertmodalopen} title={"ADD USER TYPE"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <div className="create_type">
            <Inputantd label="Type Name" className="type_option" placeholder="" />
            <div className="type_button">
            <Button className="type_button_cancel" onClick={this.closemodal}>Cancel</Button>
            <Button className="type_button_create">Create</Button>
            </div>
            </div>
        </Modalcomp>
              

            </div>
        )
    }
}

