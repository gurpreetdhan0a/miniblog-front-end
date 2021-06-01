import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  flex :{
      display: 'flex',
      justifyContent: 'space-evenly'
  }
}));

export default function Model({open, deletePost, closeModal}) {
  const classes = useStyles();
  const rootRef = React.useRef(null);

  return (
    <div className={classes.root} ref={rootRef}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <h2 id="server-modal-title">Sure you want to delete this post?</h2>
          <div className={classes.flex}>
          <Button onClick={()=>deletePost()} variant="contained" color="primary">Yes</Button><Button onClick={()=>closeModal()} variant="contained" color="secondary">No</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}