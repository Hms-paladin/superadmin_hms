import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import {apiurl} from "../../../src/App.js";

import "./User_group.css";


const axios = require('axios');


export default class User_group extends React.Component{

    state={
        openview:false,
        insertmodalopen:false,
        currentdata:[]
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

        

        componentDidMount(){

            
                var self=this
              axios({
                method: 'get',
                url: `${apiurl}getGroup`
              })
              .then(function (response) {
                console.log(response,"response");
                var arrval=[]
                response.data.data.map((value)=>{
                    arrval.push(self.createData({name:value.groupname}))
                    // arrval.push({group_name:value.groupname})
                    console.log(value,"value")
                })
                self.setState({
                    currentdata:arrval
                })

                console.log(arrval,"arrval")
                // numbers.map((number) => number * 2)

              })
              .catch(function (error) {
                console.log(error,"error");
              });
        }


    render(){
        console.log(this.state.currentdata,"currentdata")
         
        return(
            <div>
               <div className="user_group_header">
                   <div className="user_group_title"><h3>USER GROUP</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "group_name", label: "Group Name" },
                    { id: "", label: "Action" }
                ]}
  

            // rowdata={[
            //     this.createData({name: "Accountant"}),
            //     this.createData({name: "Chef"})  
            // ]}

            rowdata={this.state.currentdata}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    // EditIcon="close"
    VisibilityIcon="close"
    alignheading="cus_wid_usergroup_head"
  />

        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            
        </Modalcomp>

        <Modalcomp className="user_group_modal" visible={this.state.insertmodalopen} title={"ADD USER GROUP"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <div className="create_group">
            <Inputantd label="Group Name" className="group_option" placeholder="" />
            <div className="group_button">
            <Button className="group_button_cancel" onClick={this.closemodal}>Cancel</Button>
            <Button className="group_button_create">Create</Button>
            </div>
            </div>
        </Modalcomp>
              

            </div>
        )
    }
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