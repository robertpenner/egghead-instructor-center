import React from 'react'
import {connect} from 'react-redux'
import {size} from 'lodash'
import {BrowserRouter, Match, Redirect} from 'react-router'
import Instructor from '../../screens/Instructor'
import Login from './components/Login'
import RouteNotFound from './components/RouteNotFound'
import Miss404 from '../Miss404'

const Router = ({user}) => (
  (size(user) > 0)
    ? <BrowserRouter>
        <div>
          <Match
            exactly
            pattern='/'
            render={() => (
              user.is_instructor
                ? <Redirect to={`instructors/${user.id}`} />
                : <div>Only instructors can access the instructor guide</div>
            )}
          />
          <Match
            pattern={`/instructors/:instructorId`}
            component={Instructor}
          />
          <Match
            pattern='/login'
            component={Login}
          />
          <Match
            pattern='/404'
            component={RouteNotFound}
          />
          <Miss404 />
        </div>
      </BrowserRouter>
  : <Login />
)

export default connect(
  ({appScreen}) => ({
    user: appScreen.user,
  }),
  null
)(Router)