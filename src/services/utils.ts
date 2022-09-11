export function verifyTitle(titleList: any[], title: string) {
    if(titleList.some(obj => obj.title === title))
        throw { code: 'Conflict', message: 'Title already exist' };
}