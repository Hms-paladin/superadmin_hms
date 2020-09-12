import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import { apiurl } from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin, notification } from 'antd';
import Chip from '@material-ui/core/Chip';
import Dropdownantd from "../../formcomponent/dropdownantd"



import "./VendorProfile.css";

const axios = require('axios');



var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti = dateFormat(now, "yyyy-mm-dd hh:MM:ss ")

export default class Vendor_master extends React.Component {

    state = {
        openview: false,
        insertmodalopen: false,
        deleteopen: false,
        loading: false,
        props_loading: false,
        currentdata: [],
        profiledata: [],
        trainingcatogery:[],
        training:[],
    }




    deleteopen = (type, id) => {
        this.setState({
            deleteopen: true,
            iddata: id
        })
    }

    changeDynamic = (data) => {
        if (this.state.modeltype === "view") {
            this.setState({
                vendor: data
            })
        } else {
            this.setState({
                idnamedata: data
            })
        }

    }



    modelopen = (data, id) => {
        if (data === "view") {

            var vendorId = this.state.allresponseData.filter((data) => {
                return id === data.vendor_id
            })

            console.log(vendorId[0].vendor_type, "vendorId")

            this.setState({ activeFlag: vendorId[0].active_flag })

            var vendorEndpoint = null
            var vendorKey = null

            switch (vendorId[0].vendor_type) {
                case "Doctor":
                    vendorEndpoint = "getDoctorDetails";
                    vendorKey = "doctorId"
                    this.setState({ vendor_typeView: "Doctor" })
                    break;
                case "Lab":
                    vendorEndpoint = "getlabprofiledetails";
                    vendorKey = "labId"
                    this.setState({ vendor_typeView: "Lab" })
                    break;
                case "Clinic":
                    vendorEndpoint = "getClinicProfile";
                    vendorKey = "clinic_id"
                    this.setState({ vendor_typeView: "Clinic" })
                    break;
                case "Health Checkup":
                    vendorEndpoint = "gethealthcheckupprofile";
                    vendorKey = "hc_vendorId"
                    this.setState({ vendor_typeView: "Health Checkup" })
                    break;
                case "Nurse":
                    vendorEndpoint = "getnursevendorprofile";
                    vendorKey = "nursevendorId"
                    this.setState({ vendor_typeView: "Nurse" })
                    break;
                case "Trainer":
                    vendorEndpoint = "getTrainerDetails";
                    vendorKey = "trainerId"
                    this.setState({ vendor_typeView: "Trainer" })
                    break;
                case "training center":
                    vendorEndpoint = "gettrainingcenterprofile";
                    vendorKey = "trainingCenterId"
                    this.setState({ vendor_typeView: "Training" })
                    break;
                case "Diet":
                    vendorEndpoint = "getdietprofile";
                    vendorKey = "dietvendorId"
                    this.setState({ vendor_typeView: "Diet" })
                    break;
                case "Pharmacy":
                    vendorEndpoint = "Pharmacypending";
                    vendorKey = "Pharmacypending"
                    this.setState({ vendor_typeView: "Pharmacy" })
                    break;
                case "Room":
                    vendorEndpoint = "getBookRoomvendorprofile";
                    vendorKey = "brvendorId"
                    this.setState({ vendor_typeView: "Book A Room" })
                    break;
                case "Shopping":
                    vendorEndpoint = "shoppingpending";
                    vendorKey = "shoppingpending"
                    this.setState({ vendor_typeView: "Shopping" })
                    break;
            }

            // var endpoint = ["getDoctorDetails","getlabprofiledetails","getClinicProfile","gethealthcheckupprofile","getnursevendorprofile","getTrainerDetails","gettrainingcenterprofile","getdietprofile","Pharmacypending","getBookRoomvendorprofile","shoppingpending"]

            // var vendorkey = ["doctorId","labId","clinic_id","hc_vendorId","nursevendorId","trainerId","trainingCenterId","dietvendorId","Pharmacypending","brvendorId","shoppingpending"]

            var self = this
            axios({
                method: 'post',
                url: `${apiurl}${vendorEndpoint}`,
                data: { [vendorKey]: id }
            })
                .then(function (response) {
                    console.log(response, "profileresponse")
                    var profiledata = []
                    response.data.data.map((value) => {
                        profiledata.push(value)
                    })
                    self.setState({
                        loading: false,
                        profiledata: profiledata
                    })
                })
                .catch(function (error) {
                    console.log(error, "error");
                });
            this.setState({ insertmodalopen: true, modeltype: data })
        }
        else if (data === "edit") {
            this.setState({ insertmodalopen: true, modeltype: data })
        }
    }


