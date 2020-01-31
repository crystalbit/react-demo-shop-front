import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert/Alert';
import getSubtotal from '../../Helpers/getSubtotal';
import Confirm from '../Confirm';
import ClientForm from '../Shared/ClientForm';
import Api from '../../Api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 8
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '100%'
  },
  image: {
    width: 128,
    height: 90,
  },
  orderButton: {
    marginTop: 15,
    marginLeft: 10
  },
  backButton: {
    marginTop: 15,
    marginLeft: 10
  },
  costData: {
    textAlign: 'right'
  },
  divider: {
    marginTop: 10,
    marginBottom: 20
  }
}));

export default function(props) {
  const classes = useStyles();

  const [ validationData, setValidationData ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState('Unknown error');
  const [ confirmModalVisible, showConfirmModal ] = useState(false);
  const [ showErrorMessage, toggleErrorMessage ] = useState(false);

  const subtotal = getSubtotal(props.cart);
  const delivery_cost = subtotal >= 50 ? 0 : 5;

  // const { loginItem, setClient } = props;
  // useEffect(() => {
  //   if (loginItem.auth) setClient(loginItem.client);
  // }, [loginItem, setClient]);

  return (
    <div className={classes.root}>
      <Confirm
        open={confirmModalVisible}
        onShowModal={showConfirmModal}
      />
      <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={() => toggleErrorMessage(false)}>
        <Alert onClose={() => toggleErrorMessage(false)} severity="error" elevation={6} variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <div className={classes.costData}>
          {subtotal ? (
            <React.Fragment>
              <Typography variant="h5">
                Subtotal: ${subtotal}
              </Typography>
              <Typography variant="h5">
                {delivery_cost ? (
                  'Delivery: $' + delivery_cost
                ) : (
                  'Free delivery'
                )}
              </Typography>
            </React.Fragment>
          ) : ''}
          <Typography variant="h3">
            Total: ${subtotal ? subtotal + delivery_cost : 0}
          </Typography>
          {delivery_cost ? (
            <Typography variant="caption">
              we offer free delivery for orders starting from $50
            </Typography>
          ) : ''}
        </div>
        <Divider variant="middle" className={classes.divider} />
        <form>
          <ClientForm
            client={props.client}
            setClient={props.setClient}
            validationData={validationData}
            setValidationData={setValidationData}
          />
          <Button
            aria-label="Make an order"
            color="primary"
            variant="contained"
            className={classes.orderButton}
            onClick={() => {
              if (
                validationData.name || validationData.address || validationData.phone || validationData.email
              ) return;
              Api.postOrder(props.client, { delivery_cost }, props.cart).then(result => {
                if (result.success) {
                  showConfirmModal(true);
                  props.onClearCart();
                } else {
                  setErrorMessage(result.msg || 'Unknown error');
                  toggleErrorMessage(true);
                }
              });
            }}
          >
            Make an order
          </Button>
          <Button
            aria-label="Go back"
            color="primary"
            variant="outlined"
            component={Link}
            to="/"
            className={classes.backButton}
          >
            Back to the shop
          </Button>
        </form>
      </Paper>
    </div>
  );
}
