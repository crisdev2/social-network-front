import { ThemeProvider } from '@mui/material'
import { customTheme } from './utilities/theme'
import 'normalize.css'
import { FC } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Provider } from 'react-redux'
import { store } from './utilities/store'
import Layout from './components/layout'

const App: FC<Props> = (props) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Layout>
            {props.children}
          </Layout>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  )
}

interface Props {
  children?: React.ReactNode | string
}

export default App
