"use client"
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import CustomTable from "../../../components/CustomTable";
import { cache, use, useEffect, useState } from "react";
import CustomModal from "../../../components/CustomModal";
const getRestaurant = cache(() =>
    fetch("http://localhost:3000/api/restaurant").then((res) => res.json())
);

export default function Page() {
    let [count, setCount] = useState(0);
    let [restaurant, setRestaurant] = useState(null);
    let [name, setName] = useState("");
    console.log(restaurant)
    useEffect(() => {
        getRestaurant().then(data => setRestaurant(data))
    }, [count])
    return (
        <Box p={12}>
            <Flex justifyContent={"space-between"}>
                <Text>
                    Total menus sold : {restaurant != null ? restaurant!.count_menu[0]._count.menu_id : null}
                </Text>
                <CustomModal btnName="New Restaurant" save={async (onClose) => {
                    const res = await fetch(`/api/restaurant`, {
                        method: "POST",
                        body: JSON.stringify({
                            name: name
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (res.status == 200) {
                        setCount(count + 1)
                        onClose()
                    }
                }} title="Add New Restaurant">
                    <Input placeholder="Name" onChange={(v) => setName(v.target.value)} />
                </CustomModal>
            </Flex>
            <CustomTable Title={"Restaurant"} value={restaurant != null ? restaurant!.restaurant : null} action={{
                delete(v) {
                    return <Button
                        onClick={async () => {
                            const res = await fetch(`/api/restaurant`, {
                                method: "DELETE",
                                body: JSON.stringify({
                                    id: v.id,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                            if (res.status == 200) {
                                setCount(count + 1)
                            }

                        }}
                    >
                        Delete
                    </Button>
                },
                edit(v) {
                    return (
                        <CustomModal save={async (onClose) => {
                            const res = await fetch(`/api/restaurant`, {
                                method: "POST",
                                body: JSON.stringify({
                                    id: v.id,
                                    name: name
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                            if (res.status == 200) {
                                setCount(count + 1)
                                onClose()
                            }
                        }} title="Edit Restaurant" btnName="Edit">
                            <Input placeholder="Name" defaultValue={v.name} onChange={(v) => setName(v.target.value)} />
                        </CustomModal>
                    )
                },
            }} />
        </Box>
    )
}