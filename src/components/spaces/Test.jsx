import React, { useState } from "react";
import Tree from "react-d3-tree";

const data = {
  name: "Course",
  children: [
    {
      name: "Node 1",
      children: [
        { name: "Sub-Node 1" },
        { name: "Sub-Node 2" },
        { name: "Sub-Node 3" },
      ],
    },
    {
      name: "Node 2",
      children: [{ name: "Sub-Node 1" }, { name: "Sub-Node 2" }],
    },
    { name: "Node 3" },
  ],
};


const Test = () => {
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    const containerStyles = {
      width: "100%",
      height: "800px",
    };

    return (
        <div style={containerStyles}>
          <Tree
            
            data={data}
            translate={translate}
            orientation={"vertical"}
            collapsible={true}
            onClick={(nodeData, evt) => console.log(nodeData)}
          />
        </div>
      );
}

export default Test