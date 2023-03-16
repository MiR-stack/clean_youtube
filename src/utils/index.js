
/**
 * input an url or id and return only id.
 * @name getValidId
 * @param {String} id 
 * @returns valid id
 */

export const getValidId = (id) =>{
    if(id.startsWith('PL')) return id

    if(!id.includes('list')) return console.log('invalid id or url')

    return id.split('list=')[1]

}

/**
 * input data and make it immutable
 * @name getImmutableData
 * @param {*} data 
 * @returns immutable data
 */

export const getImmutableData =(data) =>{
    const oldData = JSON.stringify(data)
    const newData = JSON.parse(oldData)
    return newData
}

/**
 * 
 * @param {Array} arr 
 * @param {String} playlistId 
 * @returns Object or undefined
 */

export const isExist = (arr,playlistId) => arr.find(id => id === playlistId)