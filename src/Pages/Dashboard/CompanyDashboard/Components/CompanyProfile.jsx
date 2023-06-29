import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const CompanyProfile = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <p>Company registered email is <span className="text-xl font-extrabold">{user.email}</span></p>
        </div>
    );
};

export default CompanyProfile;