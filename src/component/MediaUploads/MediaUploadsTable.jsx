import React from "react";
// import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import ViewMedia from "./ViewMedia";
import MediaUploadsModal from "./MediaUploadsModal";
import order from "../../images/order.svg";
import "./MediaUploadsTable.css";
import ReactSVG from "react-svg";
import axios from 'axios';
import { apiurl } from "../../App";
import dateformat from 'dateformat';
import DeleteMedia from '../../helper/ModalComp/deleteModal';
import DragdropTable from "./DragTable.js"

class MediaUploadsTable extends React.Component {
  state = {
    openview: false,
    deleteopen: false,
    tableData:[],
    editData: "",
    viewData:"",
    // workflow:false,
  };
  componentDidMount() {
    this.getTableData()
}

componentWillReceiveProps(newProps) {
  if(newProps.truegetmethod){
    this.getTableData()
    this.props.falsegetmethod()
  }
}

  modelopen = (data,id) => {
    console.log(data,"data_checking")
    if (data === "view") {
        console.log(data,"edit_data")
        this.setState({ openview:true })
        this.setState({
          viewData:this.state.totalData[0].details.find(val =>val.id ===id)
        })
        console.log(this.state.viewData,"view_id_check")
        // console.log(id,"id_view")
    }
    else if (data === "edit") {
        this.setState({ editopen: true })
        this.setState({
            editData:this.state.totalData[0].details.find(val => val.id ===id)
        })
        // console.log(this.state.totalData,"dataaa")
        console.log(this.state.editData,"editdata_checkk")
        // alert(this.state.editData,"editdata_check_table")
        // console.log(id,"id_check")
        // Console.log(editData,"editdata_table_check")
        // console.log(this.state.totalData.details,"total_data_check")
    }
}
   // get table data
   getTableData = () => {
    var self = this
    axios({
        method: 'POST', //get method 
        url: apiurl + 'Common/mediaupload_details',
        data:{
          // doctorid: this.props.userId,
          vendor_id:0,
          limit:100,
          offset:1,
          pageno:1         
        }
    })
    .then((response) => {
      // console.log(response.data.data[0].details,"res")
      console.log(response,"response_data_table")
      var tableData = [];
        response.data.data[0].details.map((val,index) => {
          console.log("sdfjsdhfjdshf",val)
          // for(let i=0;i<50;i++){
            tableData.push({ title: val.media_title,type:val.media_type,uploaded:dateformat(val.created_on,"dd mmm yyyy hh:MM TT"),status:val.is_active,id: val.id,indexid:index.toString(),sortorder:val.media_sortorder })
            console.log(val.id,"idddddd")
          // }

        })
        self.setState({
            tableData:tableData,
            props_loading: false,
            totalData:response.data.data
        })
        // console.log(tableData,"table")
        console.log(response.data.data[0].details,"iddd_checkkk")
    }).catch((error) => {
    })
}
closemodal = () => {
  this.setState({ openview:false,editopen:false, deleteopen:false,workflow:false})
}
deleteopen = (type,id) => {
  this.setState({
      deleteopen: true,
      iddata: id
  })
  console.log(id,"type")
}
deleterow = () => {
  this.setState({ props_loading: true })
  var self = this
  axios({
      method: 'delete',
      url: apiurl + '/deleteMediaUpload',
      data: {
          "id": this.state.iddata,
      }
  })
      .then(function (response) {
          self.getTableData()
          self.props.generateAlert("Record Deleted Successfully")
      })
      .catch(function (error) {
      });
  this.setState({ props_loading: false })
}
  render() {
    console.log("sadfkjsdhfljhsdfkj",this.state.tableData)
    const img_var = <ReactSVG src={order} />;
    return (
      <div>
      
        <DragdropTable 
                  heading={[
                     {id:"order", label:"Order"},
                    { id: "", label: "S.No" },
                    { id: "title", label: "Media Title" },
                    { id: "type", label: "Media Type" },
                    { id: "uploaded", label: "Uploaded On" },
                    { id: "status", label: "Status" },
                    { id: "", label: "Action" },
                  ]}
          rowdata={this.state.tableData && this.state.tableData}
          deleteopen={this.deleteopen}
          props_loading={this.state.props_loading}
          modelopen={(e,id) => this.modelopen(e,id)}

        />
        {/* <ViewMedia open={this.state.openview} onClose={this.closemodal} /> */}
        <Modalcomp
          visible={this.state.openview}
          title={"VIEW MEDIA"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        >
          <ViewMedia visible={this.state.openview} viewData={this.state.viewData} viewopenModal ={this.state.openview && true}/>
        </Modalcomp>

        <Modalcomp  visible={this.state.editopen} editData={this.state.editData}  title={"EDIT MEDIA UPLOADS"} closemodal={(e) => this.closemodal(e)} >
          <MediaUploadsModal getTableData={this.getTableData} closemodal ={this.closemodal} editData={this.state.editData} editopenModal ={this.state.editopen && true}  generateAlert={this.props.generateAlert} userId={this.props.userId} />
        </Modalcomp>

        <Modalcomp  visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} xswidth={"xs"}>
           <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal}     generateAlert={this.props.generateAlert}  />
         </Modalcomp>
      </div>
    );
  }
}
export default MediaUploadsTable