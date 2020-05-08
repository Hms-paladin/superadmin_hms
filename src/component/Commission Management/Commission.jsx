import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import Button from '@material-ui/core/Button';
import Inputnumber from "../../formcomponent/inputnumberantd";
import { apiurl } from "../../../src/App.js";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Spin, notification } from 'antd';

import "./Commission.css";

const axios = require('axios');


export default class Commission extends React.Component {

    state = {
        openview: false,
        insertmodalopen: false,
        currentdata: [],
        loading: true,
        props_loading: false,
        doctor:"",
        lab:"",
        clinic:"",
        health:"",
        nurse:"",
        trainer:"",
        doctorid:"",
        labid:"",
        clinicid:"",
        healthid:"",
        nurseid:"",
        trainerid:"",
        loading:true,
    }

    componentDidMount() {
        this.recall()
    }

    recall=(type)=>{

        var self = this
        axios({
            method: 'get',
            url: `${apiurl}get_mas_commission`
        })
            .then(function (response) {
                console.log(response, "response_comm")
                var arrval = []
                response.data.data.map((value) => {
                    arrval.push({ vendor: value.vendor, commission: value.commission, id: value.id })
                })
                self.setState({
                    currentdata: arrval,
                    props_loading: false,
                    doctor:arrval[0].commission,
                    lab:arrval[1].commission,
                    clinic:arrval[2].commission,
                    health:arrval[3].commission,
                    nurse:arrval[4].commission,
                    trainer:arrval[5].commission,
                    doctorid:arrval[0].id,
                    labid:arrval[1].id,
                    clinicid:arrval[2].id,
                    healthid:arrval[3].id,
                    nurseid:arrval[4].id,
                    trainerid:arrval[5].id,
                    loading:false,
                })
                type && notification[type]({
                    className: "show_frt",
                    message: "Record update successfully",
                });
            })
    }

    editdata = () => {
        this.setState({
            insertmodalopen: true
        })
    }

    closemodal = () => {
        this.setState({ openview: false, editopen: false, insertmodalopen: false })
    }

    updateCommission = () => {

        this.setState({props_loading:true})

        var self = this
        axios({
            method: 'post',
            url: `${apiurl}insert_mas_commission`,
            data:        {
                "commission":[
                    { 
                    "id":this.state.doctorid===null?"":this.state.doctorid,
                    "vendor_id": "1",
                    "commission": this.state.doctor,
                    "active_flag": "1",
                    "created_by": "1",
                    "modified_by":"1"
                  },{ 
                    "id":this.state.labid===null?"":this.state.labid,
                    "vendor_id": "2",
                    "commission": this.state.lab,
                    "active_flag": "1",
                    "created_by": "1",
                    "modified_by":"1"
                  },{ 
                    "id":this.state.clinicid===null?"":this.state.clinicid,
                    "vendor_id": "3",
                    "commission": this.state.clinic,
                    "active_flag": "1",
                    "created_by": "1",
                    "modified_by":"1"
                  },{ 
                    "id":this.state.healthid===null?"":this.state.healthid,
                    "vendor_id": "4",
                    "commission": this.state.health,
                    "active_flag": "1",
                    "created_by": "1",
                    "modified_by":"1"
                  },{ 
                    "id":this.state.nurseid===null?"":this.state.nurseid,
                    "vendor_id": "5",
                    "commission": this.state.nurse,
                    "active_flag": "1",
                    "created_by": "1",
                    "modified_by":"1"
                  },{ 
                    "id":this.state.trainerid===null?"":this.state.trainerid,
                    "vendor_id": "6",
                    "commission": this.state.trainer,
                    "active_flag": "1",
                    "created_by": "1",
                    "modified_by":"1"
                  }
                ]
                    
                }
        })
            .then(function (response) {
                console.log(response, "response_comm")
                self.recall("success")         
            })
            .catch(function (error) {
                console.log(error, "error");
            });

            this.setState({
                insertmodalopen: false 
            })
    }

    changeDynamic = (data, dynname) => {
        this.setState({
          [dynname]: data
        })
      }
    

    render() {
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[9]

        return (
            <div>
                {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
            <div>
                <div className="commission_header">
                    <div className="commission_title"><h3>COMMISSION MANAGEMENT</h3></div>
                    <div className={`com_editicon_align ${useraccess && useraccess.allow_edit==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_edit==="Y" && this.editdata}><EditOutlinedIcon className="Edit_Out_Icon_align" /></div>

                </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "vendor", label: "Vendor" },
                    { id: "commission", label: "Commission %" },
                ]}


                    rowdata={this.state.currentdata && this.state.currentdata}
                    tableicon_align={""}
                    actionclose="close"
                    alignheading="cus_wid_commission"
                    props_loading={this.state.props_loading}

                />

                <Modalcomp customwidth_dialog="commission_modal" visible={this.state.insertmodalopen} title={"EDIT COMMISSIONS"} closemodal={(e) => this.closemodal(e)}
                >
                    <div className="commission_modal_content">
                        <div className="header_modal">

                            <div className="head_one_title">
                                <h3>Vendor</h3>
                                <h3>Commission %</h3>
                            </div>

                            <div className="blank_one"></div>

                            <div className="head_one">
                                <h4>Doctor</h4>
                                <Inputnumber className="box_one" changeData={(data) => this.changeDynamic(data, "doctor")} value={this.state.doctor}
                                placeholder="" max={100} />
                            </div>

                            <div className="head_one">
                                <h4>Lab</h4>
                                <Inputnumber className="box_two" changeData={(data) => this.changeDynamic(data, "lab")} value={this.state.lab} placeholder="" max={100} />
                            </div>

                            <div className="head_one">
                                <h4>Clinic</h4>
                                <Inputnumber className="box_three" changeData={(data) => this.changeDynamic(data, "clinic")} value={this.state.clinic} placeholder="" max={100} />
                            </div>

                        </div>
                        <div className="blank_two"></div>

                        <div className="header_modal_two">

                            <div className="head_one_title">
                                <h3>Vendor</h3>
                                <h3>Commission %</h3>
                            </div>

                            <div className="blank_one"></div>

                            <div className="head_one">
                                <h4>Health Checkup</h4>
                                <Inputnumber className="box_four" changeData={(data) => this.changeDynamic(data, "health")} value={this.state.health} placeholder="" max={100} />
                            </div>

                            <div className="head_one">
                                <h4>Nurse</h4>
                                <Inputnumber className="box_five" changeData={(data) => this.changeDynamic(data, "nurse")} value={this.state.nurse} placeholder="" max={100} />
                            </div>

                            <div className="head_one">
                                <h4>Trainer</h4>
                                <Inputnumber className="box_six" changeData={(data) => this.changeDynamic(data, "trainer")} value={this.state.trainer} placeholder="" max={100} />
                            </div>

                        </div>

                    </div>
                    <div className="commission_button">
                        <Button className="commission_button_cancel" onClick={this.closemodal}>Cancel</Button>
                        <Button className="commission_button_create" onClick={this.updateCommission}>Update</Button>
                    </div>
                </Modalcomp>
            </div>
                }
            </div>
        )
    }
}

