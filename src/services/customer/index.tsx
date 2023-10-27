import { SignUpInterface } from 'pages/onboarding/SignUp/signUp.model';
import API from '../index';
import {
  customerLoginInterface,
  customerLoginFormInterface,
} from 'pages/onboarding/Login/login.model';

const createCustomer = async (params: SignUpInterface) => {
  const { data } = await API.post(`/customers`, {
    ...params,
  });
  return data;
};

const customerLogin = async (params: customerLoginFormInterface) => {
  const { data } = await API.post(`/auth/login/`, {
    username: params.email,
    password: params.password,
  });
  return data;
};

const customerService = { createCustomer, customerLogin };

export default customerService;
