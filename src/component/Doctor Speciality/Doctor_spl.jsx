import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import { apiurl } from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin, notification } from 'antd';


import "./Doctor_spl.css";

const axios = require('axios');


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti = dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class Doctor_spl extends React.Component {

    state = {
        openview: false,
        insertmodalopen: false,
        speciality: "",
        currentdata: [],
        iddata: "",
        idnamedata: "",
        deleteopen: false,
        loading: true,
        props_loading: false,
        errmsg: null,
    }

    componentDidMount() {

        var self = this
        axios({
            method: 'get',
            url: `${apiurl}get_mas_doctor_speciality`
        })
            .then(function (response) {
                var arrval = []
                response.data.data.map((value) => {
                    arrval.push({ speciality: value.speciality, id: value.id })
                })
                self.setState({
                    currentdata: arrval,
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }

    recall = (type, msgdyn) => {

        var self = this
        axios({
            method: 'get',
            url: `${apiurl}get_mas_doctor_speciality`
        })
            .then(function (response) {
                var arrval = []
                response.data.data.map((value) => {
                    arrval.push({ speciality: value.speciality, id: value.id })
                })
                self.setState({
                    currentdata: arrval,
                    props_loading: false
                })
                notification[type]({
                    className: "show_frt",
                    message: "Record" + " " + msgdyn + " " + "sucessfully",
                });
                console.log(arrval, "recall")

            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }


    add_data = () => {

        if (this.state.speciality === "") {
            this.setState({
                errmsg: "Speciality is required"
            })
        } else {
            this.setState({ props_loading: true })

            var self = this
            axios({
                method: 'post',
                url: `${apiurl}insert_mas_doctor_speciality`,
                data: {
                    "speciality": this.state.speciality,
                    "active_flag": "1",
                    "created_by": "1",
                    "created_on": current_da_n_ti,
                    "modified_by": "1",
                    "modified_on": current_da_n_ti
                }
            })
                .then(function (response) {
                    console.log(response, "responsed")
                    self.recall("success", "added")

                })
                .catch(function (error) {
                    console.log(error, "error");
                });

            this.setState({
                insertmodalopen: false,
                speciality: ""
            })
        }
    }


    update_data = () => {
        
        if (this.state.idnamedata === "") {
            this.setState({
                errmsg: "Speciality is required"
            })
        } else{
        this.setState({ props_loading: true })

        var self = this
        axios({
            method: 'put',
            url: `${apiurl}edit_mas_doctor_speciality`,
            data:
            {
                "id": this.state.iddata,
                "speciality": this.state.idnamedata,
                "active_flag": "1",
                "created_by": "1",
                "created_on": current_da_n_ti,
                "modified_by": "1",
                "modified_on": current_da_n_ti
            }

        })
            .then(function (response) {
                self.recall("success", "edited")
            })
            .catch(function (error) {
                console.log(error, "error");
            });
        this.setState({
            insertmodalopen: false
        })
    }
    }


    modelopen = (data, id) => {
        if (data === "view") {
            this.setState({ insertmodalopen: true, modeltype: data })
        }
        else if (data === "edit") {
            var iddata = this.state.currentdata.filter((value) =>
                value.id === id
            )
            this.setState({ insertmodalopen: true, modeltype: data, iddata: iddata[0].id, idnamedata: iddata[0].speciality,errmsg:null })
        }
    }

    closemodal = () => {
        this.setState({ openview: false, editopen: false, insertmodalopen: false, deleteopen: false })
    }

    insertdata = () => {
        this.setState({
            insertmodalopen: true,
            modeltype: "view",
            errmsg:null
        })
    }

    changeDynamic = (data) => {
        if (this.state.modeltype === "view") {
            this.setState({
                speciality: data,
                errmsg:null
            })
        } else {
            this.setState({
                idnamedata: data,
                errmsg:null
            })
        }
    }

    deleteopen = (type, id) => {
        this.setState({
            deleteopen: true,
            iddata: id
        })
    }


    deleterow = () => {
        this.setState({ props_loading: true })

        var self = this
        axios({
            method: 'delete',
            url: `${apiurl}deletemas_doctor_speciality`,
            data: {
                "id": this.state.iddata,
            }
        })
            .then(function (response) {
                console.log(response, "deleteres")
                self.recall("info", "deleted")

            })
            .catch(function (error) {
                console.log(error, "error");
            });
        this.setState({
            insertmodalopen: false
        })
    }

    render() {
        console.log(this.props.uservalue && this.props.uservalue[0].item[0].item[1],"props")
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[1]
        return (
            <div>
                {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
                    <div>
                        <div className="doctor_spl_header">
                            <div className="doctor_spl_title"><h3>DOCTOR SPECIALITY</h3></div>
                            <img className={`plus ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" && this.insertdata} src={PlusIcon} />
                        </div>
                        <Tablecomponent heading={[
                            { id: "", label: "S.No" },
                            { id: "speciality", label: "Speciality" },
                            { id: "", label: "Action" }
                        ]}


                            rowdata={this.state.currentdata && this.state.currentdata}
                            tableicon_align={""}
                            modelopen={(e, id) => this.modelopen(e, id)}
                            VisibilityIcon="close"
                            alignheading="cus_wid_doctorhead"
                            deleteopen={this.deleteopen}
                            props_loading={this.state.props_loading}
                            editpermission={useraccess && useraccess.allow_edit}
                            deletepermission={useraccess && useraccess.allow_delete}
                        />


                        <Modalcomp className="doc_spl_modal" visible={this.state.insertmodalopen}
                            title={this.state.modeltype === "view" ? "ADD SPECIALITY" : "Edit details"}
                            closemodal={(e) => this.closemodal(e)}
                            xswidth={"xs"}
                        >
                            <div className="create_spl">
                                <Inputantd label="Speciality" className="spl_option" placeholder=""
                                    changeData={(data) => this.changeDynamic(data)} 
                                    value={this.state.modeltype === "view" ? this.state.speciality : this.state.idnamedata}
                                    autoFocus={true} 
                                    errmsg={this.state.errmsg}
                                    onPressEnter={this.state.modeltype === "edit" ?this.update_data:this.add_data} />
                                <div className="spl_button">
                                    <Button className="spl_button_cancel" onClick={this.closemodal}>Cancel</Button>
                                    {this.state.modeltype === "view" ?
                                        <Button className="spl_button_create" onClick={this.add_data}>Create</Button> : <Button className="group_button_create" onClick={this.update_data}>Update</Button>
                                    }

                                </div>
                            </div>
                        </Modalcomp>


                        <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
                            <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} />
                        </Modalcomp>
                    </div>}

            </div>
        )
    }
}

