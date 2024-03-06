import {useNavigate} from "react-router-dom";

export const Navigate = (endpoint) => {
    const navigate = useNavigate();
    return navigate(endpoint);
}