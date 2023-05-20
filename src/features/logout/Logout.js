import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "./logoutAPI";

export const Logout = () => {
    const navigate = useNavigate();

    const [logout, { isSuccess }] = useLogoutMutation();

    useEffect(() => {
        logout().unwrap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    // TODO: change this to a spinner, add a header, center
    return <div>Logging out...</div>
}