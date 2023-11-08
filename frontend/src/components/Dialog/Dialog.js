import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";

export default function StoryDialog({ setOpen, open, children }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        Story
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "black" }}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
