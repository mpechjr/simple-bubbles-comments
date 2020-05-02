import React from 'react';
import imageA from './logo512.png';
 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";


//for each image send either an empty array or array as 
var positions = JSON.parse('[ ]')
var comments = JSON.parse('[]')

function Main() {

    
    return (
    <div className="App">


      <div className="container">

               <div className="row">
                  <div className="col-md-3">
                     <h1>Simple Bubble Comments</h1>
                  </div>
                  <div className="col-md-9">
                              <div className="row">
                                  <div className="col-md-12">
                              <App sourceID="imageA" imageSource={imageA} savedLocations={positions} comments={comments} />
                                  </div>
                                  </div>
                          
                  </div>
              </div>

      </div>
    </div>
      )
      }

export default Main;
