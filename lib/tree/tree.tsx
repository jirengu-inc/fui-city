import React, {ChangeEventHandler} from 'react';
import {scopedClassMaker} from '../helpers/classes';
import './tree.scss';

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}


type Props = {
    sourceData: SourceDataItem[],
    onChange: (values: string[]) => void;
  }
  & ({ selected: string[], multiple: true }
  | { selected: string, multiple?: false })


const scopedClass = scopedClassMaker('fui-tree');
const sc = scopedClass;


const Tree: React.FC<Props> = (props) => {
  const renderItem = (item: SourceDataItem, level = 1) => {
    const classes = {
      ['level-' + level]: true,
      'item': true
    };
    const checked = props.multiple ?
      props.selected.indexOf(item.value) >= 0 :
      props.selected === item.value;
    const onChange: ChangeEventHandler<{ checked: boolean }> = (e) => {
      if (props.multiple) {
        if (e.target.checked) {
          props.onChange([...props.selected, item.value]);
        } else {
          props.onChange(props.selected.filter(value => value !== item.value));
        }
      }
    };
    return <div key={item.value} className={sc(classes)}>
      <div className={sc('text')}>
        <input type="checkbox" onChange={onChange} checked={checked}/>
        {item.text}</div>
      {item.children?.map(sub => {
        return renderItem(sub, level + 1);
      })}
    </div>;
  };
  return (
    <div>
      {props.sourceData?.map(item => {
        return renderItem(item);
      })}
    </div>
  );
};

export default Tree;
