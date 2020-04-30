import React, { Component } from "react";
import { Collapse } from 'antd';
import PropTypes from "prop-types";
import { lighten, makeStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import { Icon, message, Popconfirm } from "antd";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Dropdownantd from "../../formcomponent/dropdownantd";
import Green_checkBox from "../../formcomponent/Green_checkBox";
import { Spin,notification } from 'antd';
import {apiurl} from "../../../src/App.js";

import "./groupaccess.css"

const { Panel } = Collapse;
const axios = require('axios');
var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti=dateFormat(now, "yyyy-mm-dd hh:MM:ss ")

// function createData(
//     vendor,
//     revenue,
//     commission,
//     topay,
//     sevendays,
//     fifteen,
//     twentyonedays,
//     stwentyeightdays,
//     ltwentyeightdays

// ) {
//   return { vendor, revenue, commission, topay, sevendays, fifteen, twentyonedays,stwentyeightdays,ltwentyeightdays };
// }
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  console.log("sort", array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    console.log("order", order);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headrows = [
//   { id: "sno", label: "S.no" },
  { id: "vendor",           label: "Vendor"     },
  { id: "revenue",          label: "Revenue"    },
  { id: "commission",       label: "Commission" },
  { id: "topay",            label: "To pay"     },
  { id: "sevendays",        label: "<7days"     },
  { id: "fifteen",          label: "<15days"    },
  { id: "twentyonedays",    label: "<21days"    },
  { id: "stwentyeightdays", label: "<28days"    },
  { id: "ltwentyeightdays", label: ">28days"    },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {/* <TableRow>
        {headrows.map(row => (
          <TableCell
            key={headrows.id}
            align={headrows.numeric ? "right" : "left"}
            padding={headrows.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headrows.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow> */}

        <div className="group_heading_size">

        <div>{"Module Name"}</div>    
        <div>{"All"}</div>   
        <div>{"View"}</div>   
        <div>{"Add"}</div>   
        <div>{"Edit"}</div>   
        <div>{"Delete"}</div>   
        {/* <div>{"Print"}</div>    */}

        </div>


    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};


const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });
  
  class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
      this.props.onChangePage(event, 0);
    };
  
    handleBackButtonClick = event => {
      this.props.onChangePage(event, this.props.page - 1);
    };
  
    handleNextButtonClick = event => {
      this.props.onChangePage(event, this.props.page + 1);
    };
  
    handleLastPageButtonClick = event => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };
  
    render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;
  
      return (
        
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
  }
  
  TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
  );

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  function handleChange(){
    // alert("hai")
  }

class Groupaccess extends Component {

  constructor(props) {
    super(props);
    function createData(
    name, all, view, add, edit, delete_chk, print

) {
  return { name, all, view, add, edit, delete_chk, print};
}


    this.state = {
      order: "",
      orderBy: "media_title",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      view: false,
      DeleteView:false,
      EditView:false,
      group:"",
      group_arr:[],
      rows:[],
      viewdata:"",
      type:"",
      title:"",
      rotateicon:true,
      conditionalrendering:false,
      // head_all:true,
      onceopen:false,
      loading:false,
      insideLoading:false
    };
  }

  handleRequestSort = (event, property) => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({ order: isDesc ? "asc" : "desc" });
    this.setState({ orderBy: property });
  };

  closemodal = () => {
    this.setState({ view: false,DeleteView:false });
  };
  handleClickOpen=(t,title)=>
  {
    console.log("type",t,title)
    this.setState({
      type:t,
      title
    })
    this.setState({view:true,DeleteView:false})
  
  }

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected.push(this.state.selected, name);
    } else if (selectedIndex === 0) {
      // newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      // newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // newSelected = newSelected.concat(
      //   selected.slice(0, selectedIndex),
      //   selected.slice(selectedIndex + 1),
      // );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangerowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  handleChangeDense(event) {
    this.setState({ dense: event.target.checked });
  }
  componentWillMount() {
    //this.loadrows();
  }
  ViewDetails = data => {
    console.log("viewdata", data);
    this.setState({ viewmodal: true, viewdata: data });
  };
  DeleteData = data => {
    console.log("deletedata", data);
  };
  receiveapprovaldata = (data, data1) => {
    console.log("receiveapproval", data);
    console.log("data1", data1);
    if (data1 == 1) {
      this.setState({ viewmodal: false });
      message.success("Your Leave Approved");
      this.loadVendorDetails();
    } else if (data1 == 2) {
      this.setState({ viewmodal: false });
      message.success("Your Leave Rejected");
      this.loadVendorDetails();
    }
  };
  receivedocdelete = data => {
    console.log("receivedocdelete", data);
    if (data.status == 0) {
      this.setState({ viewmodal: false });
      message.success(data.msg);
      this.loadrows();
    }
  };
  sendapprovadata = data => {
    if (data.status == 0) {
      this.setState({ viewmodal: false });
      message.success(data.msg);
      this.loadrows();
    }
  };

  rotateicon=()=>{
      this.setState({
        rotateicon:!this.state.rotateicon
      })
  }
  changeDynamic=(data,setname,useraccess)=>{
    this.setState({
      group:data,
      insideLoading:true
  })
    this.recall_permission(null,data,useraccess)

}

