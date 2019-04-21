import React from 'react';
import { useCorrelationResults } from './hooks/useCorrelationResults';
import { CorrelationResults } from './components/CorrelationResults/CorrelationResults';
import './App.css';

function App({databaseRef}) {
  const [isLoading, table] = useCorrelationResults(databaseRef)
  return (
    <div className="App">
        {isLoading 
          ? "loading..." 
          : <CorrelationResults table={table}/>}
    </div>
  );
}

export default App;
