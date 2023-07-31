import React, { Component } from 'react'
import Snake from './Snake.gif'

export default class spinner extends Component {
  render() {
    return (
      <div className='container'>
        <img src={Snake} alt ="..."/>
      </div>
    )
  }
}
