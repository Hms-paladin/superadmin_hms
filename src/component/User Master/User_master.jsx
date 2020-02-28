åimport React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import Dropdownantd from "../../formcomponent/dropdownantd";
import Grid from '@material-ui/core/Grid';
import { Switch } from 'antd';

import "./User_master.css";


export default class User_master extends React.Component{

    state={
        openview:false,
        insertmodalopen:false,
        status:false
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

        handlechange=()=>{
            this.setState({
                status:!this.state.status
            })
        }

    render(){
         
        return(
            <div>
               <div className="user_master_header">
                   <div className="user_master_title"><h3>USER MASTER</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "user_name", label: "User Name" },
                    { id: "mobile_no", label: "Mobile Number" },
                    { id: "user_type", label: "User Type" },
                    { id: "user_group", label: "User Group" },

                    { id: "", label: "Action" },

                    { id: "status", label: "Status" }
                ]}
  

            rowdata={[
                this.createData({user_name: "Pradish", mobile_no:"123456789", user_type:"Admin", user_group:"Accountant",  status:""}),
                this.createData({user_name: "Mani", mobile_no:"789321654", user_type:"Vendor", user_group:"Chef", status:""}),
                this.createData({user_name: "Jerald", mobile_no:"963258147", user_type:"Admin", user_group:"Lab Technician", status:""}),
                this.createData({user_name: "Arjun", mobile_no:"852369741", user_type:"Vendor", user_group:"Nurse", status:""}),
                this.createData({user_name: "Ranjith", mobile_no:"741963258", user_type:"Admin", user_group:"Accountant", status:""}),

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

        <Modalcomp customwidth_dialog="user_master_modal" visible={this.state.insertmodalopen} title={"ADD USER"} closemodal={(e)=>this.closemodal(e)}>
          <div className="usermaster_modal">
              <div className="master_content_one">
                 
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                    <Inputantd label="Username" className="username_option" placeholder="" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <Inputantd label="Password" className="usermaster_option" placeholder="" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <Inputantd label="Mobile Number" className="usermaster_option" placeholder="" />
                    </Grid>
                    </Grid>

                  <Grid container spacing={3} className="content_master_two">
                    <Grid item xs={12} md={4}>
                    <Dropdownantd label="User Type" className="usermaster_drop" option={["Admin" , "Vendor"]} placeholder="Indoor" />               
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <Dropdownantd label="User Group" className="usermaster_drop" option={["Accountant", "Chef"]} placeholder="Indoor" />                      
                    </Grid>


                    <Grid item xs={12} md={12} className="usermasrter_grid_three">
                    <div className="usermaster_switch">
                    <p>{this.state.status?"Active":"Inactive"}</p>
                    <Switch size="small" className="switch_grid" onChange={this.handlechange}> </Switch>
                    </div>

                    <div>
                    <Button className="usermaster_button_cancel" onClick={this.closemodal}>Cancel</Button>
                    <Button className="usermaster_button_create">Create</Button>
                    </div>

                    </Grid>

                  
                  </Grid>

              </div>
          </div>
        </Modalcomp> 
              

            </div>
        )
    }
}

