import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "./logoutAPI";

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const responseStatus = await dispatch(logout()).unwrap();
            if (responseStatus === 204) {
                navigate("/login")
            }
            // TODO: create proper error message
        } catch (error) {
            // TODO: create proper error message
        }
    }

    useEffect(() => {
        handleLogout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // TODO: change this to a spinner
    return <div>Logging out...</div>
}