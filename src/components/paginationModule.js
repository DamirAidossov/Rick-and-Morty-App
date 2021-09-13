import React from 'react';

//component to render pagination bar in the bottom of the app
function PaginationModule(props){
    let lastPage = parseInt(props.lastPage)
    let currPage = parseInt(props.currPage)
    if(lastPage <= 5){  //if there are 5 pages or less rendering pages without buttons "First","Last","Prev","Next"
        let arr=[]
        for(let i=1 ; i<lastPage+1 ; i++){
            arr.push(i)
        }
        return(
            <div className="centered">
                <div className="pagination" >
                    {arr.map((pages) =>
                    <button className={currPage===pages? "active" : ""} disabled={currPage===pages} key={pages} onClick={(e) => {props.changePage(parseInt(pages), e)}} > {pages}</button>
                    )}
                </div>
            </div>
        );
    } else if(currPage === 1){ 
        //if current page is first render pagination bar with disabled button "first","prev"
        return (
            <div className="centered">
                <div className="pagination">
                    <button disabled={true}>First</button>
                    <button disabled={true} >Prev.</button>
                    <button className="active" disabled={true}>{currPage}</button>
                    <button onClick={(e) => {props.changePage(currPage+1, e)}}>{currPage+1}</button>
                    <button onClick={(e) => {props.changePage(currPage+2, e)}}>{currPage+2}</button>
                    <span>...</span>
                    <button onClick={(e) => {props.changePage(lastPage, e)}}>{lastPage}</button>
                    <button onClick={(e) => {props.changePage(currPage+1, e)}} >Next</button>
                    <button onClick={(e) => {props.changePage(lastPage, e)}}>Last</button>
                </div>
            </div>
        )
    } else if(currPage > 1 && currPage < (lastPage - 1)){
        //pagination bar with pages displayed depending on current page
        return (
            <div className="centered">
                <div className="pagination">
                    <button onClick={(e) => {props.changePage(1, e)}}>First</button>
                    <button onClick={(e) => {props.changePage(currPage-1, e)}} >Prev.</button>
                    <button onClick={(e) => {props.changePage(currPage-1, e)}}>{currPage-1}</button>
                    <button className="active" disabled={true}>{currPage}</button>
                    <button onClick={(e) => {props.changePage(currPage+1, e)}}>{currPage+1}</button>
                    <span>...</span>
                    <button onClick={(e) => {props.changePage(lastPage, e)}} >{lastPage}</button>
                    <button onClick={(e) => {props.changePage(currPage+1, e)}} >Next</button>
                    <button onClick={(e) => {props.changePage(lastPage, e)}}>Last</button>
                </div>
            </div>
        )
    }  else if(currPage === lastPage - 1){
        //if current page is last but one pagination bar will render without 3 dots span
        return (
            <div className="centered">
                <div className="pagination">
                    <button onClick={(e) => {props.changePage(1, e)}}>First</button>
                    <button onClick={(e) => {props.changePage(currPage-1, e)}} >Prev.</button>
                    <button onClick={(e) => {props.changePage(currPage-1, e)}}>{currPage-1}</button>
                    <button className="active" disabled={true}>{currPage}</button>
                    <button onClick={(e) => {props.changePage(currPage+1, e)}}>{currPage+1}</button>
                    <button onClick={(e) => {props.changePage(currPage+1, e)}} >Next</button>
                    <button onClick={(e) => {props.changePage(lastPage, e)}}>Last</button>
                </div>
            </div>
        )
    } else if(currPage === lastPage){
        //if current page is last render pagination bar with disabled button "Next","Last"
        return (
            <div className="centered">
                <div className="pagination">
                    <button onClick={(e) => {props.changePage(1, e)}}>First</button>
                    <button onClick={(e) => {props.changePage(currPage-1, e)}} >Prev.</button>
                    <button onClick={(e) => {props.changePage(currPage-2, e)}}>{currPage-2}</button>
                    <button onClick={(e) => {props.changePage(currPage-1, e)}}>{currPage-1}</button>
                    <button className="active" disabled={true}>{currPage}</button>
                    <button disabled={true}>Next</button>
                    <button disabled={true}>Last</button>
                </div>
            </div>
        )
    }
}

export {PaginationModule};