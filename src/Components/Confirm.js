import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import lightBg from '../images/light-bg.jpg';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '75%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: `url(${lightBg})`
  },
}));

export default function Confirm(props) {
  const classes = useStyles();

  return (
    <Modal
        open={props.open}
        onClose={() => props.onShowModal(false)}
    >
      <div className={classes.paper}>
        <Typography variant="h2">Success!</Typography>
        <Typography variant="body1">
          We just began to make the GREATEST PIZZA IN THE WORLD for you, my dear friend
        </Typography>
        <Typography variant="body2">
          Please, be sure your phone is turned on and is able to receive our managers' call :)
        </Typography>
      </div>
    </Modal>
  );
}
