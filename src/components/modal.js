import React from 'react';

class CharModal extends React.Component { //Modal popup window with full charachter info
    constructor(props) {
        super(props);
        this.state = { //state for dynamic conditional style set to modal window
          display: false,
        };

        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    modalOpen(){  //change display set to true to show modal window
        this.setState({
            display: true
        })
    }
    modalClose(){ //change display set to false to hide modal window
        this.setState({
            display: false
        })
    }
    render(){
        let btn_class = this.state.display ? "modal-show modal" : "modal-hide modal";
        return (
            <div className={btn_class}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.modalClose} >&times;</span>
                        <h2>{this.props.char.name}</h2>
                    </div>
                    <div className="modal-body">
                        <img src={this.props.char.image} alt=""></img>
                        <p>Status: {this.props.char.status}</p>
                        <p>Species: {this.props.char.species}</p>
                        <p>Type: {this.props.char.type}</p>
                        <p>Gender: {this.props.char.gender}</p>
                        <p>Origin: {this.props.char.origin? this.props.char.origin.name : ""}</p>
                        <p>Location: {this.props.char.location? this.props.char.location.name : ""}</p>
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>  
            </div>
        );
    }
}

export {CharModal} 
  
  