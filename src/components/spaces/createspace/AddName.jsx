import * as React from "react";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@material-ui/core";
const AddName = ({setName, setDescription}) => {
  return (
    <div className="relative mx-auto w-[70vw] border-[1px] border-[#f1f1f1] flex flex-col p-[20px] h-[100%]">
      <div className="flex gap-5 items-center flex-col">
        <div>
          <TextField
            onChange={(e) =>setName(e.target.value)}
            id="space-name"
            label="Space Name"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              width: "30em",
            }}
          />
        </div>
        <div>
          <TextareaAutosize
            onChange={(e) => setDescription(e.target.value)}
            maxRows={3}
            placeholder="Description"
            style={{
              padding: "10px",
              width: "30em",
              height: "130px",
              border: "1px solid #bbbbbb",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddName;
