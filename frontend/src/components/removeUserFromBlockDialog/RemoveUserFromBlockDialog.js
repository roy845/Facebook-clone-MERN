import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";

const RemoveUserFromBlockDialog = ({ open, setOpen, removeUserFromBlock }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle
        sx={{
          fontSize: "35px",
          fontFamily: "Work sans",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Remove User From Block
      </DialogTitle>
      <DialogContent>
        <div>
          This user is blocked, you need to cancel the block of this user in
          order to send him a message
        </div>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button color="primary" onClick={removeUserFromBlock}>
            Cancel Block
          </Button>
          <Button color="primary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Box>
      </DialogActions>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      />
    </Dialog>
  );
};

export default RemoveUserFromBlockDialog;
