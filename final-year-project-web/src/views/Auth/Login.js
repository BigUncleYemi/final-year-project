import { Form, Input, Button, Col } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import '../../asset/scss/App.scss';
import config from '../../config/AppConfig';
import { signin } from '../../redux/actions/auth';
import React from 'react';

function Login(props) {
  const {
    signin,
    loading
  } = props;
  const [form] = Form.useForm();
  const onSubmit = () => {
    form.validateFields().then(values => {
      signin(values);
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
          </div>
          <Form
            name="login-form"
            onFinish={onSubmit}
            form={form}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              type="email"
              hasFeedback
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email" prefix={<MailOutlined className="text-primary" />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              hasFeedback
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined className="text-primary" />} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Log In
              </Button>
            </Form.Item>
            Or <Link to="/register">register now!</Link>
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
  signin,
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Login));
