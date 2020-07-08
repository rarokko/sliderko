import React, { Component } from 'react'

import Sliderko from './sliderko'

export default class App extends Component {
  render () {
    return (
      <div>
        <Sliderko infinite={true}>
          <div style={{ display: "inline-block", width: 250, margin: 15, padding: 50, border: '1px solid gray', borderRadius: 10 }}>Item test</div>
          <div style={{ display: "inline-block", width: 250, margin: 15, padding: 50, border: '1px solid gray', borderRadius: 10 }}>Item test</div>
          <div style={{ display: "inline-block", width: 250, margin: 15, padding: 50, border: '1px solid gray', borderRadius: 10 }}>Item test</div>
          <div style={{ display: "inline-block", width: 250, margin: 15, padding: 50, border: '1px solid gray', borderRadius: 10 }}>Item test</div>
        </Sliderko>
      </div>
    )
  }
}
