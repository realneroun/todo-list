import React, {Component} from "react";

class Sort extends Component{
  constructor(props){
    super(props)
  }

  // UNSAFE_componentWillReceiveProps(nextProps){
  //   console.log(nextProps)
  // }

  onClick = (sortByte,sortValue) => {
    this.props.onSort(sortByte,sortValue);
  }
    render(){
      var [sortByte,sortValue] = ['',1]
        return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick={()=> this.onClick('name',1)}>
                  <a role="button" className={(this.props.sortByte === 'name' && this.props.sortValue === 1 ) ? "sort-selected" : ''}>
                    <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                  </a>
                </li>
                <li onClick={()=> this.onClick('name',-1)}>
                  <a role="button" className={(this.props.sortByte === 'name' && this.props.sortValue === -1 ) ? "sort-selected" : ''}>
                    <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
                  </a>
                </li>
                <li role="separator" className="divider" />
                <li onClick={()=> this.onClick('status',1)}>
                  <a role="button" className={(this.props.sortByte === 'status' && this.props.sortValue === 1 ) ? "sort-selected" : ''} >Trạng Thái Kích Hoạt</a>
                </li>
                <li onClick={()=> this.onClick('status',-1)}>
                  <a role="button" className={(this.props.sortByte === 'status' && this.props.sortValue === -1 ) ? "sort-selected" : ''}>Trạng Thái Ẩn</a>
                </li>
              </ul>
            </div>
          </div>
        )
    }
}

export default Sort;