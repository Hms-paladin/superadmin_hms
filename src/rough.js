import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import {apiurl} from "../../../src/App.js";
import { Input } from 'antd';
import Inputantd from "../../formcomponent/inputantd";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';
import "./Approval_manage.css"

const axios = require('axios');


export default class Approval_manage extends React.Component{

    state={
        openview:false,
        props_loading:false,
        currentdata:[],
        approvalAllValue:[],
    }

        componentDidMount(){

            var self=this
          axios({
            method: 'get',
            url: `${apiurl}get_vw_approval_mgnt`
          })
          .then(function (response) {
            var arrval=[]
            var approvalAllValue=[]
            response.data.data.map((value)=>{
                arrval.push({date:value.Date,vendorname:value.VendorName,type:value.Type,details:value.Details,input:<Inputantd className={"w-75"} breakclass={"approvalInputdnone"}/>,action:<div className="approval_cus_iconalign"><VisibilityIcon className="tableeye_icon" /><CheckIcon className="tableedit_icon" /><CloseIcon className="tabledelete_icon" /></div>,id:value.type_id})

                approvalAllValue.push(value)

            })
            self.setState({
                currentdata:arrval,
                approvalAllValue:approvalAllValue,
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
                this.setState({openview:false,editopen:false})
        }


    render(){
         const { Search} = Input;
         console.log(this.state.currentdata,"currentdata")
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
                    { id: "vendorname", label: "Vendor Name" },
                    { id: "type", label: "Type" },
                    { id: "details", label: "Details" },
                    { id:"input",label:"Remarks"},
                    { id: "action", label: "Action" },
                    { id: "", label: "Action" }
                ]}
  
                rowdata={this.state.currentdata && this.state.currentdata}
                modelopen={(e)=>this.modelopen(e)}
                tablemasterclass="approval_cus_iconadd"
                props_loading={this.state.props_loading}
                actionclose="close"

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

