import { ReactElement } from 'react';

import { Autocomplete } from './components/Autocomplete';

import './App.css';

function App(): ReactElement {
  return (
    <div className="app">
      <h1>Autocomplete</h1>

      <Autocomplete />
    </div>
  );
}

export default App;
