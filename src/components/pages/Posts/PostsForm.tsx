import styled from '@emotion/styled'
import { FC, useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { showSuccess } from '../../../features/mainSlice'
import { showError } from '../../../features/mainSlice'
import { IPosts } from '../../../models/postsModel'
import { postsDeleteService, postsSaveService, postsShowService } from '../../../services/postsService'
import PostsGrid from './PostsGrid'

const StyledPostsForm = styled.div`
`

const PostsForm: FC<Props> = ({ post, onSubmit, handleEdit, handleComment }) => {
  const dispatch = useDispatch()

  const [record, setRecord] = useState(post)
  
  const handleGet = async () => {
    if (post?.id) {
      const resp = await postsShowService(post.id)
      setRecord(resp.data)
    }
  }

  const handleDelete = async () => {
    if (post?.id) {
      const resp = await postsDeleteService(post.id)
      if (resp?.data?.message) dispatch(showSuccess(resp.data.message))
      if (onSubmit) onSubmit()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: record?.id || undefined,
      body: record?.body || '',
      idParent: record?.idParent || undefined,
    },
    validationSchema: yup.object({
      body: yup
        .string()
        .required('Body is required'),
    }),
    onSubmit: async (values) => {
      const resp = await postsSaveService(values as IPosts)
      if (resp.data.message) dispatch(showError(resp.data.message))
      else {
        dispatch(showSuccess(`Post ${resp.data.id} was created!`))
      }
      if (onSubmit) onSubmit()
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    handleGet();
  }, [post])

  return (
    <StyledPostsForm>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              {record?.id &&
                <Typography variant="h5">
                  Edit {record?.idParent ? 'comment' : 'post'} ID #{record?.id}
                </Typography>
              }
            </Grid>
            <Grid item sm={12}>
              <FormControl>
                <TextField
                  fullWidth
                  id="body"
                  name="body"
                  label="Body"
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  error={formik.touched.body && Boolean(formik.errors.body)}
                  helperText={formik.touched.body && formik.errors.body}
                />
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <Button color="primary" variant="contained" fullWidth type="submit" size="large">
                {post?.id ? 'Guardar' : 'Crear'}
              </Button>
            </Grid>
            {!!post?.id &&
              <Grid item sm={12}>
                <Button color="error" variant="contained" fullWidth onClick={handleDelete} size="large">
                  Remove post
                </Button>
              </Grid>
            }
          </Grid>
        </Form>
      </FormikProvider>
      {!!record?.idChildren && !!record?.idChildren.length &&
        <Box sx={{marginTop: 15}}>
          <PostsGrid data={record?.idChildren} handleEdit={handleEdit} handleComment={handleComment} />
        </Box>
      }
    </StyledPostsForm>
  )
}

interface Props {
  post: IPosts | null
  onSubmit: () => void
  handleEdit: (post: IPosts | null) => void
  handleComment: (post: IPosts | null) => void
}

export default PostsForm