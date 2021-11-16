import { Redirect, Route } from 'react-router-dom';
import {useSelector} from "react-redux";
import {propTypesModel} from "../../models/common-models";

const ProtectedRoute = ({ children, exact, path }) => {
    const {isAuth} = useSelector(state => state.userData);
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

ProtectedRoute.propTypes = propTypesModel.isRequired
export default ProtectedRoute;
