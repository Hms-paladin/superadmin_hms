import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';

import "./approvalmanagement.css"

class Approvalmanagement extends React.Component{

    state={
        openview:false
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
                this.setState({openview:false,editopen:false})
        }


    render(){
         
        return(
            <div>
                Approvalmanagements
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "name", label: "Name" },
                    { id: "number", label: "Number" },
                    { id: "age", label: "Age" },
                    { id: "time", label: "Time" },
                    { id: "service", label: "Service" },
                    // { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({name: "test", number: "1", age: "35", time: "10.00 AM", service: "Consulting",Action:<div className="approval_cus_iconalign"><VisibilityIcon/><CheckIcon/><CloseIcon/></div>}),
                this.createData({name: "ashwin", number: "2", age: "35", time: "10.30 AM", service: "Tooth Whitening"}),
                this.createData({name: "syed", number: "3", age: "35", time: "11.30 AM", service: "Root Canal"}),
                this.createData({name: "edwin", number: "4", age: "35", time: "11.30 AM", service: "Root Canal"}),
                this.createData({name: "arjun", number: "5", age: "35", time: "11.30 AM", service: "Root Canal"}),
                this.createData({name: "raja", number: "6", age: "32", time: "11.30 AM", service: "Root Canal"}),
                this.createData({name: "rani", number: "7", age: "35", time: "11.30 AM", service: "Root Canal"}),
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    actionclose="close"
  />

        <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <h1>view massage</h1>
        </Modalcomp>


        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            
        </Modalcomp>
              

            </div>
        )
    }
}

export default Approvalmanagement;