"use client"; // クライアント側で動作するコードであることを指定しています。
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

export default function UploadImageModal({ open, handleClose, handleUpload }) {
  const [image, setImage] = React.useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    handleUpload(image);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>今日の出来事を投稿する</DialogTitle>

      <DialogContent>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <>
            <p>{image.name}</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: "100%", marginTop: "10px" }}
            />
          </>
        )}
        <TextField
          autoFocus
          required
          margin="dense"
          label="今日の出来事は？"
          fullWidth
          variant="outlined"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleSubmit} color="primary">
          投稿
        </Button>
      </DialogActions>
    </Dialog>
  );
}
