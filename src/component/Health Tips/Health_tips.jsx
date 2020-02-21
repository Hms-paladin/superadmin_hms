import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";

import "./Health_tips.css";

export default class Health_tips extends React.Component{

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
  />

       


        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            
        </Modalcomp>
              

            </div>
        )
    }
}

