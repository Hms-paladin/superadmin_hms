import React from "react";
import Tablecomponent from "../../helper/TableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import View_Product from "../Product_upload/View_Product";
import Product_UploadModal from "../Product_upload/Product_UploadModal";
import Checkbox from "@material-ui/core/Checkbox";
import Editproduct from "./Edit_product";

import "./Product_UploadTable.css";

export default class Product_Upload extends React.Component {
  state = {
    openview: false,
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "product_name", label: "Product Name" },
            { id: "created_date", label: "Created Date" },
            // { id: "stock", label: "Stock" },
            { id: "fee", label: "Cost(KWD)" },
            { id: "active", label: "Active" },

            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              product_name: "Rollin Giraffe Cycle",
              created_date: "08 Dec 2019",
              fee: "400",
              active: <Checkbox />,
            }),
            this.createData({
              product_name: "Rollin Giraffe Cycle",
              created_date: "09 Dec 2019",
              fee: "400",
              active: <Checkbox />,
            }),
            this.createData({
              product_name: "Woolen Boot",
              created_date: "03 Jan 2019",
              fee: "500",
              active: <Checkbox />,
            }),
            this.createData({
              product_name: "Woolen Boot",
              created_date: "09 Dec 2019",
              fee: "450",
              active: <Checkbox />,
            }),
            this.createData({
              product_name: "Rollin Giraffe Cycle",
              created_date: "09 Dec 2019",
              fee: "600",
              active: <Checkbox />,
            }),
            this.createData({
              product_name: "Rollin Giraffe Cycle",
              created_date: "09 Dec 2019",
              fee: "380",
              active: <Checkbox />,
            }),
          ]}
          tableicon_align={"cell_eye"}
          modelopen={(e) => this.modelopen(e)}
          Workflow="close"
          add="close"
        />

        <Modalcomp
          custommodalsize="productupload_view_modal"
          clrchange="text_color"
          visible={this.state.openview}
          title={"VIEW DETAILS"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"lg"}
        >
          <View_Product />
        </Modalcomp>

        <Editproduct
          clrchange="text_color"
          custommodalsize="ppppppppppp"
          open={this.state.editopen}
          closemodal={(e) => this.closemodal(e)}
        />
        {/* <Modalcomp  visible={this.state.editopen} title={"Product Upload"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"lg"}
        >
            
        </Modalcomp> */}
      </div>
    );
  }
}
