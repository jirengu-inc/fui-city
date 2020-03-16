import React, {ChangeEventHandler, useState} from 'react';
import {scopedClassMaker} from '../helpers/classes';

interface Props {
  item: SourceDataItem;
  level: number;
  treeProps: TreeProps;
}

const scopedClass = scopedClassMaker('fui-tree');
const sc = scopedClass;

const TreeItem: React.FC<Props> = (props) => {
  const {item, level, treeProps} = props;
  const classes = {
    ['level-' + level]: true,
    'item': true
  };
  const checked = treeProps.multiple ?
    treeProps.selected.indexOf(item.value) >= 0 :
    treeProps.selected === item.value;
  const onChange: ChangeEventHandler<{ checked: boolean }> = (e) => {
    if (treeProps.multiple) {
      if (e.target.checked) {
        treeProps.onChange([...treeProps.selected, item.value]);
      } else {
        treeProps.onChange(treeProps.selected.filter(value => value !== item.value));
      }
    } else {
      if (e.target.checked) {
        treeProps.onChange(item.value);
      } else {
        treeProps.onChange('');
      }
    }
  };
  const expand = () => {
    setExpanded(true);
  };
  const collapse = () => {
    setExpanded(false);
  };
  const [expanded, setExpanded] = useState(true);
  return <div key={item.value} className={sc(classes)}>
    <div className={sc('text')}>
      <input type="checkbox" onChange={onChange} checked={checked}/>
      {item.text}
      {item.children &&
      <span onSelect={e => e.preventDefault()}>
          {expanded ?
            <span onClick={collapse}>-</span> :
            <span onClick={expand}>+</span>
          }
        </span>
      }
    </div>
    <div className={sc({children: true, collapsed: !expanded})}>
      {item.children?.map(sub =>
        <TreeItem key={sub.value} item={sub} level={level + 1} treeProps={treeProps}/>
      )}
    </div>
  </div>;
};


export default TreeItem;
