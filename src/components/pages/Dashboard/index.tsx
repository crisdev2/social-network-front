import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to React Practical Test.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => navigate('/posts')}>
          Go to Posts module
        </Button>
      </CardActions>
    </Card>
  )
}

export default Dashboard