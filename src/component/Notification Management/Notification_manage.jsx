import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import Checkbox from '@material-ui/core/Checkbox';

import "./Notification_manage.css";

export default class Notification_manage extends React.Component{

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
               <div className="Notification_manage_header">
                   <div className="Notification_manage_title"><h3>NOTIFICATION MANAGEMENT</h3></div>
                  
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "category", label: "Category" },
                    { id: "notification", label: "Notification" },
                    { id: "app", label: "App" },
                    { id: "sms", label: "SMS" },
                    { id: "email", label: "Email" },

                  
                ]}
  

            rowdata={[
                this.createData({category: "Pharmacy", notification: "Quotation Ready", app:<Checkbox className="notification_check"/>, sms:<Checkbox className="notification_check" />, email:<Checkbox className="notification_check" />}),
                this.createData({category: "Pharmacy", notification: "Out For Delivery", app:<Checkbox className="notification_check"/>, sms:<Checkbox className="notification_check" />, email:<Checkbox className="notification_check" />}),
                this.createData({category: "Shopping", notification: "Order Booked",app:<Checkbox className="notification_check"/>, sms:<Checkbox className="notification_check" />, email:<Checkbox className="notification_check" />}),
                this.createData({category: "Shopping", notification: "Payment Success", app:<Checkbox className="notification_check"/>, sms:<Checkbox className="notification_check" />, email:<Checkbox className="notification_check" />}),
                this.createData({category: "Shopping", notification: "Order Dispacthed",app:<Checkbox className="notification_check"/>, sms:<Checkbox className="notification_check" />, email:<Checkbox className="notification_check" />})
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    VisibilityIcon="close"
    EditIcon="close"
    DeleteIcon="close"
    alignheading="cus_wid_notification_head"
  />

       


        <Modalcomp  visible={this.state.editopen} title={""} closemodal={(e)=>this.closemodal(e)}
        xswidth={"md"}
        >
            
            
        </Modalcomp>
              

            </div>
        )
    }
}

