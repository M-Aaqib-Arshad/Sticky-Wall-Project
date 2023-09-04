import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, Col, Form, Input, Typography, message } from 'antd';
import { firestore } from '../../../config/firebase';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthContext } from 'contexts/AuthContext';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "components/toolbar/Editor";

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const { Title } = Typography;
const initialState = { fullname: "", email: "", phone: "", address: "", Message: "" }

export default function Contact() {
  const [state, setState] = useState(initialState)
  const [value, setValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { isAuth } = useAuthContext()

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
    // setState({...state,[e.target.name]:e.target.value})  second method
  }

  let { fullname, email, phone, address, Message } = state;


  const handleSubmit = async (e) => {
    e.preventDefault();
    let { fullname, email, phone, address, Message } = state;
    fullname = fullname.trim();
    Message = Message.trim()

    if (fullname.length < 3) {
      return message.error("Please fill the name correctly.")
    }
    if (!window.isEmail(email)) {
      return message.error("Enter the Email correctly!")
    }
    if (Message.length < 10) {
      return message.error("Message contains atleast 10 characters.")
    }
    const formData = {
      fullname, email, phone, address, Message,
      id: window.getRandomId(),
      dateCreated: serverTimestamp()
    }

    setIsProcessing(true)

    if (isAuth) {
      try {
        await setDoc(doc(firestore, "messages", formData.id), formData);
        // console.log("Document written with ID: ", docRef.id);
        message.success("Your message is Successfully send.")
        setState(initialState)
      } catch (e) {
        // console.error("Error adding document: ", e);
        return message.error("Something went wrong, your message doesn't send.")
      }
    }
    else {
      message.error("Please login your account first!")
    }
    setIsProcessing(false)
  }

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="card">

              <div className=" card-body ">
                <Form layout='vertical'>

                  <Title level={2} className='my-4 text-center'>Contact</Title>
                  <div className="row d-flex">
                    <Col xs={24} md={12}>
                      <Form.Item label="Full Name" className=''>
                        <Input placeholder="Your Full Name" value={fullname} name='fullname' onChange={handleChange} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="Email" >
                        <Input placeholder="Your Email" value={email} name='email' onChange={handleChange} />
                      </Form.Item>
                    </Col>
                  </div>
                  <div className="row d-flex">
                    <Col xs={24} md={12}>
                      <Form.Item label="Phone Number">
                        <Input placeholder="Input a number" maxLength={16} name='phone' value={phone} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="Address">
                        <Input placeholder="Your Address" value={address} name='address' onChange={handleChange} />
                      </Form.Item>
                    </Col>
                    <Form.Item label="Message" >
                      <ReactQuill className='custom-react-quill' value={value} onChange={setValue} />
                      {/* <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder="Write your message" value={Message} name='Message' onChange={handleChange} /> */}
                      {/* <Editor
                        editorState={value}
                        // onChange={setValue}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={setValue}
                      /> */}
                    </Form.Item>

                    {/* Full Toolbar  */}
                    {/* <Form.Item label="Message" >
                      <div className="text-editor">
                        <EditorToolbar />
                        <ReactQuill
                         className='custom-react-quill'
                          theme="snow"
                          value={value}
                          onChange={setValue}
                          placeholder={"Write something awesome..."}
                          modules={modules}
                          formats={formats}
                        />
                      </div>
                      

                    </Form.Item> */}
                  </div>

                  <Form.Item>
                    <Button type="primary" htmlType='submit' onClick={handleSubmit} className='w-100' style={{ textAlign: 'center' }} loading={isProcessing}>
                      Send
                    </Button>
                  </Form.Item>

                </Form>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-6" dangerouslySetInnerHTML={{__html:value}}>

                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


