"use client";

import "./toast.css";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";

import getKeydownEvent from "@/libs/eventHandlers/getKeydownEvent";
import { DEFAULT_TOAST_AUTODISMISS, DEFAUL_TOAST_TIMEOUT } from "@/constants";

import { IoCloseSharp } from "react-icons/io5";

import { Context, ToastMessage } from "./types";

const ToastContainerContext = createContext<Context | undefined>(undefined);

export function useToastContainer() {
  const context = useContext(ToastContainerContext);
  if (!context)
    throw new Error(
      "useToastContainer must be used within ToastContainerProvider",
    );

  return context;
}

const Toast: React.FC<{ toast: ToastMessage }> = ({ toast }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [isShowToast, setIsShowToast] = useState(false);
  const [remainingTimePercentage, setRemainingTimePercentage] = useState(100);
  const { removeToast } = useToastContainer();

  const autoDismiss = toast.autoDismiss ?? DEFAULT_TOAST_AUTODISMISS;
  const timeOut = toast.timeOut ?? DEFAUL_TOAST_TIMEOUT;

  const closeToast = () => {
    setIsShowToast(false);

    toastRef.current?.addEventListener("transitionend", () => {
      removeToast(toast);
    });
  };
  const closeOnKeydown = getKeydownEvent(closeToast);

  useEffect(() => {
    setIsShowToast(true);
    if (autoDismiss && timeOut > 0) {
      const startTime = Date.now();

      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, timeOut - elapsedTime);
        setRemainingTimePercentage((remainingTime / timeOut) * 100);

        if (remainingTime <= 0) closeToast();
      }, 100);

      return () => {
        toastRef.current?.removeEventListener("transitionend", () => {
          removeToast(toast);
        });

        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <div
      ref={toastRef}
      className={`${isShowToast ? "show toast" : "toast"}`}
      data-type={toast.type}
      role="alert"
      aria-live="polite"
      aria-atomic
      aria-hidden={!isShowToast}
      tabIndex={-1}
    >
      <div
        className="timer"
        style={{ height: `${remainingTimePercentage}%` }}
        aria-hidden
      />
      <div className="text">{toast.text}</div>

      <div
        role="button"
        tabIndex={0}
        className="close"
        onClick={closeToast}
        onKeyDown={closeOnKeydown}
        aria-label="Close toast"
      >
        <IoCloseSharp className="size-[22px]" />
      </div>
    </div>
  );
};

export function ToastContainerProvider({
  children,
  position = "top-right",
  latestMessageFirst = true,
}: Readonly<{
  children: React.ReactNode;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  latestMessageFirst?: boolean;
}>) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: ToastMessage) => {
    if (latestMessageFirst) setToasts((prev) => [toast, ...prev]);
    else setToasts((prev) => [...prev, toast]);
  };

  const removeToast = (toast: ToastMessage) => {
    setToasts((prev) =>
      prev.filter((currentToast) => currentToast.id !== toast.id),
    );
  };

  const contextValue = useMemo(() => ({ addToast, removeToast }), []);

  return (
    <ToastContainerContext.Provider value={contextValue}>
      {toasts.length > 0 && (
        <div className="toast-container" data-position={position}>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} />
          ))}
        </div>
      )}

      {children}
    </ToastContainerContext.Provider>
  );
}