    closemodal = () => {
        this.setState({ openview: false, editopen: false, insertmodalopen: false, deleteopen: false })
    }

    insertdata = () => {
        this.setState({
            insertmodalopen: true,
            modeltype: "view"
        })
    }

    componentDidMount() {

        var self = this
        axios({
            method: 'get',
            url: `${apiurl}get_vendor`
        })
            .then(function (response) {
                console.log(response, "response")
                var arrval = []
                var allresponseData = []
                response.data.data.map((value) => {

                    // var VendorType = null

                    // switch (value.vendor_type_id) {
                    //     case 1:
                    //     case 4:
                    //     case 16:
                    //     case 17:
                    //     case 19:
                    //     case 20:
                    //         VendorType = "Doctor";
                    //         break;
                    //     case 2:
                    //     case 7:
                    //         VendorType = "Lab";
                    //         break;
                    //     case 3:
                    //         VendorType = "Clinic";
                    //         break;
                    //     case 15:
                    //         VendorType = "Health Checkup";
                    //         break;
                    //     case 5:
                    //     case 13:
                    //         VendorType = "Nurse";
                    //         break;
                    //     case 6:
                    //     case 8:
                    //     case 9:
                    //     case 10:
                    //         VendorType = "Trainer";
                    //         break;
                    //     case 11:
                    //         VendorType = "Training Center";
                    //         break;
                    //     case 12:
                    //         VendorType = "Diet";
                    //         break;
                    //     case 14:
                    //         VendorType = "Pharmacy";
                    //         break;
                    //     case 18:
                    //         VendorType = "Room";
                    //         break;
                    //     case 21:
                    //         VendorType = "Shopping";
                    //         break;
                    // }


                    arrval.push({ name: value.vendor_name, type: value.vendor_type, status: value.active_flag ? <Chip label="Active" className="status_usermaster_active" variant="outlined" /> : <Chip label="In-Active" className="status_usermaster_inactive" variant="outlined" />, id: value.vendor_id })

                    allresponseData.push(value)
                })
                self.setState({
                    currentdata: arrval,
                    allresponseData: allresponseData,
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }


    render() {
        const { profiledata } = this.state
        console.log(this.state.profiledata, "profiledata")
        return (
            <div>
                {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
                    <div>
                        <div className="vendor_master_header">
                            <div className="vendor_master_title"><h3>VENDOR MASTER</h3></div>
                            {/* <img className="plus" onClick={this.insertdata} src={PlusIcon} /> */}
                        </div>
        <Tablecomponent heading={[
            { id: "", label: "S.No" },
            { id: "vendor", label: "Vendor Name" },
            { id: "type", label: "Vendor Type" },
            // { id: "mobile", label: "Mobile Number" },
            // { id: "email", label: "Email Id" },
            { id: "status", label: "Status" },
            { id: "", label: "Action" }
        ]}

            rowdata={this.state.currentdata && this.state.currentdata}
            tableicon_align={""}
            modelopen={(e, id) => this.modelopen(e, id)}
            alignheading="cus_wid_vendor_head"
            deleteopen={this.deleteopen}
            props_loading={this.state.props_loading}
            editpermission="Y"

        />

        <Modalcomp className="vendor_master_modal" visible={this.state.insertmodalopen} title={this.state.modeltype === "edit" ? "EDIT VENDOR DETAILS" : "VIEW DETAILS"} closemodal={(e) => this.closemodal(e)} customwidth_dialog={"vendormasterwidth"}
            xswidth={"xs"}
        >

            {this.state.modeltype === "edit" ?
                <div className="create_group">
                    <Inputantd label="Vendor Name" className="group_optionName" placeholder=""
                    />
                    <div className="trainerbox_align">
                    <Dropdownantd label="Training Catogery" divclass="group_option" className="group_optionClass" placeholder="Select"
                    option={this.state.trainingcatogery} changeData={(data) => this.changeDynamic(data, "trainingcatogery")} value={this.state.trainingcatogery}
                    />
                    <Dropdownantd label="Training" className="group_optionClass" divclass="group_option" placeholder="Select"
                    option={this.state.training} changeData={(data) => this.changeDynamic(data, "training")} value={this.state.training}
                    />
                    </div>
                    <div className="group_button">
                        <Button className="group_button_cancel">Cancel</Button>
                        <Button className="group_button_create" >Update</Button>
                    </div>
                </div> :
                <div className="vendorprofile_container">
                    <div className="vendorprofilekey">
                        {this.state.vendor_typeView === "Book A Room" || this.state.vendor_typeView === "Lab" || this.state.vendor_typeView === "Nurse" || this.state.vendor_typeView === "Pharmacy" || this.state.vendor_typeView === "Health Checkup" || this.state.vendor_typeView === "Clinic" || this.state.vendor_typeView === "Diet" || this.state.vendor_typeView === "Shopping" || this.state.vendor_typeView === "Training" || this.state.vendor_typeView === "Trainer" ?
                            <>
                                <div>Vendor Name</div>
                                <div>Vendor Type</div>
                                <div>Email</div>
                                <div>Mobile</div>
                                <div>Website</div>
                                {this.state.vendor_typeView !== "Clinic" &&
                                    <div>Contact Person</div>
                                }
                                {this.state.vendor_typeView === "Trainer" &&
                                <>
                                    <div>Training Mode</div>
                                    <div>Training Category</div>
                                    <div>Training</div>
                                </>    
                                }
                                <div>Status</div>
                                <div>Address </div>
                            </>
                            :
                            <>
                                <div>Vendor Name</div>
                                <div>Vendor Type</div>
                                <div>Email</div>
                                <div>Mobile</div>
                                <div>Website</div>
                                <div>D.O.B</div>
                                <div>Qualification</div>
                                <div>PracticeSince</div>
                                <div>speciality</div>
                                <div>Clinic</div>
                                <div>SelfDescription</div>
                                <div>Status</div>
                                <div>Address </div>
                            </>
                        }
                    </div>
                    <div>
            {this.state.vendor_typeView === "Doctor" ?
                <>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].doctorName ? profiledata[0].doctorName : "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && "Doctor"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].email ? profiledata[0].email : "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].mobile ? profiledata[0].mobile : "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].website ? profiledata[0].website : "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].dob ? profiledata[0].dob : "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].qualification ? profiledata[0].qualification : "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].practiceSince ? profiledata[0].practiceSince : "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].selfDescription ? profiledata[0].selfDescription : "----"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && this.state.activeFlag ? "Active" : "Inactive"}</div></div>
                    <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].address ? profiledata[0].address : "----"}</div></div>
                </> :

                this.state.vendor_typeView === "Lab" || this.state.vendor_typeView === "Health Checkup" || this.state.vendor_typeView === "Nurse" || this.state.vendor_typeView === "Training" || this.state.vendor_typeView === "Diet" || this.state.vendor_typeView === "Book A Room" ?
                    <>
                        <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_name ? profiledata[0].vendor_name : "----"}</div></div>
                        <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && this.state.vendor_typeView}</div></div>
                        <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_email ? profiledata[0].vendor_email : "----"}</div></div>
                        <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_phone ? profiledata[0].vendor_phone : "----"}</div></div>
                        <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_website ? profiledata[0].vendor_website : "----"}</div></div>
                        <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_contact ? profiledata[0].vendor_contact : "----"}</div></div>
                        <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && this.state.activeFlag ? "Active" : "Inactive"}</div></div>
                        <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_address ? profiledata[0].vendor_address : "----"}</div></div>
                    </>
                    : this.state.vendor_typeView === "Clinic" ?
                        <>
                            <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_name ? profiledata[0].vendor_name : "----"}</div></div>
                            <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && this.state.vendor_typeView}</div></div>
                            <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].email ? profiledata[0].email : "----"}</div></div>
                            <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].mobile ? profiledata[0].mobile : "----"}</div></div>
                            <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].website ? profiledata[0].website : "----"}</div></div>
                            <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && this.state.activeFlag ? "Active" : "Inactive"}</div></div>
                            <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].address ? profiledata[0].address : "----"}</div></div>
                        </> : this.state.vendor_typeView === "Trainer" ?
                            <>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].trainerName ? profiledata[0].trainerName : "----"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && this.state.vendor_typeView}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_email ? profiledata[0].vendor_email : "----"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_phone ? profiledata[0].vendor_phone : "----"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_website ? profiledata[0].vendor_website : "----"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_phone ? profiledata[0].vendor_phone : "----"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].training_mode ? profiledata[0].training_mode : "----"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].training_category ? profiledata[0].training_category : "----"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].training ? profiledata[0].training : "----"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && this.state.activeFlag ? "Active" : "Inactive"}</div></div>
                                <div className="vendorprofilevalue"><div>:</div><div> {profiledata.length > 0 && profiledata[0].vendor_address ? profiledata[0].vendor_address : "----"}</div></div>
                            </> : null
            }
                    </div>
                </div>}

                        </Modalcomp>


                        <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
                            <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} />
                        </Modalcomp>
                    </div>}

            </div>
        )
    }
}

