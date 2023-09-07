import React, { useRef, useState } from "react";
import Modal from "react-modal";

import Styles from './Styles/AddImage.module.css'



import axios from "axios";
import { toast } from "react-hot-toast";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { useNavigate } from "react-router-dom";



const AddImageModal = ({ isOpen, onRequestClose }) => {

 const fileInputRef = useRef(null);
  
 const [cat, setCat] = useState('')
 const [name, setName] = useState('')
 


  const handleFileSelect = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const file of fileInputRef.current.files) {
      console.log(file);
      formData.append("images", file);
    }
    
  
     const selectedCat = cat ? cat.value : ""; 
     const selectedName = name ? name.value : ""; 

     formData.append("cat", selectedCat);
     formData.append("name", selectedName);
    axios
      .post("/s/sStyleImage", formData)
      .then(({ data }) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          fileInputRef.current.value = "";
          onRequestClose()
          toast.success("Image uploaded");
        }
      })
      .catch((error) => toast.error("Please upload proper Image"));
  };
  const options = [
    { value: "ForMen", label: "For Men" },
    { value: "ForBoys", label: "For Boys" },
    { value: "ForWomen", label: "For Women" },
    { value: "ForGirls", label: "For Girls" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={Styles.modal}
      overlayClassName={Styles.overlay}
    >
      <form onSubmit={handleFileSelect}>
        <label htmlFor="">Select Category</label>
        <Select
          options={options}
          value={cat}
          onChange={(selectedOption) => setCat(selectedOption)}
        />
        <label htmlFor="">Model Name</label>
        <CreatableSelect
          isClearable
          value={name}
          onChange={(selectedOption) => {
            setName(selectedOption);
          }}
          className={Styles.selector}
        />
        <label htmlFor="images">Upload your images..</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          
          
          ref={fileInputRef}
        />

        <button type="submit" className={Styles.upload}>
          Upload
        </button>
      </form>
    </Modal>
  );
};

export default AddImageModal;
