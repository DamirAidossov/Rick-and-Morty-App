import React from 'react';



class FilterBar extends React.Component {   //Component with all inputs to filter data
    constructor(props) {
    super(props);
        this.state = {//state for filter info, all filters are set to undefined until user apply them
            status: undefined,
            species: undefined,
            gender: undefined,
            type: undefined,
            name: undefined,
            changed: false
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e, key){ //function to either set state from user input or set to undefined if deleted
        e.preventDefault();
        let data = {}
        if(e.target.value !== ''){
            data[key] = e.target.value;
        } else {
            data[key] = undefined;
        }
        
        data['changed'] = true
        this.setState(data)
    }
    render(){
        return(
            <div className="filterContainer flex-row">
                <div className="group">
                    {/*text input for name value*/}
                    <input type="text" value={this.state.name !== undefined ? this.state.name : ''} onChange={(e) => {this.handleChange(e, 'name')}} ></input>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Name</label>
                </div>
                <div className="group">
                    {/*text input for species value*/}
                    <input type="text" value={this.state.species !== undefined ? this.state.species : ''} onChange={(e) => {this.handleChange(e, 'species')}} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Species</label>
                </div>
                <div className="group">
                    {/*text input for type value*/}
                    <input type="text" value={this.state.type !== undefined ? this.state.type : ''} onChange={(e) => {this.handleChange(e, 'type')}} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Type</label>
                </div>
                <div className="group">
                    {/*select input for gender value*/}
                    <label className="selectLabel" >Gender</label>
                    <select className="selectInput" value={this.state.gender !== undefined ? this.state.gender : ''} onChange={(e) => {this.handleChange(e, 'gender')}}>
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
                    <select className="selectInput" value={this.state.status !== undefined ? this.state.status : ''} onChange={(e) => {this.handleChange(e, 'status')}}>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="unknown">unknown</option>
                        <option value="">Any</option>
                    </select>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    
                </div>
                {/*button to apply filter settings and send request to rickAndMortyAPI */}
                <button className="buttonApply" disabled={!this.state.changed} onClick={(e) => {this.props.changeFilter(this.state, e); this.setState({changed: false})}} >Apply</button>
            </div>
        )
    }
}

export {FilterBar};