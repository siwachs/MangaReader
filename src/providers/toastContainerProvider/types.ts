export type ToastMessage = {
  id: string;
  type: "success" | "error" | "warning" | "info";
  text: string;
  autoDismiss?: boolean;
  timeOut?: number;
};

export type Context = {
  addToast: (toast: ToastMessage) => void;
  removeToast: (toast: ToastMessage) => void;
};
