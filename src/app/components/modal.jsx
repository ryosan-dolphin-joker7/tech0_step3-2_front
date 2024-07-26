import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
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
      <DialogTitle>画像を投稿する</DialogTitle>
      <DialogContent>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <p>{image.name}</p>}
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
