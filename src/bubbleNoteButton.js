import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

function BubbleNoteButton(props) {

    const {x,y, itemKey,removeComponent,removeComponentLink,savedComments,setComments} =  props;
    


    const [show, setShow] = React.useState(false);

    const ref = React.useRef(null);
    const ref2 = React.useRef(null);
    const [target, setTarget] = React.useState(null);
    const [xPos, setXPos] = React.useState(x ? x : 0);
    const [divStyle, setDivStyle] = React.useState({ left: x+'%', top:y+'%', opacity:0});
    const [inputValue, setInputValue] = React.useState(savedComments? savedComments :'');
    const [savedInput, setSavedInput] = React.useState(savedComments? savedComments :'');
    const [previousInput, setPreviousInput] = React.useState(savedInput);
    const [isDeleting, setisDeleting] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    

    React.useEffect(() => {

            setDivStyle({
                left: x + '%',
                top: y + '%',
                opacity: 1

            }) 

            setTarget(ref2.current)



            const timer = setTimeout(() => {
                setShow(true);
            }, 20);

            return () => clearTimeout(timer);



        }
        ,[x,y])



    
    function simulateNetworkRequest() {
        return new Promise(resolve => setTimeout(resolve, 10))
    }


    const handleClick = event => {
        setShow(!show)
        setTarget(event.target)
    };
    const handleDeleteClick = event => {

        setisDeleting(true);
        removeComponentLink(itemKey)

    };
    const handleEditClick = event => {
        setIsEditing(true);
        setSavedInput('');
        setPreviousInput(savedInput);

    };
    const handleCancelClick = event => {
        if(isEditing) {
            setSavedInput(previousInput)
            setInputValue(previousInput)
        }
        else{
            removeComponent();
        }
    }

    function addComment() {
        setLoading(true);


        simulateNetworkRequest().then(() => {
            console.log('edit',itemKey)
            setSavedInput(inputValue)
            if(isEditing ){
                setComments(inputValue,itemKey)
            } else {
                setComments(inputValue)
            }


            setLoading(false)
            setIsEditing(false);

        })


    }
// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
           //

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >

                    <ul className="list-unstyled">
                        {children}
                    </ul>
                </div>
            );
        },
    );

    // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <span className="dots-more mr-2 mt-2"

              ref={ref}
              onClick={e => {
                  e.preventDefault();

                  onClick(e);
              }}
        >
            {children}

        </span>
    ));

    let bubbleClass = [];
    if(savedInput !== '') {
        bubbleClass.push('has-content');
    }
    else if(isEditing) {
        bubbleClass.push('is-editing-content');
    }

    return (
        

<div ref={ref}>
        <div  className="bubble-note-button"  style={divStyle}  > 


            <div ref={ref2} onClick={handleClick} className={bubbleClass.join(' ')} >
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="35" height="35" className="bubble-icon"  viewBox="0 0 512 512"><path  d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z"/></svg></div>


        </div>
    <Overlay
        show={show}
        target={target}
        placement={xPos < 50 ? 'left-start': 'right-start'}
        container={ref.current}
        containerPadding={20}

    >


    <Popover className="popover-main">
        {
            savedInput.length > 0 ?
                <Dropdown  >
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M10 12a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z"/>
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        <Dropdown.Item eventKey="1" onClick={handleEditClick}>Edit</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={handleDeleteClick}>Delete</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                : ''
        }
        <Popover.Content>

            {
                savedInput.length > 0 ?
                    <div className="mr-4">



                        <Card.Title className="mb-1" ><small>Username</small></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><small>6:06 pm 24 May</small></Card.Subtitle>
                        <Card.Text>
                            {savedInput}</Card.Text> </div>
                    :
                    <>
                        <Card.Subtitle className="my-1 pb-2">Add Comment</Card.Subtitle>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea">

                            <Form.Control as="textarea" rows="3" onChange={e => setInputValue(e.target.value)} value={inputValue} />
                        </Form.Group>
                        <Button variant="primary" size="sm" onClick={addComment} disabled={inputValue.length > 0 && !isLoading ? '' : 'disabled'}>
                            {isLoading ? 'Loading...' : 'Comment'}
                        </Button>
                        <Button variant="outline-secondary" onClick={handleCancelClick} size="sm">
                            Cancel
                        </Button>
                    </Form>
                    </>
            }

        </Popover.Content>
    </Popover>
    </Overlay>
    </div>
    )
}



export default BubbleNoteButton;
