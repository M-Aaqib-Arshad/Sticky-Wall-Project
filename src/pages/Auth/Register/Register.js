import React, { useState } from 'react'
import { Button, Form, Input, Typography, DatePicker, Col, Row, message, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { useAuthContext } from 'contexts/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from 'config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const { Title } = Typography

export default function Register() {

  const { dispatch } = useAuthContext()
  const [state, setState] = useState({
    name: "", username: "", email: "", password: "", confirmPassword: "", address: "", DoB: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const { name, username, email, password, confirmPassword, address } = state

  const handleRegister = e => {
    e.preventDefault();
    if (name.length < 3) {
      return message.error("Please fill the name correctly.")
    }
    if (password !== confirmPassword) {
      return message.error("Password doesn't match.")
    }

    setIsProcessing(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserProfile(user)
      })
      .catch(error => {
        const errorCode = error.code;
        // console.error(err)
        if (errorCode === "auth/email-already-in-use") {
          return message.error("User already exist with this email")
        }
        return message.error("Something went wrong with registration.")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  const createUserProfile = async (user) => {
    const { name, username, address, DoB } = state
    const { email, uid } = user

    const userData = {
      name,username,address, email, uid, DoB,
      dateCreated: serverTimestamp(),
      status: "active",
      roles: ["client"]
    }

    try {
      await setDoc(doc(firestore, "users", uid), userData);
      message.success("A new user has been created successfully")
      dispatch({ type: "SET_LOGGED_IN", payload: { user: userData } })
    } catch (e) {
      message.error("Something went wrong while creating user profile")
      console.error("Error adding document: ", e);
    }
  }

  return (
    <main className='auth'>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-8">
            <div className="card py-5">
              <div className="card-body">

                <Form layout="vertical">
                <Title level={2} className='m-0 text-center'>Register</Title>

                <Divider />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Full Name">
                        <Input placeholder="Your Full Name" name='name' value={name} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="User Name">
                        <Input placeholder="Your User Name" prefix={<UserOutlined />} name='username' value={username} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                  </Row>


                  <Form.Item label="Email">
                    <Input placeholder="Your Email" name='email' value={email} onChange={handleChange} />
                  </Form.Item>


                  <Row gutter={16}>
                    <Col span={12}> <Form.Item label="Password">
                      <Input.Password
                        placeholder="Write Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        name='password' onChange={handleChange} value={password}
                      />
                    </Form.Item>
                    </Col>
                    <Col span={12}> <Form.Item label="Confirm Password">
                      <Input.Password
                        placeholder="Confirm password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        name='confirmPassword' onChange={handleChange} value={confirmPassword}
                      />
                    </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Address">
                    <Input
                      placeholder="Your Address"
                      name='address' onChange={handleChange} value={address}
                    />
                  </Form.Item>

                  <Form.Item label="Date of birth">
                    <DatePicker className='w-100'
                      // name='DoB'
                      //  onChange={handleDate}
                      // value={DoB}
                      onChange={(dateObject, dateString) => { setState(s => ({ ...s, DoB: dateString }))
                       console.log('dateObject', dateObject)}}

                    />
                  </Form.Item>

                  <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleRegister}>Register</Button>
                </Form>
              </div>
              <div className='row'>
                <p className='text-center mb-0'>Already Have an Account? <Link to="/auth/login" className="btn-link">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
