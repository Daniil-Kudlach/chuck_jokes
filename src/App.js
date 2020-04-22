import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {jokes: []};
  }
  render(){
    return (
      <div className="App">
        <button onClick={this.handleClick}>Click me</button>
    {this.state.jokes.length <= 0?'':<Jokes jokes={this.state.jokes} />}
      </div>
    )
  } 

  handleClick(){
    fetch('https://api.icndb.com/jokes/random')
    .then(response => response.json())
    .then(({value})=>{
      let found = this.state.jokes.find(el => el.id === value.id);
      if(found === undefined){
        this.setState({jokes:[value].concat(this.state.jokes)});
      }
    })
  }
}

function Jokes(props){
    return <ul>{props.jokes.map(el=><li key={el.id}><span>{el.joke.replace(/&\w+;/g, '"')}</span></li>)}</ul>;
}

export default App;
