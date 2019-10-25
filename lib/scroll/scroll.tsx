import * as React from 'react';
import {HTMLAttributes, useEffect, useRef, useState} from 'react';
import './scroll.scss';
import scrollbarWidth from './scrollbar-width';
import {UIEventHandler} from 'react';
import {MouseEventHandler} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;
  const [barHeight, setBarHeight] = useState(0);
  const [barTop, _setBarTop] = useState(0);
  const setBarTop = (number: number) => {
    if (number < 0) {return;}
    const {current} = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight;
    if (number > maxBarTop) {return;}
    _setBarTop(number);
  };
  const onScroll: UIEventHandler = (e) => {
    const {current} = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const scrollTop = current!.scrollTop;
    setBarTop(scrollTop * viewHeight / scrollHeight);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => { // mounted 的时候算滚动条高度
    const scrollHeight = containerRef.current!.scrollHeight;
    const viewHeight = containerRef.current!.getBoundingClientRect().height;
    setBarHeight(viewHeight * viewHeight / scrollHeight);
  }, []);

  const draggingRef = useRef(false);
  const firstYRef = useRef(0);
  const firstBarTopRef = useRef(0);
  const onMouseDownBar: MouseEventHandler = (e) => {
    draggingRef.current = true;
    firstYRef.current = e.clientY;
    firstBarTopRef.current = barTop;
  };
  const onMouseMoveBar = (e: MouseEvent) => {
    if (draggingRef.current) {
      const delta = e.clientY - firstYRef.current;
      const newBarTop = firstBarTopRef.current + delta;
      setBarTop(newBarTop);
      const scrollHeight = containerRef.current!.scrollHeight;
      const viewHeight = containerRef.current!.getBoundingClientRect().height;
      containerRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight;
    }
  };
  const onMouseUpBar = () => {
    draggingRef.current = false;
  };
  const onSelect = (e: Event) => {
    if (draggingRef.current) {e.preventDefault();}
  };
  useEffect(() => {
    document.addEventListener('mouseup', onMouseUpBar);
    document.addEventListener('mousemove', onMouseMoveBar);
    document.addEventListener('selectstart', onSelect);
    return () => {
      document.removeEventListener('mouseup', onMouseUpBar);
      document.removeEventListener('mousemove', onMouseMoveBar);
      document.removeEventListener('selectstart', onSelect);
    };
  }, []);
  return (
    <div className="fui-scroll" {...rest}>
      <div className="fui-scroll-inner" style={{right: -scrollbarWidth()}}
           ref={containerRef}
           onScroll={onScroll}>
        {children}
      </div>
      <div className="fui-scroll-track">
        <div className="fui-scroll-bar" style={{height: barHeight, transform: `translateY(${barTop}px)`}}
             onMouseDown={onMouseDownBar}
        />
      </div>
    </div>
  );
};
export default Scroll;