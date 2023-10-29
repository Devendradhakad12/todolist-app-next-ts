import { ConnectToDB } from "@/lib/database";
import { Task } from "@/models/task.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userid: string } }
) {
  await ConnectToDB();
  try {
    if (params?.userid === "undefined" || !params?.userid)
      return new NextResponse("Unauthorized", { status: 400 });
    const tasks = await Task.find({ creator: params?.userid });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("get all task error", { status: 500 });
  }
}
