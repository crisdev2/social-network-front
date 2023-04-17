import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { IPosts } from '../../../models/postsModel'
import { Alert, Button } from '@mui/material'
import PostsTable from './PostsTable'
import Icon from '../../shared/Icon'
import PostsGrid from './PostsGrid'
import PostsSkeleton from './PostsSkeleton'
import BasicModal from '../../shared/BasicModal'
import PostsForm from './PostsForm'

const StyledButton = styled(Button)`
  margin-bottom: 15px;
  margin-right: 10px;
`

const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledAlert = styled(Alert)`
  margin-bottom: 15px;
`

const Posts: FC = () => {
  const { loaded, requestTime, handleReload, ...fetch } = useFetch('posts')
  const data: IPosts[] = fetch.data || []
  const [viewList, setViewList] = useState(false)
  const [record, setRecord] = useState<IPosts|null>(null)
  const [show, setShow] = useState<boolean>(false)

  const handleEdit = (post: IPosts | null) => {
    setShow(true);
    setRecord(post)
    console.log('edit', post)
  }

  const handleComment = (post: IPosts | null) => {
    setShow(true);
    setRecord({
      idParent: post
    } as IPosts)
  }

  return (
    <>
      {show && 
        <BasicModal title={record?.id ? "Edit" : "Create"} open={show} handleClose={() => setShow(false)}>
          <PostsForm
            post={record}
            onSubmit={() => {setShow(false); setRecord(null); handleReload()}}
            handleEdit={handleEdit}
            handleComment={handleComment}
          />
        </BasicModal>
      }
      <ViewHeader>
        <StyledButton color="success" variant="contained" onClick={() => {setShow(true); setRecord(null)}}>
          <Icon>add</Icon>&nbsp;Add post
        </StyledButton>
        {
          <div>
            <StyledButton
              color={viewList ? "inherit" : "success"}
              variant={viewList ? "text" : "outlined"}
              onClick={() => setViewList(false)}
            >
              <Icon>grid_view</Icon>&nbsp;Grid view
            </StyledButton>
            <StyledButton
              color={!viewList ? "inherit" : "success"}
              variant={!viewList ? "text" : "outlined"}
              onClick={() => setViewList(true)}
            >
              <Icon>view_list</Icon>&nbsp;List view
            </StyledButton>
          </div>
        }
      </ViewHeader>
      {loaded ? 
        <>
          {requestTime ?
            <StyledAlert variant="outlined" color="success">
              Data downloaded from API in <strong>~{requestTime}</strong> milliseconds.
            </StyledAlert>
            :
            <StyledAlert variant="outlined" color="info">
              Data obtained from local storage.
            </StyledAlert>
          }
          {viewList ?
            <PostsTable data={data} handleEdit={handleEdit} />
            :
            <PostsGrid data={data} handleEdit={handleEdit} handleComment={handleComment} />
          }
        </>
        :
        <PostsSkeleton />
      }
    </>
  )
}

export default Posts