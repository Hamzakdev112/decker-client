import { Gantt, MaterialTheme } from "@dhtmlx/trial-react-gantt";
import moment from "moment";
 import {useSelector} from 'react-redux'
import BoardTooltip from '../board/BoardTooltip'

const TimelineChart = ()=> {
  const {tasksBySpaceId} = useSelector(state=>state.tasks)
  const {singleSpace} = useSelector(state=>state.spaces)
  
  const scales = [
    { unit: "month", step: 1, format: "MMMM yyy" },
    { unit: "day", step: 1, format: "d" },
];
 
  const columns = [
    { name: "text", label: "Tasks", width: "100%" },
];
let tasks = [{
  id: 1,
  open: true,
  start_date: singleSpace?.createdAt,
  end_date: moment().add(3,'months').toDate(),
  duration: 8,
  text: "All Tasks",
  progress: 60,
  type: "project",

}]

for(let i=0;i<tasksBySpaceId?.length; i++){
  tasks.push({
    parent:1,
    id:tasksBySpaceId[i]._id,
    end_date:tasksBySpaceId[i].dueDate ? tasksBySpaceId[i].dueDate : new Date(tasksBySpaceId[i].createdAt + 86400000),
    start_date:tasksBySpaceId[i].createdAt,
    text:tasksBySpaceId[i].name,
    duration:10,
    progress:tasksBySpaceId[i].status === "IN PROGRESS" ? 30 :tasksBySpaceId[i].status === "FREEZE" ? 0 : tasksBySpaceId[i].status === "COMPLETED" && 100  ,
    status:tasksBySpaceId[i].status,
    className:'ganttt',
    type:'project',
  }) 
}
console.log(tasks)
    
 
const links = [{ source: 2, target: 1, type: 0 }];
    return (
      <div className="h-[70vh]">
        {
          singleSpace && tasksBySpaceId &&
          <>
          {/* <h1
          className="mb-[1.5em] text-[1.2em]">{singleSpace?.name}</h1> */}
        <MaterialTheme>
          <Gantt
           cellWidth={50}  
           scales={scales} 
           columns={columns} 
           tasks={tasks} 
           links={links}
           tooltip={(data)=><BoardTooltip data={data} />}
           task_row_class="!bg-[blue]"
           />
        </MaterialTheme>
          </>
        }
      </div>
    );
}
export default TimelineChart