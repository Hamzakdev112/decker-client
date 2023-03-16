import { useSelector } from "react-redux";
import Timer from "../Timer";

const TimerCell = ({params})=>{
    const {singleSpace} = useSelector(state=>state.spaces)
    return (
      <div>
        <Timer spaceId={singleSpace._id} id={params.row._id} />
      </div>
    );
  }

  export default TimerCell