import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import supabase from '../../supabaseClient';

const MyTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fecthTemplates = async () => {
      const {data, error} = await supabase
        .from('myTemplates')
        .select()

        if (error) {
          setError('Could not fetch the templates');
          console.log(error);
        }

        if (data) {
          setTemplates(data);
          console.log(templates);
          setError(null);
        }
    }

    fecthTemplates();
  }, []);

  const onEditHandler = () => {

  };

  const onDeleteHandler = () => {

  };

  return (
    <Container>
      {error && <p>{error}</p>}
      {templates.length > 0 && templates.map(el => (
        <Card key={el.id} variant="outlined" sx={{maxWidth: '600px', margin: '20px auto'}}>
          <CardContent>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                <b>Template Name: </b>
              </Typography>
              <Box>
                <Button size="small" onClick={onEditHandler}><ModeEditIcon/></Button>
                <Button size="small" onClick={onDeleteHandler}><DeleteForeverIcon/></Button>
              </Box>
            </Box>
          <Typography variant="h5" component="div">
            <b>Subject: </b>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Body: </b>
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  )
};

export default MyTemplates;