import React, { Component } from "react";
import "./Media_upload.css"
import Inputantd from "../../formcomponent/inputantd";
import { apiurl } from "../../../src/App.js";
import Inputnumber from "../../formcomponent/inputnumberantd";
import { Spin, notification } from 'antd';

import Button from '@material-ui/core/Button';

const axios = require('axios');


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti = dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class Media_upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img_height: "",
      img_width: "",
      img_size: "",
      img_res: "",
      img_max: "",
      img_maxact: "",
      vid_height: "",
      vid_width: "",
      vid_size: "",
      vid_res: "",
      vid_max: "",
      vid_maxact: "",
      change_btn_state: true,
      id: "",
      loading: true,
      insideloading: false,

    }
  }

  changeDynamic = (data, dynname) => {
    console.log(data, dynname, "dynname")
    this.setState({
      [dynname]: data
    })
  }

  componentDidMount() {

    var self = this
    axios({
      method: 'get',
      url: `${apiurl}get_mas_media_upload`
    })
      .then(function (response) {
        var btnstate = true
        if (response.data.data[0]) {
          var btnstate = false
        }
        self.setState({
          img_height: response.data.data[0].height,
          img_width: response.data.data[0].width,
          img_size: response.data.data[0].size,
          img_res: response.data.data[0].resolution,
          img_max: response.data.data[0].max_image,
          img_maxact: response.data.data[0].max_active_image,
          vid_height: response.data.data[0].video_height,
          vid_width: response.data.data[0].video_width,
          vid_size: response.data.data[0].video_size,
          vid_res: response.data.data[0].video_resolution,
          vid_max: response.data.data[0].max_videos,
          vid_maxact: response.data.data[0].max_active_videos,
          change_btn_state: btnstate,
          id: response.data.data[0].id,
          loading: false,


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
      url: `${apiurl}get_mas_media_upload`
    })
      .then(function (response) {
        self.setState({
          img_height: response.data.data[0].height,
          img_width: response.data.data[0].width,
          img_size: response.data.data[0].size,
          img_res: response.data.data[0].resolution,
          img_max: response.data.data[0].max_image,
          img_maxact: response.data.data[0].max_active_image,
          vid_height: response.data.data[0].video_height,
          vid_width: response.data.data[0].video_width,
          vid_size: response.data.data[0].video_size,
          vid_res: response.data.data[0].video_resolution,
          vid_max: response.data.data[0].max_videos,
          vid_maxact: response.data.data[0].max_active_videos,
          change_btn_state: false,
          insideloading: false,
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

  edit_data = () => {
    this.setState({ insideloading: true })

    var self = this
    axios({
      method: 'put',
      url: `${apiurl}edit_mas_media_upload`,
      data: {
        "id": this.state.id,
        "height": this.state.img_height,
        "width": this.state.img_width,
        "size": this.state.img_size,
        "resolution": this.state.img_res,
        "max_image": this.state.img_max,
        "max_active_image": this.state.img_maxact,
        "video_height": this.state.vid_height,
        "video_width": this.state.vid_width,
        "video_size": this.state.vid_size,
        "max_videos": this.state.vid_max,
        "max_active_videos": this.state.vid_maxact,
        "video_resolution": this.state.vid_res,
        "Image_or_Video_type": "TEST",
        "active_flag": "1",
        "created_by": "1",
        "created_on": current_da_n_ti,
        "modified_by": "1",
        "modified_on": current_da_n_ti,

      }
    })
      .then(function (response) {
        self.recall("success", "edited")
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  add_data = () => {
    this.setState({ insideloading: true })
    var self = this
    axios({
      method: 'post',
      url: `${apiurl}insert_mas_media_upload`,
      data: {
        "height": this.state.img_height,
        "width": this.state.img_width,
        "size": this.state.img_size,
        "resolution": this.state.img_res,
        "max_image": this.state.img_max,
        "max_active_image": this.state.img_maxact,
        "video_height": this.state.vid_height,
        "video_width": this.state.vid_width,
        "video_size": this.state.vid_size,
        "max_videos": this.state.vid_max,
        "max_active_videos": this.state.vid_maxact,
        "video_resolution": this.state.vid_res,
        "Image_or_Video_type": "TEST",
        "active_flag": "1",
        "created_by": "1",
        "created_on": current_da_n_ti,
        "modified_by": "1",
        "modified_on": current_da_n_ti,
      }
    })
      .then(function (response) {
        self.recall("success", "added")
      })
      .catch(function (error) {
        console.log(error, "error");
      });


  }

  render() {
    var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[0]
    return (
      <div>
        {this.state.loading ? <Spin className="spinner_align" spinning={this.state.loading}></Spin> :

          <div>
            <Spin className="spinner_align" spinning={this.state.insideloading}>
              <div className="media_upload">

                <div className="media_upload_header">
                  <div className="media_upload_titleuser"><h3>MEDIA UPLOAD</h3></div>
                  <div className="media_upload_container">
                    {/* <Button className="media_button_cancel">Cancel</Button> */}
                    {this.state.change_btn_state ?
                      <Button className={`media_button_create ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" && this.add_data}>Create</Button> :
                      <Button className={`media_button_create ${useraccess && useraccess.allow_edit==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_edit==="Y" && this.edit_data}>Update</Button>
                    }
                  </div>
                </div>
                <div className="media_content">
                  <div className="media_upload_layer_one">
                    <div className="media_image"><h3>IMAGE</h3></div>

                    <div className="image_main">
                      <div className="set_width_mediaupload">
                        <div className="image_content">
                          <h4 className="height">Height (Pixel)</h4>
                          <Inputnumber className="image_media "
                            changeData={(data) => this.changeDynamic(data, "img_height")}
                            value={this.state.img_height}
                          />
                        </div>
                        <div className="image_content">
                          <h4 className="width">Width (Pixel)</h4>
                          <Inputnumber className="image_media"
                            changeData={(data) => this.changeDynamic(data, "img_width")}
                            value={this.state.img_width} />
                        </div>
                        <div className="image_content">
                          <h4 className="size">Size (Kb / Mb)</h4>
                          <Inputnumber className="image_media"
                            changeData={(data) => this.changeDynamic(data, "img_size")}
                            value={this.state.img_size} />
                        </div>
                        <div className="image_content">
                          <h4 className="resolution">Resolution (DPI)</h4>
                          <Inputnumber className="image_media"
                            changeData={(data) => this.changeDynamic(data, "img_res")}
                            value={this.state.img_res} />
                        </div>
                      </div>
                      <div className="blank" />
                      <div className="media_content_two">
                        <div className="image_content">
                          <h4 className="max">Max Image</h4>
                          <Inputnumber className="content_image"
                            changeData={(data) => this.changeDynamic(data, "img_max")}
                            value={this.state.img_max} />
                        </div>
                        <div className="image_content">
                          <h4 className="active">Max Active Image</h4>
                          <Inputnumber className="content_image_two"
                            changeData={(data) => this.changeDynamic(data, "img_maxact")}
                            value={this.state.img_maxact} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="media_upload_layer_two">
                    <div className="media_image"><h3>VIDEO</h3></div>

                    <div className="image_main">
                      <div className="set_width_mediaupload">
                        <div className="image_content">
                          <h4 className="height">Height (Pixel)</h4>
                          <Inputnumber className="image_media"
                            changeData={(data) => this.changeDynamic(data, "vid_height")}
                            value={this.state.vid_height} />
                        </div>
                        <div className="image_content">
                          <h4 className="width">Width (Pixel)</h4>
                          <Inputnumber className="image_media"
                            changeData={(data) => this.changeDynamic(data, "vid_width")}
                            value={this.state.vid_width} />
                        </div>
                        <div className="image_content">
                          <h4 className="size">Size (Kb / Mb)</h4>
                          <Inputnumber className="image_media"
                            changeData={(data) => this.changeDynamic(data, "vid_size")}
                            value={this.state.vid_size} />
                        </div>
                        <div className="image_content">
                          <h4 className="resolution">Resolution (DPI) </h4>
                          <Inputnumber className="image_media"
                            changeData={(data) => this.changeDynamic(data, "vid_res")}
                            value={this.state.vid_res} />
                        </div>
                      </div>
                      <div className="blank" />
                      <div className="media_content_two">
                        <div className="image_content">
                          <h4 className="max">Max Video</h4>
                          <Inputnumber className="content_image"
                            changeData={(data) => this.changeDynamic(data, "vid_max")}
                            value={this.state.vid_max} />
                        </div>
                        <div className="image_content">
                          <h4 className="active">Max Active Video</h4>
                          <Inputnumber className="content_image_two"
                            changeData={(data) => this.changeDynamic(data, "vid_maxact")}
                            value={this.state.vid_maxact}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </Spin>
          </div>
        }
      </div>
    )
  }
}