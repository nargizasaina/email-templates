import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {Button, TextField} from "@mui/material";
import plugins from 'suneditor/src/plugins';
import supabase from '../../supabaseClient';
import './Templates.css';

const Templates = () => {
  const [template, setTemplate] = useState({
    name: 'default values',
    subject: 'Load from {{origin}} to {{dest}}',
    body: `<p>Hello, team!<br><br>Can we get more info pls about the load by this ref<br>number&nbsp;{{ref}}&nbsp;and what is the best rate?<br><br>MC: 00000<br>Dispatch Team at&nbsp;<strong>Carrierify</strong><br>Alex Daniel<br>Number: +1234567890123</p>`,
    image: ''
  });

  console.log(supabase);

  const onInputChange = (e) => {
    const {name, value} = e.target.value;
    setTemplate(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(template);
  };

  const handleChange = (content) => {
    setTemplate(prev => ({
      ...prev,
      body: content
    }));
    console.log(template);
  };

  const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
    setTemplate(prev => ({
      ...prev,
      image: imageInfo.src
    }));
    console.log(template);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(template);
  };

  return (
    <div className='main'>
      <h3 className='title'> You can easily change email Templates</h3>
      <div className='wysiwig'>
        <form onSubmit={onSubmit}>
          <p>Please name Your template</p>
          <TextField
            name="name"
            value={template.name}
            required={true}
            margin="dense"
            type="text"
            fullWidth
            onChange={onInputChange}
          />
          <p>Subject</p>
          <TextField
            name="subject"
            value={template.subject}
            required={true}
            margin="dense"
            type="text"
            fullWidth
            onChange={onInputChange}
          />
          <p>Body</p>
          <SunEditor 
            lang="en"
            name="my-editor"
            height="200px" 
            onChange={handleChange}
            onImageUpload={handleImageUpload}
            setContents={template.body}
            setDefaultStyle="font-size: 17px;"
            previewTemplate="<div style='width:auto; max-width:1080px; margin:auto;'><h1>Preview Template</h1> {{contents}}</div>"
            setOptions={{
              plugins: plugins,
              buttonList: [
                [
                  "font",
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "list",
                  "align",
                  "fontSize",
                  "link",
                  "image",
                  "undo",
                  "redo",
                  "preview",
                  "indent",
                  "blockquote",
                ]
              ]
            }}
          />
          <Button 
            variant="contained"
            type="submit"
            sx={{ marginTop: 2, mb: 2 }}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  )
};

export default Templates;