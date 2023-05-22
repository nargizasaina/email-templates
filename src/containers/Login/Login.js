import React, {useEffect, useState} from 'react';
import {TextField, Box, Container, Grid, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
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
              Sign in
            </Typography>

            <Box component="form" onSubmit={onSubmit}>
              <Grid>
                <TextField
                  name="email"
                  value={user.email}
                  onChange={onChange}
                  label="Email"
                  required={true}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid >
                <TextField
                  name="password"
                  value={user.password}
                  onChange={onChange}
                  label="Password"
                  type="password"
                  required={true}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Button 
                variant="outlined"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                  Sign In
              </Button>
              <Grid container justifyContent={"flex-end"}>
                  <Grid item>
                      <Link to="/registration">
                          Don't have an account? Sign Up
                      </Link>
                  </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    );
};

export default Login;