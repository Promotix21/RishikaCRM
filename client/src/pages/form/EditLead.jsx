import React,{useState,useEffect} from 'react'
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import { useDispatch } from 'react-redux';
import {Col,Form,Row,Stack,Card,Alert} from 'react-bootstrap';
import { showLoading,hideLoading } from "../../features/alertSlice";
import { getUser,editLead } from '../../services/LeadAPI.js';
import {  useParams,useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Success, clearAlert } from '../../components/Alert';
const EditLead = () => {

    const initialValue = {
        name: '',
        email: '',
        phone: '',
        incharge: '',
        date_of_visit:'',
        status:'',
        comment:'',
    }

    
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })

    const [user, setUser] = useState(initialValue);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate =useNavigate();


    useEffect(() => {
        loadUserDetails();
        document.getElementById("dateofvisit").defaultValue = dayjs(user.date_of_visit).format('YYYY-MM-DD');
    },[user.date_of_visit]);

    const loadUserDetails = async() => {
        const response = await getUser(id);
        setUser(response.data) 
        
    };

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        data.append('incharge',user.incharge)
        const actualData = {
            name: data.get('name'),
            email: data.get('email'),
            incharge:data.get('incharge'),
            phone: data.get('phone'),
            date_of_visit:data.get('dateofvisit'),
            status: data.get('status'),
            comment:data.get('comment'),
          }

          if (actualData.name && actualData.email && actualData.phone && actualData.date_of_visit && actualData.status && actualData.comment) {
            dispatch(showLoading());
            const res = await editLead(id,actualData)
            dispatch(hideLoading());
            if(res.data.status==="success"){
                //setError({ status: true, msg: res.data.message, type: 'success' })
                Success(res.data.message)
                //IS("Updated",res.data.message,navigate)
                //navigate("/all-lead")
              }
              if(res.data.status==='failed'){
                setError({ status: true, msg: res.data.message, type: 'danger' })
                clearAlert(setError)
              }
          } else {
            setError({ status: true, msg: "All Fields are Required", type: 'danger' })
            clearAlert(setError)
          }
        }
         
      
        const handleBack = ()=>{
          navigate("/all-lead")
        }

  return (
    <Layout>
        
        <Stack className="m-1">
                <Card className="p-2 m-1 card">  
                <Card.Body>
                <Header title="Edit Lead"/>
                <Form onSubmit={handleSubmit} id="Lead-insert-form">
                <Row>
                    <Form.Group as={Col}  xs={12} sm={6} lg={4} className="mb-4">
                    <Form.Label >Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" id="name" name="name" defaultValue={user.name}/>
                    </Form.Group>
                    <Form.Group as={Col}    xs={12} sm={6} lg={4} className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="email" name="email" defaultValue={user.email}/>
                    </Form.Group>

                    <Form.Group as={Col}  xs={12} sm={6} lg={4} className="mb-4">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" placeholder="Phone number" id="phone" name="phone" defaultValue={user.phone}/>
                    </Form.Group>
                    
                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={6} lg={4} className="mb-4">
                    <Form.Label>Date Of Visit</Form.Label>
                    <Form.Control type='date' id="dateofvisit" name="dateofvisit"/>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={6} lg={4} className="mb-4">
                    <Form.Label>Status</Form.Label>
                    <Form.Select id="status" name="status" defaultValue={user.status}>
                                <option value={user.status}>{user.status}</option>
                                <option value={user.status==="open" ? "pending" : user.status==="pending" ? "close" :"open"}>{user.status==="open" ? "pending" : user.status==="pending" ? "close" :"open"}
                                </option>
                                <option value={user.status==="open" ? "close" : user.status==="close" ? "pending" :"open"}>
                                {user.status==="open" ? "close" : user.status==="close" ? "pending" :"open"}
                                </option>
                                
                    </Form.Select>
                    </Form.Group>

                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={6} lg={4}>
                        <Form.Label>Comments</Form.Label>
                        <Form.Control as="textarea" rows={3} id="comment" name="comment" defaultValue={user.comment}/>
                    </Form.Group>
                    <Col xs={12} sm={6} lg={4}>
                    <Stack direction="horizontal" className="mt-4"  gap={3} >
                            <button className='main-btn mt-2' type='submit'>Submit</button>
                            <button className='main-btn mt-2' type='button' onClick={handleBack}>Go Back</button>   
                    </Stack>
                    </Col>
                    <Col>{error.status ? <Alert variant={error.type}>{error.msg}</Alert> : ''}</Col>
                </Row>
                </Form>
                </Card.Body>
                </Card>
    </Stack>
    </Layout>
  )
}

export default EditLead