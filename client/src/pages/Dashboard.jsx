import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import {Row,Col,Stack} from 'react-bootstrap';
import DashboardCard from '../components/DashboardCard';
import HourglassTopSharpIcon from '@mui/icons-material/HourglassTopSharp';
import DisabledByDefaultSharpIcon from '@mui/icons-material/DisabledByDefaultSharp';
import TrackChangesSharpIcon from '@mui/icons-material/TrackChangesSharp';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';
import AllEmployee from './tables/AllEmployee';

import { getDetails} from "../services/LeadAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeIsAdmin } from "../services/localStorageServices";
const Dashboard = () => {

  const user = useSelector(state=>state.user)
  const [count,setCount]=useState('');
  useEffect(()=>{
    details();
  },[user.name,user.isAdmin,user.email])

  const details =async ()=>{
    const res = await getDetails(user.isAdmin,user.name,user.email)
    setCount(res.data);
    }

    const defaultStats = [
      {
        title: 'Total Leads',
        count: count.totalLead,
        icon: <BadgeSharpIcon sx={{fontSize:40,color:'#008080'}}/>,
        color: '#008080',
        bcg: '#f0f4f8',
      },
      {
        title: 'Open Leads',
        count: count.openLead,
        icon: <TrackChangesSharpIcon sx={{fontSize:40,color:'#647acb'}}/>,
        color: '#647acb',
        bcg: '#e0e8f9',
      },
      {
        title: 'Pending Leads',
        count: count.pendingLead,
        icon: <HourglassTopSharpIcon sx={{fontSize:40,color:'#e9b949'}}/>,
        color: '#e9b949',
        bcg: '#fcefc7',
      },
      {
        title: 'Closed Leads',
        count: count.closeLead,
        icon: <DisabledByDefaultSharpIcon sx={{fontSize:40,color:'#d66a6a'}}/>,
        color: '#d66a6a',
        bcg: '#ffeeee',
      },
    ]

  return (
    <Layout>
     
     <Stack className="m-2 mb-5">
     <Header title="Dashboard"/>
        <Row>
        {defaultStats.map((item, index) => {
        return (
          <Col lg={4} md={6} key={index}>
            <DashboardCard {...item}/>
          </Col>
          
        );
      })}
        </Row>
    </Stack>
      {user.isAdmin && <AllEmployee/>}
    </Layout>
  )
}
export default Dashboard