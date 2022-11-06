import { toast } from 'react-toastify';
import {
  ErrorOutline,
  CheckCircleOutline,
  WarningAmber,
} from '@mui/icons-material';

export const notifyError = ({ message }: { message: string }) => {
  toast.error(message, {
    position: toast.POSITION.TOP_LEFT,
    theme: 'colored',
    icon: () => <ErrorOutline />,
    toastId: 'error-toast',
  });
};

export const notifySuccess = ({ message }: { message: string }) => {
  toast.success(message, {
    position: toast.POSITION.TOP_LEFT,
    theme: 'colored',
    icon: () => <CheckCircleOutline />,
    toastId: 'success-toast',
  });
};
export const notifyWarning = ({ message }: { message: string }) => {
  toast.warning(message, {
    position: toast.POSITION.TOP_LEFT,
    theme: 'colored',
    icon: () => <WarningAmber />,
    toastId: 'warning-toast',
  });
};
