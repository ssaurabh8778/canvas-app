import ReactDOM from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Canvas.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import firebase from "../firebase";
import Draggable from 'react-draggable';
// import Draggable from "./Draggable";
import queryString from 'querystring'

const numbers = new Array(50).fill(1).map((_, index) => index + 1);
const rowStyle = {
  width: "300vw",
  height: "100vh",
  display: "flex",
};

let objectDataDB = [
  {
    key: "a1",
    type: "image",
    width: "300px",
    height: "auto",
    top: "500px",
    left: "350px",
    url: "images/ca1.webp",
  },
  {
    key: "a2",
    type: "image",
    width: "300px",
    height: "350px",
    top: "10px",
    left: "350px",
    url: "images/ca1.webp",
  },
  {
    key: "a3",
    type: "image",
    width: "300px",
    height: "350px",
    top: "10px",
    left: "1000px",
    url: "images/ca1.webp",
  },
];

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [canvas_width, set_canvas_width] = useState("");
  const [canvas_height, set_canvas_height] = useState("");
  const [button_width, set_button_width] = useState("");
  const [button_height, set_button_height] = useState("");
  const [button_top, set_button_top] = useState("");
  const [button_left, set_button_left] = useState("");
  const ElementRef=useRef(null);
  const [passkey,setPasskey]=useState(new URL(window.location.href).searchParams.get('passkey'))
  const [open,setOpen]=useState(false);
  const [selected,setSelected]=useState('');
  
  // const [searchParams, setSearchParams] = this.;
  // console.log('sdf',queryString.parse(window.location.search))
  // const url=new URL(window.location.href);
  // setPasskey(url.searchParams.get('passkey'));

  const handleObjClick=(e,obj)=>{
    console.log('image',obj,e);
    if(obj.imgUrl2){
      // console.log('replace image',e.target.scr=obj.imgUrl2);
      // e.target.scr=obj.imgUrl2
      setSelected(obj.objectId);
      setOpen(!open);
      console.log('done');
    }else if(obj.objUrl){
      window.open(obj.objUrl,'_blank')?.focus();
      console.log('open url')
    }
  }
  

  const handleOnStop = (event, element) => {
    // console.log('element', element.lastX, element.lastY);
    const x=element.lastX,y=element.lastY;
    const objectId=element.node.getAttribute('data-id');
    // console.log('obs',objectId);
    firebase
      .database()
      .ref("websiteContent/objects/" + objectId)
      .update(
        {
          x,
          y
        },
        (error) => {
          if (error) {
            alert("Error Occured");
            
          } else {
            alert("Saved");
            
          }
        }
      );
    // console.log('elemens', element.node.getAttribute('data-id'));
  }
  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/objects")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        let data = [];
        for (let item in snapshot.val()) {
          data.push(snapshot.val()[item]);
        }
        console.log(data);
        setRowData(data);
      });
    firebase
      .database()
      .ref("websiteContent/canvas")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        set_canvas_width(snapshot.val().canvas_width);
        set_canvas_height(snapshot.val().canvas_height);
      });
    firebase
      .database()
      .ref("websiteContent/button")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        set_button_width(snapshot.val().width);
        set_button_height(snapshot.val().height);
        set_button_top(snapshot.val().top);
        set_button_left(snapshot.val().left);
      });
  }, []);
  return (
    <div>
      <ScrollContainer className="container">
        <div>
          {/* <h1>123</h1> */}
          {/* <TransformWrapper
            defaultScale={1}
            wheel={{ step: 100 }}
            pan={{
              disabled: true,
            }}
            
            options={{
              minScale: 0.8,
              maxScale: 1,
            }}
         
          >
            <TransformComponent> */}
          <div
            style={{ width: canvas_width, height: canvas_height }}
            className="canvas__container"
          >
            {rowData.map((obj,index) => (
              
              <>
                
                {obj.type === "Image" ? (
             passkey=='123'? <Draggable Draggable={false} key={obj.objectId?.toString()} defaultPosition={{ x: obj?.x ? obj.x : 0, y: obj?.y ? obj?.y : 0 }} onStop={handleOnStop}>
                   
                    <img
                      onClick={(e)=>handleObjClick(e,obj)}
                      key={obj.objectId}
                      src={selected===obj.objectId?open?obj.imgUrl2:obj.imgUrl:obj.imgUrl}
                      data-id={obj.objectId}
                      style={{
                        position: "absolute",
                        width: obj.width,
                        height: obj.height,
                        top: obj.top,
                        left: obj.left,
                        objectFit: "cover",
                        transform: `translate(${obj?.x ? obj.x : 0}px, ${obj?.y ? obj?.y : 0 }px) rotate(
                          ${obj.angle}deg
                          )`

                      }
                      }
                    />
                    
                    </Draggable>  :<img
                    onClick={(e)=>handleObjClick(e,obj)}
                      key={obj.objectId}
                      src={selected===obj.objectId?open?obj.imgUrl2:obj.imgUrl:obj.imgUrl}
                      data-id={obj.objectId}
                      style={{
                        position: "absolute",
                        width: obj.width,
                        height: obj.height,
                        top: obj.top,
                        left: obj.left,
                        objectFit: "cover",
                        transform: `translate(${obj?.x ? obj.x : 0}px, ${obj?.y ? obj?.y : 0 }px) rotate(
                          ${obj.angle?obj.angle:0}deg
                          )`

                      }
                      }
                    />
                 

                ) : (
                  passkey=='123'?  <Draggable key={obj.objectId?.toString()} defaultPosition={{ x: obj?.x ? obj.x : 0, y: obj?.y ? obj?.y : 0 }} onStop={handleOnStop}>
                    
                    <video
                    
                      key={obj.objectId}
                      src={obj.imgUrl}
                      data-id={obj.objectId}

                      style={{
                        position: "absolute",
                        width: obj.width,
                        height: obj.height,
                        top: obj.top,
                        left: obj.left,
                        objectFit: "cover",
                        transform: `translate(${obj?.x ? obj.x : 0}px, ${obj?.y ? obj?.y : 0 }px) rotate(
                          ${obj.angle?obj.angle:0}deg
                          ) `
                      }}
                      autoPlay={false}
                      controls
                      muted
                   
                    />
                 
                  </Draggable>:<video
                  
                      key={obj.objectId}
                      src={obj.imgUrl}
                      data-id={obj.objectId}

                      style={{
                        position: "absolute",
                        width: obj.width,
                        height: obj.height,
                        top: obj.top,
                        left: obj.left,
                        objectFit: "cover",
                        transform: `translate(${obj?.x ? obj.x : 0}px, ${obj?.y ? obj?.y : 0 }px) rotate(
                          ${obj.angle?obj.angle:0}deg
                          ) `
                      }}
                      autoPlay={false}
                      controls
                      muted
                   
                    />
                )}

              </>

            ))}
          </div>
          <VisitStore
            button_width={button_width}
            button_height={button_height}
            button_top={button_top}
            button_left={button_left}
          />
          {/* </TransformComponent>
          </TransformWrapper> */}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default App;

const VisitStore = ({
  button_width,
  button_height,
  button_top,
  button_left,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        width: button_width,
        height: button_height,
        top: button_top,
        left: button_left,
      }}
    >
      <a href="/edit-website-content">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Visit Store
      </a>
    </div>
  );
};


class RemWrapper extends React.Component {
  // PropTypes is not available in this environment, but here they are.
  // static propTypes = {
  //   style: PropTypes.shape({
  //     transform: PropTypes.string.isRequired
  //   }),
  //   children: PropTypes.node.isRequired,
  //   remBaseline: PropTypes.number,
  // }

  translateTransformToRem(transform, remBaseline = 16) {
    const convertedValues = transform.replace('translate(', '').replace(')', '')
      .split(',')
      .map(px => px.replace('px', ''))
      .map(px => parseInt(px, 10) / remBaseline)
      .map(x => `${x}rem`)
    const [x, y] = convertedValues

    return `translate(${x}, ${y})`
  }

  render() {
    const { children, remBaseline = 16, style } = this.props
    const child = React.Children.only(children)

    const editedStyle = {
      ...child.props.style,
      ...style,
      transform: this.translateTransformToRem(style.transform, remBaseline),
    }

    return React.cloneElement(child, {
       ...child.props,
       ...this.props,
       style: editedStyle
    })
  }
}