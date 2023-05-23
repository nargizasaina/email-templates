import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {Button, TextField} from "@mui/material";
import './Templates.css';

const Templates = () => {
  const [template, setTemplate] = useState({
    subject: '',
    body: ''
  });

  const handleChange = (content) => {
    console.log(content);
  }

  return (
    <div className='main'>
      <h3 className='title'> You can easily change email Templates</h3>
      <div className='wysiwig'>
        <form>
          <p>Subject</p>
          <TextField
            name="subject"
            value={template.subject}
            required={true}
            margin="dense"
            type="text"
            fullWidth
          />
          <p>Body</p>
          <SunEditor 
            lang="en"
            name="my-editor"
            height="200px" 
            onChange={handleChange}
          />
          <Button 
            variant="contained"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  )
};

export default Templates;