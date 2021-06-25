import { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { LoginContext } from '../../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [signedInUser, setSignedInUser] = useContext(LoginContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                signedInUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;