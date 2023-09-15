import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import { toast } from 'react-hot-toast';
import Styles from '../ClientStyles/Details.module.css'
import Swal from 'sweetalert2'
import Navbars from '../../components/users/Navbar';
import Footer from '../../components/Footer';
import { useDispatch } from 'react-redux';
import { logoutClient } from '../../globelContext/clientSlice';
import { FaCheckCircle } from "react-icons/fa"; 


const Details = () => {
const [records, setRecords] = useState([])
const dispatch = useDispatch()

     useEffect(() => {
       async function getDetails() {
         try {
           const { data } = await axios.get("/details");
           if (data.message) {
             dispatch(logoutClient());
             toast.error("Something went wrong please do re-login");
           } else {
             setRecords(data);
           }
         } catch (error) {
           console.log(error);
           dispatch(logoutClient());
           toast.error("Something went wrong ");
         }
       }
       getDetails();
     }, [setRecords]);



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
       const currentDate = new Date();

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
              sortable: true,
            },
          

            {
              name: "Status",
              selector: (row) => {
                 const rowDate = new Date(row.date);
                if (rowDate < currentDate && row.status) {
                  return <FaCheckCircle size={20} color="green" />;
                } else if (row.status) {
                  return (
                    <button
                      style={{
                        backgroundColor: "blueviolet",
                        outline: "none",
                        width: "4rem",
                        height: "2rem",
                        borderRadius: "3px",
                      }}
                      onClick={() => handleCancel(row._id)}
                    >
                      Cancel
                    </button>
                  );
                } else {
                  return <span style={{ color: "red" }}>Cancelled</span>;
                }
              },
             
            },
          ];


          const handleCancel = async(id) =>{
            try {
              Swal.fire({
                title: "Do you want to Cancel Booking?",
                // showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `NO`,
              }).then(async(result) => {
                
                if (result.isConfirmed) {
                     const {data} = await axios.post('/cancel',{id})
              if(data.error){
                toast.error(data.error)
              }else{
                setRecords(data)
              }
                  Swal.fire("Cancelled", "", "success");
                }
              });
           
            } catch (error) {
              console.log(error)
              toast.error('Something went wrong')
            }
          }
     

          
          
  return (
    <>
    <Navbars/>
      <div className={Styles.body}>
        <div style={{ padding: "50px 10%" , marginBottom:'17px'}}>
       
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

export default Details;