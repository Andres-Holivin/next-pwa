"use client"
import { Box, Center, HStack, Input, Select, Text } from "@chakra-ui/react";
import CustomCard from "../../components/CustomCard";
import { cache, useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal";
const getMenu = cache(() =>
    fetch("http://localhost:3000/api/menu").then((res) => res.json())
);
const getPatient = cache(() =>
    fetch("http://localhost:3000/api/patient").then((res) => res.json())
);
export default function Page() {
    let [count, setCount] = useState(0);
    let [menu, setMenu] = useState(null);
    let [patient, setPatient] = useState(null);
    let [user, setUser] = useState(null);
    useEffect(() => {
        getMenu().then(data => setMenu(data))
    }, [count])
    useEffect(() => {
        getPatient().then(data => setPatient(data))
    }, [])
    return (
        <HStack gap={2} h={"full"} alignItems={"center"} justifyContent={"center"}>
            {
                menu != null ?
                    menu.map((v, i) => {
                        return (
                            <CustomCard props={v} onBuy={(v) => {
                                console.log("click");
                                return <CustomModal save={async (onClose) => {
                                    const res = await fetch(`/api/cart`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            status:"Pending",
                                            status_note:"Pending",
                                            patient_id:user,
                                            menu_id:v.id
                                        }),
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });
                                    if (res.status == 200) {
                                        setCount(count + 1)
                                        onClose()
                                    }
                                }} title="Buy Menu" btnName="Buy">
                                    <Select placeholder='Select User' onSelect={(v)=>setUser(v)}>
                                        {
                                            patient.map((v, i) => {
                                                console.log(v)
                                                return <option value={v.no_registration}>{v.nama_pasien}</option>
                                            })
                                        }
                                    </Select>
                                </CustomModal>
                            }} />
                        )
                    }) : <Text>No Data</Text>
            }

        </HStack>
    )
}