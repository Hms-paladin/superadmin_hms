import React, { Component } from "react";
import clsx from "clsx";
import { Collapse } from 'antd';

import PropTypes from "prop-types";
import { lighten, makeStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Icon, message, Popconfirm } from "antd";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
// import { Collapse } from '@material-ui/core';

import "./ravenupayment.css"

// expansepanel
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



// import "./ravenupayment.css";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const { Panel } = Collapse;


function createData(
    vendor,
    revenue,
    commission,
    topay,
    sevendays,
    fifteen,
    twentyonedays,
    stwentyeightdays,
    ltwentyeightdays

) {
  return { vendor, revenue, commission, topay, sevendays, fifteen, twentyonedays,stwentyeightdays,ltwentyeightdays };
}
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
  { id: "vendor", label: "Vendor" },
  { id: "revenue", label: "Revenue" },
  { id: "commission", label: "Commission" },
  { id: "topay", label: "To pay" },
  { id: "sevendays", label: "<7days" },
  { id: "fifteen", label: "<15days" },
  { id: "twentyonedays", label: "<21days" },
  { id: "stwentyeightdays", label: "<28days" },
  { id: "ltwentyeightdays", label: ">28days" },
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
      <TableRow>
        {headrows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
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
      </TableRow>
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

// const useToolbarStyles = makeStyles(theme => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1)
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85)
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark
//         },
//   spacer: {
//     flex: "1 1 100%"
//   },
//   actions: {
//     color: theme.palette.text.secondary
//   },
//   title: {
//     flex: "0 0 auto"
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25)
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto"
//     }
//   },
//   searchIcon: {
//     width: theme.spacing(7),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer"
//   },
//   inputRoot: {
//     color: "inherit"
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 7),
//     // backgroundColor:'white',
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       // width: 120,
//       "&:focus": {
//         width: 200
//       }
//     }
//   }
// }));


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

