import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, message, DatePicker, ColorPicker, Select } from 'antd';
import dayjs from 'dayjs'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import { firestore } from 'config/firebase'
import ReactQuill from 'react-quill';
import { useAuthContext } from 'contexts/AuthContext';

const initialState = {
  title: "",
  bgColor: "",
  date: "",
  description: ""
}

const Hero = () => {
  const { user } = useAuthContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [state, setState] = useState(initialState)
  const [documents, setDocuments] = useState([])
  const [description, setDescription] = useState("")
  const [list, setList] = useState("Personal") 
  const [cardColor, setCardColor] = useState("#000000") 
  
  // const [description, setDescription] = useState("")

  const handleColor = (val, bgColor) => setState(s => ({ ...s, bgColor }))
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setState(s => ({ ...s, date }))

  const handleEdit = () => {
    console.log('todo')
    setIsModalOpen(true)
  }

  const { title, bgColor, date } = state
  const handleDocument = () => {

    if (!title) { return message.error("Please enter title") }
    if (!bgColor) { return message.error("Please select the background color") }

    const todo = {
      title, bgColor, date, description,
      dateCreated: new Date().getTime(),
      id: Math.random().toString(36).slice(2),
      createdBy:{
        fullName: user.name,
        email: user.email,
        uid: user.uid,
      }
    }
    console.log('addTodo', todo)

    // setDocuments(addTodo)
    // localStorage.setItem("todos", JSON.stringify(addTodo))
    // message.success("Todo updated successfully")
    
    const createDocument = async (todo) => {
      try {
        await setDoc(doc(firestore, "todos", todo.id), todo);
        console.log('todo.id', todo.id)
        setState(initialState)
        setDescription("")
        message.success("A new todo added successfully")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    }
    createDocument(todo)
    setIsModalOpen(false)
  }


  
  const getTodos = async () => {
    const querySnapshot = await getDocs(collection(firestore, "todos"));
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      array.push(data)
    });
    
    setDocuments(array)
  }
  useEffect(()=>{
    getTodos()
  },[documents])
  return (
    <>
      <div className="container">
        <div className="row">
        {
         documents.map((todo,i)=>{
          let bgslice = todo.bgColor.slice(1,2)
       
          
          return(
          <div className="col-md-4 mt-3" key={i}>
            <div className="card h-100" style={{background:todo.bgColor,minHeight:"250px",color:bgslice<=6? "#ffffff": "#000000",
    }} onClick={handleEdit}>
              <h2 className='card-title ps-3 pt-3' >{todo.title}</h2>
              <div className="card-body d-flex align-items-center">

              <div dangerouslySetInnerHTML={{__html:todo.description}}></div>

              </div>
              
            </div>
          </div>
            )
         })
       }
          <div className="col-md-4 mt-3 sticky-wall-card">
            <div className="card" onClick={handleEdit}>
              <div className="card-body d-flex justify-content-center align-items-center">
                <PlusOutlined style={{ fontSize: "40px", textAlign: "center" }} />

              </div>
            </div>
          </div>
          <Modal
            title="Add Todo"
            centered
            open={isModalOpen}
            onOk={handleDocument}
            okText="Confirm"
            cancelText="Close"
            onCancel={() => setIsModalOpen(false)}
            style={{ width: 1000, maxWidth: 1000 }}
          >
            <Form layout="vertical" className='py-4'>
              <Row gutter={16}>
                <Col xs={12}>
                  <Form.Item label="Background Color">

                    <ColorPicker onChange={handleColor}
                      name="bgColor"
                      panelRender={(panel) => (
                        <div className="custom-panel">
                          <div
                            style={{
                              fontSize: 12,
                              color: 'rgba(0, 0, 0, 0.88)',
                              lineHeight: '20px',
                              marginBottom: 8,
                            }}
                          >
                            Color Picker
                          </div>
                          {panel}
                        </div>
                      )}
                    />

                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item label="List" >
                    <Select placeholder="Select status" onChange={status => setList(status)}>
                      {["Personal", "Work"].map((status, i) => {
                        return <Select.Option key={i} value={status}>{status}</Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={16}>
                  <Form.Item label="Title" >
                    <Input placeholder="Title" value={title} name='title' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col xs={8} >
                  <Form.Item label="Date">
                    <DatePicker className='w-100' name='date' value={state.date ? dayjs(state.date) : ""} onChange={handleDate} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Description" className='mb-0'>
                    {/* <Input.TextArea placeholder='Input your description' name='description' value={todo.description} onChange={handleChange} />
                 */}
                    <ReactQuill className='custom-react-quill' value={description} onChange={setDescription} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
      </div>

    </>
  )
}

export default Hero