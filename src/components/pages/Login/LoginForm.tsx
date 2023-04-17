import styled from '@emotion/styled'
import { Alert, Button, FormControl, Grid, TextField } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { signinService } from '../../../services/authService'
import { closeMessage, showError, showSuccess, useMainSelector } from '../../../features/mainSlice'
import { useDispatch } from 'react-redux'
import { login } from '../../../features/userSlice'

const StyledLoginForm = styled.div`
`

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { msg } = useMainSelector()
  const dispatch = useDispatch()

  const handleHiddeMsg = () => {
    dispatch(closeMessage())
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required('Username is required'),
      password: yup
        .string()
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      const resp = await signinService(values.username, values.password)
      if (resp.data.access_token) {
        localStorage.setItem('access_token', resp.data.access_token)
        navigate('/')
      } else {
        dispatch(showError(resp.data.message))
      }
    },
  })
  return (
    <StyledLoginForm>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            {msg.show &&
              <Grid item sm={12}>
                <Alert severity={msg.type} onClose={handleHiddeMsg}>{msg.title}</Alert>
              </Grid>
            }
            <Grid item sm={12}>
              <FormControl>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  type="password"
                />
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <Button color="primary" variant="contained" fullWidth type="submit" size="large">
                Log In
              </Button>
            </Grid>
            <Grid item sm={12}>
              <Button color="primary" variant="text" fullWidth size="large" onClick={() => navigate('/signup')}>
                Create account
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </StyledLoginForm>
  )
}

export default LoginForm