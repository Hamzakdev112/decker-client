import { Tooltip } from "@mui/material";

const AssignerCell = ({params})=>{
    return (
      <Tooltip title={`${params.row?.assignee?.firstName} ${params.row?.assigner?.lastName}`}>
      <img alt="test" src={"/assets/user.png"} className="w-[30px] h-[30px]" />
   </Tooltip>
    );
  }

  export default AssignerCell