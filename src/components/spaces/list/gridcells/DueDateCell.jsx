import moment from "moment";

const DueDateCell = ({params})=>{
    const { value } = params;
            const overDue = new Date(value) > new Date(Date.now());
            const date = moment(value)
            const formattedDate = date.fromNow()
            return (
              <span className={overDue ? `text-[#6870fa]` : `text-[red]`}>
                {value && formattedDate}
              </span>
            );
  }

  export default DueDateCell