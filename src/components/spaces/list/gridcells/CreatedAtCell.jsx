import moment from "moment";

const CreatedAtCell = ({params})=>{
    return (
      <span className="text-[#6870fa]">
        {moment(params.row.createdAt).format('D MM YYYY') }
      </span>
  
    );
  
  }

  export default CreatedAtCell