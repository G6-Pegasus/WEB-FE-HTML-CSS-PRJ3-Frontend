import { useNavigate } from 'react-router-dom';
import Main from '../../layout/Main'
import Swal from 'sweetalert2';
import CreateOpportunity from '../../forms/CreateOpportunity';
import UpdateOpportunity from '../../forms/UpdateOpportunity';

const OpportunityFormView = ({ option }: { option: "create" | "update" }) => {
    const navigate = useNavigate();
    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Any unsaved changes will be lost.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, cancel",
            cancelButtonText: "No, stay",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/opportunities");
            }
        });
    };

    return <Main>
        {option === "create" ? (
            <CreateOpportunity onCancel={handleCancel} />
        ) : (
            <UpdateOpportunity onCancel={handleCancel} />
        )}
    </Main>
}

export default OpportunityFormView;