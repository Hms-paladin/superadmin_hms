import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import { apiurl } from "../../../src/App.js";
import { Input } from 'antd';
import Inputantd from "../../formcomponent/inputantd";
import Dropdownantd from "../../formcomponent/dropdownantd";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Spin, notification } from 'antd';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import { DatePicker } from 'antd';
import noimg from "../../images/noimg.jpg" 
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
        loading: true,
        onceopen: true,
        status: "Pending",
        vendordata: [],
        type: "",
        search: null,
        sizedata:[],
        placedata:[]
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
        // alert(id)
        // alert(type)
        this.setState({ openview: true, approvaltype: type, approvalinfo: "", model_loading: true })

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
                    loading: false,
                    approvalinfo: response.data.data,
                    model_loading: false
                })
                console.log(response.data.data, "imgcheck")
            })
    }

    filterrecall = (checkvalueid, clicktrue, useraccess, type, msg, filterdata) => {
        var self = this
        axios({
            method: 'post',
            url: `${apiurl}get_vw_approval_mgnt `,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            data: filterdata

        })
            .then(function (response) {
                var filterarr = []
                response.data.data.map((value, index) => {
                    filterarr.push({
                        date: moment(value.Date).format('DD-MM-YYYY'), vendorname: value.VendorName, type: value.Type, details: value.Details, input:

                            <Inputantd
                                className={`${!clicktrue ? null : self.state["inputbox" + value.type_id] ? null : value.type_id === checkvalueid ? "borderredApproval" : null} w-75`} breakclass={"approvalInputdnone"}
                                changeData={(data) => self.changeDynamic(data, value.type_id)}
                                value={self.state["inputbox" + value.type_id]}
                            />,

                        action: <div className="approval_cus_iconalign"><VisibilityIcon className="tableeye_icon" onClick={() => self.viewFun(value.type_id, value.Type)} /><CheckIcon className={`tableedit_icon ${useraccess && useraccess.allow_add === "N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add === "Y" ? () => self.CheckFun(value.type_id, useraccess, true, filterdata) : null} /><CloseIcon className={`tabledelete_icon ${useraccess && useraccess.allow_delete === "N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_delete === "Y" ? () => self.closeFun(value.type_id, useraccess, true, filterdata) : null} /></div>, id: value.type_id
                    })
                })
                self.setState({
                    currentdata: filterarr,
                    loading: false,
                    props_loading: false
                })
                console.log(filterarr, "filter")
                type && notification[type]({
                    className: "show_frt",
                    message: msg,
                });

            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }

    CheckFun = (id, useraccess, callfilterfun, filterapidata) => {
        if (this.state["inputbox" + id]) {
            this.setState({ props_loading: true })
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
                    if (callfilterfun) {
                        self.filterrecall(null, null, useraccess, "success", "Approved successfully", filterapidata)
                    } else {
                        self.recall(null, null, "success", "Approved successfully", useraccess)
                    }
                    console.log(response, "resapproval")
                })

        } else {
            this.setState({
                currentbox: id
            })
            if (callfilterfun) {
                this.filterrecall(id, true, useraccess, null, null, filterapidata)
            } else {
                this.recall(id, true, null, null, useraccess)
            }
        }

    }

    closeFun = (id, useraccess, callfilterfun, filterapidata) => {

        if (this.state["inputbox" + id]) {
            this.setState({ props_loading: true })
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
                    if (callfilterfun) {
                        self.filterrecall(null, null, useraccess, "success", "Rejected successfully", filterapidata)
                    } else {
                        self.recall(null, null, "success", "Rejected successfully", useraccess)
                    }
                })

        } else {
            this.setState({
                currentbox: id
            })
            if (callfilterfun) {
                this.filterrecall(id, true, useraccess, null, null, filterapidata)
            } else {
                this.recall(id, true, null, null, useraccess)
            }
        }
    }
    expiretoken = () => {
        return (
            localStorage.removeItem("token"),
            localStorage.removeItem("email"),
            history.push('?/'),
            window.location.reload()
        )
    }

    recall = (checkvalueid, clicktrue, type, msg, useraccess) => {

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

                        action: <div className="approval_cus_iconalign"><VisibilityIcon className="tableeye_icon" onClick={() => self.viewFun(value.type_id, value.Type)} /><CheckIcon className={`tableedit_icon ${useraccess && useraccess.allow_add === "N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add === "Y" ? () => self.CheckFun(value.type_id, useraccess) : null} /><CloseIcon className={`tabledelete_icon ${useraccess && useraccess.allow_delete === "N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_delete === "Y" ? () => self.closeFun(value.type_id, useraccess) : null} /></div>, id: value.type_id
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
                    props_loading: false
                })

            })
            .catch(function (error) {

                notification.info({
                    className: "show_frt",
                    message: "Token expired",
                });
                setTimeout(() => {
                    self.expiretoken()
                }, 2000)
            });
    }


    closemodal = () => {
        this.setState({ openview: false, editopen: false })
    }

    componentDidMount() {
        var self = this
        axios({
            method: 'get',
            url: `${apiurl}get_mas_vendor_master`,

        })
            .then(function (response) {
                var arrval = []
                response.data.data.map((value) => {
                    arrval.push({ dropdown_val: value.vendor, id: value.id })
                })
                self.setState({
                    vendordata: arrval,
                    // vendor:arrval[0].dropdown_val
                })
            })

        axios({
            method: 'get',
            url: `${apiurl}get_mas_size_master`,

        })
            .then(function (response) {
                var sizearrval = []
                response.data.data.map((value) => {
                    sizearrval.push({ size: value.size, id: value.id })
                })
                self.setState({
                    sizedata: sizearrval,
                })
            })

        axios({
            method: 'get',
            url: `${apiurl}get_mas_placement_location`,

        })
            .then(function (response) {
                var placearrval = []
                response.data.data.map((value) => {
                    placearrval.push({ placement_location: value.placement_location, id: value.id })
                })
                self.setState({
                    placedata: placearrval,
                })
            })

    }

    filter = (name, data) => {
        this.setState({
            [name]: data
        })
    }

    searchfun = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    filterfun = (checkvalueid, clicktrue, useraccess = this.state.useraccessstate) => {

        switch (this.state.status) {
            case "1":
                var status = "PENDING"
                break;

            case "2":
                var status = "APPROVE"
                break;

            case "3":
                var status = "REJECT"
                break;

            case "Pending":
                var status = "PENDING"
                break;
        }

        switch (this.state.type) {
            case "1":
                var type = "Vendor"
                break;

            case "2":
                var type = "Deal"
                break;

            case "3":
                var type = "Advertisement"
                break;

            case "4":
                var type = "Media"
                break;
        }

        var filterapidata = {
            "status": status,
            "vendorId": this.state.vendor ? this.state.vendor : "",
            "fromDate": this.state.fromdate ? moment(this.state.fromdate).format('YYYY-MM-DD') : "",
            "toDate": this.state.todate ? moment(this.state.todate).format('YYYY-MM-DD') : "",
            "vendorName": this.state.vendor_name ? this.state.vendor_name : "",
            "type": type ? type : ""
        }

        var self = this
        axios({
            method: 'post',
            url: `${apiurl}get_vw_approval_mgnt `,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            data:
            {
                "status": status,
                "vendorId": this.state.vendor ? this.state.vendor : "",
                "fromDate": this.state.fromdate ? moment(this.state.fromdate).format('YYYY-MM-DD') : "",
                "toDate": this.state.todate ? moment(this.state.todate).format('YYYY-MM-DD') : "",
                "vendorName": this.state.vendor_name ? this.state.vendor_name : "",
                "type": type ? type : ""
            }

        })
            .then(function (response) {
                var filterarr = []
                response.data.data.map((value, index) => {
                    status === "PENDING" ?
                        filterarr.push({
                            date: moment(value.Date).format('DD-MM-YYYY'), vendorname: value.VendorName, type: value.Type, details: value.Details, input:

                                <Inputantd
                                    className={`${!clicktrue ? null : self.state["inputbox" + value.type_id] ? null : value.type_id === checkvalueid ? "borderredApproval" : null} w-75`} breakclass={"approvalInputdnone"}
                                    changeData={(data) => self.changeDynamic(data, value.type_id)}
                                    value={self.state["inputbox" + value.type_id]}
                                />,

                            action: <div className="approval_cus_iconalign"><VisibilityIcon className="tableeye_icon" onClick={() => self.viewFun(value.type_id, value.Type)} /><CheckIcon className={`tableedit_icon ${useraccess && useraccess.allow_add === "N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add === "Y" ? () => self.CheckFun(value.type_id, useraccess, true, filterapidata) : null} /><CloseIcon className={`tabledelete_icon ${useraccess && useraccess.allow_delete === "N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_delete === "Y" ? () => self.closeFun(value.type_id, useraccess, true, filterapidata) : null} /></div>, id: value.type_id
                        })
                        :
                        filterarr.push({
                            date: moment(value.Date).format('DD-MM-YYYY'), vendorname: value.VendorName, type: value.Type, details: value.Details, input: value.remarks,
                            action: <div><VisibilityIcon className="tablefiltereye_icon" onClick={() => self.viewFun(value.type_id, value.Type)} /></div>, id: value.type_id
                        })
                })
                self.setState({
                    currentdata: filterarr
                })
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }


    render() {
        const { Search } = Input;
        console.log(this.state, "thisstate")
        const { approvalinfo } = this.state
        var useraccess = this.props.uservalue && this.props.uservalue[0].item[0].item[8]
        if (this.state.onceopen && useraccess) {
            this.recall(null, null, null, null, useraccess)
            this.setState({ onceopen: false, useraccessstate: useraccess })
        }

        const searchdata = this.state.currentdata.filter((data) => {
            if (this.state.search === null)
                return data
            else if (data.vendorname !== null && data.vendorname.toLowerCase().includes(this.state.search.toLowerCase()) || data.type !== null && data.type.toLowerCase().includes(this.state.search.toLowerCase()) || data.details !== null && data.details.toLowerCase().includes(this.state.search.toLowerCase()) || data.date !== null && data.date.toLowerCase().includes(this.state.search.toLowerCase())) {
                return data
            }
        })


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
            onChange={this.searchfun}
            style={{ width: 150 }} />
    </div>
    <div className={`d-flex mt-3 mb-3 ${this.state.type === "1" ? "withoutdatebox" : "justify-content-between"}`}>
        <Dropdownantd label="Status" className="filterboxwidthdrop mr-2" divclass={"filterboxwidth"}
            option={[{ dropdown_val: "Pending", id: "1" }, { dropdown_val: "Approved", id: "2" }, { dropdown_val: "Rejected", id: "3" }]}
            changeData={(data) => this.filter("status", data)}
            value={this.state.status}
        />
        <Dropdownantd label="Vendor" className="filterboxwidthdrop" divclass={"filterboxwidth"}
            option={this.state.vendordata && this.state.vendordata}
            changeData={(data) => this.filter("vendor", data)}
            value={this.state.vendor}
        />
        <Inputantd label="Vendor name" className="filterinputbox"
            changeData={(data) => this.filter("vendor_name", data)}
            value={this.state.vendor_name}
        />
        <Dropdownantd label="Type" className="filterboxwidthdrop" divclass={"filterboxwidth"}
            option={[{ dropdown_val: "Vendor", id: "1" }, { dropdown_val: "Deal", id: "2" }, { dropdown_val: "Advertisement", id: "3" }, { dropdown_val: "Media", id: "4" }]}
            changeData={(data) => this.filter("type", data)}
            value={this.state.type}
        />
        {this.state.type !== "1" &&
            <>
                <div>
                    <label className="commonlabel">From Date</label>
                    <DatePicker className="filtercalendarbox" onChange={(data) => this.filter("fromdate", data)} format={"DD-MM-YYYY"} value={this.state.fromdate} />
                </div>
                <div>
                    <label className="commonlabel">To Date</label>
                    <DatePicker className="filtercalendarbox" onChange={(data) => this.filter("todate", data)} format={"DD-MM-YYYY"} value={this.state.todate} />
                </div>
            </>
        }
        <Button className="filterbtn" onClick={this.filterfun}>Filter</Button>
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

        rowdata={searchdata && searchdata}
        tablemasterclass="approval_cus_iconadd"
        props_loading={this.state.props_loading}
        actionclose="close"

    />

    <Modalcomp visible={this.state.openview} title={"View details"} closemodal={(e) => this.closemodal(e)}
        customwidth_dialog={"customwidth_dialogApproval"} xswidth={"xs"}
    >
        <Spin className="spinner_alignmodel" spinning={this.state.model_loading}>
            {approvalinfo &&
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
                                <div>{approvalinfo && approvalinfo[0].vendor_name === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_name}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_contact_qualification === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_qualification}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_contact_email === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_email}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_contact_mobile === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_mobile}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_contact_dob === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_dob}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_contact_gender === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_contact_gender}</div>
                                <div>{approvalinfo && approvalinfo[0].nationality_id === null ? <span>----</span> : approvalinfo && approvalinfo[0].nationality_id}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_email === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_email}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_phone === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_phone}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_website === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_website}</div>
                                <div>{approvalinfo && approvalinfo[0].vendor_address === null ? <span>----</span> : approvalinfo && approvalinfo[0].vendor_address}</div>


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
                                <div>{approvalinfo && this.state.sizedata.map((data)=>{
                                    if(data.id == approvalinfo[0].ad_size){
                                        return data.size
                                    }
                                })}</div>
                                <div>{approvalinfo && this.state.placedata.map((data)=>{
                                    if(data.id == approvalinfo[0].ad_location_id){
                                        return data.placement_location
                                    }
                                })}</div>
                                {/* <div>{approvalinfo && approvalinfo[0].ad_size}</div> */}
                                {/* <div>{approvalinfo && approvalinfo[0].ad_location_id}</div> */}
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

                                {/* <div className="d-flex mb-4">
                                    <div>Deal</div>
                                    <div>:</div>
                                </div> */}

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
                                {/* <div>{approvalinfo && approvalinfo[0].deal_active}</div> */}
                                <div>{approvalinfo && approvalinfo[0].deal_amount}</div>
                                <div>{approvalinfo && approvalinfo[0].deal_vendor_id}</div>
                            </div>
                        </>}
                        
                        {this.state.approvaltype === "Media" &&
                        <>
                            <div className="jusBetweenApproval">
                                <div className="d-flex mb-4">
                                    <div>Media Title</div>
                                    <div>:</div>
                                </div>

                                <div className="d-flex mb-4">
                                    <div>Media Description</div>
                                    <div>:</div>
                                </div>

                                {/* <div className="d-flex mb-4">
                                    <div>Valid From</div>
                                    <div>:</div>
                                </div> */}
                            </div>

                            <div className="valueApprovalmedia">
                                <div>{approvalinfo && approvalinfo[0].media_title}</div>
                                <div>{approvalinfo && approvalinfo[0].media_description}</div>
                                {/* <div>{approvalinfo && approvalinfo[0].deal_vendor_id}</div> */}
                            </div>
                        </>}
                </div>
                {this.state.approvaltype === "Advertisement" &&
                    <div className="mb-4 clrimgApproval">
                        <div className="mb-4 ">Advertisement</div>
                        {
                        approvalinfo && approvalinfo[0].ad_filename===null ?
                        <img className="imgnullApproval" src={noimg} alt="Image" />:
                        <img className="imgWidthApproval" src={approvalinfo && approvalinfo[0].ad_filename} alt="Image" />
                        }
                    </div>
                }

                {this.state.approvaltype === "Media" &&
                    <div className="mb-4 clrimgApproval">
                        <div className="mb-4 ">Media</div>
                        {
                        approvalinfo && approvalinfo[0].media_filename===null ?
                        <img className="imgnullApproval" src={noimg} alt="Image" />:approvalinfo && approvalinfo[0].media_type==="Image" ?
                        <img className="imgWidthApproval" src={approvalinfo && approvalinfo[0].media_filename} alt="Image" />:
                        <video width="320" height="240" controls src={approvalinfo && approvalinfo[0].media_filename}>
                        </video>}
                    </div>
                }
            </div>
            }              
                            </Spin>
                        </Modalcomp>

                    </div>
                } </div>
        )
    }
}

