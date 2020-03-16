import React from 'react';
import {scopedClassMaker} from '../helpers/classes';
import './tree.scss';

export interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface Props {
  sourceData: SourceDataItem[],
  selectedValues: string[];
  onChange: (item: SourceDataItem, bool: boolean) => void;
}

const scopedClass = scopedClassMaker('fui-tree');
const sc = scopedClass;

const renderItem = (
  item: SourceDataItem,
  selectedValues: string[],
  onChange: (item: SourceDataItem, bool: boolean) => void,
  level = 1) => {
  const classes = {
    ['level-' + level]: true,
    'item': true
  };
  return <div key={item.value} className={sc(classes)}>
    <div className={sc('text')}>
      <input type="checkbox"
             onChange={(e) => onChange(item, e.target.checked)}
             checked={selectedValues.indexOf(item.value) >= 0}/>
      {item.text}</div>
    {item.children?.map(sub => {
      return renderItem(sub, selectedValues, onChange, level + 1);
    })}
  </div>;
};

const Tree: React.FC<Props> = (props) => {
  return (
    <div>
      {props.sourceData?.map(item => {
        return renderItem(item, props.selectedValues, props.onChange);
      })}
    </div>
  );
};

export default Tree;
