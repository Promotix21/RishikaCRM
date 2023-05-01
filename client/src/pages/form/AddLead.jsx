import React,{useState} from 'react'
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import {Col,Form,Row,Stack,Card,Alert} from 'react-bootstrap';
import { clearAlert,Success } from '../../components/Alert';
import { showLoading,hideLoading } from '../../features/alertSlice';
import { addLead } from '../../services/LeadAPI';
import { useSelector,useDispatch } from 'react-redux';

const AddLead = () => {

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)

  
  const handleSubmit =async (e)=>{
      e.preventDefault();
      const data = new FormData(e.currentTarget)
      data.append('incharge',user.name)
      data.append('incharge_email',user.email)
      const actualData = {
          name: data.get('name'),
          email: data.get('email'),
          incharge:data.get('incharge'),
          incharge_email:data.get('incharge_email'),
          phoneNumber: data.get('phone'),
          dateOfVisit:data.get('dateofvisit'),
          status: data.get('status'),
          comment:data.get('comment'),
        }
        //console.log(actualData)

        if (actualData.name && actualData.email && actualData.phoneNumber && actualData.dateOfVisit && actualData.status && actualData.comment) {
          dispatch(showLoading());
          const res = await addLead(actualData)
          dispatch(hideLoading());
          if(res.data.status==="success"){
              //setError({ status: true, msg: res.data.message, type: 'success' })
              Success(res.data.message)
              handleReset()
              //clearAlert(setError)
            }
            if(res.data.status==='failed'){
              setError({ status: true, msg: res.data.message, type: 'danger' })
            }
        } else {
          setError({ status: true, msg: "All Fields are Required", type: 'danger' })
          clearAlert(setError)
        }
      }
     

      const handleReset = ()=>{
          document.getElementById('Lead-insert-form').reset()
          setError(
              {
                  status:false,
                  msg:'',
                  type:''
              }
          )
      }


  return (
    <Layout>
      
    <Stack className='m-1'>
    <Card className="p-2 m-1 card">
      <Card.Body>
      <Header title="Add Lead"/>
      <Form onSubmit={handleSubmit} id="Lead-insert-form">
      <Row>
        <Form.Group as={Col}  xs={12} sm={6} lg={4} className="mb-4">
          <Form.Label >Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" id="name" name="name"/>
        </Form.Group>
        <Form.Group as={Col}    xs={12} sm={6} lg={4} className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" name="email" />
        </Form.Group>

        <Form.Group as={Col}  xs={12} sm={6} lg={4} className="mb-4">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder="Phone number" id="phone" name="phone"/>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} xs={12} sm={6} lg={4} className="mb-4">
          <Form.Label>Date Of Visit</Form.Label>
          <Form.Control type='date' id="dateofvisit" name="dateofvisit"/>
        </Form.Group>
        <Form.Group as={Col} xs={12} sm={6} lg={4} className="mb-4">
          <Form.Label>Status</Form.Label>
          <Form.Select defaultValue="open" id="status" name="status">
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="close">Close</option>
          </Form.Select>
        </Form.Group>

      </Row>

      <Row>
        <Form.Group as={Col} xs={12} sm={6} lg={4}>
            <Form.Label>Comments</Form.Label>
            <Form.Control as="textarea" rows={3} id="comment" name="comment"/>
        </Form.Group>
        <Col>
        <Stack direction="horizontal" className="mt-4"  gap={3} xs={12} sm={6} lg={4}>
                <button className='main-btn mt-2' type='submit'>Submit</button>
                <button className='main-btn mt-2' type='button' onClick={handleReset}>Clear</button>
        </Stack>
        </Col>
        <Col className='mt-3'>{error.status ? <Alert variant={error.type}>{error.msg}</Alert> : ''}</Col>
      </Row>
    </Form>
      </Card.Body>
    </Card>
    </Stack>
    </Layout>
  )
}

export default AddLead