import React, {useState, useEffect} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {Button, TextField} from "@mui/material";
import plugins from 'suneditor/src/plugins';
import { useParams } from "react-router-dom";
import supabase from '../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';

const Form = ({isEdit}) => {
  const { id } = useParams();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [msgSnack, setMsgSnack] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const [template, setTemplate] = useState({
    name: '',
    subject: '',
    body: ``
  });

  const [initialTemplate] = useState({
    name: 'default values',
    subject: 'Load from {{origin}} to {{dest}}',
    body: `<p>Hello, team!<br><br>Can we get more info pls about the load by this ref<br>number&nbsp;{{ref}}&nbsp;and what is the best rate?<br><br>MC: 00000<br>Dispatch Team at&nbsp;<strong>Carrierify</strong><br>Alex Daniel<br>Number: +1234567890123</p>`
  });

  const [fetchError, setFetchError] = useState(null);
  const [addError, setAddError] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      const fecthTemplate = async () => {
      const {data, error} = await supabase
        .from('myTemplates')
        .select()
        .eq('id', id)

      if (error) {
        setFetchError('Could not fetch the template');
        console.log(error);
      }

      if (data) {
        setTemplate({...data[0]});
        setFetchError(null);
      }
    }

    fecthTemplate();
  } else {
    setTemplate({...initialTemplate});
  }
  
  }, [id, isEdit]);
  console.log(template);

  const onInputChange = (e) => {
    const {name, value} = e.target;
    setTemplate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChange = (content) => {
    setTemplate(prev => ({
      ...prev,
      body: content
    }));
  };


  const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
    // setTemplate(prev => ({
    //   ...prev,
    //   image: imageInfo.src
    // }));
    // console.log(template);
  };

  const onSubmit = async e => {
    e.preventDefault();
    // console.log(template);
    if (!template.name || !template.subject) {
      return;
    }

    const getQuantity = async () => {
      const { data } = await supabase
        .from('myTemplates')
        .select()

        if (data.length === 4) {
          setMsgSnack('You already have 5 templates');
          setOpenSnack(true);
          return;
        }
      }
    await getQuantity();

    const {data, error} = await supabase
    .from('myTemplates')
    .insert([{...template}])

    if (error) {
      setAddError('Please fill in the fields');
    } 

    if (data) {
      setAddError(null);
    }

    setMsgSnack('Successfully saved!');
    setOpenSnack(true);
  };

  return (
    fetchError ? <p>{fetchError}</p> 
    : template && 
      <form onSubmit={onSubmit}>
        <p>Please name Your template</p>
        <TextField
          name="name"
          value={template.name}
          required={true}
          margin="dense"
          type="text"
          fullWidth
          onChange={(e) => onInputChange(e)}
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
          setContents={template.body || ''}
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
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleClose}
          message={msgSnack}
        />
      </form>
  )
};

export default Form;