import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import { apiurl } from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin, notification } from 'antd';


import "./User_type.css";

const axios = require('axios');


export default class User_type extends React.Component {

    state = {
        openview: false,
        insertmodalopen: false,
        currentdata: [],
        usercreate: "",
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
            url: `${apiurl}getuserType`
        })
            .then(function (response) {
                var arrval = []
                response.data.data.map((value) => {
                    arrval.push({ user_type: value.user_type, id: value.id })
                })
                self.setState({
                    currentdata: arrval,
                    loading: false

                })
                console.log(arrval, "currentdata")

            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }


    add_data = () => {
        if (this.state.usercreate === "") {
            this.setState({
                errmsg: "Field is Required"
            })
        } else {
        this.setState({ props_loading: true })

        var self = this
        axios({
            method: 'post',
            url: `${apiurl}insertuserType`,
            data: {
                "userType": this.state.usercreate
            },
        })
            .then(function (response) {
                console.log(response, "responsed");
                self.recall("success", "added")
            })
            .catch(function (error) {
                console.log(error, "error");
            });

        this.setState({
            insertmodalopen: false,
            usercreate: ""
        })
    }
    }



    update_data = () => {
        if (this.state.idnamedata === "") {
            this.setState({
                errmsg: "Field is Required"
            })
        } else {
        this.setState({ props_loading: true })

        var self = this
        axios({
            method: 'put',
            url: `${apiurl}edituserType`,
            data: {
                "userType": this.state.idnamedata,
                "id": this.state.iddata
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


    deleterow = () => {
        this.setState({ props_loading: true })

        var self = this
        axios({
            method: 'delete',
            url: `${apiurl}deleteuserType`,
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


    recall = (type, msgdyn) => {
        var self = this
        axios({
            method: 'get',
            url: `${apiurl}getuserType`
        })
            .then(function (response) {
                var arrval = []
                response.data.data.map((value) => {
                    arrval.push({ user_type: value.user_type, id: value.id })
                })
                self.setState({
                    currentdata: arrval,
                    props_loading: false
                })
                notification[type]({
                    className: "show_frt",
                    message: "Record" + " " + msgdyn + " " + "sucessfully",
                });
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }


    changeDynamic = (data) => {
        if (this.state.modeltype === "view") {
            this.setState({
                usercreate: data,errmsg:null
            })
        } else {
            this.setState({
                idnamedata: data,errmsg:null
            })
        }
    }

    deleteopen = (type, id) => {
        this.setState({
            deleteopen: true,
            iddata: id
        })
    }


    modelopen = (data, id) => {

        var iddata = this.state.currentdata.filter((value) =>
            value.id === id
        )
        console.log(iddata, "iniddata")
        this.setState({ insertmodalopen: true, modeltype: data, iddata: iddata[0].id, idnamedata: iddata[0].user_type,errmsg:null})

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


    render() {
        return (
            <div>
                {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
                    <div>
                        <div className="user_type_header">
                            <div className="user_type_title"><h3>USER TYPE</h3></div>
                            <img className="plus" onClick={this.insertdata} src={PlusIcon} />
                        </div>
                        <Tablecomponent heading={[
                            { id: "", label: "S.No" },
                            { id: "user_type", label: "Type Name" },
                            { id: "", label: "Action" }
                        ]}
                            rowdata={this.state.currentdata && this.state.currentdata}
                            tableicon_align={""}
                            modelopen={(e, id) => this.modelopen(e, id)}
                            VisibilityIcon="close"
                            alignheading="cus_wid_usertype_head"
                            deleteopen={this.deleteopen}
                            props_loading={this.state.props_loading}
                        />

                        <Modalcomp className="user_type_modal" visible={this.state.insertmodalopen} title={this.state.modeltype === "view" ? "ADD USER TYPE" : "Edit details"} closemodal={(e) => this.closemodal(e)}
                            xswidth={"xs"}>
                            <div className="create_type">
                                <Inputantd label="Type Name" className="type_option" placeholder=""
                                    changeData={(data) => this.changeDynamic(data)}
                                    value={this.state.modeltype === "view" ? this.state.usercreate : this.state.idnamedata}
                                    autoFocus={true} 
                                    errmsg={this.state.errmsg}
                                    onPressEnter={this.state.modeltype === "edit" ?this.update_data:this.add_data}
                                />
                                <div className="type_button">
                                    <Button className="type_button_cancel" onClick={this.closemodal}>Cancel</Button>
                                    {this.state.modeltype === "view" ?
                                        <Button className="type_button_create" onClick={this.add_data}>Create</Button>
                                        : <Button className="group_button_create" onClick={this.update_data}>Update</Button>}
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

