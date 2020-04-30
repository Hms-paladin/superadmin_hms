import React, { Component } from "react";
import "./Advertise_Manage.css";
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Dropdownantd from "../../formcomponent/dropdownantd";
import Inputantd from "../../formcomponent/inputantd";
import Inputnumber from "../../formcomponent/inputnumberantd";
import { FaCaretDown } from "react-icons/fa";
import { AddBox } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { apiurl } from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin, notification, Card, Popconfirm, message } from 'antd';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';


const axios = require('axios');


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti = dateFormat(now, "yyyy-mm-dd hh:MM:ss ")




const GreenRadio = withStyles({
  root: {
    color: green[500],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

export default class Advertise_manage extends Component {
  state = {
    "selectedValue": "",
    currentdata: [],
    "id": "",
    "min_height": "",
    "max_height": "",
    "min_width": "",
    "max_width": "",
    "min_size": "",
    "max_size": "",
    "resolution": "",
    "home_page_ad_duration": "",
    "vendor_area_ad_duration": "",
    "size_id": "1080",
    "rate": [],
    placement_val: [],
    addedval: [],
    placement: "",
    size_val: [],
    rate_ven_place_arrval: [],
    vendor: "",
    placement: "",
    size_id: "",
    img_size: "",
    btn_change: true,
    display_id: "",
    loading: false,
    insideloading_img: false,
    img_spin: false,
    insideloading_rate: false,
    errmsg: null,
    btntype:"add",
    onceopen:true

  };

  handleChange = (data) => {
    this.setState({
      selectedValue: data
    })
  }

  changeData = (e) => {
    console.log(e.target.value, "value")
    this.setState({
      Placement: e.target.value
    })

  }

  changeDynamic = (data, setname) => {
    this.setState({
      [setname]: data,
      errmsg:null
    })

  }


  iconclick = (useraccessparameter) => {
    if (this.state.img_size === "" || this.state.img_size===null) {
      this.setState({
          errmsg: "Field is Required"
      })
  } else {
    this.setState({
      insideloading_rate: true,
      img_size:""
    })

    var vendor_val
    var place_val

    if (this.state.vendor) {
      var vendor_val = this.state.currentdata.filter((val) => {
        return (val.id === this.state.vendor || val.dropdown_val === this.state.vendor
        )
      })
    }

    if (this.state.placement) {
      var place_val = this.state.placement_val.filter((val) => {
        return (val.id === this.state.placement || val.dropdown_val === this.state.placement)

      })
    }

    var get_size_id = this.state.size_id

    if (this.state.size_id === "1080") {
      var get_size_id = 1
    }

    var self = this
    axios({

      method: 'post',
      url: `${apiurl}insert_mas_ad_rate`,
      data: {
        "vendor_id": vendor_val[0].id,
        "placement_location_id": place_val[0].id,
        "size_id": get_size_id,
        "rate": this.state.img_size,
      }
    })
      .then(function (response) {
        
        self.didmount_recall("success", "added",useraccessparameter)

      })
      .catch(function (error) {
        console.log(error, "error");
      });
    }

  }

  componentDidMount() {
    this.setState({
      loading: true
    })

    var self = this

    axios({
      method: 'post',
      url: `${apiurl}get_mas_ad_settings`,
      data: { "size_id": "1" }
    })
      .then(function (response) {

        var resolution = response.data.data[0].resolution === 1 ? "1080" : "720"

        self.setState({
          "id": response.data.data[0].id,
          "min_height": response.data.data[0].min_height,
          "max_height": response.data.data[0].max_height,
          "min_width": response.data.data[0].min_width,
          "max_width": response.data.data[0].max_width,
          "min_size": response.data.data[0].min_size,
          "max_size": response.data.data[0].max_size,
          "resolution": resolution,
          "selectedValue": response.data.data[0].size_id,
          loading: false
        })
      })
      .catch(function (error) {
        console.log(error, "error");
      });


    axios({
      method: 'get',
      url: `${apiurl}get_mas_placement_location`
    })
      .then(function (response) {
        let arrval = []
        response.data.data.map((value) => {
          arrval.push({ dropdown_val: value.placement_location, id: value.id })
        })
        self.setState({
          placement_val: arrval,
          placement: arrval[0].dropdown_val,
          nochange_placement: arrval[0].dropdown_val,
          loading: false
        })
        console.log(arrval, "arrval")
      })
      .catch(function (error) {
        console.log(error, "error");
      });


    axios({
      method: 'get',
      url: `${apiurl}get_mas_vendor_master`
    })
      .then(function (response) {
        var arrval = []
        response.data.data.map((value) => {
          arrval.push({ dropdown_val: value.vendor, id: value.id })
        })
        self.setState({
          currentdata: arrval,
          nochange_vendor: arrval[0].dropdown_val,
          vendor: arrval[0].dropdown_val,
          loading: false
        })
        console.log(arrval, "arrval")
      })
      .catch(function (error) {
        console.log(error, "error");
      });



    axios({
      method: 'get',
      url: `${apiurl}displayDuration`
    })
      .then(function (response) {

        self.setState({
          display_id: response.data.data[0].id,
          "home_page_ad_duration": response.data.data[0].home_page_ad_duration,
          "vendor_area_ad_duration": response.data.data[0].vendor_area_ad_duration,
          loading: false
        })
        console.log(response, "response_dur")
      })
      .catch(function (error) {
        console.log(error, "error");
      });


  }


  didmount_recall = (type, msgdyn,useraccessparameter) => {
    var self = this
    axios.all([
      axios.get(`${apiurl}get_mas_ad_rate`),
      axios.get(`${apiurl}get_mas_vendor_master`),
      axios.get(`${apiurl}get_mas_placement_location`)

    ])
      .then(axios.spread((ad_rate, vendor, placement) => {
        console.log("all", ad_rate.data.data, vendor.data.data, placement.data.data)

        let match_val = []
        let adrate_arrval = []
        let vendor_arrval = []
        let place_arrval = []

        ad_rate.data.data.map((adrate_data) => {
          adrate_arrval.push({ id: adrate_data.id, vendor_id: adrate_data.vendor_id, placement_location_id: adrate_data.placement_location_id, size_id: adrate_data.size_id, rate: adrate_data.rate })
        })


        vendor.data.data.map((val) => {
          vendor_arrval.push({ id: val.id, vendor: val.vendor })
        })

        placement.data.data.map((val) => {
          place_arrval.push({ id: val.id, placement_location: val.placement_location })
        })

        let rate_ven_place_arrval = [adrate_arrval, vendor_arrval, place_arrval]

        ad_rate.data.data.map((adrate_val) => {
          match_val.push(<div className="d-flex mb-3">
            <Card className="ad_card_align ">
              <div className="d-flex align_inside_con_ad">
                <p>{vendor.data.data.map((vendor_val) => {
                  if (adrate_val.vendor_id === vendor_val.id) {
                    return vendor_val.vendor
                  }
                })}</p>
                <p>{placement.data.data.map((place_val) => {
                  if (adrate_val.placement_location_id === place_val.id) {
                    return place_val.placement_location
                  }
                })}</p>
                <p>{adrate_val.size_id == 1 ? "1080" : "720"}</p>
                <p>{adrate_val.rate}</p>
              </div>
            </Card>
            <div className="del_edit_ad_aln">
              <EditIcon className={`tableedit_icon ${useraccessparameter.allow_edit==="N" && "disablebtn"}`} onClick={useraccessparameter.allow_edit==="Y" ?(e) => this.edit_data_rate(adrate_val.id) : null} />

                {useraccessparameter.allow_delete==="Y" ?
              <Popconfirm
                title="Are you sure delete this record?"
                onConfirm={(e) => this.delete_data_rate(adrate_val.id,useraccessparameter)}
                onCancel={""}
                okText="Yes"
                cancelText="No"
                placement="right"
              >
                <DeleteIcon className={`tabledelete_icon`} />
              </Popconfirm>
                :
                <DeleteIcon className={`tabledelete_icon ${useraccessparameter.allow_delete==="N" && "disablebtn"}`} />
        }
 
            </div>
          </div>)
        })

        self.setState({
          "vendor": this.state.nochange_vendor,
          "placement": this.state.nochange_placement,
          "size_id": "1080",
          "img_size": "",
          addedval: match_val,
          rate_ven_place_arrval: rate_ven_place_arrval,
          insideloading_dis: false,
          insideloading_rate: false,
        })

        msgdyn && notification[type]({
          className: "show_frt",
          message: "Record" + " " + msgdyn + " " + "sucessfully",
        });
      }));

  }

  update_img = (useraccessparameter) => {

    this.setState({
      insideloading_img: true,
    })

    var resolution_up = this.state.resolution
    if (this.state.resolution === "1080") {
      resolution_up = 1
    } else if (this.state.resolution === "720") {
      resolution_up = 2
    }


    var self = this
    axios({
      method: 'put',
      url: `${apiurl}edit_mas_ad_settings`,
      data: {
        "id": this.state.id,
        "min_height": this.state.min_height,
        "max_height": this.state.max_height,
        "min_width": this.state.min_width,
        "max_width": this.state.max_width,
        "min_size": this.state.min_size,
        "max_size": this.state.max_size,
        "resolution": resolution_up,
        // "selectedValue":this.state.selectedValue,
        "active_flag": "1",
        "size_id": "1",
      }
    })
      .then(function (response) {

        self.recall("success", "edited",useraccessparameter)
      })
      .catch(function (error) {
        console.log(error, "error");
      });

  }


  recall = (type, msgdyn) => {
    var self = this
    axios({
      method: 'post',
      url: `${apiurl}get_mas_ad_settings`,
      data: { "size_id": this.state.selectedValue }
    })
      .then(function (response) {

        var resolution = response.data.data[0].resolution === 1 ? "1080" : "720"

        self.setState({
          "id": response.data.data[0].id,
          "min_height": response.data.data[0].min_height,
          "max_height": response.data.data[0].max_height,
          "min_width": response.data.data[0].min_width,
          "max_width": response.data.data[0].max_width,
          "min_size": response.data.data[0].min_size,
          "max_size": response.data.data[0].max_size,
          "resolution": resolution,
          "selectedValue": response.data.data[0].size_id,
          loading: false
        })
        self.setState({
          insideloading_img: false,
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

  edit_data_rate = (id) => {


    let editedget_ratedata = this.state.rate_ven_place_arrval[0].filter((val) => {
      return val.id === id
    })

    let editedset_vendorname = this.state.rate_ven_place_arrval[1].filter((vendorget_name) => {
      if (vendorget_name.id === editedget_ratedata[0].vendor_id) {
        return vendorget_name.vendor
      }
    })

    let editedset_placename = this.state.rate_ven_place_arrval[2].filter((placeget_name) => {
      if (placeget_name.id === editedget_ratedata[0].placement_location_id) {
        return placeget_name.placement_location
      }
    })

    this.setState({
      vendor: editedset_vendorname[0].vendor,
      placement: editedset_placename[0].placement_location,
      size_id: editedget_ratedata[0].size_id === 1 ? "1080" : "720",
      img_size: editedget_ratedata[0].rate,
      btn_change: false,
      current_edit_rate_id: id,
      btntype:"update"
    })
  }

  Update_rate = (userparameter) => {
    if (this.state.img_size === "" || this.state.img_size===null) {
      this.setState({
          errmsg: "Field is Required"
      })
  } else {
    this.setState({
      insideloading_rate: true,
      img_size:""
    })

    var self = this

    var vendor_update_val
    var place_update_val

    if (this.state.vendor) {
      var vendor_update_val = this.state.currentdata.filter((val) => {
        return (val.id === this.state.vendor || val.dropdown_val === this.state.vendor
        )
      })
    }

    if (this.state.placement) {
      var place_update_val = this.state.placement_val.filter((val) => {
        return (val.id === this.state.placement || val.dropdown_val === this.state.placement)

      })
    }

    var get_size_rate = this.state.size_id

    if (this.state.size_id === "1080") {
      var get_size_rate = 1
    } else if (this.state.size_id === "720") {
      var get_size_rate = 2
    }

    axios({
      method: 'put',
      url: `${apiurl}edit_mas_ad_rate`,
      data: {

        "id": this.state.current_edit_rate_id,
        "vendor_id": vendor_update_val[0].id,
        "placement_location_id": place_update_val[0].id,
        "size_id": get_size_rate,
        "rate": this.state.img_size
      }
    })
      .then(function (response) {
        self.didmount_recall("success", "edited",userparameter)
        self.setState({
          btn_change: true,
          btntype:"add",
        })
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    }
  }

  delete_data_rate = (id,useraccessparameter) => {
    this.setState({
      insideloading_rate: true
    })
    var self = this
    axios({
      method: 'delete',
      url: `${apiurl}delete_mas_ad_rate`,
      data: {
        "id": id,
      }
    })
      .then(function (response) {
        self.didmount_recall("success", "Deleted",useraccessparameter)
        self.setState({
        })
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  update_disduration = (useraccessparameter) => {

    this.setState({
      insideloading_dis: true
    })

    var self = this
    axios({
      method: 'put',
      url: `${apiurl}editDuration`,
      data: {
        "id": this.state.display_id,
        "homepageadduration": this.state.home_page_ad_duration,
        "vendorareaadduration": this.state.vendor_area_ad_duration
      }
    })
      .then(function (response) {
        // self.setState({
        // })
        self.didmount_recall("success", "edited",useraccessparameter)

      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }


  render() {
    var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[14]
    console.log(useraccess,"useraccess")
    if(this.state.onceopen && this.props.uservalue){
    this.didmount_recall(null,null,useraccess)
    this.setState({onceopen:false})
    }
    return (
      <div>
        {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :
          <div>

            <div className="advertise_manage">
              <div className="advertise_manage_header">
                <div className="advertise_manage_titleuser"><h3>ADVERTISING MANAGEMENT</h3></div>
                <div className="advertise_manage_container">
                  {/* <Button className="advertise_button_cancel">Cancel</Button>
<Button className="advertise_button_create">Create</Button> */}
                </div>
              </div>
              <div className="advertise_image">
                <Spin className="spinner_align" spinning={this.state.insideloading_img}>

                  <ExpansionPanel className="image_panel" defaultExpanded>
                    <ExpansionPanelSummary
                      expandIcon={<FaCaretDown className="advertise_icon" />} >
                      <Typography>IMAGE SPECIFICATION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="fields_data">

                      <div className="radio_head">
                        <div className="radio_head_one">
                          <GreenRadio
                            checked={this.state.selectedValue === 1}
                            onChange={(e) => this.handleChange(1)}
                            value="a"
                            name="radio-button-one"
                            className="radio_one" />
                          <h4>Half</h4>
                        </div>

                        <div className="radio_head_two">
                          <GreenRadio
                            checked={this.state.selectedValue === 2}
                            onChange={(e) => this.handleChange(2)}
                            value="b"
                            name="radio-button-two"
                            label="full"
                            className="radio_two" />
                          <h4>Full</h4>
                        </div>

                      </div>


                      <div className="advertise_image_two">
                        <h4>Height (Pixel)</h4>

                        <Inputnumber label="Min" className="image_option"
                          changeData={(data) => this.changeDynamic(data, "min_height")}
                          value={this.state.min_height}
                        />

                        <Inputnumber label="Max" className="image_option"
                          changeData={(data) => this.changeDynamic(data, "max_height")}
                          value={this.state.max_height}
                        />

                      </div>
                      <div className="advertise_image_three">
                        <h4>Width (Pixel)</h4>

                        <Inputnumber className="image_option"
                          changeData={(data) => this.changeDynamic(data, "min_width")}
                          value={this.state.min_width}
                        />

                        <Inputnumber className="image_option"
                          changeData={(data) => this.changeDynamic(data, "max_width")}
                          value={this.state.max_width} />

                      </div>
                      <div className="advertise_image_four">
                        <h4>Size (Kb / Mb)</h4>

                        <Inputnumber className="image_option"
                          changeData={(data) => this.changeDynamic(data, "min_size")}
                          value={this.state.min_size} />

                        <Inputnumber className="image_option"
                          changeData={(data) => this.changeDynamic(data, "max_size")}
                          value={this.state.max_size} />

                      </div>
                      <div className="advertise_image_five">
                        <div className="d-flex">
                          <h4>Resolution(DPI)</h4>
                          <div>

                            <Dropdownantd className="image-option w-50" divclass={"cus_wid_dpi"} option={[{ dropdown_val: "1080", id: "1" }, { dropdown_val: "720", id: "2" }]}
                              changeData={(data) => this.changeDynamic(data, "resolution")}
                              value={this.state.resolution}
                              placeholder="DPI" />

                          </div>
                        </div>
                        <div className="mt-3">
                          <Button className={`advertise_button_create ${useraccess && useraccess.allow_edit==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_edit==="Y"?()=>this.update_img(useraccess):null}>Update</Button>
                        </div>
                      </div>




                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Spin>

              </div>

              <div className="advertise_display">
                <Spin className="spinner_align" spinning={this.state.insideloading_dis}>

                  <ExpansionPanel className="display_panel">
                    <ExpansionPanelSummary
                      expandIcon={<FaCaretDown className="advertise_icon" />} >
                      <Typography>DISPLAY DURATION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="fields_data">
                      <div className="advertise_display_two">
                        <h4>Home Page Ad(Sec)</h4>

                        <Inputnumber className="display_option" changeData={(data) => this.changeDynamic(data, "home_page_ad_duration")}
                          value={this.state.home_page_ad_duration} />

                      </div>
                      <div className="advertise_display_three">
                        <div className="d-flex">
                          <h4>Vendor Page Ad(Sec)</h4>

                          <Inputnumber className="display_option" changeData={(data) => this.changeDynamic(data, "vendor_area_ad_duration")}
                            value={this.state.vendor_area_ad_duration} />
                        </div>

                        <div className="mt-3">
                          <Button className={`advertise_button_create ${useraccess && useraccess.allow_edit==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_edit==="Y" ?()=>this.update_disduration(useraccess):null}>Update</Button>
                        </div>

                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Spin>
              </div>


              <div className="advertise_rate">
                <Spin className="spinner_align" spinning={this.state.insideloading_rate}>
                  <ExpansionPanel className="rate_panel">
                    <ExpansionPanelSummary
                      expandIcon={<FaCaretDown className="advertise_icon" />} >
                      <Typography>RATE DURATION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="advertise_rate_data">
                      <Grid container className={""} spacing={8} direction="column" justify="flex-start">
                        <Grid item xs={12} >
                          <div className="d-flex jus_spabt_adset">
                            <div className="d-flex">
                              <div className="advertise_rate_two">

                                <Dropdownantd label="Vendor" className="rate_option_one" option={this.state.currentdata} placeholder="" changeData={(data) => this.changeDynamic(data, "vendor")} value={this.state.vendor} />

                              </div>
                              <div className="advertise_rate_three">

                                <Dropdownantd label="Placement" className="rate_option_one" option={this.state.placement_val} changeData={(data) => this.changeDynamic(data, "placement")} value={this.state.placement} placeholder="" />

                              </div>
                              <div className="advertise_rate_four">

                                <Dropdownantd label="Size" className="rate_option"
                                  option={[{ dropdown_val: "1080", id: "1" }, { dropdown_val: "720", id: "2" }]} changeData={(data) => this.changeDynamic(data, "size_id")} value={this.state.size_id} placeholder=""
                                />

                              </div>
                              <div className="advertise_rate_five">

                                <Inputnumber label="Rate (KWD)" className="rate_option" changeData={(data) => this.changeDynamic(data, "img_size")}
                                  value={this.state.img_size}
                                  errmsg={this.state.errmsg}
                                  // onPressEnter={this.state.btntype === "add" ?this.iconclick:this.Update_rate}
                                   />

                              </div>
                              {/* <AddBox  className="rate_icon" onClick={this.iconclick} /> */}
                              <div className="mrtopbtn_rate">
                                {this.state.btn_change ?
                                  <Button className={`advertise_button_create add_ad_topalignm ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" ? ()=>this.iconclick(useraccess) : null}>Add</Button> : <Button className="advertise_button_create add_ad_topalign" onClick={()=>this.Update_rate(useraccess)}>Update</Button>}
                              </div>
                            </div>
                            <div className="mt-4">

                            </div>
                          </div>

                        </Grid>
                      </Grid>

                    </ExpansionPanelDetails>
                    <div className="mr_adver_25 mb-4">
                      {this.state.addedval}
                    </div>
                  </ExpansionPanel>
                </Spin>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
