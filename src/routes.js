import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './components/App'
import Upload from './components/Upload'
import Login from './components/Login'
import Show from './components/Show'

function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/upload' exact component={Upload} />
                <Route path='/login' exact component={Login} />
                <Route path='/show' exact component={Show} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes