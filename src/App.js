import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar.js';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div className='overflow-x-hidden bg-gray-700 h-screen'>
          <NavBar></NavBar>
          <div className='flex w-screen flex-wrap flex-col items-center bg-gray-700 pb-20'>
            <p className='text-white font-semibold md:text-6xl text-3xl my-10 '>Top Headlines</p>
            <News pageSize = "6" country="in" />
            
          </div>
      </div>
    )
  }
}
