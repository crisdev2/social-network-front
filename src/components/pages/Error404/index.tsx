import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const StyledError404 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 50vh;
`

const Error404: FC = () => {
  const navigate = useNavigate()
  return (
    <StyledError404>
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="h6">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Box>
        <Button variant="contained" onClick={() => navigate('/')}>Back Home</Button>
      </Box>
    </StyledError404>
  )
}

export default Error404