"use client"
import { ArrowRightIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center,
    IconButton,
} from '@chakra-ui/react'
interface ITableAction {
    view?: (v) => React.ReactNode
    edit?: (v) => React.ReactNode
    delete?: (v) => React.ReactNode
}
interface ICustomTable {
    Title: String
    // header: String[]
    value?: String[][] | null
    action?: ITableAction | null
}
export default function CustomTable(props: ICustomTable) {
    console.log(props.value)
    let header = props.value != null ? Object.keys(props.value[0]) : []
    if (props.action != null) {
        header.push("Action")
    }
    return (
        <TableContainer shadow={"md"} borderRadius={"lg"}>
            <Table variant='simple'>
                <TableCaption>
                    {props.Title}
                    {/* <IconButton onClick={() => { props.action.view(Object.values(v)[0]) }} aria-label='Search database' icon={<ArrowRightIcon />} /> */}
                </TableCaption>
                <Thead>
                    <Tr>
                        {
                            header.map((v, i) => {
                                return <Th key={i}>{v}</Th>
                            })
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        props.value == null || props.value.length == 0 ?
                            <Tr>
                                <Td colSpan={header.length}>
                                    <Center>
                                        No Data
                                    </Center>
                                </Td>
                            </Tr> :
                            <>
                                {
                                    props.value.map((v, i) => {
                                        return (
                                            <Tr>
                                                {
                                                    Object.values(v).map((x, j) => {
                                                        return <Td key={i + j}>{x}</Td>

                                                    })
                                                }
                                                {
                                                    props.action != null ?
                                                        <Td display={"flex"} gap={4}>
                                                            {props.action.view != null ? props.action.view(v) : <></>}
                                                            {props.action.edit != null ? props.action.edit(v) : <></>}
                                                            {props.action.delete != null ? props.action.delete(v) : <></>}
                                                        </Td> : <></>
                                                }
                                            </Tr>
                                        )
                                    })
                                }

                            </>
                    }

                </Tbody>
            </Table>
        </TableContainer>
    )
}