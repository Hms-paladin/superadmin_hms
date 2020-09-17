import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Labelbox from "../../helper/labelbox/labelbox";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import "./Product_UploadModal.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import { FiInfo } from "react-icons/fi";
import Pink from "../../images/pink1.png";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import UploadProduct from "./Upload_Product";

import { Select } from "antd";

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class ProductUploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, color: "", colorlist: [], product: "" };
  }
  handleChange = (event) => {
    this.setState({
      colorlist: this.event.target.value,
    });
  };
  submitText = () => {
    var product = (
      <div className="product_addlist_div">
        <Card className="product_addlist">
          <div className="product_ad_list">
            <div>
              {this.state.fileUploadDatas.map((obj) => {
                return (
                  <img
                    src={Pink}
                    style={{ height: 100, width: 100, marginLeft: "25px" }}
                  />
                );
              })}
            </div>
            <div>
              <label className="product_addlist_lab">
                {this.state.colorlist}
              </label>
            </div>
          </div>
        </Card>
      </div>
    );
    var arrval = [];

    arrval.push(...this.state.product, product);

    this.setState({
      product: arrval,
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillReceiveProps() {
    console.log("check", this.props.xswidth);
  }
  changeupload = (data) => {
    console.log("uploadedData", data);
    this.setState({ fileUploadDatas: data.fileList });
  };

  render() {
    console.log("propswidth", this.props.xswidth);
    const {
      classes,
      onClose,
      cancel,
      selectedValue,
      xswidth,
      ...other
    } = this.props;
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: false,
    };
    const color = (
      <div
        style={{
          backgroundColor: "#FC478A",
          width: "50px",
          height: "20px",
          marginTop: "5px",
        }}
      />
    );
    return (
      <div>
        <Dialog
          selectedValue
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          maxWidth={
            this.props.xswidth === "xs"
              ? "xs"
              : this.props.xswidth === "lg"
              ? "lg"
              : "md"
          }
          fullWidth={true}
          custommodalsize="productupload_dialog"
          clrchange="text_color"
        >
          <div className="dialog_main_main">
            <div>
              <h4 className="product_title-shop">ADD PRODUCT </h4>
            </div>
            <div className="product_top_button">
              <div className="product_upload_cancel_div">
                <Button
                  className="product_upload_cancel"
                  onClick={() => this.props.closemodal()}
                >
                  Cancel
                </Button>
              </div>
              <div className="product_upload_submit_div">
                <Button className="product_upload_submit">Submit</Button>
              </div>
            </div>
          </div>
          <Grid container>
            <Grid item xs={12} md={4} className="product_main_grid">
              <div className="product_section_grid">
                <div className="product_section_div">
                  <div>
                    <Labelbox
                      type="select"
                      placeholder="Kids"
                      name="Kids"
                      labelname="Catagory"
                    />
                  </div>

                  <div>
                    <Labelbox
                      type="select"
                      placeholder="Toys"
                      name="Toys"
                      labelname="Sub Catagory"
                    />
                  </div>
                </div>
                <div className="product_section_div">
                  <div style={{ marginRight: "2px" }}>
                    <Labelbox
                      type="text"
                      // placeholder="Kids"
                      name="Kids"
                      labelname="Product Code"
                    />
                  </div>

                  <div>
                    <Labelbox
                      type="text"
                      // placeholder="Toys"
                      name="Toys"
                      labelname="Product Name"
                    />
                  </div>
                </div>

                {/* <div className="product_sec_subdiv">
                  <Labelbox
                    type="text"
                    placeholder="Rollin Giraffe Cycle"
                    name="product name"
                    labelname="Product Name"
                  />
                </div> */}

                <div className="product_sec_price">
                  <div style={{ marginRight: "2px" }}>
                    <Labelbox
                      type="text"
                      // placeholder="80"
                      name="price"
                      labelname="MRP(KWD)"
                    />
                  </div>

                  <div style={{ marginRight: "2px" }}>
                    <Labelbox
                      type="text"
                      // placeholder="12"
                      name="stock"
                      labelname="Price(KWD)"
                    />
                  </div>
                  <div className="media_title_head">
                    <div style={{ fontSize: "16px", marginTop: "5px" }}>
                      Active
                    </div>
                    <Checkbox />
                  </div>
                </div>
                <div
                // className="product_sec_subdiv"
                >
                  <Labelbox
                    type="textarea"
                    placeholder="Rollin Giraffe Cycle"
                    name="product name"
                    labelname="Product Description"
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={8} className="product_main_section">
              <Grid container>
                <Grid item xs={12} md={12}>
                  <div className="product_sub_section">
                    <div className="product_section_2">
                      <Labelbox
                        type="text"
                        value={this.state.colorlist}
                        changeData={(colorlist) => this.setState({ colorlist })}
                        labelname="Color"
                      />
                    </div>

                    <div className="product_section_3">
                      <div>
                        <label className="product_colorpalatte_label">
                          Color Palette{" "}
                        </label>
                      </div>
                      <Select
                        className="shop_colorpalatte_toggledropdown"
                        defaultValue={color}
                        style={{ width: "100px" }}
                        onChange={handleChange}
                      >
                        <Option
                          className="shop_colorpalatte_toggledropdown"
                          value="option 1"
                        >
                          <div
                            style={{
                              backgroundColor: "#FC478A",
                              width: "50px",
                              height: "20px",
                              marginTop: "5px",
                            }}
                          />
                        </Option>
                        <Option
                          className="shop_colorpalatte_toggledropdown"
                          value="option 2"
                        >
                          <div
                            style={{
                              backgroundColor: "#F6BE3E",
                              width: "50px",
                              height: "20px",
                              marginTop: "5px",
                            }}
                          />
                        </Option>
                        <Option
                          className="shop_colorpalatte_toggledropdown"
                          value="option 3"
                        >
                          <div
                            style={{
                              backgroundColor: "#2FD1F2",
                              width: "50px",
                              height: "20px",
                              marginTop: "5px",
                            }}
                          />
                        </Option>
                      </Select>
                    </div>

                    {/* <div className="product_section_4">
                      <Labelbox
                        type="number"
                        placeholder="5"
                        name="Quantity"
                        labelname="Qty"
                      />
                    </div> */}
                  </div>
                </Grid>
                <div style={{ display: "flex", padding: "20px" }}>
                  <div className="product_section_1">
                    <label className="upload_label">Upload Product Image</label>
                    <Upload
                      renderUploadList={(data) =>
                        console.log("newdatalist", data)
                      }
                      multiple={true}
                      onChange={this.changeupload}
                      className="browse_files"
                    >
                      <div className="span_header_shop">
                        {/* <div className="span_section_div">My image.jpg </div> */}
                        <div className="span_section_subdiv">
                          <Button className="button_browse">Browse</Button>
                        </div>
                      </div>
                    </Upload>
                  </div>

                  <div className="product_section_5">
                    <Button className="add_button" onClick={this.submitText}>
                      Add
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid container className="conditional_grid">
                ` {this.state.product}`
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}
