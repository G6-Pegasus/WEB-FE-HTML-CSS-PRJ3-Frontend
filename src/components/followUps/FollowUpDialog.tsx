import React, { useEffect, useState } from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { getOpportunityDetails } from "../../services/opportunityServices";
import { getCustomerDetails } from "../../services/customerServices";
import { contactTypes, FollowUpStatus, Customer, OpportunityRow, Contact, FollowUp } from "../../utils/types";
import { useUpdateFollowUp } from "../../hooks/useUpdateFollowUp";
import { useCreateFollowUp } from "../../hooks/useCreateFollowUp";

interface FollowUpFormValues {
  contactType: contactTypes
  contactDate: string
  contactClient: Contact[]
  commercialExecutive: string
  description: string
  status: FollowUpStatus
}

const UpdateDialog: React.FC<{ open: boolean; onClose: () => void; followUpData: Partial<FollowUp> ,option: "Create" | "Update" }> = ({open, onClose, followUpData, option }) => {
  const { control, handleSubmit, setValue } = useForm<FollowUpFormValues>({
    defaultValues: {
      contactClient: [],
      status: "In Progress"
    },
  })
  const [contacts, setContacts] = useState<Contact[]>([])
  const [openContactDialog, setOpenContactDialog] = useState(false)
  const { mutate: sendFollowUp, isSuccess, isError: isSendError } = option === "Update" ? useUpdateFollowUp() : useCreateFollowUp()

  useEffect(() => {
    const fetchFollowUpData = async () => {
        setValue("contactType", followUpData.contactType as contactTypes)
        setValue("contactDate", followUpData.contactDate as string)
        setValue("contactClient", followUpData.contactClient || [])
        setValue("commercialExecutive", followUpData.commercialExecutive as string)
        setValue("description", followUpData.description as string)
        setValue("status", followUpData.status as FollowUpStatus)

        const opportunityData: OpportunityRow = await getOpportunityDetails(followUpData.opportunityId as string)
        const customerId = opportunityData.customerId
        const customerData: Customer = await getCustomerDetails(customerId)
        setContacts(customerData.contacts)
    }
    fetchFollowUpData()
  }, [followUpData, setValue])

  if (isSuccess) {
    Swal.fire({
      icon: "success",
      title: `${option}d!`,
      text: `${option} successfully.`,
      showConfirmButton: false,
      timer: 1500,
      willClose: () => {onClose()},
    })
  }
  if (isSendError) {
    Swal.fire({
      icon: "error",
      title: `${option} failed`,
      text: "Something went wrong while updating",
      showConfirmButton: true,
      willClose: () => onClose(),
    })
  }

  const onSubmit = (data: FollowUpFormValues) => {
    if (!followUpData) {
      Swal.fire({
        icon: "error",
        title: "Missing ID",
        text: `Follow-up ID is missing. Unable to ${option.toLowerCase()}.`,
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
    sendFollowUp({
      id: followUpData.id as string,
      opportunityId: followUpData.opportunityId as string,
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
            defaultValue="call"
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Contact Type"
                variant="outlined"
                sx={{ marginBottom: 2 }}
              >
                {/* Opciones del select */}
                <MenuItem value="call">Call</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
              </TextField>
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
          <Button type="submit"> {option}</Button>
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