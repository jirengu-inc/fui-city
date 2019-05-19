import * as React from 'react';
import {HTMLAttributes} from 'react';
import './scroll.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;
  return (
    <div className="fui-scroll" {...rest}>
      <div className="fui-scroll-inner">
        {children}
      </div>
    </div>
  );
};
export default Scroll;