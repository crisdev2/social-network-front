import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { IPosts } from '../../../models/postsModel'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import Icon from '../../shared/Icon'

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
`

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`

const StyledCardMedia = styled(CardMedia)`
  max-width: 50%;
`

const PostsGrid: FC<Props> = ({ data, handleEdit, handleComment }) => {
  return (
    <Grid container spacing={6}>
      {data.map((row, index) => (
        <Grid item sm={6} key={index} width="100%">
          <StyledCard>
            <StyledBox>
              <CardContent >
                <Typography component="div" variant="h5">
                  {row.id}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {row.body}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  At <strong>{dayjs(row.created).format('YYYY-MM-DD HH:mm:ss')}</strong> By <strong>{row.idAuthor.username}</strong>
                </Typography>
                <Button onClick={() => handleEdit(row)}><Icon>edit</Icon>&nbsp;Edit</Button>
                <Button onClick={() => handleComment(row)}><Icon>comment</Icon>&nbsp;Comment</Button>
              </CardContent>
            </StyledBox>
            <StyledCardMedia
              // @ts-ignore
              component="img"
              sx={{ height: 150 }}
              image={row.idAuthor.image}
              alt="Live from space album cover"
            />
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  )
}

interface Props {
  data: IPosts[]
  handleEdit: (post: IPosts | null) => void
  handleComment: (post: IPosts | null) => void
}

export default PostsGrid