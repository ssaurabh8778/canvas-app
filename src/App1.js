import logo from "./logo.svg";
import "./App.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AutoScale from "react-auto-scale";
import ScrollContainer from "react-indiana-drag-scroll";
import ELEMENT_1_1 from "./components/row1/ELEMENT_1_1";
import ELEMENT_1_2 from "./components/row1/ELEMENT_1_2";
import ELEMENT_1_3 from "./components/row1/ELEMENT_1_3";
import ELEMENT_2_1 from "./components/row2/ELEMENT_2_1";
import ELEMENT_2_2 from "./components/row2/ELEMENT_2_2";
import ELEMENT_2_3 from "./components/row2/ELEMENT_2_3";
import ELEMENT_3_1 from "./components/row3/ELEMENT_3_1";
import ELEMENT_3_2 from "./components/row3/ELEMENT_3_2";
import ELEMENT_3_3 from "./components/row3/ELEMENT_3_3";

function App() {
  const rowStyle = {
    width: "300vw",
    height: "100vh",
    border: "1px solid yellow",
    display: "flex",
  };
  return (
    <div className="App">
      <div
        style={{
          backgroundColor: "black",
        }}
      >
        <ScrollContainer
          vertical={true}
          horizontal={true}
          className="scroll-container"
        >
          <TransformWrapper
            defaultScale={1}
            positionX={0}
            positionY={0}
            wheel={{ step: 100 }}
            pan={{
              velocityMinSpeed: 5,
              velocitySensitivity: 2,
              velocityEqualToMove: true,
            }}
            options={{
              minScale: 0.33,
              limitToWrapper: true,
              centerContent: false,
            }}
            scalePadding={{ disabled: true }}
          >
            <TransformComponent>
              <div>
                <div style={rowStyle}>
                  <ELEMENT_1_1 />
                  <ELEMENT_1_2 />
                  <ELEMENT_1_3 />
                </div>
                <div style={rowStyle}>
                  <ELEMENT_2_1 />
                  <ELEMENT_2_2 />
                  <ELEMENT_2_3 />
                </div>
                <div style={rowStyle}>
                  <ELEMENT_3_1 />
                  <ELEMENT_3_2 />
                  <ELEMENT_3_3 />
                </div>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </ScrollContainer>
      </div>
    </div>
  );
}

export default App;
