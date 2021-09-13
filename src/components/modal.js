import React, {useState, useEffect} from 'react';
export {CharModal} 

function CharModal (props) { //Modal popup window with full charachter info
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        if(props.modalState === true && display===false){
            setDisplay(true);
        } else if(display===true && props.modalState === false) {
            setDisplay(false);
        }
    }, [display, props]);

    function hideModal(){
        props.setModalState(false)
    }

    let btn_class = display ? "modal-show modal" : "modal-hide modal";
    return (
        <div className={btn_class}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={hideModal} >&times;</span>
                    <h2>{props.char.name}</h2>
                </div>
                <div className="modal-body">
                    <img src={props.char.image} alt=""></img>
                    <p>Status: {props.char.status}</p>
                    <p>Species: {props.char.species}</p>
                    <p>Type: {props.char.type}</p>
                    <p>Gender: {props.char.gender}</p>
                    <p>Origin: {props.char.origin? props.char.origin.name : ""}</p>
                    <p>Location: {props.char.location? props.char.location.name : ""}</p>
                </div>
                <div className="modal-footer">
                </div>
            </div>  
        </div>
    );
}

  
  