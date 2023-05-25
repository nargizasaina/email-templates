import React, {useState, useEffect} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {Button, TextField, Box} from "@mui/material";
import plugins from 'suneditor/src/plugins';
import { useParams, useNavigate } from "react-router-dom";
import supabase from '../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';

const Form = ({isEdit}) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [msgSnack, setMsgSnack] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
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

  useEffect(() => {
    if (isEdit && id) {
      const fecthTemplate = async () => {
      const {data, error} = await supabase
        .from('myTemplates')
        .select()
        .eq('id', id)

        if (error) setFetchError('Could not fetch the template');

        if (data) {
          setTemplate({...data[0]});
          setFetchError(null);
        }
      }

      fecthTemplate();
    } else {
      setTemplate({...initialTemplate});
    }
  
  }, [id, isEdit, initialTemplate]);

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
    if (!template.name || !template.subject) {
      setMsgSnack('Please fill in the fields');
      setOpenSnack(true);
      return;
    }

    if (isEdit) {
      await supabase
        .from('myTemplates')
        .update({ ...template })
        .eq('id', id);
    } else {
      const getQuantity = async () => {
      const { data } = await supabase
        .from('myTemplates')
        .select();

        if (data.length === 4) {
          setMsgSnack('You already have 5 templates');
          setOpenSnack(true);
          return;
        }
      }
    await getQuantity();

    setMsgSnack('Successfully saved!');
    setOpenSnack(true);
    await supabase
    .from('myTemplates')
    .insert([{...template}]);
    }
    
    navigate('/templates');
  };

  return (
    fetchError ? <p>{fetchError}</p> 
    : template && 
    <div>
      <div className='wysiwig'>
        <form onSubmit={onSubmit}>
          <p>Please name Your template</p>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
            name="name"
            value={template.name}
            required={true}
            margin="dense"
            type="text"
            fullWidth
            onChange={(e) => onInputChange(e)}
            />
            <Button 
              variant='contained' 
              size='small' 
              type='button'
              sx={{textTransform: 'lowercase', ml: '10px'}}
              onClick={() => setTemplate(initialTemplate)}
            >
              default values
            </Button>
          </Box>
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
      </div>
    </div>
  )
};

export default Form;