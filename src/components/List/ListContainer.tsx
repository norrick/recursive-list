import React from 'react';
import { useState, useEffect } from "react";
import List from './List'

interface ListProps {}

export interface listItem {
    todo : string,
    children? : listItem[]
}

function ListContainer() {
   
      const [newItemText, setNewItemText] = useState("");
      const [listObj, setListObj] = useState(
        JSON.parse(localStorage.getItem('list-data') || '[]'));

      React.useEffect(() => {
        localStorage.setItem('list-data', JSON.stringify(listObj));
      }, [listObj]);
   
    function addItem(text : string) {
        if(!text || text.length === 0) 
            return;
            
        const newItem : listItem = {todo : text, children : []};
        
        setListObj([...listObj, newItem]);
        setNewItemText('');
    }

    function addSubItem(text : string, parentItem : listItem) {
        if(!text || text.length === 0) 
            return;

        const newItem : listItem = {todo : text, children : []};
     
        parentItem.children?.push(newItem);
        setListObj([...listObj]);
        setNewItemText('');
    }

    function removeItem(parentItem : listItem) {
      setListObj(filterID(parentItem, listObj)); 
    }
   
    //I believe this to be an optimized solution to the problem of recursive deletion. 
    //Most soltions, including the one I originally created, involved copying the array numerous times to update the state of listObj for every recursive call
    //In this situation, a new array is created and passed between the function calls by reference, so the array only needs to be copied once
    function filterID(parentItem : listItem, data : listItem[]) {  // found at https://stackoverflow.com/questions/53979950/remove-children-from-a-nested-array-using-recursion
      return data.reduce((arr : listItem[], item) => {
        if (item !== parentItem) {
          if (item.children) item.children = filterID(parentItem, item.children)
          arr.push(item)
        }
        return arr  
      }, [])
    }

    return(
      <div className="container">
        <div className='inputArea'>
          <form >
            <label>
            New Item:
            </label>
            <input type="text" name="name" value={newItemText} onChange={(e) => setNewItemText(e.target.value)}/>
           
            <input  className='buttons' type="submit" value="Submit" onClick={(e) => {e.preventDefault(); addItem(newItemText)}}/>
          </form>
        </div>

        <div className="listItems">
          <List nestLevel={1} listItems={listObj} addSubItem={addSubItem} removeItem={removeItem} newItemText={newItemText}/>
        </div>
      </div> 
    )
}

export default ListContainer;
