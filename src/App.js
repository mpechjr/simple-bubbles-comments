import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BubbleNoteButton from "./bubbleNoteButton"; 



function App(props) {
 
    const [locations, setLocations] = React.useState([])
     
    const [commentCount, setCommentCount] = React.useState(0)
    const [comments, setComments] = React.useState([]) 
    React.useEffect(() => {

        if(commentCount > comments.length  ) {

            removeBubbleButton();
        } 

        return () => {
            // Clean up the subscription

        };

    },[commentCount])

   
    React.useEffect(() => {
 

      setLocations(props.savedLocations)
      setComments(props.comments)
      setCommentCount(props.comments.length)
     


      return () => {
          // Clean up the subscription

      };

  },[props])
 

 

    function saveCommentsArray(newComment, key=-1){
          if(key<0){
              setComments([...comments, newComment])
          }else {
              const c = [...comments]; // make a separate copy of the array
  

              c.splice(key, 1,newComment)
              setComments(c)

            console.log('commentcount',commentCount)
          }

    }

    function removeBubbleButton() {


        setLocations(locations.slice(0,commentCount ))
        setCommentCount(commentCount-1)

    }
    function removeBubbleLink(key) {


            const l = [...locations]; // make a separate copy of the array
            const c = [...comments]; // make a separate copy of the array

            c.splice(key, 1)
            setComments(c)

            l.splice(key, 1)
            setLocations(l);
 
            setCommentCount(commentCount-1)
        
    }


  function handleCanvasClick(event) {
      setCommentCount(commentCount+1)


      let x = new Number();
      let y = new Number();
      let canvas = document.getElementById("image-"+props.sourceID);

      let rect = canvas.getBoundingClientRect();

      if (event.x !== undefined && event.y !== undefined)
      {
          x = event.x;
          y = event.y;
      }
      else // Firefox method to get the position
      {

          x = event.clientX - rect.left-5  ;
          y = event.clientY - rect.top-10 ;

      }

      
      const leftPos = (((x)/rect.width)*100) ;
      const topPos = (((y)/rect.height)*100) ;
  
      const newLocation = { x: leftPos, y: topPos }
      setLocations([...locations, newLocation])





  }
  function handleClear() {

      setLocations([])
      setComments([])
      setCommentCount(0)
  }

    const generateKey = (item) => {
        return props.sourceID+`-${ item.x.toFixed(2) }x${item.y.toFixed(2) }`;
    }

    return (
    <div className="App">


      <div >
      <div className="controls">
        <button onClick={handleClear}>Clear</button>



      </div>


        <div className="sourceBox" id={props.sourceID}>
         

            {
                locations.map((item, key) =>
                <BubbleNoteButton x={item.x} y={item.y} itemKey={key}  savedComments={comments[key]}  removeComponent={removeBubbleButton} removeComponentLink={removeBubbleLink} setComments={saveCommentsArray} key={generateKey(item)}/>
            )
            }
            <img id={"image-" + props.sourceID} alt="img"
                 src={props.imageSource}

                 onClick={handleCanvasClick}
            />


        </div>

      </div>
    </div>
      )
      }

export default App;
