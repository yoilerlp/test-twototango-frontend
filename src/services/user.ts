import { getErrorMsgFromResponse } from '@/helpers/error';
import { ServiceErrorResponse, ServiceResponse } from '@/interfaces/api';
import { User } from '@/interfaces/user';
import { API_URL } from '@/utils/api';

export const CreateUser = async (
  data: User
): Promise<ServiceResponse<User>> => {
  try {
    const response = await fetch(`${API_URL}/users`, {
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

