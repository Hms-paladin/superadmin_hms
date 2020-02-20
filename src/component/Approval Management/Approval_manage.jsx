import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import { Input } from 'antd'
import "./Approval_manage.css"

export default class Approval_manage extends React.Component{

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
         const { Search} = Input;
        return(
            <div>
                 <div className="approval_manage_header">
                     
                <div className="approval_manage_title">
                    <h3>APPROVAL MANAGEMENT</h3>
                </div>
                <Search className="search"
                  placeholder=" search "
                  onSearch={value => console.log(value)}
                  style={{ width: 150 }}/>
          </div>
                
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "date", label: "Date" },
                    { id: "vendor_name", label: "Vendor Name" },
                    { id: "type", label: "Type" },
                    { id: "details", label: "Details" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({date: "10 Aug 2020", vendor_name: "Doctor", type: "Advertise", details: "Image"}),
                this.createData({date: "11 Aug 2020", vendor_name: "Trainer", type: "Media", details: "Video"}),
                this.createData({date: "12 Aug 2020", vendor_name: "Diet", type: "Deal", details: "10% Discount"}),
                this.createData({date: "13 Aug 2020", vendor_name: "Nurse", type: "Media", details: "20% Discount"}),
                
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
              

            </div>
        )
    }
}

