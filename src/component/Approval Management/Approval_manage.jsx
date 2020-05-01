import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import { apiurl } from "../../../src/App.js";
import { Input } from 'antd';
import Inputantd from "../../formcomponent/inputantd";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Spin, notification } from 'antd';
import createHistory from 'history/createBrowserHistory';
import "./Approval_manage.css"

const axios = require('axios');
var moment = require('moment');
const history = createHistory()

export default class Approval_manage extends React.Component {


    state = {
        openview: false,
        props_loading: false,
        currentdata: [],
        approvalAllValue: [],
        loading:true,
        onceopen:true,
    }

    changeDynamic = (data, id) => {

        this.setState({
            ["inputbox" + id]: data,
            inputboxid: id
        })

        var setInputValue = this.state.currentdata.filter((val) => {
            return val.id === id
        })

        setInputValue[0].input = <Inputantd className={"w-75"} breakclass={"approvalInputdnone"} changeData={(data) => this.changeDynamic(data, id)}
            value={data}
        />

    }

    viewFun = (id, type) => {
        alert(type)
        alert(id)
        this.setState({ openview: true, approvaltype: type, approvalinfo: "" ,model_loading:true})

        var self = this
        axios({
            method: 'post',
            url: `${apiurl}view_approval_info`,
            data: {
                "type": type,
                "type_id": id
            }
        })
            .then(function (response) {
                self.setState({
                    loading:false,
                    approvalinfo: response.data.data,
                    model_loading:false
                })
                console.log(response.data.data, "imgcheck")
            })
    }

    CheckFun = (id,useraccess) => {
        if (this.state["inputbox" + id]) {
            this.setState({props_loading:true})
            var type = this.state.currentdata.filter((val) => {
                return val.id === id
            })

            var self = this
            axios({
                method: 'put',
                url: `${apiurl}update_status_approved`,
                data: {
                    "type": type[0].type,
                    "type_id": id.toString(),
                    "created_by": "1",
                    "remarks": self.state["inputbox" + id]
                }
            })
                .then(function (response) {
                    var temperedvar = "inputbox" + id
                    self.setState({
                        loading: false,
                        [temperedvar]: ""
                    })
                    self.recall(null,null,"success","Approved successfully",useraccess)
                    console.log(response, "resapproval")
                })

        } else {
            this.setState({
                currentbox: id
            })
            this.recall(id, true,null,null,useraccess)
        }

    }

    closeFun = (id,useraccess) => {

        if (this.state["inputbox" + id]) {
            this.setState({props_loading:true})
            var type = this.state.currentdata.filter((val) => {
                return val.id === id
            })

            var self = this
            axios({
                method: 'put',
                url: `${apiurl}update_status_rejected`,
                data: {
                    "type": type[0].type,
                    "type_id": id.toString(),
                    "created_by": "1",
                    "remarks": self.state["inputbox" + id]
                }
            })
                .then(function (response) {
                    var temperedvar = "inputbox" + id
                    self.setState({
                        loading: false,
                        [temperedvar]: ""
                    })
                    self.recall(null,null,"success","Rejected successfully",useraccess)
                    console.log(response, "resapproval")

                })

        } else {
            this.setState({
                currentbox: id
            })
            this.recall(id, true,null,null,useraccess)
        }
    }
    expiretoken=()=>{
        return(
        localStorage.removeItem("token"),
        localStorage.removeItem("email"),
        history.push('/'),
        window.location.reload()
        )
    }

