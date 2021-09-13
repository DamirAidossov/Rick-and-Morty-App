import React from 'react';
export {CharCardMin}
function CharCardMin(props) { //Component to render character short info in main window  
    return(
        <div className="charCard">
            <p>Name: <b>{props.value.name}</b></p>
            {/* onClick action on image to open modal popup window with full character info*/}
            <img src={props.value.image} alt="" onClick={(e) => {props.openModal(e, props.value.id)}}></img>
            <p>Status: {props.value.status}</p>
            <p>Species: {props.value.species}</p>
            <p hidden={!props.value.type}>Type: {props.value.type}</p>
            <p>Gender: {props.value.gender}</p>
        </div>
    );
}


