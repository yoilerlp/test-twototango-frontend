import { getErrorMsgFromResponse } from '@/helpers/error';
import { ServiceErrorResponse, ServiceResponse } from '@/interfaces/api';
import { LoginResponse, User } from '@/interfaces/user';
import { API_URL } from '@/utils/api';

export const CreateUser = async (
  data: User
): Promise<ServiceResponse<User>> => {
  try {
    const url = `${API_URL}/user`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData: ServiceResponse<User> = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error) {
    const errorMsg = getErrorMsgFromResponse(error as ServiceErrorResponse);
    throw new Error(errorMsg);
  }
};

export const LoginUser = async (data: {
  email: string;
  password: string;
}): Promise<ServiceResponse<LoginResponse>> => {
  try {
    const url = `${API_URL}/auth/login`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData: ServiceResponse<LoginResponse> = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error) {
    const errorMsg = getErrorMsgFromResponse(error as ServiceErrorResponse);
    throw new Error(errorMsg);
  }
};

