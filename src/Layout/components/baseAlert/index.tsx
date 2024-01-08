import React, { FC, useEffect, useState, useRef } from 'react';
import { Alert, IconButton, Collapse, AlertTitle } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import './index.less';
interface Props {
  type: AlertColor;
  icon?: React.ReactNode;
  title?: string;
  content: string;
  delay?: number;
}
const BaseAlert: FC<Props> = (props: Props) => {
  const { type, title, content, delay = 0 } = props;
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
    <Collapse
      in={isShow}
      sx={{
        width: '100%',
        position: 'absolute',
        zIndex: 1,
      }}>
      <Alert
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}>
            <CloseIcon fontSize="inherit" />({seconds} s)
          </IconButton>
        }>
        {title && <AlertTitle>{title}</AlertTitle>}
        {content}
      </Alert>
    </Collapse>
  );
};
export default BaseAlert;
