import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DateTime } from "next-auth/providers/kakao";


export interface InitialStateProps {
    tasks:{
      title:string,
      description?:string,
      creator:string,
      _id:string,
      checked:boolean,
      createdAt:DateTime

    }[];
    fetching: boolean;
    taskCompletion: number
}

const initialState :InitialStateProps = {
  tasks:[],
  fetching: false,
  taskCompletion: 0,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchRequest(state){
       state.tasks = [];
       state.fetching= true;
       state.taskCompletion = 0
    },
    fetchSuccess(state,action){
       state.tasks =action.payload.tasks;
       state.fetching= false;
       state.taskCompletion = action.payload.taskCompletion
    },
    fetchFail(state){
       state.tasks = [];
       state.fetching= false;
       state.taskCompletion = 0
    }
  },
});

export const {fetchRequest,fetchFail,fetchSuccess} = TodoSlice.actions;

export const selectTodo = (state:RootState) => state.todo

export default TodoSlice.reducer;
