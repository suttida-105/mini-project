import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Upload from './components/Upload'
import Login from './components/Login'
import Show from './components/Show'
import './App.css'
import 'antd/dist/antd.css';
function App () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/upload' exact component={Upload} />
                <Route path='/' exact component={Login} />
                <Route path='/show' exact component={Show} />
            </Switch>
        </BrowserRouter>
    )
}

export default App