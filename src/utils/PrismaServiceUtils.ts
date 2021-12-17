import prismaClient from "../prisma"

export async function  searchOnDatabase (
    identifier: string,
    databaseName: string,
    rowToSearch: string = 'id',
    many: boolean = false
    ) {
        if(identifier === undefined || identifier === null) throw new Error("Searching Invalid Value on the Database")
    if(!many) {
        const data = await prismaClient[databaseName].findFirst({
            where: { [rowToSearch]: identifier },
        })
        return data
    } else {
        const data = await prismaClient[databaseName].findMany({
            where: { [rowToSearch]: identifier },
        })
        return data
    }
}