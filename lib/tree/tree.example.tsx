import React, {useState} from 'react';
import Tree, {SourceDataItem} from './tree';

const TreeExample: React.FC = (props) => {
  const [array] = useState([{
    text: '1',
    value: '1',
    children: [
      {
        text: '1.1', value: '1.1',
        children: [
          {text: '1.1.1', value: '1.1.1'},
          {text: '1.1.2', value: '1.1.2'},
        ]
      },
      {text: '1.2', value: '1.2'},
    ]
  }, {
    text: '11',
    value: '11',
  }, {
    text: '2',
    value: '2',
    children: [
      {text: '2.1', value: '2.1'},
      {text: '2.2', value: '2.2'},
    ]
  }]);
  const [selectedValues, setSelectedValues] = useState(['1.1.1', '1.1.2']);
  const [selectedValue] = useState('11');
  const onChange = (item: SourceDataItem, bool: boolean) => {
    if (bool) {
      setSelectedValues([...selectedValues, item.value]);
    } else {
      setSelectedValues(selectedValues.filter(value => value !== item.value));
    }
  };
  return (
    <div>Tree
      <h1>展示数据</h1>
      selectedValue: {selectedValue}
      <div style={{width: 200}}>
        <Tree sourceData={array}
              onChange={onChange}
              selected={selectedValue}
        />
      </div>
    </div>
  );
};

export default TreeExample;
