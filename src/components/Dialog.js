import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import firebase from "../firebase";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const nameRef = useRef();
  const lastNameRef = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  function isBlank(valVar) {
    console.log(valVar == null);
    console.log(valVar == "");
    console.log(valVar == undefined);
    return valVar == null || valVar == "" || valVar == undefined;
  }
  const handleClose = (e) => {
    if (e.target.innerText == "SAVE") {
      const nameVal = nameRef.current.value;
      const lastNameVal = lastNameRef.current.value;
      if (!isBlank(nameVal) && !isBlank(lastNameVal)) {
        updateData(nameVal, lastNameVal);
      }
    }
    setOpen(false);
  };

  function updateData(name, lastName) {
    const empRef = firebase.database().ref("Employees");
    const empVal = {
      name: name,
      lastname: lastName,
    };
    empRef.push(empVal);
  }

  return (
    <div>
      <IconButton aria-label="add" onClick={handleClickOpen}>
        <AddCircleIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Employees:</DialogContentText>
          <TextField
            inputRef={nameRef}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            inputRef={lastNameRef}
            autoFocus
            margin="dense"
            id="lastname"
            label="Last Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
