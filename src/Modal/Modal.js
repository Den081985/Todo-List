import React from "react";
import "./Modal.css";
//рендер модального окна с помощью класса,наследующего от реакт-компонента
export default class Modal extends React.Component {
  //state в классе записывается без хука
  state = {
    isOpen: false,
  };
  render() {
    return (
      <React.Fragment>
        <button
          className="openModalButton"
          onClick={() => this.setState({ isOpen: true })}
        >
          Open Modal
        </button>
        {this.state.isOpen && ( //если state=true рендерится модальное окно
          <div className="modal">
            <div className="modal-body">
              <h2 className="modal-item">Modal title</h2>
              <p className="modal-item">Todo modal block</p>
              <button
                className="modal-item"
                onClick={() => this.setState({ isOpen: false })}
              >
                Close modal
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
