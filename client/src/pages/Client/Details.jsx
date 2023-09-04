import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import { toast } from 'react-hot-toast';
import Styles from '../ClientStyles/Details.module.css'

import Navbars from '../../components/users/Navbar';
import Footer from '../../components/Footer';

const Details = () => {
const [records, setRecords] = useState([])
       const customStyles = {
         headRow: {
           style: {
             backgroundColor: "black",
             color: "white",
           },
         },
         headCells: {
           style: {
             fontSize: "16px",
             fontWeight: "600",
             textTransform: "uppercase",
           },
         },
         cells: {
           style: {
             fontSize: "15px",
           },
         },
       };

          const column = [
            {
              name: "Employee Name",
              selector: (row) => row.employeeName,
              sortable: true,
            },
            {
              name: "Time",
              selector: (row) => row.time,

              sortable: true,
            },
            {
              name: "Services",
              selector: (row) => row.service.join(","),
              sortable: true,
            },
            {
              name: "Date",
              selector: (row) => {
                const date = new Date(row.date);
                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                return date.toLocaleDateString(undefined, options);
              },
              sortable: true,
            },
            {
              name: "Shop Name",
              selector: (row) => row.shopName,
              sortable:true,
            }
            // {
            //   name: "Access",
            //   selector: (row) => row.access,

            //   cell: (row) => (
            //     <div>
            //       {/* {row.access ? "Allowed" : "Denied"} */}
            //       <button
            //         className={
            //           row.access ? Styles.redButton : Styles.greenButton
            //         }
            //         onClick={() => handleAccessClick(row._id)}
            //       >
            //         {row.access ? "Hide" : "UnHide"}
            //       </button>
            //     </div>
            //   ),
            // },
          ];

          useEffect(() => {
           
          async function getDetails(){
            try {
                const {data} = await axios.get('/details')
                if(data.message){
                    toast.error('Something went wrong please do re-login')
                }else{

                    console.log(data)
                    setRecords(data)
                    
                }
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong ')
            }
          }
           getDetails()
          }, [])
          
  return (
    <>
    <Navbars/>
      <div className={Styles.body}>
        <div style={{ padding: "50px 10%" }}>
       
          <DataTable
            columns={column}
            data={records}
            customStyles={customStyles}
            pagination
          />
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Details