import { NextResponse } from "next/server";
import prisma from "../../../utils/prisma";

export async function GET(request: Request) {
    const users = await prisma.menu.findMany();
    return NextResponse.json(users);
  }