import React, { useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Row, Typography, message } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography

const initialState = { title: "", location: "", date: "", description: "" }

export default function Hero() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setState(s => ({ ...s, date }))

  const handleSubmit = e => {
    e.preventDefault()

    let { title, location, date, description } = state

    if (!title) { return message.error("Please enter title") }

    const todo = {
      title, location, date, description,
      status: "active",
      dateCreated: new Date().getTime(),
      id: Math.random().toString(36).slice(2)
    }

    setIsProcessing(true)

    const todos = JSON.parse(localStorage.getItem("todos")) || []

    todos.push(todo)

    setTimeout(() => {
      setIsProcessing(false)
      localStorage.setItem("todos", JSON.stringify(todos))
      message.success("A new todo added successfully")
    }, 2000)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to="/" className='btn btn-primary mb-5'>Go Home</Link>
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Add Todo</Title>

              <Divider />

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Title">
                      <Input placeholder='Input your title' name='title' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Location">
                      <Input placeholder='Input your location' name='location' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Date">
                      <DatePicker className='w-100' onChange={handleDate} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Description">
                      <Input.TextArea placeholder='Input your description' name='description' onChange={handleChange} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Add Todo</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
