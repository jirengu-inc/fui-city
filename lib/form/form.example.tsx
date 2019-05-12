import * as React from 'react';
import Form, {FormValue} from './form';
import {useState, Fragment} from 'react';
import Validator, {noError} from './validator';
import Button from '../button/button';

const usernames = ['frank', 'jack', 'alice', 'bob'];
const checkUserName = (username: string, succeed: () => void, fail: () => void) => {
  setTimeout(() => {
    console.log('我现在知道用户名是否存在');
    if (usernames.indexOf(username) >= 0) {
      fail();
    } else {
      succeed();
    }
  }, 2000);
};

const FormExample: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: 'frank',
    password: ''
  });
  const [fields] = useState([
    {name: 'username', label: '用户名', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}},
  ]);
  const [errors, setErrors] = useState({});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 8, maxLength: 16},
      {
        key: 'username', validator: {
          name: 'unique',
          validate(username: string) {
            console.log('有人调用 validate 了！');
            return new Promise<void>((resolve, reject) => {
              checkUserName(username, resolve, reject);
            });
          }
        }
      },
      {key: 'username', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true},
    ];
    Validator(formData, rules, (errors) => {
      console.log('errors');
      console.log(errors);
      setErrors(errors);
      console.log('确定 set 了');
      if (noError(errors)) {
        // 没错
      }
    });
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