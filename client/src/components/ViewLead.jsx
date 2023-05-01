import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import Header from "./Header"
import { useDispatch } from 'react-redux';
import {Col,Form,Row,Stack,Card,Alert} from 'react-bootstrap';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NearMeIcon from '@mui/icons-material/NearMe';
import Badge from 'react-bootstrap/Badge';
import { getUser } from '../services/LeadAPI';
import {  useParams,useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { addCallback } from '../services/LeadAPI';
import { Success, clearAlert,Error } from './Alert';
import { showLoading,hideLoading } from '../features/alertSlice';
import localizedFormat from 'dayjs/plugin/localizedFormat'

const ViewLead = () => {
    dayjs.extend(localizedFormat)

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })

    const initialValue = {
        name: '',
        email: '',
        phone: '',
        incharge: '',
        date_of_visit:'',
        status:'',
        comment:'',
        next_call_back:[],
    }

    const [user, setUser] = useState(initialValue);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate =useNavigate();

    const handleBack = ()=>{
        navigate("/all-lead")
    }


    useEffect(() => {
        loadUserDetails();
    },[id]);

    const loadUserDetails = async() => {
        const response = await getUser(id);
        setUser(response.data)    
    };
    const handleReset = ()=>{
        document.getElementById('Add_New_Callback_form').reset()
        setError(
            {
                status:false,
                msg:'',
                type:''
            }
        )
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const actualData = {
            call_back_date: data.get('callback_date'),
            call_back_comment: data.get('callback_comment'),
          }
  
          if (actualData.call_back_date && actualData.call_back_comment) {
            dispatch(showLoading());
            const res = await addCallback(id,actualData)
            dispatch(hideLoading());
            if(res.data.status==="success"){
                //setError({ status: true, msg: res.data.message, type: 'success' })
                Success(res.data.message)
                handleReset()
                loadUserDetails()
                //insertSuccess("Inserted",res.data.message)
                //handleReset()
              }
              if(res.data.status==='failed'){
                setError({ status: true, msg: res.data.message, type: 'danger' })
                clearAlert(setError)
              }
          } else {
            //console.log("all fields are required")
            //setError({ status: true, msg: "All Fields are Required", type: 'danger' })
            //clearAlert(setError)
            Error("All Fields are requiered")
          }
        }

  return (
    <Layout>
        
        <Stack className="m-1">
                <Card className="p-2 m-1 card">
                <Card.Body>
                <Header title="Lead Details"/>
                    <Row>
                        <Col sm={6}><p className='text'><NearMeIcon fontSize='large' sx={{marginRight:'20px',color:'#36454F'}}/>{user.name}</p></Col>
                        <Col sm={6}><p className='text'><ContactPhoneIcon  fontSize='large' sx={{marginRight:'20px',color:'#36454F'}}/>+91 {user.phone}</p></Col>
                        
                    </Row>

                    <Row>
                        <Col sm={6}><p className='text'><EmailIcon fontSize='large' sx={{marginRight:'20px',color:'#36454F'}}/>
                        {user.email}
                        </p></Col>
                        <Col sm={6}><p className='text'><CalendarMonthIcon fontSize='large' sx={{marginRight:'20px',color:'#36454F'}}/> {dayjs(user.date_of_visit).format('LLL')}</p></Col>
                    </Row>
                    <Row>
                        <Col sm={6}><p className='text'><AdminPanelSettingsIcon fontSize='large' sx={{marginRight:'20px',color:'#36454F'}}/>{user.incharge}</p></Col>
                        <Col sm={6}><h4 className='ms-4'><Badge bg={user.status==="open" ? "success" : user.status==="pending" ? "warning" :"danger"} text="dark" >{user.status}</Badge></h4></Col>
                    </Row>
                    <Row>
                        <Col lg={3}><p className='fw-bold text'>Comment </p></Col>
                        <Col lg={9}><p className='text'>{user.comment}</p></Col>
                        <hr/>
                    </Row>
                    {
                        user.next_call_back.length!==0 && <Row>
                        <Col xs={3}><p className='fw-bold text'>Next Callback</p></Col>
                        <Col xs={9}><p className='text'>{dayjs(user.next_call_back[user.next_call_back.length - 1].call_back_date).format('LLLL')}</p></Col>
                        <Col xs={3}><p className='fw-bold text'>Callback Notes</p></Col>
                        <Col xs={9}><p className='text'>{user.next_call_back[user.next_call_back.length - 1].call_back_comment}</p></Col>
                        </Row>
                    }
                    {/*<Col className='mt-0'>{error.status ? <Alert variant={error.type}>{error.msg}</Alert> : ''}</Col>*/}
                    <Row>
                    <Form onSubmit={handleSubmit} id="Add_New_Callback_form">
                        <Row className='mt-3'>
                            <Form.Group as={Col} xs={12} md={6} lg={4} className='mb-3'>
                                <Form.Label>Add New Callback Date</Form.Label>
                                <Form.Control type='datetime-local' id="callback_date" name="callback_date"/>
                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={6} lg={4} >
                                <Form.Label>Add New Callback Comment</Form.Label>
                                <Form.Control as="textarea" rows={3} id="callback_comment" name="callback_comment"/>
                            </Form.Group>
                            <Col className='mt-2'>
                                <Stack direction="horizontal"  gap={3} xs={12} md={6} lg={4}>
                                        <button className='main-btn mt-4' type='submit' >Add</button>
                                        <button className='main-btn mt-4' type='button' onClick={handleBack}>Go Back</button>  
                                </Stack>
                            </Col>
                        </Row>
                        </Form>
                        
                    </Row>
                </Card.Body>
                </Card>
    </Stack>
    </Layout>
  )
}

export default ViewLead