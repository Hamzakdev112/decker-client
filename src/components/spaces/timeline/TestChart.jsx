import React from 'react';

// Sample task data
const tasks = [
  { name: 'Task 1', startDate: new Date(2023, 2, 1), endDate: new Date(2023, 2, 5) },
  { name: 'Task 2', startDate: new Date(2023, 2, 4), endDate: new Date(2023, 2, 8) },
  { name: 'Task 3', startDate: new Date(2023, 2, 5), endDate: new Date(2023, 2, 10) },
];

// Task component
const Task = ({ task, left, width }) => (
  <div
    className="task"
    style={{
      position: 'absolute',
      left: `${left}px`,
      width: `${width}px`,
      height: '30px',
      backgroundColor: 'green',
    }}
  >
    {task.name}
  </div>
);

// Gantt chart component
const TestChart = () => {
  // Calculate chart dimensions
  const chartWidth = 800;
  const chartHeight = 400;
  const chartPadding = 40;
  const chartInnerWidth = chartWidth - chartPadding * 2;
  const chartInnerHeight = chartHeight - chartPadding * 2;

  // Calculate task positions and sizes
  const taskWidth = chartInnerWidth / tasks.length;
  const taskList = tasks.map((task, i) => {
    const taskDuration = task.endDate - task.startDate;
    const taskLeft = ((task.startDate - tasks[0].startDate) / taskDuration) * chartInnerWidth + chartPadding;
    const taskWidth = (taskDuration / (tasks[tasks.length - 1].endDate - tasks[0].startDate)) * chartInnerWidth;
    return <Task key={i} task={task} left={taskLeft} width={taskWidth} />;
  });

  // Render chart and tasks
  return (
    <div className="gantt-chart" style={{ width: `${chartWidth}px`, height: `${chartHeight}px`, position: 'relative' }}>
      {taskList}
    </div>
  );
};

export default TestChart;