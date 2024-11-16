import  { useState } from 'react';
import Main from '../../layout/Main';
import UpdateDialog from '../../components/followUps/UpdateFollowDialog'; 

const FollowUpsView = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const openDialogHandler = () => setOpenDialog(true)
  const closeDialogHandler = () => setOpenDialog(false)

  return (
    <Main>
      <div>
        <button 
          onClick={openDialogHandler} 
          className='mt-4 p-2 bg-blue-500 text-white rounded-md'>
          Update FollowUp
        </button>
      </div>
      <UpdateDialog open={openDialog} onClose={closeDialogHandler} />
    </Main>
  )
}

export default FollowUpsView;