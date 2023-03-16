import moment from "moment";

const UpdatedAtCell = ({params})=>{
    return (
      <span className="text-[#6870fa]">
        {moment(params.row.updatedAt).format('D MM YYYY') }
      </span>
  
    );
  }

  export default UpdatedAtCell