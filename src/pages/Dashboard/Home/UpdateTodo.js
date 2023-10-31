import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Typography, message } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'

const { Title } = Typography

const initialState = { title: "", location: "", date: "", description: "" }

export default function UpdateTodo() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setState(s => ({ ...s, date }))

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const todo = todos.find(todo => todo.id === params.id)
    setState(todo)

  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    let { title, location, date, description, status } = state

    if (!title) { return message.error("Please enter title") }

    const todo = {
      ...state,
      title, location, date, description, status,
      dateModified: new Date().getTime(),
    }

    setIsProcessing(true)

    const todos = JSON.parse(localStorage.getItem("todos")) || []

    const updatedTodos = todos.map((oldTodo) => {
      if (oldTodo.id === todo.id)
        return todo
      return oldTodo
    })

    setTimeout(() => {
      setIsProcessing(false)
      localStorage.setItem("todos", JSON.stringify(updatedTodos))
      message.success("A new todo added successfully")
      navigate("/")
    }, 2000)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Update Todo</Title>

              <Divider />

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Title">
                      <Input placeholder='Input your title' name='title' value={state.title} onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Location">
                      <Input placeholder='Input your location' name='location' value={state.location} onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Date">
                      <DatePicker className='w-100' value={state.date ? dayjs(state.date) : ""} onChange={handleDate} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Status">
                      <Select value={state.status} onChange={status => setState(s => ({ ...s, status }))}>
                        {["active", "inactive"].map((status, i) => {
                          return <Select.Option key={i} value={status}>{status}</Select.Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Description">
                      <Input.TextArea placeholder='Input your description' name='description' value={state.description} onChange={handleChange} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Update Todo</Button>
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
