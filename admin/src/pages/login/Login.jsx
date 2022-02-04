import { login } from "../../redux/apiCall";
import {useCallback, useState} from "react";
import { useDispatch } from "react-redux";

const Login = () => {
    const [username, setUsername]   = useState("");
    const [password, setPassword]   = useState("");
    const dispatch                  = useDispatch();

    const handleClick = useCallback((e) => {
        console.log("username : ", username);
        login(dispatch, { username, password });
    }, [dispatch, username, password]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} style={{ padding: 10, width:100 }}>
                Login
            </button>
        </div>
    );
};

export default Login;
