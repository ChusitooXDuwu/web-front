import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import styles from "./LoginView.module.scss";

interface LoginViewProps {
    
}
 
const LoginView: FunctionComponent<LoginViewProps> = () => {
    return ( 
        <div className={styles.login_background}>
            <Outlet />
        </div>
     );
}
 
export default LoginView;