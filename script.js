// import Gantt from "frappe-gantt";

window.onload = function() {
  let tasks = [
    {
      id: '1',
      name: 'Redesign website',
      start: '2016-12-28',
      end: '2016-12-31',
      progress: 20
    }
  ]
  let gantt = new Gantt("#gantt", tasks, {
    container_height: "500"
  });
};
