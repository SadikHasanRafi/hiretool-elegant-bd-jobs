import { useNavigate } from "react-router-dom";

const ApprovalPage = () => {
    const navigate = useNavigate()
    const isApproved = true

    const handleOnlick = () => {
        navigate("/dashboard")
    }

    return (
        <div>
            {
                isApproved ?
                <>
                    <p>approved</p>
                    <button className="btn btn-outline" onClick={handleOnlick}>Go to dashboard</button>
                </>
                :
                <>
                    <p>We will soon approve you joining request</p>
                </>
            }
        </div>
    );
};

export default ApprovalPage;