import React from 'react';
import './CorrelationResults.css';

export const CorrelationResults = ({table}) => 
  <>
    <h1>{"Correlation results"}</h1>
    <div className={"table-container"}>
      {table}
    </div>
  </>