import React,{ useEffect ,useState} from 'react'
import Layout from "../../components/Layout"
import Header from "../../components/Header"

import { Card,Table,Row,Col,Form,Stack} from "react-bootstrap";
import { getAllLead } from "../../services/LeadAPI";
import { useSelector,useDispatch } from "react-redux";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteUser } from "../../services/LeadAPI";
import ReactPaginate from "react-paginate";
import Badge from 'react-bootstrap/Badge';
import { showLoading,hideLoading } from "../../features/alertSlice";

const UsersLead = () => {
  const [search,setSearch]=useState('');
  const [status,setStatus]=useState('all')
  const [data,setData]=useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch();

  useEffect(()=>{
    users();
  },[status,user])

  const users =async ()=>{
  dispatch(showLoading())
  const res = await getAllLead(user.name,user.email,status)
    dispatch(hideLoading())
    if(res.data.status==="success"){
      setData(res.data.data)
    }
  }

  const deleteUserData = async (id) => {
    await deleteUser(id);
    users()
}

const handleClear=()=>{
  document.getElementById('Lead-search-form').reset()
  setSearch('');
  setStatus('all')
  
}

const PER_PAGE = 10;
const offset = currentPage * PER_PAGE;
const currentPageData = data
    .slice(offset, offset + PER_PAGE);
const pageCount = Math.ceil(data.length / PER_PAGE);

function handlePageClick({ selected: selectedPage }) {
  setCurrentPage(selectedPage);
}
  return (
    <Layout>
      
      <Stack className="m-1">
            <Card className="p-2 m-1 card">
            <Card.Body>
            <Header title="My Leads"/>
            <Form id="Lead-search-form">
                <Row>
                    <Form.Group as={Col}  xs={12} sm={6} lg={4} >
                    <Form.Label >Search</Form.Label>
                    <Form.Control type="text" placeholder="Search Name" id="search" name="search" onChange={(e)=>setSearch(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={6} lg={4} >
                        <Form.Label>Status</Form.Label>
                        <Form.Select id="status" name="status" onChange={(e)=>setStatus(e.target.value)}>
                            <option value="all">All</option>
                            <option value="open">Open</option>
                            <option value="pending">Pending</option>
                            <option value="close">Close</option>
                        </Form.Select>
                    </Form.Group>
                    <Col  xs={12} sm={6} lg={4} className='mt-2'>
                    <button className='main-btn mt-4' type='button' onClick={handleClear}>Clear Filters</button>
                    </Col>
        
                </Row>
      </Form>
      <hr/>
            <Table responsive  size="sm">
        <thead>
          <tr className='text-center'>
                    <th className='text-start'>Name</th>
                    <th className='text-start'>Email</th>
                    <th>Phone Number</th>
                    <th>Date Of Visit</th>
                    <th>Status</th>
                    <th>Action</th>
          </tr>
        </thead>
        <tbody>
                {
                  search.toLowerCase()==='' ? 
                    currentPageData.filter((item)=>{
                      return search.toLowerCase()===''
                      ? item
                      : item.name.toLowerCase().includes(search);
                    }).map((row) => (
                              <tr key={row.email} className='text-center'>
                                  <td className='text-start'>{row.name}</td>
                                  <td className='text-start'>{row.email}</td>
                                  <td>{row.phone}</td>
                                  <td> {dayjs(row.date_of_visit).format('DD-MM-YYYY')}</td>
                                  <td className='text'> <Badge bg={row.status==="open" ? "success" : row.status==="pending" ? "warning" :"danger"}  text="dark" >{row.status}</Badge> </td>
                                  <td >
                                    <IconButton sx={{color:'#2cb1bc'}} component={Link} to={`/all-lead/${row._id}/edit-lead`}>
                                    <EditIcon/></IconButton>
                                    <IconButton color="error" onClick={() => deleteUserData(row._id)}><DeleteForeverIcon/></IconButton>
                                    <IconButton sx={{color:"#3F704D"}} component={Link} to={`/all-lead/${row._id}/user-specific-details`}>
                                    <VisibilityIcon/>
                                    </IconButton>
                                  </td>
                              </tr>
                          ))
                  :
                  data.filter((item)=>{
                      return search.toLowerCase()===''
                      ? item
                      : item.name.toLowerCase().includes(search);
                    }).map((row) => (
                              <tr key={row.email} className='text-center'>
                                  <td className='text-start'>{row.name}</td>
                                  <td className='text-start'>{row.email}</td>
                                  <td>{row.phone}</td>
                                  <td> {dayjs(row.date_of_visit).format('DD-MM-YYYY')}</td>
                                  <td className='text'> <Badge bg={row.status==="open" ? "success" : row.status==="pending" ? "warning" :"danger"}  text="dark" >{row.status}</Badge> </td>
                                  <td >
                                    <IconButton sx={{color:'#2cb1bc'}} component={Link} to={`/all-lead/${row._id}`}>
                                    <EditIcon/></IconButton>
                                    <IconButton color="error" onClick={() => deleteUserData(row._id)}><DeleteForeverIcon/></IconButton>
                                    <IconButton sx={{color:"#3F704D"}} component={Link} to={`/all-lead/${row._id}/user-specific-details`}>
                                      <VisibilityIcon/>
                                    </IconButton>
                                  </td>
                              </tr>
                          ))
                }
        </tbody>
      </Table>
    
                  <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />

            
            </Card.Body>
            </Card>
</Stack>
    </Layout>
  )
}

export default UsersLead