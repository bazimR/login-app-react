import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children
}

export const ProtectRoute = ({ children }) => {
    const { userName } = useSelector(state => state.user)
    if (!userName) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}
export const AdminAcess = ({ children }) => {
    const value = localStorage.getItem('adminToken')
    if (!value) {
        return <Navigate to={'/admin'} replace={true} />
    }
    return children;
}
export const AdminLogin = ({children})=>{
    const value = localStorage.getItem('adminToken')
    if (value) {
        return <Navigate to={'/admin/home'} replace={true} />
    }
    return children;
}