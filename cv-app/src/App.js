/* Node & ReactJS Modules */
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

/* Pages Components */
import Index from './pages/home/index/Index';
import Quotes from './pages/home/quotes/Quotes';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Index} />
          <Route exact path="/Home/Index" component={Index} />
          <Route exact path="/Home/Quotes" component={Quotes} />
        </div>
      </BrowserRouter>
    );

  }
  
}

export default App;
