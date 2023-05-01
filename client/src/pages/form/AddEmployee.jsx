import React,{useState} from 'react'
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import {Col,Form,Row,Stack,Card,Alert} from 'react-bootstrap';
import { showLoading,hideLoading } from '../../features/alertSlice';
import { useDispatch } from 'react-redux';

import { addNewEmployee } from '../../services/userAuthAPI';
import { clearAlert,Error, Success } from '../../components/Alert';
const AddEmployee = () => {


  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const dispatch = useDispatch();


  const handleSubmit= async(e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const actualData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        confirm_password: data.get('confirm_password'),
        isAdmin:data.get('isAdmin'),
      }
      if (actualData.name && actualData.email && actualData.password && actualData.confirm_password) {
        if (actualData.password === actualData.confirm_password) {
          try {
            dispatch(showLoading())
            const res = await addNewEmployee(actualData);
            dispatch(hideLoading())
            //console.log(res)
            if (res.data.status==="success") {
              setError({ status: true, msg: res.data.message, type: 'success' })
              handleClear()
              Success(res.data.message)
            }
            if(res.data.status==="failed"){
              setError({ status: true, msg: res.data.message, type: 'danger' })
              clearAlert(setError)
            }
          } catch (error) {
              //console.log("something went wrong")
              Error("Network Error ")

          }
          
        } else {
          setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'danger' })
          clearAlert(setError)
        }
      } else {
        setError({ status: true, msg: "All Fields are Required", type: 'danger' })
        clearAlert(setError)
      }
  }

  const handleClear = ()=>{
    document.getElementById("add-emp-form").reset();
    setError({ status: false, msg:'', type: '' })

  }


  return (
    <Layout>
      
      <Stack className="m-1">
    
    <Card className="p-2 m-1 card"> 
      <Card.Body>
      <Header title="Add New Employee"/>
      <Form  autoComplete='off' id="add-emp-form" onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col}  sm={12} md={6}  className="mb-4">
          <Form.Label >Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" id="name" name="name"/>
        </Form.Group>
        <Form.Group as={Col}    sm={12} md={6}  className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" name="email" autoComplete='off' />
        </Form.Group>

        <Form.Group as={Col}  sm={12} md={6}  className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" name="password"/>
        </Form.Group>
        <Form.Group as={Col}  sm={12} md={6}  className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" id="confirm_password" name="confirm_password"/>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} xs={12} sm={6} lg={4} className="mb-4">
            <Form.Label>Is Admin</Form.Label>
            <Form.Select id="isAdmin" name="isAdmin">
              <option value="false">False</option>
              <option value="true">True</option>
            </Form.Select>
          </Form.Group>
        <Stack direction="horizontal" gap={3}  as={Col}>
                <button className='main-btn' type='submit' >Submit</button>
                <button className='main-btn' type='button' onClick={handleClear}>Clear</button>
        </Stack>
        <Col className='mt-3'>{error.status ? <Alert variant={error.type}>{error.msg}</Alert> : ''}</Col>
      </Row>
    </Form>
      </Card.Body>
    </Card>
    </Stack>
    </Layout>
  )
}

export default AddEmployee