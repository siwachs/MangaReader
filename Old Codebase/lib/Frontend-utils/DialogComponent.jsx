import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DialogComponent = ({
  open,
  setIsOpen,
  acceptButtonMethod,
  dialogTitle,
  dialogText,
  cancelButtonText,
  dialogButtonText,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>{cancelButtonText}</Button>
        <Button onClick={acceptButtonMethod} autoFocus>
          {dialogButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
