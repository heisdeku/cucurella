import type {AxiosError} from 'axios';
import {showMessage} from 'react-native-flash-message';

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  const description = extractError(error?.response?.data).trimEnd();
  showMessage({
    message: 'Error',
    description,
    type: 'danger',
    duration: 4000,
    icon: 'danger',
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  return showMessage({
    message,
    type: 'danger',
    duration: 4000,
  });
};

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map(item => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map(item => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

export const parseErrorMessage = (e: any) => {
  const ERROR_MSG = e?.response?.data
    ? e?.response?.data?.message
    : e?.response?.message;
  if (e?.response?.status === 400) {
    const IS_TOKEN_EXPIRED = 'Bad authorization or expired token';
    if (ERROR_MSG === IS_TOKEN_EXPIRED) {
    }
  }
  return {message: ERROR_MSG};
};

export const handleError = async (res: any) => {
  const error: any = new Error('An error occurred while fetching the data.');
  // Attach extra info to the error object.
  error.info = await res?.json();
  error.status = res.status;
  throw error;
};

/**
 * Handle error response from our server.
 *
 * @param err The error response from the server.
 * @param message An optional error message to display.
 * @param onError The function to call when the request fails.
 * @returns The error message, if it's not session expired.
 * Void if the error is session expired. This will cause the user to be logged out.
 */
export function handleServerError(
  err: any,
  onError?: (err: string) => void,
  message?: string,
) {
  let errorMessage = 'Unknown error.';

  if (err?.response) {
    errorMessage = err?.response?.data?.message || message || '';
  } else {
    errorMessage = err?.message || message || errorMessage;
  }

  //if the error message is session expired, log the user out.
  if (
    errorMessage === 'SESSION_EXPIRED' ||
    errorMessage === 'INVALID_TOKEN_SUB'
  ) {
    const errmessage = 'Session expired: Please log in again.';
    onError?.(errmessage);
    return errmessage;
  }

  onError?.(errorMessage);
  return errorMessage;
}
