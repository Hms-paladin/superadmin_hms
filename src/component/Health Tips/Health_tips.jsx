import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import { Input } from 'antd';
import { apiurl } from "../../../src/App.js";
import { Spin, notification } from 'antd';
import 'antd/dist/antd.css';

import "./Health_tips.css";

const axios = require('axios');


export default class Health_tips extends React.Component {

    state = {
        openview: false,
        insertmodalopen: false,
        currentdata: [],
        tipsContent: [],
        body_cur_name: "",
        body_cur_content: "",
        api_res: "",
        cur_healthTipId: "",
        cur_healthTipContentId: "",
        loading: true,
        props_loading: false,
    }


    componentDidMount() {

        var self = this
        axios({
            method: 'post',
            url: `${apiurl}getHealthTipListContent`
        })
            .then(function (response) {
                var arrval = []
                var tipsContentarr = []
                response.data.data.map((value) => {
                    // arrval.push(self.createData({name:value.groupname,id:value.id}))
                    arrval.push({ healthTipName: value.healthTipName, id: value.healthTipId })
                    tipsContentarr.push({ tipsContent: value.tipsContent[0].healthTipContent, id: value.tipsContent[0].healthTipContentId })
                })
                self.setState({
                    currentdata: arrval,
                    tipsContent: tipsContentarr,
                    api_res: response.data.data,
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }



    modelopen = (data, id) => {
        if (data === "view") {
            this.setState({ openview: true })
        }
        else if (data === "edit") {
            var body_cur_name = this.state.currentdata.filter((value) =>
                value.id === id
            )

            var body_cur_content = this.state.api_res.filter((data) =>
                data.healthTipId === id
            )
            this.setState({
                errmsg:null,
                editopen: true,
                body_cur_name: body_cur_name[0].healthTipName,
                body_cur_content: body_cur_content[0].tipsContent[0].healthTipContent,
                cur_healthTipId: id,
                cur_healthTipContentId: body_cur_content[0].tipsContent[0].healthTipContentId
            })
        }
    }

    closemodal = () => {
        this.setState({ openview: false, editopen: false, insertmodalopen: false })
    }

    insertdata = () => {
        this.setState({
            insertmodalopen: true
        })
    }

    textareadata = (e) => {
        this.setState({
            body_cur_content: e.target.value,
            errmsg:null
        })
    }


    recall = (type, msgdyn) => {
        var self = this
        axios({
            method: 'post',
            url: `${apiurl}getHealthTipListContent`
        })
            .then(function (response) {
                var arrval = []
                var tipsContentarr = []
                response.data.data.map((value) => {
                    arrval.push({ healthTipName: value.healthTipName, id: value.healthTipId })
                    tipsContentarr.push({ tipsContent: value.tipsContent[0].healthTipContent, id: value.tipsContent[0].healthTipContentId })
                })

                self.setState({
                    currentdata: arrval,
                    tipsContent: tipsContentarr,
                    api_res: response.data.data,
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

    update_data = () => {

        if (this.state.body_cur_content === "") {
            this.setState({
                errmsg: "Healthtips is required"
            })
        } else {
            this.setState({ props_loading: true })
            var self = this
            axios({
                method: 'post',
                url: `${apiurl}updateHealthTipContent`,
                data: {
                    "healthTipContent": this.state.body_cur_content,
                    "updatedBy": "1",
                    "healthTipId": this.state.cur_healthTipId,
                    "healthTipContentId": this.state.cur_healthTipContentId
                }
            })
                .then(function (response) {
                    self.recall("success", "edited")
                })
                .catch(function (error) {
                    console.log(error, "error");
                });

            this.setState({
                editopen: false,
            })
        }
    }

    render() {
        const { TextArea } = Input
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[15]
        return (
            <div>
                {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
                    <div>
                        <div className="health_tips_header">
                            <div className="health_tips_title"><h3>HEALTH TIPS</h3></div>
                        </div>
                        <Tablecomponent heading={[
                            { id: "", label: "S.No" },
                            { id: "healthTipName", label: "Type" },
                            { id: "", label: "Action" }
                        ]}

                            rowdata={this.state.currentdata && this.state.currentdata}

                            tableicon_align={""}
                            modelopen={(e, id) => this.modelopen(e, id)}
                            VisibilityIcon="close"
                            alignheading="cus_wid_healthtips_head"
                            props_loading={this.state.props_loading}
                            DeleteIcon="close"
                            editpermission={useraccess && useraccess.allow_edit}
                        />


                        <Modalcomp customwidth_dialog="health_tips_modal" visible={this.state.editopen} title={"EDIT HEALTH TIPS"} closemodal={(e) => this.closemodal(e)} xswidth={"md"} >
                            <div className="description_healthtips">
                                <div className="body_cur_name_tips">{this.state.body_cur_name}</div>
                                <h3>Health Tips</h3>
                                <TextArea label="Health Tips" className={this.state.errmsg?"borderred_textarea":"resizenone_tips"} rows={3} onChange={this.textareadata}
                                    value={this.state.body_cur_content} />
                                <div className="texterrmsg">
                                    {
                                        this.state.errmsg ? this.state.errmsg
                                            : <div className="min_h_static" />
                                    }
                                </div>
                            </div>

                            <div className="health_tips_button">
                                <Button className="healthtips_button_cancel" onClick={this.closemodal}>Cancel</Button>
                                <Button className="healthtips_button_create" onClick={this.update_data}>Update</Button>
                            </div>

                        </Modalcomp>
                    </div>}


            </div>
        )
    }
}

