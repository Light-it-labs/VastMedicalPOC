import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export const toastIcons = {
  info: <InformationCircleIcon className="text-blue-400 h-6 w-6" />,
  success: <CheckCircleIcon className="text-green-400 h-6 w-6" />,
  warning: <ExclamationCircleIcon className="text-yellow-400 h-6 w-6" />,
  error: <XCircleIcon className="text-red-400 h-6 w-6" />,
};
