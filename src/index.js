
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {CharCardMin} from './components/charCardMin.js'
import {PaginationModule} from './components/paginationModule.js'
import {FilterBar} from './components/filterBar.js' 
import {CharModal} from './components/modal.js'

//component for navigation bar on top of the screen with title and filter bar
class NavBar extends React.Component { 
  constructor(props) {
    super(props)
    this.changeFilter = this.changeFilter.bind(this)
  }
  changeFilter(newFilter, e){
    e.preventDefault();
    this.props.changeFilter(newFilter, e)
  }
  render() {
    return (
      <div className="flex-row navContainer">
          <div className="projectTitle">Rick and Morty Characters List</div>
          <FilterBar changeFilter = {this.changeFilter} className="filterContainer" />
      </div>
    );
  }
}

class MainScreen extends React.Component{ //main block of app with characters list
    constructor(props){
      super(props)
      this.openModal = this.openModal.bind(this);
      this.charModalElement = React.createRef();
      this.state = {charInfo: {}};
    }
    openModal(e, id){//on image click send request to api with character id and opens character popup modal window
      e.preventDefault();
      
      fetch('https://rickandmortyapi.com/api/character/'+id)
        .then(response => response.json())
        .then(data => {
            this.setState({
              charInfo : data
            }, ()=>{
              this.charModalElement.current.modalOpen()
            })
        }); 
    }
    render() {
      const cards = this.props.cards;
      
      if(cards.length){
        return (
          <div className="cardsContainer" >
            {cards.map((char) => //creating list of cards
              <CharCardMin openModal={this.openModal} key={char.id} value={char} />
            )}
            {/* Hidden Modal window */}
            <CharModal ref={this.charModalElement} openModal={this.openModal} char={this.state.charInfo}/>
          </div>
        );
      } else{
        //render text if there is no data found on query
        return(
          <div className="cardsContainerNoData" >
            <p className="notFound">{"Characters not found :("}</p>
          </div>
        );
      }
    }
}

class App extends React.Component { //Main component which renders to root element
    constructor(props) {
      super(props)
      this.state = {
        currPage: 1, 
        cards: this.props.cards, 
        lastPage: this.props.lastPage,
        status: undefined,
        species: undefined,
        gender: undefined,
        type: undefined,
        name: undefined,
      };
      this.changePage = this.changePage.bind(this)
      this.getLink = this.getLink.bind(this)
      this.changeFilter = this.changeFilter.bind(this)
    }
    //when page clicked on pagination bar this function called
    changePage(newPage,e) {
      e.preventDefault();
      if(newPage !== this.state.currPage){
        this.getLink(newPage)
      }
    }
    //when filter applied this function called
    changeFilter(newFilter, e){
      e.preventDefault();
      delete newFilter['changed'];
      newFilter['currPage'] = 1;
      this.setState(newFilter, ()=>{
        this.getLink(this.state.currPage)
      })
    }
    //after filter applied or page chosen send request to rick and morty api and render character cards
    getLink(newPage){
      console.log(this.state)
      let link = 'https://rickandmortyapi.com/api/character/?page='+newPage
      if(this.state.status){
        link=link +'&status='+this.state.status
      }
      if(this.state.species){
        link= link +'&species='+this.state.species
      }
      if(this.state.gender){
        link= link +'&gender='+this.state.gender
      }
      if(this.state.type){
        link= link +'&type='+this.state.type
      }
      if(this.state.name){
        link= link +'&name='+this.state.name
      }
      console.log(link)
        fetch(link)
        .then(response => response.json())
        .then(data => {
          if(!data.error){
            this.setState({
              cards : data.results,
              currPage : newPage,
              lastPage : data.info.pages
            })
          } else {
            this.setState({
              cards : [],
              currPage : 1,
              lastPage : 1
            })
          }
        }); 
    }
    render() {
      let cards = this.state.cards;
      let currPage = this.state.currPage;
      let lastPage = this.state.lastPage;
      return (
        <div className="appContainer">
            <NavBar changeFilter = {this.changeFilter} />
            <MainScreen className="mainContainer" cards={cards} currPage={currPage} />
            <PaginationModule changePage = {this.changePage} lastPage={lastPage} currPage={currPage} />
        </div>
      );
    }
    
}

//initial request to api to get first page of characters and mount react app to root element
fetch('https://rickandmortyapi.com/api/character/?page=1')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          ReactDOM.render(
            <App cards={data.results} lastPage={data.info.pages}/>,
            document.getElementById('root')
          );
        });  

  