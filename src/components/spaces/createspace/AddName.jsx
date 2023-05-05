import * as React from "react";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@material-ui/core";
import Head from "../../Head";
const AddName = ({setName, setDescription,name,description}) => {
  return (
    <div className="relative mx-auto w-[100%] border-[1px] border-[#f1f1f1] flex flex-col p-[20px] h-[100%]">
    <Head title={`Create Space - Information`} description="Create a new space" />
      <div className="flex gap-5 items-center flex-col">
        <div className="w-[90%]">
          <h1 className="mb-[10px]">Space Name (min 5 characters)</h1>
          <input
          placeholder=""
          onChange={(e) =>setName(e.target.value)}
          defaultValue={name}
          className="w-[100%] outline-[#ffcaca]  border-[1px]  border-[#c5c5c5]"
          />
        </div>
        <div className="w-[90%]">
          <h1 className="mb-[10px]">Space Description (min 20 characters)</h1>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            maxRows={3}
            defaultValue={description}
            placeholder=""
            className="w-[100%]  outline-[#ffcaca] h-[150px] resize-none border-[1px] border-[#c5c5c5]"
            aria-setsize={false}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddName;
