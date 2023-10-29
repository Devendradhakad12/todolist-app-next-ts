import { Task } from "@/models/task.model";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; userid: string } }
){
   try {
    if (params?.userid === "undefined" || !params?.userid)
    return new NextResponse("Unauthorized", { status: 400 });
    const { title, description, checked,} = await req.json()
    let task = await Task.findOne({ _id: params.id });
    if(!task)  new NextResponse("Task Not Found", { status: 404 });
    if(task.creator.toString() !== params.userid)     return new NextResponse("Unauthorized", { status: 400 });
    task.title = title !== undefined ? title : task.title;
    task.description =
      description !== undefined ? description : task.description;
    task.checked = checked;
    await task.save();

    return NextResponse.json(task,{status:200})
    
   } catch (error) {
        console.log(error);
    return new NextResponse("update task error", { status: 500 });
   }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string; userid: string } }
  ){
     try {
      if (params?.userid === "undefined" || !params?.userid)
      return new NextResponse("Unauthorized", { status: 400 });
      let task = await Task.findOne({ _id: params.id });
      if(!task)  new NextResponse("Task Not Found", { status: 404 });
      if(task.creator.toString() !== params.userid)     return new NextResponse("Unauthorized", { status: 400 });
     if (task.checked !== true)   return NextResponse.json({errors: [{ message: 'Task not completed' }],},{status:400})
      await task.deleteOne();
      return NextResponse.json("deleted",{status:200})
      
     } catch (error) {
          console.log(error);
      return new NextResponse("delete task error", { status: 500 });
     }
  }
  