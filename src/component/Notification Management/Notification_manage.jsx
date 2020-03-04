import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
// import Checkbox from '@material-ui/core/Checkbox';
import {apiurl} from "../../../src/App.js";
import { Checkbox } from 'antd';
import { Spin,notification } from 'antd';



import "./Notification_manage.css";
const axios = require('axios');


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti=dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class Notification_manage extends React.Component{



    constructor(props){
        super(props)
        this.state={
            openview:false,
            insertmodalopen:false,
            currentdata:[],
            app1:true,
            loading:true,
            props_loading:false,
        }
    }


    secondcall = (value,name,nameval) => {
        this.setState({props_loading:true})

    console.log(value,name,nameval,"getvalue")


    if(name==="app_isActive"){
        var val_app=value.app_isActive===0?1:0
    }else if(name==="sms_isActive"){
        var val_sms=value.sms_isActive===0?1:0
    }else if(name==="email_isActive"){
        var val_email=value.email_isActive===0?1:0
    }
    var self=this
    axios({
        method: 'put',
        url: `${apiurl}edit_mas_notification_rights`,
        data:{
            "id":value.id,
            "category": value.category,
            "notification": value.notification,
            "app_isActive": val_app?val_app:val_app===0?val_app:value.app_isActive,
            "sms_isActive": val_sms?val_sms:val_sms===0?val_sms:value.sms_isActive,
            "email_isActive": val_email?val_email:val_email===0?val_email:value.email_isActive,
            "active_flag": "1",
            "created_by": "1",
            "created_on": current_da_n_ti,
            "modified_by": "1",
            "modified_on": current_da_n_ti
            }

            
        })
        .then(function (response) {
            self.recall()
        })
        .catch(function (error) {
            console.log(error,"error");
        });
        this.setState({
            insertmodalopen:false,
        })

       };



    recall=()=>{
        var self=this
          axios({
            method: 'get',
            url: `${apiurl}get_mas_notification_rights`
          })
          .then(function (response) {
            var arrval=[]
        response.data.data.map((value)=>{

            arrval.push({category:value.category,notification:value.notification,
                app_isActive:<Checkbox className="notification_check" checked={value.app_isActive} onChange={(e)=>self.secondcall(value,"app_isActive",value.app_isActive)}/>,
                sms_isActive:<Checkbox className="notification_check" checked={value.sms_isActive} onChange={(e)=>self.secondcall(value,"sms_isActive",value.sms_isActive)}/>,
                email_isActive:<Checkbox className="notification_check" checked={value.email_isActive} onChange={(e)=>self.secondcall(value,"email_isActive",value.email_isActive)}/>,
                id:value.id})
        })
        self.setState({
            currentdata:arrval,
            props_loading:false
        })
          })
          .catch(function (error) {
            console.log(error,"error");
          });
    }

    


    componentDidMount(){
        
        const handleChange = (value,name,nameval) => {
            this.setState({props_loading:true})

        console.log(value,name,nameval,"getvalue")

        if(name==="app_isActive"){
            var val_app=value.app_isActive===0?1:0
        }else if(name==="sms_isActive"){
            var val_sms=value.sms_isActive===0?1:0
        }else if(name==="email_isActive"){
            var val_email=value.email_isActive===0?1:0
        }

        // alert(val_app?val_app:val_app===0?val_app:value.app_isActive)
        // alert(val_sms?val_sms:val_sms===0?val_sms:value.sms_isActive)
        // alert(val_email?val_email:val_email===0?val_email:value.email_isActive)

        axios({
            method: 'put',
            url: `${apiurl}edit_mas_notification_rights`,
            data:{
                "id":value.id,
                "category": value.category,
                "notification": value.notification,
                "app_isActive": val_app?val_app:val_app===0?val_app:value.app_isActive,
                "sms_isActive": val_sms?val_sms:val_sms===0?val_sms:value.sms_isActive,
                "email_isActive": val_email?val_email:val_email===0?val_email:value.email_isActive,
                "active_flag": "1",
                "created_by": "1",
                "created_on": "2020-03-02 02:55:14",
                "modified_by": "1",
                "modified_on": "2020-03-02 02:55:14"
                }

                
            })
            .then(function (response) {
                self.recall()
            })
            .catch(function (error) {
                console.log(error,"error");
            });
            this.setState({
                insertmodalopen:false,
            })

           };

           

        var self=this

      axios({
        method: 'get',
        url: `${apiurl}get_mas_notification_rights`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{

            arrval.push({category:value.category,notification:value.notification,
                app_isActive:<Checkbox className="notification_check" checked={value.app_isActive} onChange={(e)=>handleChange(value,"app_isActive",value.app_isActive)}/>,
                sms_isActive:<Checkbox className="notification_check" checked={value.sms_isActive} onChange={(e)=>handleChange(value,"sms_isActive",value.sms_isActive)}/>,
                email_isActive:<Checkbox className="notification_check" checked={value.email_isActive} onChange={(e)=>handleChange(value,"email_isActive",value.email_isActive)}/>,
                id:value.id})
        })
        self.setState({
            currentdata:arrval,
            loading:false
        })
      })
      .catch(function (error) {
        console.log(error,"error");
      });
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
        console.log(this.state,"state")
         
        return(
            <div>
                {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:
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

            rowdata={this.state.currentdata && this.state.currentdata}
            tableicon_align={""}
            modelopen={(e)=>this.modelopen(e)}
            VisibilityIcon="close"
            EditIcon="close"
            DeleteIcon="close"
            alignheading="cus_wid_notification_head"
            props_loading={this.state.props_loading}
  />

        </div>}
              

            </div>
        )
    }
}

