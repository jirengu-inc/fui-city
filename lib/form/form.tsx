import * as React from 'react';
import {ReactFragment} from 'react';
import Input from '../input/input';
import classes from '../helpers/classes';
import './form.scss';

export interface FormValue {
  [K: string]: any
}

interface Props {
  value: FormValue;
  fields: Array<{ name: string, label: string, input: { type: string } }>;
  buttons: ReactFragment;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: (value: FormValue) => void;
  errors: { [K: string]: string[] }
}

const Form: React.FunctionComponent<Props> = (props) => {
  const formData = props.value;
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };
  const onInputChange = (name: string, value: string) => {
    const newFormValue = {...formData, [name]: value};
    props.onChange(newFormValue);
  };
  return (
    <form onSubmit={onSubmit}>
      <table>
        {props.fields.map(f =>
          <tr className={classes('fui-form-tr')} key={f.name}>
            <td className="fui-form-td">
              <span className="fui-form-label">{f.label}</span>
            </td>
            <td className="fui-form-td">
              <Input className="fui-form-input"
                     type={f.input.type}
                     value={formData[f.name]}
                     onChange={(e) => onInputChange(f.name, e.target.value)}
              />
              <div>{props.errors[f.name]}</div>
            </td>
          </tr>
        )}
        <tr className="fui-form-tr">
          <td className="fui-form-td"/>
          <td className="fui-form-td">
            {props.buttons}
          </td>
        </tr>
      </table>
    </form>
  );
};

export default Form;