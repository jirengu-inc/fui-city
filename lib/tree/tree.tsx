import React from 'react';

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[]
}

interface Props {
  sourceData: SourceDataItem[]
}

const x = (item: SourceDataItem) => {
  return <div key={item.value}>
    {item.text}
    {item.children?.map(sub => {
      return x(sub);
    })}
  </div>;
};

const Tree: React.FC<Props> = (props) => {
  return (
    <div>
      {props.sourceData?.map(item => {
        return x(item);
      })}
    </div>
  );
};

export default Tree;
