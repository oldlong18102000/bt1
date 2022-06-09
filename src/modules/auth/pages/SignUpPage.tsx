import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import logo from '../../../logo-420-x-108.png';
import { ILoginParams, ISignUpParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { push, replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import { useEffect } from 'react';

const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [locations, setLocations] = useState([]);

    const getLocation = React.useCallback(async () => { }, []);

    useEffect(() => { }, [getLocation]);

    const onSignUp = React.useCallback(
        async (values: ISignUpParams) => {
            // setErrorMessage('');
            // setLoading(true);

            // const json = await dispatch(
            //     fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
            // );

            // setLoading(false);

            // if (json?.code === RESPONSE_STATUS_SUCCESS) {
            //     dispatch(setUserInfo(json.data));
            //     Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
            //     dispatch(replace(ROUTES.home));
            //     return;
            // }

            // setErrorMessage(getErrorMessageResponse(json));
        },
        [dispatch],
    );

    return (
        <div
            className="container"
            style={{
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

            <SignUpForm onSignUp={onSignUp} loading={loading} errorMessage={errorMessage} locations={locations} />
        </div>
    );
};

export default SignUpPage;
