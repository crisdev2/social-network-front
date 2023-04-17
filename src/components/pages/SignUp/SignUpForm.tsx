import styled from '@emotion/styled'
import { Alert, Button, FormControl, Grid, TextField } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { signinService, signupService } from '../../../services/authService'
import { closeMessage, showError, showSuccess, useMainSelector } from '../../../features/mainSlice'
import { useDispatch } from 'react-redux'
import { login } from '../../../features/userSlice'

const StyledSignUpForm = styled.div`
`

const SignUpForm: FC = () => {
  const navigate = useNavigate()
  const { msg } = useMainSelector()
  const dispatch = useDispatch()

  const handleHiddeMsg = () => {
    dispatch(closeMessage())
  }

  const formik = useFormik({
    initialValues: {
      username: 'Thanos',
      password: '',
      role: 'Villain',
      image: 'https://media.tenor.com/ZY-HgrsODNgAAAAd/thanos-infinity-stones.gif',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required('Username is required'),
      password: yup
        .string()
        .required('Password is required'),
      role: yup
        .string()
        .required('Role is required'),
      image: yup
        .string()
        .required('Image is required'),
    }),
    onSubmit: async (values) => {
      const resp = await signupService(values)
      if (resp.data.statusCode === 200) {
        dispatch(showSuccess(resp.data.message))
        navigate('/login')
      } else {
        dispatch(showError(resp.data.message))
      }
    },
  })
  return (
    <StyledSignUpForm>
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
              <FormControl>
                <TextField
                  fullWidth
                  id="role"
                  name="role"
                  label="Role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                />
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl>
                <TextField
                  fullWidth
                  id="image"
                  name="image"
                  label="Image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <Button color="primary" variant="contained" fullWidth type="submit" size="large">
                Create account
              </Button>
            </Grid>
            <Grid item sm={12}>
              <Button color="primary" variant="text" fullWidth size="large" onClick={() => navigate('/login')}>
                Log In
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </StyledSignUpForm>
  )
}

export default SignUpForm