import {React, Component, useState} from 'react'




export default class PageHolder
{
  

  constructor(props, scene) 
  {
    this.curentPage=props;
    
    this.scene = scene
    
    
    
    
  }

  GetCurentPage(){
    return this.scene
    
  }
  SetCurentPage(pageInput, scene){
    
    this.curentPage =pageInput
    setDisplayPage(scene)
    this.scene = scene
  }
  
}






