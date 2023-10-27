import { NextResponse } from "next/server";
import prisma from "../../../utils/prisma";

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const restaurant = await prisma.cart.create({
            data: json
        });
        let json_response = {
            status: "success",
            data: {
                restaurant,
            },
        };
        return new NextResponse(JSON.stringify(json_response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            let error_response = {
                status: "fail",
                message: "Feedback with title already exists",
            };
            return new NextResponse(JSON.stringify(error_response), {
                status: 409,
                headers: { "Content-Type": "application/json" },
            });
        }

        let error_response = {
            status: "error",
            message: error.message,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}