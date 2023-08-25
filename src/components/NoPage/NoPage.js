import React from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function NoPage() {
  return (
    <> <div className="container h-100">
    <div className="row justify-content-center align-items-center h-100">

  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary"><Link to="/" className='text-decoration-none'>Back Home</Link></Button>}
  />

    </div>
  </div></>
  )
}
