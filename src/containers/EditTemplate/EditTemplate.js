import React from "react";
import Form from "../../components/Form/Form";

const EditTemplate = () => { 
  return (
    <>
      <h3 className='title'>Edit template</h3>
      <Form
        isEdit={true}
      />
    </>
  )
};

export default EditTemplate;