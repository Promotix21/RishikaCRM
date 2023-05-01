import React,{ useEffect ,useState} from 'react'
import Header from "../../components/Header"

import { Card,Table,Row,Col,Form,Stack} from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteEmployee } from '../../services/userAuthAPI';
import ReactPaginate from "react-paginate";
import { getAllEmployee } from '../../services/userAuthAPI';
import { showLoading,hideLoading } from "../../features/alertSlice";

const AllEmployee = () => {
  const [search,setSearch]=useState('');
  const [data,setData]=useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch();

  useEffect(()=>{
    users();
  },[])

  const users =async ()=>{
  dispatch(showLoading())
  const res = await getAllEmployee()
    dispatch(hideLoading())
    if(res.data.status==="success"){
      setData(res.data.data)
    }
  }

  const deleteUserData = async (id) => {
    await deleteEmployee(id);
    users()
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
      
      <Stack className="m-1">
            <Card className="p-2 m-1 card">
            <Card.Body>
            
            <Form id="Epm-list-form">
                <Row>
                    <Col><Header title="All Employees"/></Col>
                    <Form.Group as={Col}  xs={12} sm={6} lg={4} >
                    <Form.Control type="text" placeholder="Search Name" id="search" name="search" onChange={(e)=>setSearch(e.target.value)}/>
                    </Form.Group>
                </Row>
      </Form>
      <hr/>
            <Table responsive  size="sm">
        <thead>
          <tr className='text-center'>
                    <th className='text-start'>Name</th>
                    <th className='text-start'>Email</th>
                    <th>Employee type</th>
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
                                  <td>{row.isAdmin ? "Admin" : "Normal"}</td>
                                  <td >
                                    {/* <IconButton sx={{color:'#2cb1bc'}} component={Link} to={`/all-lead/${row._id}/edit-lead`}>
                                    <EditIcon/></IconButton> */}
                                    <IconButton color="error" onClick={() => deleteUserData(row._id)}><DeleteForeverIcon/></IconButton>
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
                                  <td >
                                    <IconButton sx={{color:'#2cb1bc'}} component={Link} to={`/all-lead/${row._id}`}>
                                    <EditIcon/></IconButton>
                                    <IconButton color="error" onClick={() => deleteUserData(row._id)}><DeleteForeverIcon/></IconButton>
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
  )
}

export default AllEmployee