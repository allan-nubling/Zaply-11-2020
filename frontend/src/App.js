import 'font-awesome/css/font-awesome.min.css'

import React from 'react'
import './App.css';

import { HashRouter } from 'react-router-dom'
import Routes from './Routes'

import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Logo from './components/logo/Logo';
import Content from './components/content/Content';
import { connect } from 'react-redux';

function App() {

  return (
    <HashRouter>
        <div className="App">
          <Header />
          <Logo />
          <Nav />
          <Content
            chieldren={<Routes />}
          />
          <Footer />
        </div>
    </HashRouter>
  );
}

const mapState = (state, props) => ({ state: state.store, props })
export default connect(mapState)(App);
