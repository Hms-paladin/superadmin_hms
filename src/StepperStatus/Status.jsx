import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import './Status.css';

import dateFormat from 'dateformat';


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
      backgroundColor: 'red',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
      backgroundColor: 'red',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#2B97F2',
  },
  completed: {
    color: '#84FCAC',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,#84FCAC 0%,#84FCAC 50%,#4FB571 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(180deg, #84FCAC 0%, #4FB571 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient(180deg, #84FCAC 0%, #4FB571 100%)',
  },
  completed: {
    backgroundImage: 'linear-gradient(180deg, #84FCAC 0%, #4FB571 100%)',
  },
});

function ColorlibStepIcon(props) {
  console.log(props,"ColorlibStepIcon")
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1:  completed && <CheckIcon className="comp_sta_icon" />,
    2:  completed && <CheckIcon className="comp_sta_icon" />,
    3: completed && <CheckIcon className="comp_sta_icon" />,
    4: completed && <CheckIcon className="comp_sta_icon" />,
    // 5: props[7].sh_date_time !== null && <CheckIcon className="comp_sta_icon" />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

var activeStepIndex;

function getSteps(deliveryTrackingStatus) {
  // var self=this;
  // alert(JSON.stringify(deliveryTrackingStatus))
  var deliveryTrackingStatusData = []
  if (deliveryTrackingStatus != undefined) {
    deliveryTrackingStatusData = deliveryTrackingStatus.filter(val => val.status_id != 5)
    console.log(deliveryTrackingStatusData, "deliveryTrackingStatusData")
    activeStepIndex=deliveryTrackingStatusData.findIndex((val,index)=>val.sh_date_time === null) !== -1 ? deliveryTrackingStatusData.findIndex((val,index)=>val.sh_date_time === null) : deliveryTrackingStatusData.findIndex((val,index)=>val.status_id === 6)
    console.log(activeStepIndex,"activeStepIndex")
    if(activeStepIndex !== -1){
      activeStepIndex=activeStepIndex;
    }else{
      activeStepIndex=activeStepIndex-1;
    }
    console.log(activeStepIndex,"activeStepIndex")
    console.log(deliveryTrackingStatusData,"checkcheck")
    console.log(dateFormat(deliveryTrackingStatusData[2].sh_date_time, "hh:MM TT"),deliveryTrackingStatusData[2].sh_date_time,"sdfasd")
    console.log(deliveryTrackingStatusData.findIndex((val,index)=>{
      return(
        val.sh_order_id === null
      )
    }),"activeStepsdfsd")
  }

 
  if (deliveryTrackingStatusData.length > 0) {

    return [
      {
        dw_val:
          <div>
            <label>
              {deliveryTrackingStatusData[0].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[0].sh_date_time, "dd mmm yyyy") : ""}
            </label>
            <div>
              {deliveryTrackingStatusData[0].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[0].sh_date_time, "hh:MM TT") : ""}
            </div>
          </div>,
        tp_val:
          <div>
            <label>{deliveryTrackingStatusData[0].sh_status}</label>
          </div>
      },
      {
        dw_val:
          <div>
            <label>
              {deliveryTrackingStatusData[1].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[1].sh_date_time, "dd mmm yyyy") : ""}
            </label>
            <div>
              {deliveryTrackingStatusData[1].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[1].sh_date_time, "hh:MM TT") : ""}
            </div>
          </div>,
        tp_val:
          <div>
            <label>{deliveryTrackingStatusData[1].sh_status}</label>
          </div>
      },
      {
        dw_val:
          <div>
            <label>
              {deliveryTrackingStatusData[2].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[2].sh_date_time, "dd-mmm-yyyy") : ""}
            </label>
            <div>
              {deliveryTrackingStatusData[2].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[2].sh_date_time, "hh:MM TT") : ""}
            </div>
          </div>,
        tp_val:
          <div>
            <label>{deliveryTrackingStatusData[2].sh_status}</label>
          </div>
      },
      {
        dw_val:
          <div>
            <label>
              {deliveryTrackingStatusData[3].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[3].sh_date_time, "dd-mmm-yyyy") : ""}
            </label>
            <div>
              {deliveryTrackingStatusData[3].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[3].sh_date_time, "hh:MM TT") : ""}
            </div>
          </div>,
        tp_val:
          <div>
            <label>{deliveryTrackingStatusData[3].sh_status}</label>
          </div>
      },
      {
        dw_val:
          <div>
            <label>
              {deliveryTrackingStatusData[4].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[4].sh_date_time, "dd-mmm-yyyy") : ""}
            </label>
            <div>
              {deliveryTrackingStatusData[4].sh_date_time != null ? dateFormat(deliveryTrackingStatusData[4].sh_date_time, "hh:MM TT") : ""}
            </div>
          </div>,
        tp_val:
          <div>
            <label>{deliveryTrackingStatusData[4].sh_status}</label>
          </div>
      },
    ]
  } else {
    return []
  }
}


function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  // if(props.deliveryTrackingStatus != undefined){
  // }
  const steps = getSteps(props.deliveryTrackingStatus);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="stepper_container">
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStepIndex} connector={<ColorlibConnector />}>

          {steps.map(label => (
            <Step key={label.dw_val}>

              <p className="top_step" key={label.tp_val}>{label.tp_val}</p>

              <StepLabel StepIconComponent={ColorlibStepIcon} StepIconProps={props.deliveryTrackingStatus}>{label.dw_val}</StepLabel>

            </Step>

          ))}


        </Stepper>


      </div>
    </div>
  );
}