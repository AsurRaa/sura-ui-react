
## General Example with React to Print 
- [original example](https://codesandbox.io/s/tailwind-react-sandbox-forked-q1tdg?fontsize=14&hidenavigation=1&module=/src/App.js&theme=dark&file=/src/index.js:0-882)
```js
import ReactDOM from "react-dom";
import Resume from "../components/resume";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const App = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    //   print in then
    handlePrint()
  })
  .then(json => //console.log(json))

  return (
    <div className="bg-gray-200 p-6">
      <button
        type="button"
        className="bg-gray-500 border border-gray-500 p-2 mb-4"
        onClick={handlePrint}
      >
        {" "}
        Print Resume{" "}
      </button>

      {/* i can hidden now */}
      <div style={{display:none}}>
       <Resume ref={componentRef} />
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```

### Another Example with Hidden file

- [original][https://codesandbox.io/s/jvpjkz0x5?file=/example/index.js] - original example
```js
import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className='print-source'>
        <table>
          <thead>
            <tr>
              <th>column 1</th>
              <th>column 2</th>
              <th>column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;

```