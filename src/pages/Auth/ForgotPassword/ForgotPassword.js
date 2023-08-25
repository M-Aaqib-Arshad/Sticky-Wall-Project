import React, { useState } from 'react'
import { Button, Divider, Form, Input, Typography, message } from 'antd'
import { auth } from 'config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'


const { Title } = Typography

const ForgotPassword = () => {

  const [state, setState] = useState({ email: "", password: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const { email, password } = state
  const handleForgot = e => {
    e.preventDefault()


    setIsProcessing(true)
    sendPasswordResetEmail(auth, email,{url:"http://localhost:3000"})
    .then(() => {
      return message.success("Please check your Email. An email is sent to your mail.")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorcode', errorCode)
      setIsProcessing(false)
      if(errorCode === "auth/user-not-found"){
        return message.error("User does not exist.")
      }
      message.error("Something went wrong with sending Email.")
      
    })
    .finally(() => {
      setIsProcessing(false)
      })
  }
  return (
    <>
      <main className='auth'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="card my-4 p-md-4">
                <div className="card-body">
                  <Title level={2} className='m-0 text-center'>Forgot Password</Title>

                  <Divider />

                  <Form layout="vertical" >
                    <Form.Item label="Email" className='my-5'>
                      <Input size='large' placeholder='Enter the email' name='email' onChange={handleChange} />
                    </Form.Item>


                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleForgot}>Send Email</Button>
                  </Form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


    </>
  )
}

export default ForgotPassword