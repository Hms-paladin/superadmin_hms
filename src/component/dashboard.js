import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        // this.TextField = React.createRef();
      }
      componentDidMount() {
        // this.TextField.current.focus();
        document.getElementById("name").focus()
      }
      
      
    render(){
        return(
            <div>
            <h1>Dashboard</h1>
            <TextField className="w-50"  id="name"
            // ref={this.TextField}
            // ref={(textarea) => { this.testInput = textarea; }}
            />

            </div>
        )
    }
}

export default Dashboard;