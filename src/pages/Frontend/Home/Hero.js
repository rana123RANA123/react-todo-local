import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, Select, Space, Tooltip, message } from 'antd'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

export default function Hero() {

  const [documents, setDocuments] = useState([])
  const [status, SetStatus] = useState("active")
  const [todo, setTodo] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setTodo(s => ({ ...s, date }))

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    const filteredDocuments = todos.filter(todo => todo.status === status)
    setDocuments(filteredDocuments)
  }, [status])

  const handleEdit = (todo) => {
    console.log('todo', todo)
    setTodo(todo)
    setIsModalOpen(true)
  }
  const handleUpdate = () => {
    let { title, location, date, description } = todo

    if (!title) { return message.error("Please enter title") }

    const updatedTodo = {
      title, location, date, description,
      dateModified: new Date().getTime()
    }

    const updatedTodos = documents.map(oldTodo => {
      if (oldTodo.id === todo.id)
        return updatedTodo
      return oldTodo
    })

    setDocuments(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    message.success("Todo updated successfully")
    setIsModalOpen(false)
  }

  const handleDelete = (todo) => {
    let documentsAfterDelete = documents.filter(doc => doc.id !== todo.id)

    setDocuments(documentsAfterDelete)

    localStorage.setItem("todos", JSON.stringify(documentsAfterDelete))
    message.success("Todo deleted successfully")
  }

  return (
    <>
      <div className='py-5'>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>Todos</h1>
              <Select placeholder="Select status" onChange={status => SetStatus(status)}>
                {["active", "inactive"].map((status, i) => {
                  return <Select.Option key={i} value={status}>{status}</Select.Option>
                })}
              </Select>
            </div>
          </div>
          <Divider />

          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((todo, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{todo.title}</td>
                          <td>{todo.location}</td>
                          <td>{todo.description}</td>
                          <td>{todo.date ? dayjs(todo.date).format("dddd, DD/MM/YYYY") : ""}</td>
                          <td>{todo.status}</td>
                          <td>
                            <Space>
                              <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(todo) }} /></Tooltip>
                              <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/dashboard/todos/${todo.id}`) }} /></Tooltip>
                            </Space>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Update Todo"
        centered
        open={isModalOpen}
        onOk={handleUpdate}
        okText="Confirm"
        cancelText="Close"
        onCancel={() => setIsModalOpen(false)}
        style={{ width: 1000, maxWidth: 1000 }}
      >
        <Form layout="vertical" className='py-4'>
          <Row gutter={16}>
            <Col xs={24} lg={8}>
              <Form.Item label="Title">
                <Input placeholder='Input your title' name='title' value={todo.title} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Location">
                <Input placeholder='Input your location' name='location' value={todo.location} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Date">
                <DatePicker className='w-100' value={todo.date ? dayjs(todo.date) : ""} onChange={handleDate} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description" className='mb-0'>
                <Input.TextArea placeholder='Input your description' name='description' value={todo.description} onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
