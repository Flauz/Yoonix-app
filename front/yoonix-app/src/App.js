import React from 'react';
import SignUp from './containers/SignUp'
import SignIn from './containers/SignIn';
import Profile from './containers/Profile';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { MuiThemeProvider, Grid, Paper } from '@material-ui/core'
import requireAuth from "./hoc/requireAuth";
import requireNotAuth from "./hoc/requireNotAuth";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider  >
          <Grid container
            alignItems='center'
            style={{ height: '100%' }}>
            <Grid item xs={12}>
              <Paper
                elevation={4}
                style={{ margin: 32 }}
              >
                <Grid container
                  alignItems='center'
                  justify='center'>
                  <Grid item xs={12} sm={6}
                    style={{ 'text-align': 'center' }}>
                    <img src="https://zupimages.net/up/20/03/34tt.png" alt="" />
                  </Grid>
                  <Grid item xs={12} sm={6}
                    alignContent='center'
                  >
                    <BrowserRouter>
                      <Switch>
                        <Redirect exact from='/' to='/profile' />
                        <Route exact path="/profile" component={requireAuth(Profile)} />
                        <Route exact path="/signin" component={requireNotAuth(SignIn)} />
                        <Route exact path="/signup" component={requireNotAuth(SignUp)} />
                      </Switch>
                    </BrowserRouter>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
