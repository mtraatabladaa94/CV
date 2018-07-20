/* Node & ReactJS Modules */
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'

/* Pages Components */
import Home from './pages/home/Home'
import Signin from './pages/account/Signin'

class App extends Component {

    render() {

        return (
            <Provider
                store={store}
            >
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/Home/Index' component={Home} />
                        <Route exact path='/Account/Signin' component={Signin} />
                    </div>
                </BrowserRouter>
            </Provider>
        );

    }
  
}

export default App;