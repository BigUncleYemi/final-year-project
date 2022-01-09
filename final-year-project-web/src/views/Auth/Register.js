import { Form, Input, Button, Radio } from 'antd';
import { connect } from 'react-redux';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../asset/scss/App.scss';
import config from '../../config/AppConfig';
import { signup } from '../../redux/actions/auth';

const rules = {
  name: [
		{ 
			required: true,
			message: 'Please input your name'
		},
  ],
	email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
	confirm: [
		{ 
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	]
};

function Register(props) {
  const {
    signup,
    loading
  } = props;
  const [form] = Form.useForm();
  const onSubmit = () => {
    form.validateFields().then(values => {
      signup(values);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };
  return (
    <div className="Auth">
      <div className="Auth-Container">
        <div className="Auth-Container-form">
          <div className="Auth-Container-form_name">
            <Link to="/"><h1 className="rc">{config.AppName}</h1></Link>
            {/* <p>Register</p> */}
          </div>
          <Form
            name="register-form"
            onFinish={onSubmit}
            form={form}
            layout="vertical"
          >
            <Form.Item 
              name="name" 
              label="Name" 
              rules={rules.name}
              hasFeedback
            >
              <Input prefix={<UserOutlined className="text-primary" />}/>
            </Form.Item>
            <Form.Item 
              name="email" 
              label="Email" 
              rules={rules.email}
              hasFeedback
            >
              <Input prefix={<MailOutlined className="text-primary" />}/>
            </Form.Item>
            <Form.Item 
              name="password" 
              label="Password" 
              rules={rules.password}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined className="text-primary" />}/>
            </Form.Item>
            <Form.Item 
              name="confirm" 
              label="ConfirmPassword" 
              rules={rules.confirm}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined className="text-primary" />}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Sign Up
              </Button>
            </Form.Item>
            Or <Link to="/login">login now!</Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  const {
    loading, error,
  } = auth;
  return {
    loading,
    error,
  };
};

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
