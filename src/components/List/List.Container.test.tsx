import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListContainer from './ListContainer';
import userEvent from '@testing-library/user-event';

describe('<ListContainer />', () => {
  test('it renders', () => {
    render(<ListContainer/>);
    
    const list = screen.getByTestId('ListContainer');
    expect(list).toBeInTheDocument();
  });


  test('has title and form submission', () => {
    const mockList = [
      {
        title: 'Item 1',
        children: [
          {
            title: 'Item 1.1',
            children: [
              {
                title: 'Item 1.1.1',
              },
            ],
          },
          {
            title: 'Item 1.2',
          },
        ],
      },
      {
        title: 'Item 2',
        children: [
          {
            title: 'Item 2.1',
          },
        ],
      },
    ];
    render(<ListContainer />);
    expect(screen.getByText("Recursive To-Do List")).toBeInTheDocument();
    expect(screen.getByText("New Item:")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Submit")).toBeInTheDocument();
  });

  //test does not pass. I do not have direct experience using this testing framework and did what I could with the available time I had. Unfortunately it was not enough to get the tests working how I would have liked, but I wrote some code anyways that demonstrates a little about my understanding of what I would have tested and how, rather than getting hung up on mostly semantic issues
  test('it adds and removed base item', () => {
    
    userEvent.type(screen.getByRole("textbox", {name: "name"}), "item 1");
    userEvent.click(screen.getByDisplayValue("Submit"));
    expect(screen.getByRole("listitem")).toContain("item1");

    userEvent.click(screen.getByText("Remove"));
    expect(screen.getByRole("listitem")).toBeFalsy;

    userEvent.type(screen.getByRole("textbox"), "item 2");
    userEvent.click(screen.getByText("Submit"));
    expect(screen.getByRole("listitem")).toContain("item2");
  });

  test('it adds nested child items', () => { //test 
    userEvent.type(screen.getByRole("textbox", {name: "name"}), "item 1");
    userEvent.click(screen.getByDisplayValue("Submit"));
    expect(screen.getByRole("listitem")).toContain("item1");

    userEvent.type(screen.getByRole("textbox"), "item 1.1");
    userEvent.click(screen.getByText("ADD"));
    expect(screen.getByRole("listitem")).toContain("item 1.1");

    //here would also be a good place to test that the property responsible for incremental indentation is working correctly 


    });

  test('it removes base and sub items', () => { //test helps to ensure that if a list item has children, those children are also removed from the list automatically when the selected item is
    userEvent.type(screen.getByRole("textbox", {name: "name"}), "item 1");
    userEvent.click(screen.getByDisplayValue("Submit"));
   
    userEvent.type(screen.getByRole("textbox"), "item 1.1");
    userEvent.click(screen.getByRole("button", {name: "addSub"}));

    userEvent.click(screen.getByRole("button", {name: "addSub"}));
   
    let rmButtons = screen.getAllByRole("button", {name: "remove"});
    userEvent.click(rmButtons[1]); //clicking second remove button to remove sub to-do item
    expect(screen.getByText("item 1.1")).toBeFalsy; //expect to not exist

    userEvent.type(screen.getByRole("textbox"), "item 1.1");
    userEvent.click(screen.getByRole("button", {name: "addSub"}));

    rmButtons = screen.getAllByRole("button", {name: "remove"});
    userEvent.click(rmButtons[1]);
    expect(screen.getByText("item 1")).toBeFalsy;
    expect(screen.getByText("item 1.1")).toBeFalsy;
  });








});