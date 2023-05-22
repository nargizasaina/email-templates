import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, Typography, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';

const Register = () => {
    const [user, setUser] = useState({
        displayName: '',
        password: '',
        email: ''
    });

    const onChange = e => {
        const {name, value} = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();

    };

    return (
      <Container maxWidth="xs">
        <Box sx={{paddingTop: 6}}>
          <Typography component="h1" variant="h5">
              Sign up
          </Typography>
          <Box component="form" onSubmit={onSubmit}>
            <Grid>
              <TextField
                  name="email"
                  value={user.email}
                  onChange={onChange}
                  label="Email"
                  required={true}
                  margin="dense"
                  type="email"
                  fullWidth
              />
            </Grid>
            <Grid>
              <TextField
                  name="displayName"
                  value={user.displayName}
                  onChange={onChange}
                  label="Display Name"
                  required={true}
                  margin="dense"
                  fullWidth
              />
            </Grid>
            <Grid>
              <TextField
                name="password"
                value={user.password}
                onChange={onChange}
                label="Password"
                type="password"
                required={true}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Button 
                variant="outlined"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Link to="/login">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
          </Box>
        </Box>
      </Container>
    );
};

export default Register;