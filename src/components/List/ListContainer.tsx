import React from 'react';
import { useState, useEffect } from "react";
import List from './List'

interface ListProps {}

export interface listItem {
    title : string,
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
            
        const newItem : listItem = {title : text, children : []};
        
        setListObj([...listObj, newItem]);
        setNewItemText('');
    }

    function addSubItem(text : string, parentItem : listItem) {
        if(!text || text.length === 0) 
            return;

        const newItem : listItem = {title : text, children : []};
     
        parentItem.children?.push(newItem);
        setListObj([...listObj]);
        setNewItemText('');
    }

    function removeItem(parentItem : listItem) {
      setListObj(filterID(parentItem, listObj));
    }

    //https://stackoverflow.com/questions/53979950/remove-children-from-a-nested-array-using-recursion
    function filterID(parentItem : listItem, data : listItem[]) {
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
        <div>
          <form >
            <label>
            New Item:
            <input type="text" name="name" value={newItemText} onChange={(e) => setNewItemText(e.target.value)}/>
            </label>
            <input type="submit" value="Submit" onClick={(e) => {e.preventDefault(); addItem(newItemText)}}/>
          </form>

        </div>

        <List nestLevel={1} listItems={listObj} addSubItem={addSubItem} removeItem={removeItem} newItemText={newItemText}/>
          
      </div> 
    )
}

export default ListContainer;
