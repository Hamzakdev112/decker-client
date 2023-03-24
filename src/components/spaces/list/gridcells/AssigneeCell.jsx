import { Tooltip } from "@material-ui/core";

const AssigneeCell = ({params})=>{
  return (
    <Tooltip title={`${params.row?.assignee?.firstName} ${params.row?.assignee?.lastName}`}>
     <img alt="test" src={"/assets/user.png"} className="w-[30px] h-[30px]" />
  </Tooltip>
    )
  }

  export default AssigneeCell
  