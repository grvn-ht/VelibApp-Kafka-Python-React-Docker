import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import ApiState from "./ApiState"

export class ExampleM extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(result){
    if(result){
      this.setState({ result });
      console.log({'velib':'M','station active':'','code':window.location.search,'vKey':this.state.result});
      ApiState({'velib':'M','station active':'','code':window.location.search,'vKey':this.state.result});
      this.props.history.push("/");
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <div>
        <p>Scannez le QrCode situé sur le cadre du vélib' cassé!</p>
        <p>retournez la selle pour prévenir les autres utilisateurs please ;)</p>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
      </div>
    )
  }
}

export class ExampleE extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(result){
    if(result){
      this.setState({ result });
      console.log({'velib':'E','station active':'','code':window.location.search,'vKey':this.state.result});
      ApiState({'velib':'E','station active':'','code':window.location.search,'vKey':this.state.result});
      this.props.history.push("/");
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <div>
        <p>Scannez le QrCode situé sur le cadre du vélib' cassé!</p>
        <p>retournez la selle pour prévenir les autres utilisateurs please ;)</p>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
      </div>
    )
  }
}