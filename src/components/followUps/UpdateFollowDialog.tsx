import React, { useEffect, useState } from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from "@mui/material";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { getFollowUpsByID } from "../../services/followUpServices";
import { getOpportunityDetails } from "../../services/opportunityServices";
import { getCustomerDetails } from "../../services/customerServices";
import { contactTypes, FollowUpStatus, Customer, OpportunityRow, Contact } from "../../utils/types";
import { useUpdateFollowUps } from "../../hooks/useUpdateFollowUps";

interface FollowUpFormValues {
  contactType: contactTypes
  contactDate: string
  contactClient: Contact[]
  commercialExecutive: string
  description: string
  status: FollowUpStatus
}

const UpdateDialog: React.FC<{ open: boolean; onClose: () => void; followUpId: string }> = ({open, onClose, followUpId,}) => {
  const { control, handleSubmit, setValue } = useForm<FollowUpFormValues>({
    defaultValues: {
      contactClient: [],
    },
  })
  const [contacts, setContacts] = useState<Contact[]>([])
  const [openContactDialog, setOpenContactDialog] = useState(false)
  const { mutate: updateFollowUp, isSuccess, isError: isUpdateError } = useUpdateFollowUps()

  useEffect(() => {
    const fetchFollowUpData = async () => {
      if (followUpId) {
        let followUp = await getFollowUpsByID(followUpId)
        followUp = followUp[0]
        if (followUp) {
          setValue("contactType", followUp.contactType)
          setValue("contactDate", followUp.contactDate)
          setValue("contactClient", followUp.contactClient || [])
          setValue("commercialExecutive", followUp.commercialExecutive)
          setValue("description", followUp.description)
          setValue("status", followUp.status)

          const opportunityData: OpportunityRow = await getOpportunityDetails(Number(followUp.opportunityId))
          const customerId = opportunityData.customerId
          const customerData: Customer = await getCustomerDetails(customerId)
          setContacts(customerData.contacts)
        }
      }
    }
    fetchFollowUpData()
  }, [followUpId, setValue])

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Updated successfully.",
        showConfirmButton: false,
        timer:1500,
        willClose: () => {onClose()},
      })
    }
    if (isUpdateError) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating",
        showConfirmButton: true,
        willClose: () => onClose(),
      })
    }
  }, [isSuccess, isUpdateError, onClose])

  const onSubmit = (data: FollowUpFormValues) => {
    if (!followUpId) {
      Swal.fire({
        icon: "error",
        title: "Missing ID",
        text: "Follow-up ID is missing. Unable to update.",
        showConfirmButton: true,
        willClose: () => onClose(),
      })
      return
    }
    if (!data.contactType || !data.contactDate || !data.commercialExecutive || !data.description || !data.status) {
      Swal.fire({
        icon: "warning",
        title: "Missing Data",
        text: "Please fill in all required fields.",
        showConfirmButton: true,
        willClose: () => onClose(),
      })
      return
    }
    updateFollowUp({
      id: followUpId,
      opportunityId: followUpId,
      contactType: data.contactType,
      contactDate: data.contactDate,
      contactClient: data.contactClient,
      commercialExecutive: data.commercialExecutive,
      description: data.description,
      status: data.status,
    })
  }
  const handleContactDialogOpen = () => {
    setOpenContactDialog(true)
  }
  const handleContactDialogClose = () => {
    setOpenContactDialog(false)
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update Follow-Up</DialogTitle>
        <div className="my-1">
          <DialogContent sx={{ maxHeight: "60vh", overflowY: "auto" }}>
            <Controller
              name="contactType"
              control={control}
              defaultValue="select"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Contact Type"
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Controller
              name="contactDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Contact Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Controller
              name="commercialExecutive"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Commercial Executive"
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Button
              variant="contained"
              onClick={handleContactDialogOpen}
              sx={{ marginBottom: 2 }}
            >
              View Contacts
            </Button>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit"> Update</Button>
        </DialogActions>
      </form>
      <Dialog open={openContactDialog} onClose={handleContactDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Information</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow key={index}>
                    <TableCell>{contact.Cname}</TableCell>
                    <TableCell>{contact.Cemail}</TableCell>
                    <TableCell>{contact.Cphone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContactDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}

export default UpdateDialog;