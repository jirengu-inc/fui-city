import * as React from 'react';
import Form from './form';
import {useState, Fragment} from 'react';


const FormExample: React.FunctionComponent = () => {
  const [formData] = useState({
    username: '',
    password: ''
  });
  const [fields] = useState([
    {name: 'username', label: '用户名', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}},
  ]);
  return (
    <Form value={formData} fields={fields}
          buttons={
            <Fragment>
              <button type="submit">提交</button>
              <button>返回</button>
            </Fragment>
          }
    />
  );
};

export default FormExample;