import { NextResponse } from "next/server";
import prisma from "../../../utils/prisma";

export async function GET(request: Request) {
    prisma.$queryRaw
    const restaurant = await prisma.$queryRaw`select a.id, a.name, "Rp."||cast(b.sum_price as TEXT) as Total_Profit  from Restaurant a left join (SELECT restaurantid,SUM(price)as sum_price from Menu GROUP by restaurantid) b on a.id=b.restaurantId GROUP BY a.name,a.id`
    console.log(restaurant)
    const count_menu = await prisma.cart.groupBy({
        by: ['menu_id'],
        _count: {
            menu_id: true
        },
        where: {
            status: "Done"
        }
    });
    console.log(count_menu)
    return NextResponse.json({ restaurant, count_menu });
}
export async function DELETE(request: Request) {
    try {
        const json = await request.json();
        const id = parseInt(json.id)
        await prisma.restaurant.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 200 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse("No restaurant with ID found", { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const restaurant = await prisma.restaurant.update({
            where: { id: json.id },
            data: {
                name: json.name
            }
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