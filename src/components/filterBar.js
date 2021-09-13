import React, {useState} from 'react';
export {FilterBar};


function FilterBar (props){   //Component with all inputs to filter data
    const [status, setStatus] = useState(undefined)
    const [species, setSpecies] = useState(undefined)
    const [gender, setGender] = useState(undefined)
    const [type, setType] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [changed, setChanged] = useState(false)
    
    function handleChange(e, key){ //function to either set state from user input or set to undefined if deleted
        e.preventDefault();
        let data = {}
        if(e.target.value !== ''){
            data[key] = e.target.value;
        } else {
            data[key] = undefined;
        }
        switch (key) {
            case 'status':
                setStatus(data[key])
                break;
            case 'species':
                setSpecies(data[key])
                break;
            case 'gender':
                setGender(data[key])
                break;
            case 'type':
                setType(data[key])
                break;
            case 'name':
                setName(data[key])
                break;
            default:
                break;
        }
        setChanged(true)
    }

    return(
        <div className="filterContainer flex-row">
            <div className="group">
                {/*text input for name value*/}
                <input type="text" value={name !== undefined ? name : ''} onChange={(e) => {handleChange(e, 'name')}} ></input>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Name</label>
            </div>
            <div className="group">
                {/*text input for species value*/}
                <input type="text" value={species !== undefined ? species : ''} onChange={(e) => {handleChange(e, 'species')}} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Species</label>
            </div>
            <div className="group">
                {/*text input for type value*/}
                <input type="text" value={type !== undefined ? type : ''} onChange={(e) => {handleChange(e, 'type')}} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Type</label>
            </div>
            <div className="group">
                {/*select input for gender value*/}
                <label className="selectLabel" >Gender</label>
                <select className="selectInput" value={gender !== undefined ? gender : ''} onChange={(e) => {handleChange(e, 'gender')}}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">unknown</option>
                    <option value="">Any</option>
                </select>
                <span className="highlight"></span>
                <span className="bar"></span>
                
            </div>
            <div className="group">
                {/*select input for status value*/}
                <label className="selectLabel" >Status</label>
                <select className="selectInput" value={status !== undefined ? status : ''} onChange={(e) => {handleChange(e, 'status')}}>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">unknown</option>
                    <option value="">Any</option>
                </select>
                <span className="highlight"></span>
                <span className="bar"></span>
                
            </div>
            {/*button to apply filter settings and send request to rickAndMortyAPI */}
            <button className="buttonApply" disabled={!changed} onClick={(e) => {props.changeFilter({status:status, species:species, gender:gender, type:type, name:name, changed:changed}, e); setChanged(false)}} >Apply</button>
        </div>
    )
}

