import React from 'react';
import './data.css'
export const Data = ( {data , display}) => {
  
    return(

        <div class="dataCard">
       
        <h1 className='dataInformation'>{display}</h1>
        <p class="dataNumber">{data}</p>
     
      </div> 

  )
};
