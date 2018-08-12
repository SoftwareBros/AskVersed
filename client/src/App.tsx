import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './pages/About';
import Advisors from './pages/Advisor';
import Buy from './pages/Buy';
import Form from './pages/Form';
import HomeScreen from './pages/HomeScreen';
import Login from './pages/Login-components/login';
import Resources from './pages/Resources';
import Signup from './pages/Signup-components/signup';
import UserHome from './pages/UserHomepage';


class App extends React.Component {

   public componentWillMount() {
   fetch("http://localhost:8000/");
   fetch("http://localhost:8000/auth", {
     credentials: 'include',
     method:"POST",
   }).then((res: Response) => {
     // tslint:disable-next-line:no-console
     console.log(res);
     // tslint:disable-next-line:no-console
     console.log("trying auth");
     fetch("http://localhost:8000/auth", {
       credentials: 'include'
     });
   })
}


  public render() {
    return (
        <div>
          <Switch>
            <Route exact={true} path='/checkout' component={Buy}/>
            <Route exact={true} path='/userHome' component={UserHome}/>
            <Route exact={true} path='/signup' component={Signup}/>
            <Route exact={true} path='/login' component={Login}/>
            <Route exact={true} path='/advisors' component={Advisors}/>
            <Route exact={true} path='/about' component={About}/>
            <Route exact={true} path='/form' component={Form}/>
            <Route exact={true} path='/resources' component={Resources}/>
            <Route exact={true} path='/' component={HomeScreen}/>
          </Switch>
        </div>
    );
  }
}

export default App;
