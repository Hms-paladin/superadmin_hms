import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helper/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import "./DealList.css";
import { Progress } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Stepper from "../AdvertisementBooking/Stepper";
import Workflow from "../../images/workflow.svg";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import DeleteMedia from "./DeleteMedia";

const data = [{ month: "Jan.", count: 69, city: "tokyo" }];
const scale = {
  month: { alias: "Month" },
  count: { alias: "Sales" },
};
export default class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", open: false };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className="deal_list_paper_maincontainer">
        <Grid container>
          <Grid item xs={12} md={12}>
            <Paper style={{ marginBottom: "3px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div>
                  <b>Service Type</b>
                  <div>All</div>
                </div>
                <div>
                  <b> Start Date</b>
                  <div>12 Oct 2020</div>
                </div>
                <div>
                  <b>End Date</b>
                  <div>15 Oct 2020</div>
                </div>
                <div>
                  <b>Amount</b>
                  <div>30 KWD</div>
                </div>
              </div>
              <div style={{ display: "flex", padding: "10px" }}>
                <div style={{ marginRight: "5px" }}>
                  <b>Title</b>
                  <div>Flat 30 KWD off</div>
                </div>
                <div>
                  <b>Deal</b>
                  <div className="view">Active</div>
                </div>
              </div>
              <div className="iconsdiv">
                <img src={Workflow} alt="error" />
                <EditIcon className="edit_icon_div" />
                <DeleteIcon
                  className="delete_icon_div"
                  onClick={this.handleOpen}
                />
              </div>
              <div>
                <Stepper />
              </div>
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
              </div> */}

              {/* <Grid container>
                <Grid item xs={12} md={6} className="deal_paper">
                  <div className="date_view">
                    <h5 className="list_test_report">All</h5>
                  </div>
                  <div className="date_view"> 
                    <p>18 06 2020 - 20 07 2010</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className="deal_paper">
                  <h5 className="list_test_report">Flat 30 KWD off</h5>
                  <p className="view">Deal Active</p>
                  <div className="iconsdiv">
                    <EditIcon className="edit_icon_div" />
                    <DeleteIcon className="delete_icon_div" />
                  </div>
                </Grid>
              </Grid> */}
            </Paper>
            <Paper style={{ marginBottom: "3px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div>
                  <b>Service Type</b>
                  <div>All</div>
                </div>
                <div>
                  <b> Start Date</b>
                  <div>12 Oct 2020</div>
                </div>
                <div>
                  <b>End Date</b>
                  <div>15 Oct 2020</div>
                </div>
                <div>
                  <b>Amount</b>
                  <div>30 KWD</div>
                </div>
              </div>
              <div style={{ display: "flex", padding: "10px" }}>
                <div style={{ marginRight: "5px" }}>
                  <b>Title</b>
                  <div>Flat 30 KWD off</div>
                </div>
                <div>
                  <b>Deal</b>
                  <div className="view">Active</div>
                </div>
              </div>
              <div className="iconsdiv">
                <img src={Workflow} alt="error" />
                <EditIcon className="edit_icon_div" />
                <DeleteIcon className="delete_icon_div" />
              </div>
              {/* <Grid container>
                <Grid item xs={12} md={6} className="deal_paper">
                  <div className="date_view">
                    <h5 className="list_test_report">Acrylic Dentures</h5>
                  </div>
                  <div className="date_view">
                    <p>18 06 2020 - 20 07 2010</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className="deal_paper">
                  <h5 className="list_test_report">10% off</h5>
                  <p className="view">Deal Active</p>
                  <div className="iconsdiv">
                    <EditIcon className="edit_icon_div" />
                    <DeleteIcon className="delete_icon_div" />
                  </div>
                </Grid>
              </Grid> */}
            </Paper>
          </Grid>
        </Grid>
        <Modalcomp
          xswidth={"xs"}
          clrchange="textclr"
          title="Delete Media"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <DeleteMedia />
        </Modalcomp>
      </div>
    );
  }
}
