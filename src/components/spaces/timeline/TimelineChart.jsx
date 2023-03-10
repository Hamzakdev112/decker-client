import { Gantt, MaterialTheme } from "@dhtmlx/trial-react-gantt";
 import {useSelector} from 'react-redux'

export default function GanttBasic() {

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
  end_date:'2023-04-01',
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
    progress:10,
    type:'project'
  })
}
console.log(tasks)
    
 
const links = [{ source: 2, target: 1, type: 0 }];
    return (
      <div className="h-[100vh]">
        {
          singleSpace && tasksBySpaceId &&
          <>
          <h1
          className="mb-[1.5em] text-[1.2em]">{singleSpace?.name}</h1>
        <MaterialTheme>
          <Gantt scales={scales} columns={columns} tasks={tasks} links={links}  />
        </MaterialTheme>
          </>
        }
      </div>
    );
}