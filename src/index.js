/* eslint-disable react-hooks/exhaustive-deps */

import React , {useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {CharCardMin} from './components/charCardMin.js'
import {PaginationModule} from './components/paginationModule.js'
import {FilterBar} from './components/filterBar.js' 
import {CharModal} from './components/modal.js'



//component for navigation bar on top of the screen with title and filter bar
function NavBar(props){ 
  function changeFilter(newFilter, e){
    e.preventDefault();
    props.changeFilter(newFilter, e)
  }
  return (
    <div className="flex-row navContainer">
        <div className="projectTitle">Rick and Morty Characters List</div>
        <FilterBar changeFilter = {changeFilter} className="filterContainer" />
    </div>
  );
}

function MainScreen(props){ //main block of app with characters list
    const [charInfo, setCharInfo] = useState({})
    const [modalState, setModalState] = useState(false)

    function openModal(e, id){//on image click send request to api with character id and opens character popup modal window
      e.preventDefault();
      
      fetch('https://rickandmortyapi.com/api/character/'+id)
        .then(response => response.json())
        .then(data => {
          setCharInfo(data)
          setModalState(true)
        }); 
    }

    const cards = props.cards;
    
    if(cards.length){
      return (
        <div className="cardsContainer" >
          {cards.map((char) => //creating list of cards
            <CharCardMin openModal={openModal} key={char.id} value={char} />
          )}
          {/* Hidden Modal window */}
          <CharModal modalState={modalState} setModalState={setModalState} openModal={openModal} char={charInfo}/>
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

function App (props){ //Main component which renders to root element
    const [status, setStatus] = useState(undefined)
    const [species, setSpecies] = useState(undefined)
    const [gender, setGender] = useState(undefined)
    const [type, setType] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [currPage, setCurrPage] = useState(1)
    const [lastPage, setlastPage] = useState(props.lastPage)
    const [cards, setCards] = useState(props.cards)
    const [watcher, setWatcher] = useState(false)
    
    useEffect(() => {
      if (watcher === true) {
        setWatcher(false)
          getLink(currPage)
      } 
    },[watcher, getLink, currPage]);
    //when page clicked on pagination bar this function called
    function changePage(newPage,e) {
      e.preventDefault();
      if(newPage !== currPage){
        getLink(newPage)
      }
    }
    //when filter applied this function called
    function changeFilter(newFilter, e){
      e.preventDefault();
      setStatus(newFilter['status']);
      setSpecies(newFilter['species']);
      setGender(newFilter['gender']);
      setType(newFilter['type']);
      setName(newFilter['name']);
      setCurrPage(1)
      setWatcher(true)
      
      
    }
    //after filter applied or page chosen send request to rick and morty api and render character cards
    function getLink(newPage){
      let link = 'https://rickandmortyapi.com/api/character/?page='+newPage
      if(status){
        link=link +'&status='+status
      }
      if(species){
        link= link +'&species='+species
      }
      if(gender){
        link= link +'&gender='+gender
      }
      if(type){
        link= link +'&type='+type
      }
      if(name){
        link= link +'&name='+name
      }
        fetch(link)
        .then(response => response.json())
        .then(data => {
          if(!data.error){
            setCurrPage(newPage)
            setlastPage(data.info.pages)
            setCards(data.results)
          } else {
            setCurrPage(1)
            setlastPage(1)
            setCards([])
          }
        }); 
    }
    
    
    return (
      <div className="appContainer">
          <NavBar changeFilter = {changeFilter} />
          <MainScreen className="mainContainer" cards={cards} currPage={currPage} />
          <PaginationModule changePage = {changePage} lastPage={lastPage} currPage={currPage} />
      </div>
    );
    
    
}

//initial request to api to get first page of characters and mount react app to root element
fetch('https://rickandmortyapi.com/api/character/?page=1')
        .then(response => response.json())
        .then(data => {
          ReactDOM.render(
            <App cards={data.results} lastPage={data.info.pages}/>,
            document.getElementById('root')
          );
        });  

  