    recall = (checkvalueid, clicktrue,type,msg,useraccess) => {

        var token = localStorage.getItem("token")

        var self = this
        axios({
            method: 'get',
            url: `${apiurl}get_vw_approval_mgnt`,
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(function (response) {
                console.log(response, "response");

                var arrval = []
                var approvalAllValue = []
                response.data.data.map((value, index) => {
                    arrval.push({
                        date: moment(value.Date).format('DD-MM-YYYY'), vendorname: value.VendorName, type: value.Type, details: value.Details, input:

                            <Inputantd
                                className={`${!clicktrue ? null : self.state["inputbox" + value.type_id] ? null : value.type_id === checkvalueid ? "borderredApproval" : null} w-75`} breakclass={"approvalInputdnone"}
                                changeData={(data) => self.changeDynamic(data, value.type_id)}
                                value={self.state["inputbox" + value.type_id]}
                            />,

                        action: <div className="approval_cus_iconalign"><VisibilityIcon className="tableeye_icon" onClick={() => self.viewFun(value.type_id, value.Type)} /><CheckIcon className={`tableedit_icon ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" ? () => self.CheckFun(value.type_id,useraccess):null} /><CloseIcon className={`tabledelete_icon ${useraccess && useraccess.allow_delete==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_delete==="Y" ? () => self.closeFun(value.type_id,useraccess) : null} /></div>, id: value.type_id
                    })

                    approvalAllValue.push(value)

                })
                type && notification[type]({
                    className: "show_frt",
                    message: msg,
                });
                self.setState({
                    currentdata: arrval,
                    approvalAllValue: approvalAllValue,
                    loading: false,
                    props_loading:false
                })

            })
            .catch(function (error) {

                notification.info({
                    className: "show_frt",
                    message: "Token expired",
                });
                setTimeout(() => {
                    self.expiretoken()
                  }
                ,4000)
            });
    }


    closemodal = () => {
        this.setState({ openview: false, editopen: false })
    }


    render() {
        const { Search } = Input;
        console.log(this.state, "thisstate")
        const { approvalinfo } = this.state
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[13]
        if(this.state.onceopen && useraccess){
        this.recall(null,null,null,null,useraccess)
        this.setState({onceopen:false})
        }
        return (
            <div>
                {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
            <div>
                <div className="approval_manage_header">

                    <div className="approval_manage_title">
                        <h3>APPROVAL MANAGEMENT</h3>
                    </div>
                    <Search className="search"
                        placeholder=" search "
                        onSearch={value => console.log(value)}
                        style={{ width: 150 }} />
                </div>

                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "date", label: "Date" },
                    { id: "vendorname", label: "Vendor Name" },
                    { id: "type", label: "Type" },
                    { id: "details", label: "Details" },
                    { id: "input", label: "Remarks" },
                    { id: "action", label: "Action" },
                ]}

                    rowdata={this.state.currentdata && this.state.currentdata}
                    tablemasterclass="approval_cus_iconadd"
                    props_loading={this.state.props_loading}
                    actionclose="close"

                />

                <Modalcomp visible={this.state.openview} title={"View details"} closemodal={(e) => this.closemodal(e)}
                    customwidth_dialog={"customwidth_dialogApproval"} xswidth={"xs"}
                >
                     <Spin className="spinner_align" spinning={this.state.model_loading}>
                    <div>
                    <div className="ViewfontApproval d-flex">
                        {this.state.approvaltype === "Vendor" &&

                            <>
                                <div className="jusBetweenApproval">
                                    <div className="d-flex mb-4">
                                        <div>Name</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Qualification</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Contact Email</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Contact Mobile</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>DOB</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Gender</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Nationality</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Email</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Phone</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Website</div>
                                        <div>:</div>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div>Address</div>
                                        <div>:</div>
                                    </div>
                                </div>
                                <div className="viewty_emptyApproval">
                                    <div>{approvalinfo && approvalinfo[0].vendor_name===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_name }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_contact_qualification===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_qualification }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_contact_email===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_email }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_contact_mobile===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_mobile }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_contact_dob===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_dob }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_contact_gender===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_gender }</div>
                                    <div>{approvalinfo && approvalinfo[0].nationality_id===null ? <span>----</span> : approvalinfo && approvalinfo[0].nationality_id }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_email===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_email }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_phone===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_phone }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_website===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_website }</div>
                                    <div>{approvalinfo && approvalinfo[0].vendor_address===null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_address }</div>


                                </div>
                            </>
                        }

                        {this.state.approvaltype === "Advertisement" &&
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
                                    <div>{approvalinfo && moment(approvalinfo[0].ad_start_date).format('DD-MM-YYYY')}</div>
                                    <div>{approvalinfo && moment(approvalinfo[0].ad_end_date).format('DD-MM-YYYY')}</div>
                                    <div>{approvalinfo && approvalinfo[0].ad_size}</div>
                                    <div>{approvalinfo && approvalinfo[0].ad_location_id}</div>
                                    <div>{approvalinfo && approvalinfo[0].ad_fee_per_day}</div>
                                    <div>{approvalinfo && approvalinfo[0].ad_total_cost}</div>

                                </div>
                            </>}


                        {this.state.approvaltype === "Deal" &&
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
                                    <div>{approvalinfo && moment(approvalinfo[0].deal_valid_from).format('DD-MM-YYYY')}</div>
                                    <div>{approvalinfo && moment(approvalinfo[0].deal_valid_to).format('DD-MM-YYYY')}</div>
                                    <div>{approvalinfo && approvalinfo[0].deal_active}</div>
                                    <div>{approvalinfo && approvalinfo[0].deal_amount}</div>
                                    <div>{approvalinfo && approvalinfo[0].deal_vendor_id}</div>
                                </div>
                            </>}
                    </div>
                    {this.state.approvaltype === "Advertisement" &&
                        <div className="mb-4 clrimgApproval">
                            <div className="mb-4 ">Advertisement</div>
                            <img className="imgWidthApproval" src={approvalinfo && approvalinfo[0].ad_filename} alt="img" />
                        </div>
                    }
                    </div>
                    </Spin>
                </Modalcomp>

            </div>
             } </div>
        )
    }
}

