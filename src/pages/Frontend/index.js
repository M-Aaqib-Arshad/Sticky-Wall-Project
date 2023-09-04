import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom'
import { MenuOutlined, PlusOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Input, Divider, message } from 'antd';
import { FaSearch, FaCalendarAlt } from '../../../node_modules/react-icons/fa';
import { AiOutlineBars, AiOutlineDoubleLeft, AiTwotoneWallet } from '../../../node_modules/react-icons/ai';
import { TbLogout } from "../../../node_modules/react-icons/tb";
import ListColor from "../../components/list/list"

import Home from "./Home"
import NoPage from '../../components/NoPage'
import Calendar from './Calendar'
import Upcommings from './Upcommings'
import Today from './Today'
import { useAuthContext } from 'contexts/AuthContext';
import { auth } from 'config/firebase';
import { signOut } from 'firebase/auth';

const { Header, Content, Sider } = Layout;




export const colorDiv = () => {


  return (
    <>
      <div style={{
        background: "red",
        width: "15px",
        height: "15px",
        padding: "0px 15px 0px 0px",
        borderRadius: "4px",
        marginRight: "10px"
      }}>
      </div>
    </>
  )
}
const Hero = () => {
  const { dispatch } = useAuthContext()
  const [tasks, setTasks] = useState([{ icon: DoubleRightOutlined, name: "Upcommings", path: 'upcommings' }, { icon: AiOutlineBars, name: "Today", path: 'today' }, { icon: FaCalendarAlt, name: "Calendar", path: 'calendar' }, { icon: AiTwotoneWallet, name: "Sticky Wall", path: '/' }])

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        message.success("Signout successful")
        dispatch({ type: "SET_LOGGED_OUT" })
      })
      .catch(err => {
        message.error("Signout not successful")
      })
  }

  return (
    <Layout
      style={
        {
          height: "100vh",
          display: "flex",
          justifyContent: "center",



        }}>
      <Layout
        style={
          {
            background: "#fafafa",
            // border: "3px solid green",
            borderRadius: "20px 20px 20px 20px"
          }}>
        <Sider
          style={
            {
              borderRadius: "20px 20px 20px 20px",
              minHeight: "90%",
              margin: "1rem 0 1rem 1rem",
              background: "#F4F4F4"


            }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <div className="row d-flex justify-content-between w-100 ms-1">
            <div className="col-6 mt-2">
              <strong style={
                {
                  color: "#444444",
                  fontFamily: "sans-serif",
                  fontSize: "20px"
                }
              }>Menu</strong>
            </div>
            <div className="col-4 text-end py-2">
              <MenuOutlined />
            </div>
          </div>
          <div className="sider_search mx-3 mt-2">

            <Input className='tranparent' style={{ background: "transparent", border: "none" }} prefix={<FaSearch fill='#B3B3B3' />} placeholder="Search" />
          </div>

          <div
            className="Menu_heading mx-3 mt-3"
            style={
              {
                color: "#585858",
                fontFamily: "sans-serif",
                fontSize: "12px",
                fontWeight: "600"
              }
            }

          >TASKS</div>
          <Menu className='task-menu'
            style={
              {
                // border: "3px solid blue",
                borderRadius: "20px 20px 20px 20px",
                background: "#F4F4F4",
              }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={tasks.map(
              (object, index) => ({
                key: String(index + 1),
                icon: React.createElement(object.icon),
                label: <Link className='text-decoration-none' to={object.path} >{object.name}</Link>,
              }),
            )}
          />
          <Divider />
          <div
            className="Menu_heading mx-3 mt-3"
            style={
              {
                color: "#585858",
                fontFamily: "sans-serif",
                fontSize: "12px",
                fontWeight: "600"
              }
            }

          >LISTS</div>
          <Menu
            className='task-menu'
            style={
              {
                // border: "3px solid blue",
                borderRadius: "20px 20px 20px 20px",
                background: "#F4F4F4",
              }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={[{ icon: AiOutlineDoubleLeft, name: "Personal", listColor: "#FE6B69" }, { icon: AiOutlineBars, name: "Work", listColor: '#55D8ED' }].map(
              (object, index) => ({
                key: String(index + 1),
                icon: <ListColor Color={object.listColor} />,
                // icon: React.createElement(colorDiv),
                label: object.name,
              }),
            )}
          />
          <Menu
            className='task-menu'
            style={
              {
                // border: "3px solid blue",
                borderRadius: "20px 20px 20px 20px",
                background: "#F4F4F4",
              }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={[{ icon: PlusOutlined, name: "ADD NEW LIST" }].map(
              (object, index) => ({
                key: String(index + 1),
                icon: React.createElement(PlusOutlined),
                label: object.name,
              }),
            )}
          />
          <Divider />

          <Menu
            className='task-menu'
            style={
              {
                // border: "3px solid blue",
                borderRadius: "20px 20px 20px 20px",
                background: "#F4F4F4",
              }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={[{ icon: TbLogout, name: "Sign out" }].map(
              (object, index) => ({
                key: String(index + 1),
                icon: React.createElement(object.icon),
                label: <button className='btn bg-transparent text-danger' onClick={handleLogout}> {object.name}</button>,
                style: {
                  color: "red",
                  fontFamily: 'sans-serif',
                  fontWeight: '500',
                  margin: '70px 0 0 0'
                },


              }),
            )}
          />

        </Sider>
        <Layout
          style={
            {
              background: "transparent",
              // border: "1px solid grey",
              borderRadius: "20px 20px 20px 20px",
              margin: "1% 0px",


            }}
        >
          <Header
            style={{
              padding: 0,
              background: "transparent",
              borderRadius: "20px 20px 20px 20px",
              fontFamily: "sans-serif",
              fontSize: "48px",
              fontWeight: "600",
              margin: '10px 24px 16px 16px',


            }}

          >Sticky Wall</Header>
          <Content
            style={{
              margin: '24px 16px 0',
              borderRadius: "20px 20px 20px 20px",
              minHeight: "450px",
              background: "transparent"
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: "transparent",
                border: "1px solid grey",
                borderRadius: "20px 20px 20px 20px"


              }}
            >
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='today' element={<Today />} />
                <Route path='upcommings' element={<Upcommings />} />
                <Route path='calendar' element={<Calendar />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </div>
          </Content>

        </Layout>

      </Layout>
    </Layout >
  );
};
export default Hero;
