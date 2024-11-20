import React from 'react';
import ReactDOM from 'react-dom';
const App = () => <div>Hello, Webpack!</div>;
// @ts-expect-error - This is a known issue with React 18
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
