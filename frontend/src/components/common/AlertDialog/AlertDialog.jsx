import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export default function AlertDialog(props) {
  return (
    <div>

    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
       {props.headerMsg}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
{props.alertMsg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.onApprove} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}
