import React, { useState } from 'react'
import { Button, Divider, Form, Input, Typography, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAuthContext } from 'contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'
import { Link } from 'react-router-dom'

const { Title } = Typography

export default function Login() {

  const { readUserProfile } = useAuthContext()
  const [state, setState] = useState({ email: "", password: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const { email, password } = state
  const handleLogin = e => {
    e.preventDefault()


    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        readUserProfile(user)
      })
      .catch(err => {
        message.error("Something went wrong while signing user")
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Login</Title>

              <Divider />

              <Form layout="vertical">
                <Form.Item label="Email">
                  <Input placeholder='Enter your email' name='email' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Password">
                <Input.Password
                        placeholder="Write Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        name='password' onChange={handleChange} value={password}
                      />
                </Form.Item>
                <div className='row my-3'>
                  <p className='text-end mb-0 me-2'><Link to="/auth/forgot-password" className="btn-link">Forgot Password?</Link></p>
                </div>

                <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleLogin}>Login</Button>
              </Form>
              <div className='row my-3'>
                  <p className='text-center mb-0'>Not Registered? <Link to="/auth/register" className="btn-link">Register</Link></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
