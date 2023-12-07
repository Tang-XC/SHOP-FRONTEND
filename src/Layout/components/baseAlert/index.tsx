import React, { FC, useEffect, useState, useRef } from 'react';
import { Alert } from 'react-bootstrap';
import './index.less';
interface Props {
  type: string;
  icon?: React.ReactNode;
  title?: string;
  content: string;
  delay?: number;
}
const BaseAlert: FC<Props> = (props: Props) => {
  const { type, icon, title, content, delay = 0 } = props;
  const [isShow, setIsShow] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(delay / 1000);
  const intervalRef = useRef<number>();
  const handleClose = () => {
    setIsShow(false);
    window.clearInterval(intervalRef.current);
  };
  useEffect(() => {
    if (delay > 0) {
      setSeconds(delay / 1000);
      setIsShow(true);
      intervalRef.current = window.setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 1) {
            return prevSeconds - 1;
          } else {
            setIsShow(false);
            window.clearInterval(intervalRef.current);
            return 0;
          }
        });
      }, 1000);
    }
    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [props]);
  return (
    <div className="baseAlert">
      <Alert variant={type} show={isShow} dismissible onClose={handleClose}>
        {title && (
          <Alert.Heading>
            {icon && icon}
            &nbsp;
            {title}
          </Alert.Heading>
        )}
        <p className="m-0">
          {icon && !title && icon}
          &nbsp;
          {content}
        </p>
        <div className="alert-seconds-tip">({seconds} s)</div>
      </Alert>
    </div>
  );
};
export default BaseAlert;
