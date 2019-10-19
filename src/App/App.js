import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from './Routes'
import Layout from '../layout'

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/register' exact component={routes.register} />
            <Route path='/login' exact component={routes.login} />
            <Route path='/bye' exact component={routes.bye} />
            <Route path='/' component={routes.home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Suspense>
  )
}

export default Routes
