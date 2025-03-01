import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Control from "./components/Control";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sortByte: "name",
      sortValue: 1,
    };
  }


  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null,
    });
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  // onSubmit = (data) => {
  //   var { tasks } = this.state;
  //   if (data.id === "") {
  //     data.id = this.generateID();
  //     tasks.push(data);
  //   } else {
  //     var index = this.findIndex(data.id);
  //     tasks[index] = data;
  //   }

  //   this.setState({
  //     tasks: tasks,
  //     taskEditing: null,
  //   });
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = _.findIndex(tasks, (o) => {
      return o.id === id;
    });
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        return (result = index);
      }
    });
    return result;
  };

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
  };

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });
    this.onShowForm();
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  onSort = (sortByte, sortValue) => {
    this.setState({
      sortByte: sortByte,
      sortValue: sortValue,
    });
  };

  render() {
    var {
      isDisplayForm,
      taskEditing,
      // filter,
      // keyword,
      sortByte,
      sortValue,
    } = this.state;
    // if (sortByte === "name") {
    //   tasks.sort((a, b) => {
    //     if (a.name > b.name) return sortValue;
    //     else if (a.name < b.name) return -sortValue;
    //     else return 0;
    //   });
    // } else
    //   tasks.sort((a, b) => {
    //     if (a.status > b.status) return -sortValue;
    //     else if (a.status < b.status) return sortValue;
    //     else return 0;
    //   });
    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }

    //   tasks = tasks.filter((task) => {
    //     if (filter.status === -1) {
    //       return task;
    //     } else {
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   });
    // }
    // if (keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    // }

    // tasks = _.filter(tasks, (o) => {
    //   return o.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    // });

    var elmTaskForm = isDisplayForm ? (
      <TaskForm
        // onSubmit={this.onSubmit}
        task={taskEditing}
        onCloseForm={this.onCloseForm}
      />
    ) : (
      ""
    );
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortByte={sortByte}
              sortValue={sortValue}
            />
            <div className="row mt-15">
              <TaskList
                onUpdateStatus={this.onUpdateStatus}
                onUpdate={this.onUpdate}
                onDelete={this.onDelete}
                onFilter={this.onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
