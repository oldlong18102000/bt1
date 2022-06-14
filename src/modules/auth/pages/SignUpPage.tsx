import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import logo from '../../../logo-420-x-108.png';
import { ISignUpParams } from '../../../models/auth';
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
import { FormattedMessage } from 'react-intl';

const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [location, setLocations] = useState([]);
    const [id, setId] = useState('');
    const [states, setState] = useState([]);

    const getLocation = React.useCallback(async () => {

        const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setLocations(json.data);
            return;
        }
    }, []);

    useEffect(() => { getLocation() }, [getLocation]);

    const onSignUp = React.useCallback(
        async (values: ISignUpParams) => {
            setErrorMessage('');
            setLoading(true);

            const json = await dispatch(
                fetchThunk(API_PATHS.signUp, 'post', values),
            );

            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                alert('Chúc mừng bạn đăng ký thành công')
                dispatch(replace(ROUTES.login));
                return;
            }

            setErrorMessage(getErrorMessageResponse(json));
        },
        [dispatch]);

    const handleState = (e: any) => {
        setId(e.target.value);
    }

    const getState = React.useCallback(async () => {
        //setLoading(true);
        if (id) {
            const json = await dispatch(fetchThunk(`${API_PATHS.getStateByLocation}${id}`, 'get'));
            console.log(`${API_PATHS.getStateByLocation}${id}`);

            //setLoading(false);
            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                setState(json.data);
                return;
            }
        }
    }, [id]);

    useEffect(() => { getState(); }, [id]);

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

            <SignUpForm
                onStates={handleState}
                onSignUp={onSignUp}
                loading={loading}
                errorMessage={errorMessage}
                locations={location}
                states={states}
            />
            Bạn đã có tài khoản?
            <a onClick={() => dispatch(replace(ROUTES.login))} style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}>
                <FormattedMessage id="loginnow" />
            </a>
        </div>
    );
};

export default SignUpPage;
