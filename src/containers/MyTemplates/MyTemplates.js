import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import supabase from '../../supabaseClient';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

const MyTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const fecthTemplates = async () => {
    const {data, error} = await supabase
      .from('myTemplates')
      .select('*')

      if (error) {
        setError('Could not fetch the templates');
        console.log(error);
      }

      if (data) {
        setTemplates(data);
        
        setError(null);
      }
  }

  useEffect(() => {
    fecthTemplates();
  }, []);

  const onEditHandler = (id) => {

  };

  const onDeleteHandler = async (id) => {
    const { error } = await supabase
      .from('myTemplates')
      .delete()
      .eq('id', id);
    setOpen(true);
    fecthTemplates();
  };

  return (
    <Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Template is deleted"
      />
      {error && <p>{error}</p>}
      {templates && templates.map(el => (
        <Card key={el.id} variant="outlined" sx={{maxWidth: '600px', margin: '20px auto'}}>
          <CardContent>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                <b>Template Name: </b> {el.name}
              </Typography>
              <Box>
                <Button 
                  size="small" 
                  onClick={() => onEditHandler(el.id)}
                  component={Link} to={'/templates/' + el.id} 
                ><ModeEditIcon/>
                </Button>
                <Button size="small" onClick={() => onDeleteHandler(el.id)}><DeleteForeverIcon/></Button>
              </Box>
            </Box>
          <Typography variant="h5" component="div">
            <b>Subject: </b>{el.subject}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Body: </b>{el.body}
          </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  )
};

export default MyTemplates;