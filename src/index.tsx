import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(<App />, document.getElementById('app'))

function createObject(this: Object | void) {
  console.log('outermost this', this)
  return {
    arrowFunction: () => {
      console.log('arrowFunction this: ', undefined)
    },
    functionKeywordFunction: function(this) {
      console.log('functionKeywordFunction this,', this)
    }
  }
}

const obj = createObject()
console.log('obj', obj)
obj.arrowFunction()
obj.functionKeywordFunction()
