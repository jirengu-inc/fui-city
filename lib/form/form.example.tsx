import * as React from 'react';
import Form, {FormValue} from './form';
import {useState, Fragment} from 'react';
import Validator, {noError} from './validator';
import Button from '../button/button';


const FormExample: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: 'frank',
    password: ''
  });
  const [fields] = useState([
    {name: 'username', label: '营业执照号码', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}},
  ]);
  const [errors] = useState({});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 8, maxLength: 16},
      {key: 'username', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true},
    ];
    const errors = Validator(formData, rules);
    console.log(errors);
    if (noError(errors)) {
      // 没错
    }
  };
  return (
    <div>
      <Form value={formData}
            fields={fields}
            buttons={
              <Fragment>
                <Button type="submit" level="important">提交</Button>
                <Button>返回</Button>
              </Fragment>
            }
            errors={errors}
            onChange={(newValue) => setFormData(newValue)}
            onSubmit={onSubmit}
      />
    </div>
  );
};

export default FormExample;