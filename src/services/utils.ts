export function verifyTitle(titleList: any[], title: string) {
    if(titleList.some(obj => obj.title === title))
        throw { code: 'Conflict', message: 'Title already exist' };
}

export function verifyList(userAnyList: any[], typeMessage: string) {
    if(!userAnyList.length)
        throw {
            code: 'NotFound', message: `User ${typeMessage} do not exist`
        };
}