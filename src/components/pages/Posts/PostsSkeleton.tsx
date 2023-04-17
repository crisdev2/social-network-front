import styled from '@emotion/styled'
import { Grid, Skeleton } from '@mui/material'
import { FC } from 'react'

const StyledPostsSkeleton = styled.div`
`

const PostsSkeleton: FC = () => {
  return (
    <StyledPostsSkeleton>
      <Grid container spacing={5}>
        {[...Array(6)].map((item, index) => (
          <Grid item key={index} sm={6}>
            <Skeleton variant="rounded" width="100%" height={120}>
            </Skeleton>
          </Grid>
        ))}
      </Grid>
    </StyledPostsSkeleton>
  )
}

export default PostsSkeleton