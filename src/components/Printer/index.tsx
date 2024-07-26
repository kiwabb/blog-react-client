import React, {useEffect, useRef, useState} from "react";

interface PrinterProps {
  printerInfo: string;
  duration?: number;
  delay?: number;
  working?: boolean;
  once?: boolean;
}

const Printer: React.FC<PrinterProps> = ({ printerInfo, duration = 200, delay = 3000, working = true, once = false }) => {
  const [content, setContent] = useState("");
  const [cursor, setCursor] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [print, setPrint] = useState(true);
  const cursorRef = useRef(cursor)
  const printerInfoRef = useRef(printerInfo)
  const printRef = useRef(print)
  let printBool = true;
  useEffect(() => {
    console.log("组件挂载", printerInfo);
    if (working) {
      start(work);
    } else {
      //setContent(printerInfo);
    }
    return () => {
      // 在组件卸载时清除定时器
      if (timer) clearInterval(timer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []); // 将printerInfo添加为依赖项


  useEffect(() => {
    printerInfoRef.current = printerInfo;
    toBegin();
  }, [printerInfo, working]);

  useEffect(() => {
    setContent(printerInfo.slice(0, cursor));
  }, [cursor]);

  const toBegin = () => {
    setCursor(0);
    if (timeoutId) clearTimeout(timeoutId);
    if (timer) clearInterval(timer);

    if (working) {
       start(work);
    } else {
      setContent(printerInfo);
    }
  };

  const start = (work: () => void) => {
    console.log("定时器", timeoutId)
    setTimeoutId(setTimeout(() => {
      const timerId = setInterval(() => {
        setTimer(timerId)
        work();
        if (cursorRef.current === 0 || (cursorRef.current === printerInfoRef.current.length && !once)) {
          console.log("停止了", timerId)
          clearInterval(timerId);
          start(work);
        } else if (cursor === printerInfo.length && once) {
          clearInterval(timerId);
        }
      }, duration);
    }, delay));
  };

  const work = () => {
    cursorRef.current += printBool ? 1 : -1;
    if (printBool && cursorRef.current === printerInfoRef.current.length + 1) {
      //cursorRef.current -= 2;
      //printBool = !printBool;
    } else if (printBool && cursorRef.current === -1) {
      //printBool = !printBool;
      //cursorRef.current += 2;
    }
    setCursor(cursorRef.current);
  };


  return (
    <div>
      <h3>
        { content }<span className="cursor">|</span>
      </h3>
    </div>
  );
};

export default Printer;
