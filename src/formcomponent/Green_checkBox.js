import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

class Green_checkBox extends React.Component{
    render(){
        return(
            <div>
            <FormControlLabel
                control={
                    <GreenCheckbox
                    checked={this.props.checked}
                    onChange={this.props.change_checkbox}
                    value={this.props.value}
                    onClick={event => event.stopPropagation()}
                    className={this.props.className && this.props.className}
                    />
                }
                />
                    
            </div>
        )
    }
}

export default Green_checkBox;