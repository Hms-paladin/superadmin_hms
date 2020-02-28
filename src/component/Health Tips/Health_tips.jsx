import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import { Input } from 'antd';
import 'antd/dist/antd.css';


import "./Health_tips.css";

export default class Health_tips extends React.Component{

    state={
        openview:false,
        insertmodalopen:false,
     
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
      const {TextArea} = Input
        return(
            <div>
               <div className="health_tips_header">
                   <div className="health_tips_title"><h3>HEALTH TIPS</h3></div>
                  
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "type", label: "Type" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({type: "Pregnant"}),
                this.createData({type: "Mother"}),
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    VisibilityIcon="close"
    alignheading="cus_wid_healthtips_head"
   
  />


        <Modalcomp  customwidth_dialog="health_tips_modal" visible={this.state.editopen} title={"ADD HEALTH TIPS"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"md"} >
         <div className="description_healthtips">
             <h3>Health Tips</h3>
            <TextArea label="Health Tips" className=""  rows={3}/>
            </div>
            
            <div className="health_tips_button">
            <Button className="healthtips_button_cancel" onClick={this.closemodal}>Cancel</Button>
            <Button className="healthtips_button_create">Create</Button>
            </div>
         
        </Modalcomp>
              

            </div>
        )
    }
}

