import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext"

const Auth = () => {
  const {login} = useContext(AuthContext)
  const [isError, setIsError] = useState(false)
  const {loading, error, request, clearError} = useHttp()
  const [form] = Form.useForm()

  const onRegister = async (values) => {
    try {
      const data = await request('/api/auth/register', 'POST', values)
      alert(data.message)
    } catch (e) {}
  }

  const onLogin = async () => {
    try {
      const values = await form.validateFields()
      const { token, userId } = await request('/api/auth/login', 'POST', values)
      login(token, userId)
    } catch (e) {}
  }

  useEffect(() => {
    if (error) {
      setIsError(true)
      const timer = setTimeout(() => {
        setIsError(false)
        clearError()
      }, 3000)
      
      return () => clearTimeout(timer) 
    }
  }, [error, clearError])


  return (
    <div className='center'>
      
      <Typography.Title style={{ textAlign: 'center' }}>Сократи ссылку</Typography.Title>
      <Card
      >
        <Form
          form={form}
          name="basic"
          onFinish={onRegister}
          autoComplete="off"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            labelCol={{
              span: 30,
              offset: 12
            }}
          >
            <Button 
              type="primary" 
              style={{ marginRight: 20 }} 
              htmlType="submit"
              disabled={loading}
            >
              Sign up
            </Button>
            <Button 
              type="default"
              htmlType="button"
              onClick={onLogin}
              disabled={loading}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {isError && <Alert message={error} type='error' />}
    </div>
  )
}

export default Auth
