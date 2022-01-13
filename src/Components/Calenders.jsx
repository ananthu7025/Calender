import React, { useState, useEffect } from "react";
import "./Calender.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import List from "./List";
import build from "./bulid";

import Header from "./Header";
import moment from "moment";

function Calenders() {
  const [Items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState();
  const toggle = (e) => {
    setModal(!modal);
    setId(e.target.id)
  }
  const [inputList, setInputList] = useState("");

  const itemEvent = (e) => {
    setInputList(e.target.value);
  };

  const listOfItems = (e) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        item_id: e.target.id,
        event_name: inputList,
      },
    ]);
  };

  const deleteItems = (id) => {
    console.log("delete", id)
    setItems((oldItems) => {
      return oldItems.filter((x) => {
        return x.item_id !== id;
      });
    });
  };

  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalendar(build(value));
  }, [value]);

  return (
    <div>
      <div>
        <div className="wrapper">
          <main>
            <div className="toolbar">
              <div className="heading">Calendar</div>
              <div className="search-input">
                <input type="text" placeholder="What are you looking for?" />
              </div>
            </div>
            <div className="calendar">
              <Header value={value} setValue={setValue} />
              <div class="days">SUN MON TUE WED THU FRI SAT</div>
              <div className="body">
                {calendar.map((week) => (
                  <div>
                    {week.map((day, id) => (
                      <div className="day">
                        <div id={id} onClick={toggle}> {day.format("D")}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </main>
          <sidebar className="sidebar">
            <div>
              <p>event list</p>
              {Items.map((x) => {
                return (
                  <>
                    <List
                      key={x.item_id}
                      id={x.item_id}
                      text={x.event_name}
                      onSelect={deleteItems}
                    />
                  </>
                );
              })}
            </div>
          </sidebar>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Event</ModalHeader>
        <ModalBody>
          <form>
            <div classNameName="form-group">
              <label className="event">Event Name: </label>
              <br />
              <input
                onChange={itemEvent}
                type="text"
                classNameName="form-control"
              />
              <br />
            </div>
            <div classNameName="form-group">
              {Items.map((x) => {
                if(x.item_id === id){
                return (
                  <>
                    <List
                      key={x.item_id}
                      id={x.item_id}
                      text={x.event_name}
                      onSelect={deleteItems}
                    />
                  </>
                );
                }
              })}
            
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button id={id} onClick={listOfItems} color="primary">
            Create
          </Button>{" "}
          <Button color="secondary" className="btn" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Calenders;
