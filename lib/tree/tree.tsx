import React from 'react';
import './tree.scss';
import TreeItem from './tree-item';


const Tree: React.FC<TreeProps> = (props) => {
  return (
    <div>
      {props.sourceData?.map(item =>
        <TreeItem key={item.value} treeProps={props} item={item} level={1}/>
      )}
    </div>
  );
};

export default Tree;
