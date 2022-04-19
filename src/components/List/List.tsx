import React from 'react';
import { listItem } from './ListContainer'

interface ListProps {listItems : listItem[],  //primary data source that holds the to-do list
                      newItemText : string, //use input text used to generate new child list items
                      nestLevel : number, //numeric value that represents how deeply nested a list item is; used to generate proper indentation of child items
                      addSubItem(text : string, parentItem : listItem): void, //function to add recursive child-items to the list data structure
                      removeItem(parentItem : listItem) : void //function to remove an individual item and all of its children from the list data structure
                    } 

  //I am not sure how strong the pattern of passing in functions as properties like this is, especially since it may make testing this component on its own without the list container more difficult.                  

  function List(props : ListProps) {

    return(
    <div>
      <ul>
        {props.listItems.map((listItem : any) => (
          <div>
            <li key={listItem.todo} style={{paddingLeft : (5 * props.nestLevel - 1).toString().concat("em")}}> {listItem.todo}
              <button className='buttons' name="subAdd" onClick={() => props.addSubItem(props.newItemText, listItem)}>ADD</button>
              <button className='buttons' name="remove" onClick={() => props.removeItem(listItem)}>REMOVE</button> 
            </li>
            {listItem.children && <List nestLevel={props.nestLevel + 1} listItems={listItem.children} addSubItem={props.addSubItem} removeItem={props.removeItem} newItemText={props.newItemText}/>}
          </div>
        ))}
      </ul>
    </div>
    );

  }


export default List;
