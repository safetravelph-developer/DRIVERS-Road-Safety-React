import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import "./App.css";
import Charts from "./screens/chart";
import List from "./screens/list";
import Login from './screens/login_form';
import Exit from "./screens/logout";
import Privacy from "./screens/privacy";
import {View} from "./screens/refactor/view";
import Reports from "./screens/reports";
import Root from "./screens/root";
import Stph from "./screens/stph";

const client = new ApolloClient({
  uri: process.env.REACT_APP_DRIVER_DATA_API_URL,
  cache: new InMemoryCache(),
});

export default class App extends Component{
  render(){
    return (
    <ApolloProvider client={client}>
     <BrowserRouter>
        <Routes>
           <Route exact path="/" element={<Login/> }/>
           <Route exact path="driver" element={<Root></Root>}/>
           <Route path="list" element={<List></List>}/>
           <Route path="reports" element={<Reports></Reports>}/>
           <Route path="charts" element={<Charts></Charts>}/>
           <Route path="exit" element={<Exit></Exit>}/>
           <Route exact path="privacy" element={<Privacy></Privacy>}/>
           <Route exact path="data-review" element={<Stph></Stph>}/>
           <Route exact path="/test" element={<View />}/>
        </Routes>
      </BrowserRouter>
      </ApolloProvider>
    )
  }
}