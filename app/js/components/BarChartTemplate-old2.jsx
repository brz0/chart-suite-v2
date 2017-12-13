/* eslint-disable radix */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import domtoimage from 'dom-to-image';
import PropTypes from 'prop-types';
import ActionBtn from './ActionBtn.jsx';
import InL from './InputChartMenu.jsx';
import stateData from '../StateData.jsx';
import logoUrl from './../../img/logo.svg';
import chartMenuIcon from './../../img/gear.svg';

const Menu = require('react-burger-menu').stack;

export default class BarChartTemplate extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = stateData;
    }
  
    hC(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }
  
    exportPng() {
      var node = document.querySelector('.recharts-responsive-container');
      domtoimage.toPng(node)
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          document.getElementById('canvasexport').appendChild(img);
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }
  
    render() {
  
      let data = [
        {name: this.state.y0, uv: this.state.Cat2Box0, pv: this.state.Cat1Box0},
        {name: this.state.y1, uv: this.state.Cat2Box1, pv: this.state.Cat1Box1},
        {name: this.state.y2, uv: this.state.Cat2Box2, pv: this.state.Cat1Box2},
        {name: this.state.y3, uv: this.state.Cat2Box3, pv: this.state.Cat1Box3},
        {name: this.state.y4, uv: this.state.Cat2Box4, pv: this.state.Cat1Box4},
        {name: this.state.y5, uv: this.state.Cat2Box5, pv: this.state.Cat1Box5},
      ];
  
      data.length = this.state.arrayX;
  
      var isMenuOpen = function(state) {
        if (state.isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "scroll";
        }
      };
  
      return (
        <div>
          <ActionBtn />
          <Link to="/" className="chartBrand">
            <img src={logoUrl} width="220" alt="Chart Suite" />
          </Link>
  
          <div className="chartWrap">
            <ResponsiveContainer>
              <BarChart  data={data} width={1600} height={1000}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis type="number" dataKey="1000000000000"
                  domain={[parseInt(this.state.minNum), parseInt(this.state.maxNum)]} allowDataOverflow={true} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/><Legend />
                <Bar type="monotone" dataKey="pv" name={this.state.catOne} fill="#5a67f4" activeDot={{r: 8}}/>
                <Bar type="monotone" dataKey="uv" name={this.state.catTwo} fill="#98ca29" />
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          <Menu right onStateChange={ isMenuOpen } customBurgerIcon={ <img src={chartMenuIcon} /> } >
            <h2>Chart Settings</h2>
  
            <span className="chartEditorLabel">Categories</span>
            <InL val={this.state.catOne} ph="Category" onC={this.hC.bind(this, 'catOne')} />
            <InL val={this.state.catTwo} ph="Category" onC={this.hC.bind(this, 'catTwo')} />
  
            <span className="chartEditorLabel">Min/Max Y Value</span>
            <InL val={this.state.minNum} ph="Min" onC={this.hC.bind(this, 'minNum')} />
            <InL val={this.state.maxNum} ph="Max" onC={this.hC.bind(this, 'maxNum')} />
  
            <span className="chartEditorLabel">X Values</span>
            <div className="amountWrap">
            {Array.apply(null, Array(5)).map(function(item, i){
              return ( <a key={'arrayVal' + i} onClick={()=> this.setState({arrayX: i + 2})}><button>{i + 2}</button></a> );
            }, this)}
            </div>
  
            {Array.apply(null, Array(this.state.arrayX)).map(function(item, i){
              return ( <InL val={eval('this.state.y' + i)} key={'xVal' + i} ph={'X Val ' + i } onC={this.hC.bind(this, "y" + i)} /> );
            }, this)}
            <br />
  
            <span className="chartEditorLabel">Y Values: <strong>{this.state.catOne}</strong></span>
            {Array.apply(null, Array(this.state.arrayX)).map(function(item, i){
              return ( <InL val={eval('this.state.Cat1Box' + i)} key={'Y1Val' + i} ph={'Y Val ' + i } onC={this.hC.bind(this, "Cat1Box" + i)} /> );
            }, this)}
            <br />
  
            <span className="chartEditorLabel">Y Values: <strong>{this.state.catTwo}</strong></span>
            {Array.apply(null, Array(this.state.arrayX)).map(function(item, i){
              return ( <InL val={eval('this.state.Cat2Box' + i)} key={'Y2Val' + i} ph={'Y Val ' + i } onC={this.hC.bind(this, "Cat2Box" + i)} /> );
            }, this)}
            <br />
  
            <button onClick={this.exportPng} className="exportPngBtn">Save as PNG</button><br />
            <div id="canvasexport" className="exportedPng"></div>
          </Menu>
        </div>
      )
    }
  }