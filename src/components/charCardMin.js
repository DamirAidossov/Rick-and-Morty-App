import React from 'react';

class CharCardMin extends React.Component { //Component to render character short info in main window  
    render(){
        return(
            <div className="charCard">
                <p>Name: <b>{this.props.value.name}</b></p>
                {/* onClick action on image to open modal popup window with full character info*/}
                <img src={this.props.value.image} alt="" onClick={(e) => {this.props.openModal(e, this.props.value.id)}}></img>
                <p>Status: {this.props.value.status}</p>
                <p>Species: {this.props.value.species}</p>
                <p hidden={!this.props.value.type}>Type: {this.props.value.type}</p>
                <p>Gender: {this.props.value.gender}</p>
            </div>
        );
    }
}


export {CharCardMin}