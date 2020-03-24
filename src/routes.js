import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './pages/App'
import Upload from './pages/Upload'

function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/upload' exact component={Upload} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes