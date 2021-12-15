import prismaClient from "../prisma"

type database = 'user' | 'deck' | 'card' | 'attempt'

export async function  searchOnDatabase (identifier: string, databaseName: string, rowToSearch: string = 'id') {
    const data = await prismaClient[databaseName].findFirst({
        where: { [rowToSearch]: identifier },
    })
    return data
}