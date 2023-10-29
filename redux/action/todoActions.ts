import axios from "axios";
import { useAppDispatch } from "../hooks";
import { fetchFail, fetchRequest, fetchSuccess } from "../slice/todoSlice";

export const fetchTodo = async ({ userid ,dispatch}: { userid: string,dispatch:any }) => {
 ;
  let items = {
    tasks: [],
    taskCompletion: 0,
  };
  try {
    dispatch(fetchRequest());

    const res = await axios.get(`/api/task/all/${userid}`);
    let checkTask = res.data?.filter((a: any) => {
      return a.checked === true;
    });
    let taskComplete = Math.floor((checkTask?.length / res.data?.length) * 100);
    if (taskComplete.toString() !== "NaN") items.taskCompletion = taskComplete;
    else items.taskCompletion = 0;
    items.tasks = res.data?.reverse();
    dispatch(fetchSuccess(items));
    return true
  } catch (error) {
    console.log(error);
    dispatch(fetchFail());
    return true
  }
};
