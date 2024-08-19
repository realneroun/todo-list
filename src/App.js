import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Control from "./components/Control";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
    };
  }

  componentDidMount() {
    console.log("Component Will Mount");
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateID(),
        name: "hoc lap trinh",
        status: true,
      },
      {
        id: this.generateID(),
        name: "ngu",
        status: false,
      },
      {
        id: this.generateID(),
        name: "choi",
        status: true,
      },
    ];
    console.log(tasks);
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4();
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };

  onCloseForm = () =>{
    console.log("hehe")
    this.setState({
      isDisplayForm: false,
    });
  }

  render() {
    var { tasks, isDisplayForm } = this.state;
    var elmTaskForm = isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm} /> : "";
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"  />
              Thêm Công Việc
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onGenerateData}
            >
              <span className="fa fa-plus mr-5" />
              Generate Data
            </button>
            <Control />
            <div className="row mt-15">
              <TaskList tasks={tasks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
