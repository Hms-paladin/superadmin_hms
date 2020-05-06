import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import { apiurl } from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin, notification } from 'antd';


import "./User_group.css";


const axios = require('axios');


export default class User_group extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            insertmodalopen: false,
            currentdata: [],
            modeltype: "",
            create_group: "",
            iddata: "",
            idnamedata: "",
            deleteopen: false,
            loading: true,
            props_loading: false,
            errmsg: null,
        }
    }

    componentDidMount() {

        var self = this
        axios({
            method: 'get',
            url: `${apiurl}getGroup`
        })
            .then(function (response) {
                var arrval = []
                response.data.data.map((value) => {
                    arrval.push({ name: value.groupname, id: value.id })
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

    add_data = () => {
        if (this.state.create_group === "") {
            this.setState({
                errmsg: "Groupname is required"
            })
        } else {
            this.setState({ props_loading: true })

            var self = this
            axios({
                method: 'post',
                url: `${apiurl}insertGroup`,
                data: {
                    "groupname": this.state.create_group,
                    "created_by": "1"
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
                create_group: "",
            })
        }
    }

    update_data = () => {
        if (this.state.idnamedata === "") {
            this.setState({
                errmsg: "Groupname is required"
            })
        } else {
            this.setState({ props_loading: true })

            var self = this
            axios({
                method: 'put',
                url: `${apiurl}editGroup`,
                data: {
                    "groupname": this.state.idnamedata,
                    "modified_by": "1",
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
            url: `${apiurl}deleteGroup`,
            data: {
                "id": this.state.iddata.toString(),
                "modified_by": "1"
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
            url: `${apiurl}getGroup`
        })
            .then(function (response) {
                var arrval = []
                response.data.data.map((value) => {
                    arrval.push({ name: value.groupname, id: value.id })
                })
                self.setState({
                    currentdata: arrval,
                    props_loading: false
                })

                notification[type]({
                    className: "show_frt",
                    message: "Record" + " " + msgdyn + " " + "successfully",
                });

                console.log(arrval, "recall")

            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }


    changeDynamic = (data) => {
        if (this.state.modeltype === "view") {
            this.setState({
                create_group: data, errmsg: null
            })
        } else {
            this.setState({
                idnamedata: data, errmsg: null
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
        if (data === "view") {
            this.setState({ insertmodalopen: true, modeltype: data })
        }
        else if (data === "edit") {
            var iddata = this.state.currentdata.filter((value) =>
                value.id === id
            )
            this.setState({ insertmodalopen: true, modeltype: data, iddata: iddata[0].id, idnamedata: iddata[0].name, errmsg: null })
        }
    }

    closemodal = () => {
        this.setState({ editopen: false, insertmodalopen: false, deleteopen: false })
    }

    insertdata = () => {
        this.setState({
            insertmodalopen: true,
            modeltype: "view",
            errmsg:null
        })
    }

    render() {
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[2]

        return (
            <div>

                {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
                    <div>
                        <div className="user_group_header">
                            <div className="user_group_title"><h3>USER GROUP</h3></div>
                            <img className={`plus ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" && this.insertdata} src={PlusIcon} />
                        </div>
                        <Tablecomponent heading={[
                            { id: "", label: "S.No" },
                            { id: "name", label: "Group Name" },
                            { id: "", label: "Action" }
                        ]}
                            rowdata={this.state.currentdata && this.state.currentdata}
                            tableicon_align={""}
                            modelopen={(e, id) => this.modelopen(e, id)}
                            VisibilityIcon="close"
                            alignheading="cus_wid_usergroup_head"
                            deleteopen={this.deleteopen}
                            props_loading={this.state.props_loading}
                            editpermission={useraccess && useraccess.allow_edit}
                            deletepermission={useraccess && useraccess.allow_delete}
                        />

                        <Modalcomp className="user_group_modal" visible={this.state.insertmodalopen} title={this.state.modeltype === "view" ? "ADD USER GROUP" : "Edit details"} closemodal={(e) => this.closemodal(e)}
                            xswidth={"xs"}
                        >
                            <div className="create_group">
                                <Inputantd label="Group Name" className="group_option" placeholder=""
                                    changeData={(data) => this.changeDynamic(data)}
                                    value={this.state.modeltype === "view" ? this.state.create_group : this.state.idnamedata} autoFocus={true}
                                    errmsg={this.state.errmsg}
                                    onPressEnter={this.state.modeltype === "edit" ? this.update_data : this.add_data}
                                />
                                <div className="group_button">
                                    <Button className="group_button_cancel" onClick={this.closemodal}>Cancel</Button>
                                    {this.state.modeltype === "view" ?
                                        <Button className="group_button_create" onClick={this.add_data}>Create</Button> :
                                        <Button className="group_button_create" onClick={this.update_data}>Update</Button>
                                    }
                                </div>
                            </div>
                        </Modalcomp>

                        <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
                            <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} />
                        </Modalcomp>
                    </div>
                }
            </div>
        )
    }
}
