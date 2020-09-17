import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helper/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ManageCatagoryModal.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import { FiInfo } from "react-icons/fi";
import load from "../../images/load.png";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import UploadManageCatagory from "./UploadManageCatagory";

import plus from "../../images/plus.png";
import Info from "../../images/info.svg";
import Pink from "../../images/pink1.png";
import Green from "../../images/pink2.png";
import Orange from "../../images/pink3.png";
import Violet from "../../images/pink4.png";
import plus_square from "../../images/plus_square.svg";
import ReactSVG from "react-svg";

import { InputLabel } from "@material-ui/core";

export default class ManageCatagoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, pink: "", pinklist: [] };
  }
  handleChange = (event) => {
    this.setState({
      pinklist: event.target.value,
    });
  };
  submitText = () => {
    this.setState({
      pink: [...this.state.pinklist, this.state.pink],
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <>
        <div
          className={`doctor_mediauploads ${
            this.state.open === true && "d-none"
          }`}
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={6} className="shop_modal_grid">
              <div className="media_title_head">
                <Labelbox
                  type="text"
                  value="Kids"
                  name="Kids"
                  labelname="Catagory"
                />
              </div>
            </Grid>

            <Grid item xs={6} md={6} className="shop_modal_grid-1">
              <div className="media_title_head" style={{ display: "flex" }}>
                {/* <Labelbox type="text"  value ="Toys"
                            name="Toys"labelname="Sub Catagory"/> */}
                <div style={{ fontSize: "16px", marginTop: "5px" }}>Active</div>
                <Checkbox />
              </div>
            </Grid>
          </Grid>

          <Grid container>
            {/* <Grid item xs={6} md={6} className="shop_modal_grid">
              <div className="media_title_head">
                <div className="product_img_div">
                  <label>
                    <h5 className="product_image">Upload Product Image</h5>
                  </label>

                  <span>
                    <img
                      src={Info}
                      className="info_icon"
                      onClick={this.handleOpen}
                    />
                  </span>
                </div>

                <div className="upload_btn_plus">
                  <Upload className="browse_files">
                    <div className="span_section_subdiv">
                      <Button className="button_browse">Browse</Button>
                    </div>
                  </Upload>
                 
                  <div>
                    <ReactSVG src={plus_square} className="plus_square" />
                  </div>
                </div>
              </div>
            </Grid> */}

            <Grid
              item
              xs={6}
              md={6}
              style={{ marginTop: "20px" }}
              // className="final_button_grid"
            >
              <div className="shop_mediabutton-container">
                <Button
                  className="shop-cancel-form"
                  onClick={() => this.props.closemodal(false)}
                >
                  Cancel
                </Button>
                <Button className="shop-submit-Upload">Submit</Button>
              </div>
            </Grid>
          </Grid>

          {/* <div className="browser_divider"></div> */}

          <Grid container className="img_footer_content">
            <div className="foot">
              {/* <div className="purple"><img src={Pink}  />
                        <img src={Close} className="close" /></div> */}

              {/* <div  className="green">
                        <img src={Green} />
                        {this.state.pinklist && this.state.pinklist.map((pink) =>
                        ( 
                        <img src={Close} className="close">{pink}</img>
                        ))}
                        </div> */}

              {/* <div  className="orange"><img src={Orange} /><img src={Close} className="close"/></div>
                   
                        <div  className="violet"><img src={Violet} /><img src={Close} className="close" /></div> */}
            </div>
          </Grid>
        </div>
        <Modalcomp
          clrchange="text_color"
          title="Upload Instructions"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <UploadManageCatagory />
        </Modalcomp>
      </>
    );
  }
}
