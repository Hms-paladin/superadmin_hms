import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helper/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./AddCategory.css";
import { Upload } from "antd";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import UploadManageCatagory from "./UploadManageCatagory";
import ReactSVG from "react-svg";
import Info from "../../images/info.svg";
import Pink from "../../images/pink1.png";
import Card from "@material-ui/core/Card";
import upload_close from "../../images/upload_close.svg";
import plus_square from "../../images/plus_square.svg";
import Checkbox from "@material-ui/core/Checkbox";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      category: "",
      sub_category: "",
      category_list: [],
      sub_category: [],
      shop: "",
      fileUploadDatas: [],
    };
  }

  submitText = () => {
    var shop = (
      <div className="bottomup_main_div">
        {/* <img src={Close}  className="close_shoppe" title="remove file"/> */}
        <ReactSVG src={upload_close} className="close_shoppe" />
        <Card className="card_footer">
          {this.state.fileUploadDatas.map((obj) => {
            return <img src={Pink} className="image_upload_category" />;
          })}

          <div className="footer_img_bg">
            <div className="img_cont_cate_div">
              <div>
                <label className="img_cont_cate">Category</label>{" "}
              </div>
              <div>
                <h5 className="cate_sub">{this.state.category}</h5>
              </div>
            </div>
            <div className="img_cont_cate_div">
              <div>
                <label className="img_cont_cate">Sub category</label>
              </div>
              <div>
                <h5 className="cate_sub">{this.state.sub_category}</h5>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
    var arrval = [];

    arrval.push(...this.state.shop, shop);

    console.log(arrval, "arrval");
    this.setState({
      shop: arrval,
    });
  };
  handleChange = (event) => {
    this.setState({
      sub_category: event.target.value,

      category_list: event.target.value,
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  //upload

  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };
  changeupload = (data) => {
    console.log("uploadedData", data);
    this.setState({ fileUploadDatas: data.fileList });
  };
  render() {
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: false,
    };
    return (
      <>
        <div
          className={`doctor_mediauploads ${
            this.state.open === true && "d-none"
          }`}
        >
          <Grid container spacing={3}>
            <Grid item xs={4} md={4} className="shop_modal_grid">
              <div className="media_title_head">
                <Labelbox
                  type="select"
                  value={this.state.category}
                  changeData={(category) => this.setState({ category })}
                  labelname="Category"
                />
              </div>
            </Grid>

            <Grid item xs={4} md={4} className="shop_modal_grid-1">
              <div className="media_title_head" style={{ display: "flex" }}>
                <Labelbox
                  type="text"
                  value={this.state.sub_category}
                  changeData={(sub_category) => this.setState({ sub_category })}
                  labelname="Sub Category"
                />
              </div>
            </Grid>
            <Grid item xs={4} md={4} className="shop_modal_grid-1">
              <div className="media_title_head" style={{ display: "flex" }}>
                <div style={{ fontSize: "16px", marginTop: "5px" }}>Active</div>
                <Checkbox />
              </div>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6} md={6} className="shop_modal_grid">
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
                  <div className="upload_cate">
                    <Upload
                      renderUploadList={(data) =>
                        console.log("newdatalist", data)
                      }
                      multiple={true}
                      onChange={this.changeupload}
                      className="browse_files"
                    >
                      <div className="span_header_div">
                        <div className="span_section_subdiv">
                          <Button className="button_browse">Browse</Button>
                        </div>
                      </div>
                    </Upload>
                  </div>
                  <div>
                    <ReactSVG src={plus_square} className="plus_square" />
                  </div>
                </div>
              </div>
            </Grid>

            <Grid
              item
              xs={6}
              md={6}
              // className="final_button_grid"
              style={{ marginTop: "20px" }}
            >
              <div className="shop_mediabutton-container">
                <Button
                  className="shop-cancel-form"
                  onClick={() => this.props.closemodal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="shop-submit-Upload"
                  onClick={this.submitText}
                >
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>

          <div className="browser_divider"></div>

          <Grid container className="grid_img_shop">
            {this.state.shop}
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
