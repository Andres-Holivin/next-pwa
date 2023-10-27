const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const patient = [
    {
        no_registration: 2310250129,
        no_rm:"02-00159154",
        nama_pasien:"Dona Nababan By. Ny.",
        tgl_lahir:new Date(Date.parse("2023-10-25").toString()*100),
        kelas:"NURSERY KELAS 2",
        ruang:"NURSERY Lt 1",
        no_bed:2,
        no_handphone:"08111455533",        
    }

]
const restaurant=[
    {
        name:"Restaurant 1"
    },
    {
        name:"Restaurant 2"
    }
]
async function main() {
    // for (let p of patient) {
    //     await prisma.patient.create({
    //         data: p
    //     })
    // }
    for (let r of restaurant) {
        await prisma.restaurant.create({
            data: r
        })
    }
}

main()
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    })