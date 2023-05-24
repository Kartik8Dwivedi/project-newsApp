import React, { Component } from 'react'
import loading from '../loading2.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='flex w-screen mb-20 justify-center '>
        <div>
          <img src={loading} className='h-14 ' alt="loading" />
        </div>
      </div>
    )
  }
}