class Ravenupayment extends Component {
  constructor(props) {
    super(props);
    function createData(
    vendor,
    revenue,
    commission,
    topay,
    sevendays,
    fifteen,
    twentyonedays,
    stwentyeightdays,
    ltwentyeightdays

) {
  return { vendor, revenue, commission, topay, sevendays, fifteen, twentyonedays,stwentyeightdays,ltwentyeightdays };
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
      rows: [
        createData("Dr.rahuman", "50000","1000","2000","1000","1277","1400","280","15","10"),
        createData("VIP Consulting",  "22 Aug 2019 ","140"),
        createData("Tooth Polishing",  "19 Jun 2019 ","120"),
        createData("Normal Consulting",  "12 Aug 2019 ","130"),
        createData("VIP Consulting",  "02 Aug 2019 ","140"),
        createData("Normal Consulting",  "12 Aug 2019 ","80"),
        createData("VIP Consulting", "20 Mar 2019","120"),
      ],
      viewdata: null,
      type:"",
      title:"",
      rotateicon:true
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
  
  render() {
    const isSelected = name => this.state.selected.indexOf(name) !== -1;
    const { rows, rowsPerPage, page } = this.state;
    const { classes } = this.props;
    const customPanelStyle = {
        background: '#f7f7f7',
        borderRadius: 4,
        marginBottom: 24,
        border: 0,
        overflow: 'hidden',
      };


    return (
      <div className="VendorDetailsDiv dropdowntable">
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
                        <TableCell padding={'none'} colSpan={12} className="dropdowntable_expanse">
                        <Collapse 
                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                        >
                            <Panel header={<div className="dropdowntable_expanse"><div>{row.vendor}</div>   
                        <div>{row.revenue}</div>          
                        <div>{row.revenue}</div>         
                        <div>{row.topay}</div>           
                        <div>{row.sevendays}</div>        
                        <div>{row.fifteen}</div>        
                        <div>{row.twentyonedays}</div>   
                        <div>{row.stwentyeightdays}</div> 
                        <div>{row.ltwentyeightdays}</div></div>} key="1">


                            <p >
                        <div className="dropdowntable_expanse_data">
                        <div>{row.vendor}</div>   
                        <div>{row.revenue}</div>          
                        <div>{row.revenue}</div>         
                        <div>{row.topay}</div>           
                        <div>{row.sevendays}</div>        
                        <div>{row.fifteen}</div>        
                        <div>{row.twentyonedays}</div>   
                        <div>{row.stwentyeightdays}</div> 
                        <div>{row.ltwentyeightdays}</div>
                        </div>

                        <div className="dropdowntable_expanse_data">
                        <div>{row.vendor}</div>   
                        <div>{row.revenue}</div>          
                        <div>{row.revenue}</div>         
                        <div>{row.topay}</div>           
                        <div>{row.sevendays}</div>        
                        <div>{row.fifteen}</div>        
                        <div>{row.twentyonedays}</div>   
                        <div>{row.stwentyeightdays}</div> 
                        <div>{row.ltwentyeightdays}</div>
                        </div>

                        <div className="dropdowntable_expanse_data">
                        <div>{row.vendor}</div>   
                        <div>{row.revenue}</div>          
                        <div>{row.revenue}</div>         
                        <div>{row.topay}</div>           
                        <div>{row.sevendays}</div>        
                        <div>{row.fifteen}</div>        
                        <div>{row.twentyonedays}</div>   
                        <div>{row.stwentyeightdays}</div> 
                        <div>{row.ltwentyeightdays}</div>
                        </div>
                        </p>
                            </Panel>
                        </Collapse>
                        </TableCell>


                        {/* <TableCell padding={'none'} colSpan={12} className="dropdowntable_expanse">

                        <ExpansionPanel onClick={this.rotateicon}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography className={`${classes.heading} dropdowntable_dis_flex`}> */}
                            {/* <TableCell>{row.vendor}         </TableCell>
                            <TableCell>{row.revenue}        </TableCell>
                            <TableCell>{row.revenue}        </TableCell>
                            <TableCell>{row.topay}          </TableCell>
                            <TableCell>{row.sevendays}      </TableCell>
                            <TableCell>{row.fifteen}        </TableCell>
                            <TableCell>{row.twentyonedays}  </TableCell>
                            <TableCell>{row.stwentyeightdays}</TableCell>
                            <TableCell>{row.ltwentyeightdays}</TableCell> */}
                            {/* <div className="dropdowntable_dis_flex"> */}
                            {/* <div><ArrowDropUpIcon className={`${this.state.rotateicon?"upside":"downside"}`} /></div> */}

                        {/* <div>{row.vendor}</div>   
                        <div>{row.revenue}</div>          
                        <div>{row.revenue}</div>         
                        <div>{row.topay}</div>           
                        <div>{row.sevendays}</div>        
                        <div>{row.fifteen}</div>        
                        <div>{row.twentyonedays}</div>   
                        <div>{row.stwentyeightdays}</div> 
                        <div>{row.ltwentyeightdays}</div> 

                        </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Typography >
                        
                        <div className="dropdowntable_dis_flex">
                        <div>{row.vendor}</div>   
                        <div>{row.revenue}</div>          
                        <div>{row.revenue}</div>         
                        <div>{row.topay}</div>           
                        <div>{row.sevendays}</div>        
                        <div>{row.fifteen}</div>        
                        <div>{row.twentyonedays}</div>   
                        <div>{row.stwentyeightdays}</div> 
                        <div>{row.ltwentyeightdays}</div> 
                        </div>
                      
                        <div className="dropdowntable_dis_flex">
                        <div>{row.vendor}</div>   
                        <div>{row.revenue}</div>          
                        <div>{row.revenue}</div>         
                        <div>{row.topay}</div>           
                        <div>{row.sevendays}</div>        
                        <div>{row.fifteen}</div>        
                        <div>{row.twentyonedays}</div>   
                        <div>{row.stwentyeightdays}</div> 
                        <div>{row.ltwentyeightdays}</div> 
                        </div> */}
                        
                        {/* <TableCell>{row.vendor}</TableCell>
                            <TableCell>{row.revenue}</TableCell>
                            <TableCell>{row.revenue}</TableCell>
                            <TableCell>{row.topay}</TableCell>
                            <TableCell>{row.sevendays}</TableCell>
                            <TableCell>{row.fifteen}</TableCell>
                            <TableCell>{row.twentyonedays}</TableCell>
                            <TableCell>{row.stwentyeightdays}</TableCell>
                            <TableCell>{row.ltwentyeightdays}</TableCell> */}
                        {/* </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    </TableCell>                                       */}
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
    );
  }
}

// const Ravenupayment = withStyles(useStyles, { withTheme: true })(
//     Ravenupayment,
//   );

export default withStyles(useStyles)(Ravenupayment);
