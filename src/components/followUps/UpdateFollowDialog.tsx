import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button } from '@mui/material';

interface UpdateDialogProps {
  open: boolean; 
  onClose: () => void; 
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update FollowUp</DialogTitle>
      <DialogContent sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <div className='my-2'>
          <TextField
            fullWidth
            label="Contact type"
            select
            variant="outlined"
            className="mb-4"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="call">Call</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="meet">In Person Meeting</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Contact Date"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Customer Contact"
            select
            variant="outlined"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="client">Client 1</MenuItem>
            <MenuItem value="client2">Client 2</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Commercial Executive"
            select
            variant="outlined"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="ex1">Executive 1</MenuItem>
            <MenuItem value="ex2">Ececutive 2</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
        </div>
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateDialog