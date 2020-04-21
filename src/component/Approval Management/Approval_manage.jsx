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
var moment = require('moment');


export default class Approval_manage extends React.Component{


    state={
        openview:false,
        props_loading:false,
        currentdata:[],
        approvalAllValue:[],
    }

    changeDynamic=(data,id)=>{

        this.setState({
            ["inputbox"+id]:data,
            inputboxid:id
        })

        var setInputValue=this.state.currentdata.filter((val)=>{
            return val.id===id
        })

        setInputValue[0].input=<Inputantd className={"w-75"} breakclass={"approvalInputdnone"} changeData={(data)=>this.changeDynamic(data,id)} 
        value={data}
        />
        

    }

        componentWillMount(){
            this.recall()
         }


         viewFun=(id,type)=>{
            this.setState({openview:true,approvaltype:type,approvalinfo:""})

            var self=this
            axios({
              method: 'post',
              url: `${apiurl}view_approval_info`,
              data:{
                    "type":type,
	                "type_id":id
              }
            })
            .then(function (response) {
              self.setState({
                //   loading:false,
                  approvalinfo:response.data.data
              })
              console.log(response.data.data,"imgcheck")
            })


         }

         CheckFun=(id)=>{

            if(this.state["inputbox"+id]){
                var type=this.state.currentdata.filter((val)=>{
                   return val.id===id
                })

            var self=this
            axios({
              method: 'put',
              url: `${apiurl}update_status_approved`,
              data:{
                    "type":type[0].type,
                    "type_id":id.toString(),
                    "created_by":"1",
                    "remarks":self.state["inputbox"+id]
              }
            })
            .then(function (response) {
                var temperedvar="inputbox"+id
              self.setState({
                  loading:false,
                  [temperedvar]:""
              })
              self.recall()
              console.log(response,"resapproval")
            })

        }else{
            this.setState({
                currentbox:id
            })
            this.recall(id,true)
        }
            
         }

         closeFun=(id)=>{

            if(this.state["inputbox"+id]){
                var type=this.state.currentdata.filter((val)=>{
                   return val.id===id
                })

            var self=this
            axios({
              method: 'put',
              url: `${apiurl}update_status_rejected`,
              data:{
                    "type":type[0].type,
                    "type_id":id.toString(),
                    "created_by":"1",
                    "remarks":self.state["inputbox"+id]
              }
            })
            .then(function (response) {
                var temperedvar="inputbox"+id
              self.setState({
                  loading:false,
                  [temperedvar]:""
              })
              self.recall()
              console.log(response,"resapproval")
            })

        }else{
            this.setState({
                currentbox:id
            })
            this.recall(id,true)
        }
            

         }


    recall=(checkvalueid,clicktrue)=>{

        var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdmVyaTJnYW5nYUBnbWFpbC5jb20iLCJ1c2VySWQiOjQxLCJpYXQiOjE1ODc0ODUzNTQsImV4cCI6MTU4NzQ4ODk1NH0.X0RQKWrVjOuNzuxs5UphQkVi_fs0Bk8XVHQjHCc8sWk"

        var self=this
          axios({
            method: 'get',
            url: `${apiurl}get_vw_approval_mgnt`,
            headers: { 
                Authorization: "Bearer "+ token }
          })
          .then(function (response) {
            console.log(response,"response");

            var arrval=[]
            var approvalAllValue=[]
            response.data.data.map((value,index)=>{
                arrval.push({date:moment(value.Date).format('YYYY-MM-DD'),vendorname:value.VendorName,type:value.Type,details:value.Details,input:
                
                <Inputantd 
                className={`${!clicktrue?null:self.state["inputbox"+value.type_id] ? null: value.type_id===checkvalueid ? "borderredApproval":null} w-75`} breakclass={"approvalInputdnone"} 
                changeData={(data)=>self.changeDynamic(data,value.type_id)} 
                value={self.state["inputbox"+value.type_id]}
                />,
                
                action:<div className="approval_cus_iconalign"><VisibilityIcon className="tableeye_icon" onClick={()=>self.viewFun(value.type_id,value.Type)}/><CheckIcon className="tableedit_icon" onClick={()=>self.CheckFun(value.type_id)} /><CloseIcon className="tabledelete_icon" onClick={()=>self.closeFun(value.type_id)}/></div>,id:value.type_id})

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


        closemodal=()=>{
                this.setState({openview:false,editopen:false})
        }


    render(){
         const { Search} = Input;
         console.log(this.state.approvalinfo && this.state.approvalinfo[0].ad_start_date,"currentdata")
        console.log(this.state,"thisstate")
        const{approvalinfo}=this.state

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
                ]}
  
                rowdata={this.state.currentdata && this.state.currentdata}
                tablemasterclass="approval_cus_iconadd"
                props_loading={this.state.props_loading}
                actionclose="close"

  />

        <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
         customwidth_dialog={"customwidth_dialogApproval"} xswidth={"xs"}
        >
            <div className="ViewfontApproval d-flex">
                {this.state.approvaltype==="Advertisement" &&
                <>
            <div className="jusBetweenApproval">
                <div className="d-flex mb-4">
                    <div>Start Date</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>End Date</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Size</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Placement Location</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Fee/Days(KWD)</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Total cost(KWD)</div>
                    <div>:</div>
                </div>
                </div>
                <div className="valueMarginApproval">
                    <div>{approvalinfo && approvalinfo[0].ad_start_date}</div>
                    <div>{approvalinfo && approvalinfo[0].ad_end_date}</div>
                    <div>{approvalinfo && approvalinfo[0].ad_size}</div>
                    <div>{approvalinfo && approvalinfo[0].ad_location_id}</div>
                    <div>{approvalinfo && approvalinfo[0].ad_fee_per_day}</div>
                    <div>{approvalinfo && approvalinfo[0].ad_total_cost}</div>

                </div>
                </>}

                
                

                {this.state.approvaltype==="Deal" &&
                <>
                <div className="jusBetweenApproval">
                <div className="d-flex mb-4">
                    <div>Service Type</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Deal Title</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Valid From</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Valid To</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Deal</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>Deal Options</div>
                    <div>:</div>
                </div>

                <div className="d-flex mb-4">
                    <div>KWD</div>
                    <div>:</div>
                </div>
                </div>
                <div className="valueMarginApproval">
                    <div>{approvalinfo && approvalinfo[0].deal_service_type_id}</div>
                    <div>{approvalinfo && approvalinfo[0].deal_title}</div>
                    <div>{approvalinfo && approvalinfo[0].deal_valid_from}</div>
                    <div>{approvalinfo && approvalinfo[0].deal_valid_to}</div>
                    <div>{approvalinfo && approvalinfo[0].deal_active}</div>
                    <div>{approvalinfo && approvalinfo[0].deal_amount}</div>
                    <div>{approvalinfo && approvalinfo[0].deal_vendor_id}</div>
                </div>
                </>}
            </div>
                {this.state.approvaltype==="Advertisement" &&
            <div className="mb-4 clrimgApproval">
                    <div className="mb-4 ">Advertisement</div>
                    <img className="imgWidthApproval" src={approvalinfo && approvalinfo[0].ad_filename} alt="img" />
            </div>
                }
            
        </Modalcomp>


        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            
        </Modalcomp>
              

            </div>
        )
    }
}

