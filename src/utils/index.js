
/**
 * 
 * @param {String} id 
 */

export const getValidId = (id) =>{
    if(id.startsWith('PL')) return id

    if(!id.includes('list')) return console.log('invalid id or url')

    return id.split('list=')[1]

}

export const getImmutableData =(data) =>{
    const oldData = JSON.stringify(data)
    const newData = JSON.parse(oldData)
    return newData
}