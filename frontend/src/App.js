import React from 'react';
import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      todoList:[],
      activeItem:{
        id:null,
        title:'',
        completed:false
      },
      editing:false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };
  componentDidMount(){
    this.fetchTasks()

  }
  fetchTasks(){
    console.log('gggg');
    fetch('http://127.0.01:8000/api/task-list/')
    .then(response => response.json()) 
    .then(data =>
      this.setState({
        todoList:data
      })
    )
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log('name', name);
    console.log('value', value);

    this.state({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(('itm', this.state.activeItem));
    
  }


  render(){
    var tasks = this.state.todoList
    return(
      <div className="container">
        <div id="task-container">
            <div id="form-wrapper">
                <form onSubmit={this.handleSubmit} id="form">
                  <div className="flex-wrapper">
                    <div style={{flex: 6}}>
                      <input onChange={this.handleChange} className="form-control" id="title" type="text" name="title" placeholder="add task"/>
                    </div>
                    <div style={{flex: 1}}>
                      <input className="btn btn-warning" id="submit"  type="submit" name="add"/>
                    </div>
                  </div>
                </form>
            </div>
          <div id="list-wrapper">
            {tasks.map((task, index) => 
              <div key ={index} className="task-wrapper flex-wrapper">

                <div style={{flex:7}}>
                  <span>{task.title}</span>
                </div>
                <div style={{flex:1}}>
                <button className="btn btn-sm btn-outline-info">Edit</button>
                </div>
                <div style={{flex:1}}>
                <button className="btn btn-sm btn-outline-dark delete">-</button>
                </div>

              </div>)
            }
          </div>
        </div>
      </div>
    )
      
    
  }
}



export default App;