componentDidMount(){
  this.setState({
    loading:true
  })

  var self=this
axios({
  method: 'get',
  url: `${apiurl}getGroup`
})
.then(function (response) {
  var arrval=[]
  response.data.data.map((value)=>{
      arrval.push({dropdown_val:value.groupname,id:value.id})
  })
  self.setState({
    group:arrval[0].dropdown_val,
    group_arr:arrval,
    responseid:response.data.data[0].id,
    onceopen:true
  })

})
.catch(function (error) {
  console.log(error,"error");
});
}

recall_permission=(showNotification,groupid,useraccess)=>{

  function setobject(name){
    return name
  }


  axios({
    method: 'post',
    url: `${apiurl}get_mas_group_permission`,
    data:{
      "group_id":groupid
    }
}).then( response=> {
    console.log(response.data.data,"response_get")

    var stroe_table_arr=response.data.data.map((val,index)=>{
      
      if(val.item){

      var head_all=val.item[0].item.map((ck_1)=>{
        // if(val.item[0].submodule_name===null){
          return([ck_1.allow_view==="Y",ck_1.allow_add==="Y",ck_1.allow_edit==="Y",ck_1.allow_delete==="Y",ck_1.allow_print==="Y"])
        // }
        })
    
        var head_all_concat=head_all
    
        if(head_all.length>1){
          var head_all_concat=[]
    
        for(let m=0;m<head_all.length;m++){
          head_all_concat.push(...head_all[m])
          
        }
    
        var head_view=[]
        var head_add=[]
        var head_edit=[]
        var head_delete=[]
        var head_print=[]
    
    
        for(let n=0;n<head_all.length;n++){
          head_view.push(head_all_concat[n*5])
          head_add.push(head_all_concat[n*5+1])
          head_edit.push(head_all_concat[n*5+2])
          head_delete.push(head_all_concat[n*5+3])
          head_print.push(head_all_concat[n*5+4])
        }
    
        }else{
    
          var head_view=[]
          var head_add=[]
          var head_edit=[]
          var head_delete=[]
          var head_print=[]
          
          var head_all_concat=head_all[0]
          head_view.push(head_all[0][0])
          head_add.push(head_all[0][1])
          head_edit.push(head_all[0][2])
          head_delete.push(head_all[0][3])
          head_print.push(head_all[0][4])
        }

        if(val.item[0].submodule_name!==null){
          var subdata_ch_arr=[]
          val.item.map((ck_sub,index)=>{
          subdata_ch_arr.push(ck_sub)        
          })
    
          var sub_data_arr=[]
          var inside_sub=[]
    
          for(let x=0;x<subdata_ch_arr.length;x++){
            sub_data_arr.push(...subdata_ch_arr[x].item)
          }
          console.log(sub_data_arr,"sub_data_arr")
          var head_all_concat=[]
          for(let y=0;y<sub_data_arr.length;y++){
          if(sub_data_arr[y].screen_name){
            head_all_concat.push(sub_data_arr[y].allow_view==="Y",sub_data_arr[y].allow_add==="Y",sub_data_arr[y].allow_edit==="Y",sub_data_arr[y].allow_delete==="Y",sub_data_arr[y].allow_print==="Y")
          }else if(sub_data_arr[y].item){
            console.log(sub_data_arr[y].item,"sub_data_arr[y].submodule_name")
            for(let z=0;z<sub_data_arr[y].item.length;z++){
              sub_data_arr[y].item[z]&& inside_sub.push(sub_data_arr[y].item[z])
            }
    
            for(let a=0;a<inside_sub.length;a++){
              head_all_concat.push(inside_sub[a].allow_view==="Y",inside_sub[a].allow_add==="Y",inside_sub[a].allow_edit==="Y",inside_sub[a].allow_delete==="Y",inside_sub[a].allow_print==="Y")
    
            }
    
          }
        }
        console.log(inside_sub,"inside_sub")
    
        console.log(head_all_concat,"head_all_concat")
    
    
          var head_view=[]
          var head_add=[]
          var head_edit=[]
          var head_delete=[]
          var head_print=[]
      
      
          for(let z=0;z<(head_all_concat.length/5);z++){
            head_view.push(head_all_concat[z*5])
            head_add.push(head_all_concat[z*5+1])
            head_edit.push(head_all_concat[z*5+2])
            head_delete.push(head_all_concat[z*5+3])
            head_print.push(head_all_concat[z*5+4])
          }
    
          console.log(head_all_concat,"head_all")
          console.log(head_view,"head_view")
          console.log(head_add,"head_add")
          console.log(head_edit,"head_edit")
          console.log(head_delete,"head_delete")
          console.log(head_print,"head_print")
            
    
        }
    
        
    
              return setobject(<div>
               
                <Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                  <Panel header={<div className="grp_expanse_firstdata">
                  <div className="grp_firstdata_clr firstname_grpaccs module_name_top">{
                    val.module_name}</div>   
                    <div>{<Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={val.item && head_all_concat.every((val) => { return (val === true) })} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,null, val.item && head_all_concat.every((val) => { return (val === true) }), "head_all", val.item[0].item) : null} />
                }</div>
                <div>{
                  <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={val.item && head_view.every((val) => { return (val === true) })} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,null, val.item && head_view.every((val) => { return (val === true) }), "head_view", val.item[0].item) : null} />
                }
                </div>
                <div>{
                  <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={val.item && head_add.every((val) => { return (val === true) })} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,null, val.item && head_add.every((val) => { return (val === true) }), "head_add", val.item[0].item) : null} />
                }
                </div>
                <div>{
                  <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={val.item && head_edit.every((val) => { return (val === true) })} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,null, val.item && head_edit.every((val) => { return (val === true) }), "head_edit", val.item[0].item) : null} />
                }
                </div>
                <div>{
                  <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={val.item && head_delete.every((val) => { return (val === true) })} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,null, val.item && head_delete.every((val) => { return (val === true) }), "head_delete", val.item[0].item) : null} />
                }
                </div>
                {/* <div>{
                  <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={val.item && head_print.every((val) => { return (val === true) })} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,null, val.item && head_print.every((val) => { return (val === true) }), "head_print", val.item[0].item) : null} />
                }
                </div>  */}
                  
                  </div>} key="1">
                    {val.item.map((first_item)=>{
            console.log(first_item,"first_item")
              if(first_item.submodule_name===null){
    
                return(first_item.item.map((first_item_insidedata,index)=>{
                      var alltrue_enable_row=[first_item_insidedata.allow_view==="Y",first_item_insidedata.allow_add==="Y",first_item_insidedata.allow_edit==="Y",first_item_insidedata.allow_delete==="Y",first_item_insidedata.allow_print==="Y"]
                      
    
                      return(
                        <p>
                          {/* tests */}
                  <div className="grp_expanse_data">
                  <div className="firstname_grpaccs sub_module_name_top">{first_item_insidedata.screen_name}</div>
                  <div>{
                              <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={alltrue_enable_row.every((val) => { return (val === true) })} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,first_item_insidedata.id, alltrue_enable_row.every((val) => { return (val === true) }), "allow_row_all" + index, first_item_insidedata, index) : null} />
                            }
                            </div>
                            <div>{
                              <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={first_item_insidedata.allow_view === "Y" && true} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,first_item_insidedata.id, first_item_insidedata.allow_view === "Y" ? "N" : "Y", "allow_view" + index, first_item_insidedata, index) : null} />
                            }
                            </div>
                            <div>{
                              <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={first_item_insidedata.allow_add === "Y" && true} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,first_item_insidedata.id, first_item_insidedata.allow_add === "Y" ? "N" : "Y", "allow_add" + index, first_item_insidedata, index) : null} />
                            }
                            </div>
                            <div>{
                              <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={first_item_insidedata.allow_edit === "Y" && true} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,first_item_insidedata.id, first_item_insidedata.allow_edit === "Y" ? "N" : "Y", "allow_edit" + index, first_item_insidedata, index) : null} />
                            }
                            </div>
                            <div>{
                              <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={first_item_insidedata.allow_delete === "Y" && true} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,first_item_insidedata.id, first_item_insidedata.allow_delete === "Y" ? "N" : "Y", "allow_delete" + index, first_item_insidedata, index) : null} />
                            }
                            </div>
                            {/* <div>{
                              <Green_checkBox className={useraccess && useraccess.allow_edit==="N" && "disablenotallow"} checked={first_item_insidedata.allow_print === "Y" && true} change_checkbox={useraccess && useraccess.allow_edit==="Y" ? () => this.change_checkbox(useraccess,groupid,first_item_insidedata.id, first_item_insidedata.allow_print === "Y" ? "N" : "Y", "allow_print" + index, first_item_insidedata, index) : null} />
                            }
                            </div> */}
                          </div> 
                  </p>
                      )
                }
                )
                )
                }else if(first_item.submodule_name){
    
                  console.log(first_item.item,"submodule_first")
    
                  return(<Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                  <Panel header={<div className="grp_expanse_firstdata">
                  <div className="grp_firstdata_clr firstname_grpaccs module_name_top">{
                    first_item.submodule_name}</div>   
                    {/* <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>          
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>         
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>           
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>        
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>  
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>   */}
                  
                  </div>} key="1">
    
                  {first_item.item.map((second_item)=>{
              if(second_item.screen_name){
                var second_module_row=[second_item.allow_view==="Y",second_item.allow_add==="Y",second_item.allow_edit==="Y",second_item.allow_delete==="Y",second_item.allow_print==="Y"].every((val)=>{return(val===true)})
    
    
                      return(
                        <p>
                  <div className="grp_expanse_data">
                  <div className="firstname_grpaccs sub_module_name_top">{second_item.screen_name}</div>
                  <div>{
                        <Green_checkBox checked={second_module_row} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>   
                      <div>{
                        <Green_checkBox checked={second_item.allow_view==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>         
                      <div>{
                        <Green_checkBox checked={second_item.allow_add==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>           
                      <div>{
                        <Green_checkBox checked={second_item.allow_edit==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>        
                      <div>{
                        <Green_checkBox checked={second_item.allow_delete==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>  
                      <div>{
                        <Green_checkBox checked={second_item.allow_print==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>  
                  </div> 
                  </p>
                      )
                
                }
              else if(second_item.submodule_name){
                  return(<Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                  <Panel header={<div className="grp_expanse_firstdata">
                  <div className="grp_firstdata_clr firstname_grpaccs module_name_top">{
                    second_item.submodule_name}</div>   
                    {/* <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>          
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>         
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>           
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>        
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>  
                      <div>{
                        <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>   */}
                  
                  </div>} key="1">
    
                  {second_item.item.map((third_item)=>{
            console.log(third_item,"third_item")
              if(third_item.screen_name){
    
                var third_module_row=[third_item.allow_view==="Y",third_item.allow_add==="Y",third_item.allow_edit==="Y",third_item.allow_delete==="Y",third_item.allow_print==="Y"].every((val)=>{return(val===true)})
    
            console.log(third_module_row,"third_module_row")
                
    
    
                      return(
                        <p>
                  <div className="grp_expanse_data">
                  <div className="firstname_grpaccs sub_module_name_top">{third_item.screen_name}</div>
                  <div>{
                        <Green_checkBox checked={third_module_row} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>   
                      <div>{
                        <Green_checkBox checked={third_item.allow_view==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>      
                      <div>{
                        <Green_checkBox checked={third_item.allow_add==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>           
                      <div>{
                        <Green_checkBox checked={third_item.allow_edit==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div>        
                      <div>{
                        <Green_checkBox checked={third_item.allow_delete==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div> 
                      <div>{
                        <Green_checkBox checked={third_item.allow_print==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                        }
                      </div> 
                  </div> 
                  </p>
                      )
                
                }
              // else if(third_item.submodule_name){
              //     return(<Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
              //     <Panel header={<div className="grp_expanse_firstdata">
              //     <div className="grp_firstdata_clr firstname_grpaccs">{
              //       third_item.submodule_name}</div>   
              //       <div>{
              //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
              //           }
              //         </div>          
              //         <div>{
              //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
              //           }
              //         </div>         
              //         <div>{
              //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
              //           }
              //         </div>           
              //         <div>{
              //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
              //           }
              //         </div>        
              //         <div>{
              //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
              //           }
              //         </div>  
              //         <div>{
              //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
              //           }
              //         </div>  
                  
              //     </div>} key="1">
    
    
              //       </Panel>
              //       </Collapse>
              //     )
    
              //   }
                })}
    
                    </Panel>
                    </Collapse>
                  )
    
                }
                    })}
                    </Panel>
                    </Collapse>
                  )
                }
    
                    })}
                  </Panel>
                  </Collapse>
              </div>
              )
      }else{
        return setobject(<div>
               
          <Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
             <Panel header={<div className="grp_expanse_firstdata">
             <div className="grp_firstdata_clr firstname_grpaccs module_name_top">{
               val.module_name}</div> 
             </div>} key="1">
             <p>
                  <div className="grp_expanse_data  excessModuleHeight">
                  <div className="firstname_grpaccs sub_module_name_top">{"NO DATA"}</div>
                  </div>
              </p>
               </Panel>
               </Collapse>
               </div>)
      }

    
    })
    
    console.log(stroe_table_arr,"stroe_table_arr")
    
    this.setState({
    rows:stroe_table_arr,
    loading:false,
    insideLoading:false
    })
    if(showNotification){
      notification.success({
        className:"show_frt",
        message: "Record" +" "+"update"+" "+"sucessfully",
      })
    }

    
}).catch(function (error) {
  console.log(error,"error_get");
});


}

change_checkbox=(useraccess,groupid,id, val, name, allvalue, index)=>{
  this.setState({
    insideLoading:true
  })

  console.log(id,"onclickval")
  console.log(val,"onclickval")
  console.log(name,"onclickval")
  console.log(allvalue,"onclickval")

  if(name==="allow_row_all"+index){
    if(val){
      var allow_view="N"
      var allow_add="N"
      var allow_edit="N"
      var allow_delete="N"
      var allow_print="N"
    }else{
      var allow_view="Y"
      var allow_add="Y"
      var allow_edit="Y"
      var allow_delete="Y"
      var allow_print="Y"
    }
    var sendData=[{
      "group_id": groupid,
      "screen_master_id": id,
      "allow_view": allow_view,
      "allow_add":allow_add,
      "allow_edit":allow_edit ,
      "allow_delete": allow_delete,
      "allow_print": allow_print,
      "active_flag": "1",
      "created_by": "1",
      "created_on": current_da_n_ti,
      "modified_by": "1",
      "modified_on": current_da_n_ti
  }]

  }

  else if(name==="head_all"){
    var sendData=[]
    if(val){
      allvalue.map((data)=>{

        sendData.push({"group_id": groupid,
        "screen_master_id": data.id,
        "allow_view": "N",
        "allow_add":"N",
        "allow_edit":"N" ,
        "allow_delete": "N",
        "allow_print": "N",
        "active_flag": "1",
        "created_by": "1",
        "created_on": current_da_n_ti,
        "modified_by": "1",
        "modified_on": current_da_n_ti})

})
    }else{
      allvalue.map((data)=>{

        sendData.push({"group_id": groupid,
        "screen_master_id": data.id,
        "allow_view": "Y",
        "allow_add":"Y",
        "allow_edit":"Y" ,
        "allow_delete": "Y",
        "allow_print": "Y",
        "active_flag": "1",
        "created_by": "1",
        "created_on": current_da_n_ti,
        "modified_by": "1",
        "modified_on": current_da_n_ti})

})
    }

  }else if(name==="head_view" || name==="head_add" || name==="head_edit" || name==="head_delete"|| name==="head_print"){
    var sendData=[]
    if(val){

      allvalue.map((data)=>{

          var allowview=[name === "head_view" ? "N" : data.allow_view,name === "head_add" ? "N" : data.allow_add,name === "head_edit" ? "N" : data.allow_edit,name === "head_delete" ? "N" : data.allow_delete]
  
          var enableview=allowview.find((val)=>{return val==="Y"})

        sendData.push({"group_id": groupid,
        "screen_master_id": data.id,
        "allow_view": enableview?enableview:"N",
        "allow_add":name==="head_add"?"N":data.allow_add,
        "allow_edit":name==="head_edit"?"N":data.allow_edit ,
        "allow_delete": name==="head_delete"?"N":data.allow_delete,
        "allow_print": name==="head_print"?"N":data.allow_print,
        "active_flag": "1",
        "created_by": "1",
        "created_on": current_da_n_ti,
        "modified_by": "1",
        "modified_on": current_da_n_ti})

})
    }else{
      allvalue.map((data)=>{

        var allowview=[name === "head_view" ? "Y" : data.allow_view,name === "head_add" ? "Y" : data.allow_add,name === "head_edit" ? "Y" : data.allow_edit,name === "head_delete" ? "Y" : data.allow_delete]

        var enableview=allowview.find((val)=>{return val==="Y"})

        sendData.push({"group_id": groupid,
        "screen_master_id": data.id,
        "allow_view": enableview==="N"?"N":"Y",
        "allow_add":name==="head_add"?"Y":data.allow_add,
        "allow_edit":name==="head_edit"?"Y":data.allow_edit ,
        "allow_delete": name==="head_delete"?"Y":data.allow_delete,
        "allow_print": name==="head_print"?"Y":data.allow_print,
        "active_flag": "1",
        "created_by": "1",
        "created_on": current_da_n_ti,
        "modified_by": "1",
        "modified_on": current_da_n_ti})

})
  }
}
  
  
  else{
  var allow_view=allvalue.allow_view
  var allow_add=allvalue.allow_add
  var allow_edit=allvalue.allow_edit
  var allow_delete=allvalue.allow_delete
  var allow_print=allvalue.allow_print
  
  switch (name) {
    case "allow_view"+index:
      allow_view = val;
      break;
    case "allow_add"+index:
      allow_add = val;
      break;
    case "allow_edit"+index:
      allow_edit = val;
      break;
    case "allow_delete"+index:
      allow_delete = val;
      break;
    case "allow_print"+index:
      allow_print = val;
      break;  
  }

  var allowview=[allow_view,allow_add,allow_edit,allow_delete]
  var enableview=allowview.find((val)=>{return val==="Y"})

  var sendData=[{
    "group_id": groupid,
    "screen_master_id": id,
    "allow_view": enableview?enableview:"N",
    "allow_add":allow_add,
    "allow_edit":allow_edit ,
    "allow_delete": allow_delete,
    "allow_print": allow_print,
    "active_flag": "1",
    "created_by": "1",
    "created_on": current_da_n_ti,
    "modified_by": "1",
    "modified_on": current_da_n_ti
}]
}

console.log(sendData,"head_allhead_all")

  // alert("tests")
            var self=this
            axios({
                method: 'put',
                url: `${apiurl}edit_mas_group_permission`,
                data:
                    {
                      "submit":sendData
                        
                    }

                })
                .then(function (response) {
                  self.recall_permission(true,groupid,useraccess)
                    console.log(response,"successs")
                    self.setState({
                    })
                })
                .catch(function (error) {
                    console.log(error,"error");
                });
                this.setState({
                    insertmodalopen:false
                })
}




  render() {
    const isSelected = name => this.state.selected.indexOf(name) !== -1;
    const { rows, rowsPerPage, page } = this.state;

    var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[4]
    if(this.state.onceopen && useraccess){
      this.recall_permission(null,this.state.responseid,useraccess)
      this.setState({onceopen:false,useraccess:useraccess})
    }

    return (
      <div>
                {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:
      <Spin className="spinner_align" spinning={this.state.insideLoading}>
      <div className="VendorDetailsDiv grp_dropdown_tble">
         <div className="group_accessrights_header">
          <div className="group_accessrights_titleuser"><h3>GROUP ACCESS RIGHTS</h3></div>

          <div className="group_accessrights_dropdown">
          <h4>Group</h4>
          <Dropdownantd className={`accessrights-option ${useraccess && useraccess.allow_edit==="N" && "disablenotallow"}`} breakclass="drop_down_br" option={this.state.group_arr} changeData={useraccess && useraccess.allow_edit==="Y" ? (data)=>this.changeDynamic(data,"group",useraccess):null} 
          value={this.state.group} />
          </div>
          
          
          <div className="btn_group_acceess_flex">
          {/* <Button className="accessrights_button_cancel">Cancel</Button>
          <Button className="accessrights_button_save">Save</Button> */}
          </div>
          </div>
        <Paper className="paper">
          <div className="tableWrapper">
            <Table
              className="table"
              aria-labelledby="tableTitle"
              size={this.state.dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderBy}
                // onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.state.rows.length}
              />
              <TableBody>
                {stableSort(
                  this.state.rows,
                  getSorting(this.state.order, this.state.orderBy)
                )
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((row, index, item) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    console.log("rendering", row);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, row.name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}

                      >
                        <TableCell padding={'none'} colSpan={12} className="grp_dropdown_datahead">
                        <div>{row}</div> 
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  component="div"
                  onChangePage={this.handleChangePage}
                  onChangerowsPerPage={this.handleChangerowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
        </Paper>
      </div>
      </Spin>
      }
      </div>
    );
  }
}

export default Groupaccess;