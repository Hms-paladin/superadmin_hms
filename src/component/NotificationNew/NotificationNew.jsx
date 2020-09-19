import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import {apiurl} from "../../App.js";
import { Checkbox } from 'antd';
import { Spin,notification } from 'antd';
import { Button, Paper } from "@material-ui/core";
import Labelbox from '../../helper/labelbox/labelbox'
import './Notification.css'
import Template from './TemplateModal'

import plus from '../../images/plus_square.svg'
import Modalcomp from '../../helper/ModalComp/ModalComp'


// import "./Notification_manage.css";
const axios = require('axios');


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti=dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class Notification_New extends React.Component{



    constructor(props){
        super(props)
        this.state={
            openview:false,
            insertmodalopen:false,
            currentdata:[],
            app1:true,
            loading:true,
            props_loading:false,
            onceopen:true,
            open:false
        }
    }
   
      handleClickopen = () => {
        this.setState({ open: true });
      };
      handleClickclose = () => {
        this.setState({ open: false });
      };


    secondcall = (value,name,nameval,useraccess) => {
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
            self.recall(useraccess)
        })
        .catch(function (error) {
            console.log(error,"error");
        });
        this.setState({
            insertmodalopen:false,
        })

       };



    recall=(useraccess)=>{
        var self=this
          axios({
            method: 'get',
            url: `${apiurl}get_mas_notification_rights`
          })
          .then(function (response) {
            var arrval=[]
        response.data.data.map((value)=>{

            arrval.push({category:value.category,variable:value.category,api:value.category,
                // app_isActive:<Checkbox className={`notification_check ${useraccess && useraccess.allow_edit==="N" && "disablebtn_notify"}`} checked={value.app_isActive} onChange={useraccess && useraccess.allow_edit==="Y" ? (e)=>self.secondcall(value,"app_isActive",value.app_isActive,useraccess) : null}/>,
                // sms_isActive:<Checkbox className={`notification_check ${useraccess && useraccess.allow_edit==="N" && "disablebtn_notify"}`} checked={value.sms_isActive} onChange={useraccess && useraccess.allow_edit==="Y" ? (e)=>self.secondcall(value,"sms_isActive",value.sms_isActive,useraccess) : null}/>,
                // email_isActive:<Checkbox className={`notification_check ${useraccess && useraccess.allow_edit==="N" && "disablebtn_notify"}`} checked={value.email_isActive} onChange={useraccess && useraccess.allow_edit==="Y" ? (e)=>self.secondcall(value,"email_isActive",value.email_isActive,useraccess) : null}/>,
                 active:<Checkbox/>,
                id:value.id})
        })
        self.setState({
            currentdata:arrval,
            props_loading:false
        })
        notification.success({
            className: "show_frt",
            message: "Record updated successfully",
        });
          })
          .catch(function (error) {
            console.log(error,"error");
          });
    }

    


    componentdidcall=(useraccess)=>{
        
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
                self.recall(useraccess)
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

            arrval.push({category:value.category,variable:value.category,api:value.category,
                // app_isActive:<Checkbox className={`notification_check ${useraccess && useraccess.allow_edit==="N" && "disablebtn_notify"}`} checked={value.app_isActive} onChange={useraccess && useraccess.allow_edit==="Y" ? (e)=>handleChange(value,"app_isActive",value.app_isActive) : null}/>,
                // sms_isActive:<Checkbox className={`notification_check ${useraccess && useraccess.allow_edit==="N" && "disablebtn_notify"}`} checked={value.sms_isActive} onChange={useraccess && useraccess.allow_edit==="Y" ? (e)=>handleChange(value,"sms_isActive",value.sms_isActive) : null } />,
                // email_isActive:<Checkbox className={`notification_check ${useraccess && useraccess.allow_edit==="N" && "disablebtn_notify"}`} checked={value.email_isActive} onChange={useraccess && useraccess.allow_edit==="Y" ? (e)=>handleChange(value,"email_isActive",value.email_isActive) : null} />,
                active:<Checkbox/>,
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
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[11]
        if(this.state.onceopen && useraccess){
            this.componentdidcall(useraccess)
            this.setState({onceopen:false})
        }
        return(
            <div>
                {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:
                <div>
               <div className="Notification_manage_header">
                   <div className="Notification_manage_title"><h3>NOTIFICATIONS</h3></div>
                  
               </div>
               <Paper style={{marginTop:'5px'}} className="notification_paper">
                   <div className="variable_flex notification_flex">
                       <div className="catgry_box evnt_bx">
                   <Labelbox className="event_labl" type="select" labelname="Category"/>
                   </div>
                   <div className="catgry_box">
                   <Labelbox  type="text" labelname="Notification Name"/>
                   </div><div className="catgry_box">
                   <Labelbox className="event_labl" type="select" labelname="Events"/>

                   </div>
                   
                   </div>
                   <div className="variable_flex notification_flex">
                       <div className="catgry_box template_box">
                           <div style={{fontWeight:'700',color:'#666666',fontSize:'15px'}}>Template</div>
                           <div className="template_btns">
                               <Button onClick={this.handleClickopen}>App</Button>
                               <Button onClick={this.handleClickopen}>SMS</Button>
                               <Button onClick={this.handleClickopen}>Email</Button>

                           </div>
                       </div>
                       <div className="catgry_box template_box">
                       <div style={{fontWeight:'700',color:'#666666',fontSize:'15px'}}>Notification</div>
                       <div className="notification_checks">
                       <span>App</span>
                       <Checkbox/>
                       <span>SMS</span>
                       <Checkbox/>
                       <span>Email</span>
                       <Checkbox/>



                       </div>

                       </div>
                       <div className="catgry_box evnt_bx">
                       </div>
                   </div>
                {/* <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "category", label: "Category" },
                    { id: "variable", label: "Variable Name" },
                    { id: "api", label: "API Variable" , },

                    // { id: "app", label: "App" },
                    // { id: "sms", label: "SMS" },
                    // { id: "email", label: "Email" },
                     {id:'active',label:'Active'},
                    { id: "", label: "Action" },


                  
                ]}

            rowdata={this.state.currentdata && this.state.currentdata}
            tableicon_align={""}
            modelopen={(e)=>this.modelopen(e)}
            VisibilityIcon="close"
            // EditIcon="close"
            // DeleteIcon="close"
            alignheading="var_wid_notification_head"
            props_loading={this.state.props_loading}
  /> */}
  <div className="shop_mediabutton-container">
                <Button
                  className="shop-cancel-form"
                >
                  Cancel
                </Button>
                <Button className="shop-submit-Upload">Submit</Button>
              </div>
  </Paper>

        </div>}
        <Modalcomp
           clrchange="text_color"
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={<div><div>TEMPLATE</div><div className="sub_head">Trainer-Trainer Order-Order booked</div></div>}
            custommodalsize="media_newmedia"
            className="abi"
         
          >
            <Template 
            custommodalsize="media_uploadmodal"
            visible={this.state.open}
            closemodal={this.handleClickclose}
            className="abi"
          />
          </Modalcomp>
              

            </div>
        )
    }
}

