import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC } from 'react'
import { IPosts } from '../../../models/postsModel'
import dayjs from 'dayjs'

const PostsTable: FC<Props> = ({ data, handleEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                <Link component="button" onClick={() => {}}>
                  {dayjs(row.created).format('YYYY-MM-DD HH:mm:ss')}
                </Link>
              </TableCell>
              <TableCell>
                {row.body}
              </TableCell>
              <TableCell>
                {row.idAuthor.username}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

interface Props {
  data: IPosts[]
  handleEdit: (post: IPosts | null) => void
}

export default PostsTable