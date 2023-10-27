import { NextResponse } from "next/server";
import webPush from "web-push"
webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
)
export async function GET(request: Request) {
    console.log(webPush.generateVAPIDKeys());
}


export async function POST(request: Request) {
    // console.log("post")
    const json = await request.json();
    // const pushSubscription=webPush.setVapidDetails("http://localhost:3000/notif", 'BJI0ssW9dXMDqj9iJUk5Tdt947v5YgPsKbBILzNP4G8Yzc7prZM0XBSf3LLWuyRyuomJT920P-kcfE7J9-GFS44', 'io_DkOZeXenu-8L-Qxxsh4AXW1lYsJxzFvHr5l9_HaQ');
    // const res=webPush.sendNotification(pushSubscription, "The text of the notification")
    // console.log(res)
    const res = webPush
        .sendNotification(
            json.subscription,
            JSON.stringify({ title: 'Hello Web Push', message: 'Your web push notification is here!' })
        ).then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    return NextResponse.json(res);
    // console.log(res)
}