import React,{useState,useEffect} from 'react'
import './Calender.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button , Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap"
import List from './List';
import build from './bulid';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import moment from 'moment'

function Calenders() {
  const [Items,setItems]=useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [inputList,setInputList]=useState('');


  const itemEvent=(e)=>{
    setInputList(e.target.value);

  };
 
  const listOfItems=()=>{
        setItems((oldItems)=>{
          return[...oldItems,inputList];
        })

  }
  const deleteItems=(id)=>{
    setItems((oldItems)=>{
      return oldItems.filter((arrElem,index)=>{
        return index !== id;

      })
    })
}

const [calendar,setCalendar]=useState([]);
const [value,setValue]=useState(moment());

useEffect(()=>{

setCalendar(build(value));
},[value]);

    return (
      
  <div>
    <div>
    <div className="wrapper">
  <main>
    <div className="toolbar">
      
      <div className="heading">Calendar</div>
      <div className="search-input">
        <input type="text" placeholder="What are you looking for?"/>
       
      </div>
    </div>
    <div className='calendar'>
            <Header value={value} setValue={setValue}/>
            <div class="days">SUN MON TUE WED THU FRI SAT</div>
          <div className='body'>
            {calendar.map((week)=>(
            <div>
                {
                    week.map((day)=>(
                    <div className='day' 
                    >
                   <div onClick={toggle}>    {day.format("D")}</div>  
                    </div>
                    ))}
            </div>
            ))}
        </div>
       
        </div>
  </main>
  <sidebar className="sidebar">
 
    <div><p>event list</p>
    {Items.map((itemval,index)=>{
                       return <><List key={index} id={index} text={itemval} onSelect={deleteItems} />
                        </>
                        })}
    </div>
    
  </sidebar>
</div>
    </div>

            <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Event</ModalHeader>
            <ModalBody>
            <form>
                    <div classNameName = "form-group">
                        <label className='event'>Event Name:  </label><br/>
                        <input  onChange={itemEvent} type="text" classNameName = "form-control" /><br/>
                      
                       
                    </div>
                    <div classNameName = "form-group">
                        
                   
                        {Items.map((itemval,index)=>{
                       return <><List key={index} id={index} text={itemval} onSelect={deleteItems} />
                        </>
                        })}
                 
                    </div>
                    </form>
            </ModalBody>
            <ModalFooter>
            <Button onClick={listOfItems} color="primary" >Create</Button>{' '}
            <Button color="secondary" className="btn" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>

</div>

    )
}

export default Calenders
