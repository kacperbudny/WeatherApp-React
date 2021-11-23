import React, { useCallback, useEffect, useRef } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<Props> = ({ message, onClose }) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

  const closeNotification = useCallback(() => {
    clearTimeout(timeoutRef.current);
    notificationRef.current!.style.bottom = "-100px";
    setTimeout(() => {
      onClose();
    }, 500);
  }, [onClose]);

  useEffect(() => {
    const showNotification = () => {
      setTimeout(() => {
        notificationRef.current!.style.bottom = "0px";
      }, 0);

      timeoutRef.current = window.setTimeout(() => {
        closeNotification();
      }, 5000);
    };

    showNotification();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [closeNotification]);

  return (
    <>
      <div className="notification" ref={notificationRef}>
        <h6>Oops!</h6>
        <p>{message}</p>
        <button className="close-button" onClick={closeNotification}>
          X
        </button>
      </div>
    </>
  );
};

export default Notification;
