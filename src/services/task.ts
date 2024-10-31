import {
  PaginatedData,
  ServiceErrorResponse,
  ServiceResponse,
  ServiceResponsePaginated,
} from '@/interfaces/api';
import { CreateTaskSchema } from '@/schemas/taskSchema';
import { Task, TaskStatus } from '@/interfaces/task';
import { API_URL } from '@/utils/api';
import { getErrorMsgFromResponse } from '@/helpers/error';
import { getTokenFromLocalStorage } from '@/helpers/token';

export const CreateTask = async (
  data: CreateTaskSchema
): Promise<ServiceResponse<Task>> => {
  try {
    const token = getTokenFromLocalStorage();

    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: ServiceResponse<Task> = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error) {
    const errorMsg = getErrorMsgFromResponse(error as ServiceErrorResponse);
    throw new Error(errorMsg);
  }
};

export const GetAllTasks = async (params: {
  page?: number;
  status?: TaskStatus;
}): Promise<PaginatedData<Task>> => {
  try {
    const token = getTokenFromLocalStorage();

    const query = new URLSearchParams({
      page: params.page?.toString() || '1',
      ...(params.status && { status: params.status }),
    }).toString();

    const response = await fetch(`${API_URL}/tasks?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponsePaginated<Task> = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error) {
    const errorMsg = getErrorMsgFromResponse(error as ServiceErrorResponse);
    throw new Error(errorMsg);
  }
};

export const UpdateTask = async (
  data: Partial<Pick<Task, 'id' | 'title' | 'description' | 'status'>>
): Promise<ServiceResponse<Task>> => {
  try {
    const token = getTokenFromLocalStorage();

    const { id, ...valuesToUpdate } = data;
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(valuesToUpdate),
    });

    const responseData: ServiceResponse<Task> = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error) {
    const errorMsg = getErrorMsgFromResponse(error as ServiceErrorResponse);
    throw new Error(errorMsg);
  }
};

export const DeleteTask = async (id: string) => {
  try {
    const token = getTokenFromLocalStorage();

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<{
      task: Task;
      message: string;
    }> = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error) {
    const errorMsg = getErrorMsgFromResponse(error as ServiceErrorResponse);
    throw new Error(errorMsg);
  }
};

