import * as React from "react";

function Slider({ active, children }) {
  if (active > React.Children.count(children)) {
    throw new Error("Slider active prop is out of boundry");
  }
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          transition: "transform .2s ease-in-out",
          transform: `translateX(${active * -100}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 100%",
              border: "1px solid blue",
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
