import styled, { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`
  .button{
    border: 1px solid #1685f5;
    padding: 8px 10px;
    border-radius: 3px;
    outline: none !important;
    background: #39F;
    color: white;
    cursor: pointer;
  }
  .button:hover{
    background: #1685f5;
  }

  .goto-button{
    border: 1px solid #3ba600;
    padding: 8px 10px;
    border-radius: 3px;
    outline: none !important;
    background: #3ba600;
    color: white;
    cursor: pointer;
  }
  .goto-button:hover{
    background: #2a7500;
  }
  .float-left{
    float: left;
  }

  .float-right{
    float: right;
  }

  .mt15{
    margin-top : 15px;
  }
  .floating-button{
    position:fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:40px;
    background-color:#0C9;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
    cursor: pointer;
    border: none;
    outline: none !important;
  }
  .tour-box {
    padding: 0 !important;
    background: #ffffff;
    border-radius: 10px !important;
    width: 350px;
  }
  .tour-content{
    width: 100%;
    border-radius: 10px !important;
  }
  .tour-image{
    height: 200px;
    background-color: #dddddd;
    border-top-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
    text-align: center;
    padding: 15px;
  }
  .tour-image img{
    border-radius: 5px;
    box-shadow: 4px 4px 3px #aaa;
    max-width: 100% !important;
    max-height: 100%;
  }
  .tour-text{
    padding: 10px 15px;
    font-size: 14px;
  }
  .tour-buttons{
    padding: 10px 15px;
  }

  .tour-box > div:nth-child(3){
    width: 100%;
    text-align: center !important;
    display: block !important;
    margin: 0;
    padding: 10px;
    position: relative !important;
  }
  .tour-box > div:nth-child(3) > button:nth-child(1){
    display: inline !important;
    margin-right: 10px;
    position: absolute;
    top:20px;
    left:15px;
  }
  .tour-box > div:nth-child(3) > nav:nth-child(2){
    display: inline-flex !important;

  }
  .tour-box > div:nth-child(3) > button:nth-child(3){
    display: inline !important;
    margin-left: 10px;
    position: absolute;
    top:20px;
    right:35px;

  }
  .title{
    font-size: 16px;
  }`
export { GlobalStyle};
