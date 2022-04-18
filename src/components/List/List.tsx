import React from 'react';
import { listItem } from './ListContainer'

interface ListProps {listItems : any,  
                      newItemText : string, 
                      nestLevel : number,
                      addSubItem(text : string, parentItem : listItem): void, 
                      removeItem(parentItem : listItem) : void
                    } 

  //I am not sure how strong the pattern of passing in functions as properties like this is, especially since it may make testing this component on its own without the list container more difficult.                  

  function List(props : ListProps) {

    return(
    <div>
      <ul>
        {props.listItems.map((listItem : any) => (
          <div>
            <li key={listItem.title} style={{paddingLeft : (10 * props.nestLevel - 1).toString().concat("em")}}> {listItem.title}
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
