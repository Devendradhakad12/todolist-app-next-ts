import { ConnectToDB } from "@/lib/database";
import { Task } from "@/models/task.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description, user } = await req.json();
  
  try {
    if ( user === "undefined" || !user || user?.id === "undefined") return new NextResponse("Unauthorized", { status: 401 });
    await ConnectToDB();
     
    const createdTask = await Task.create({
      title,
      description,
      creator: user?.id,
    });

    return NextResponse.json(createdTask, { status: 200 });
  } catch (error) {
    console.log("TASK_CREATING_ERROR", error);
    return new NextResponse("Task Creating Error", { status: 500 });
  }
}
