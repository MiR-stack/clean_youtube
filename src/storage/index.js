const key = 'clean_youtube_by_habib'


class Storage{
    setData(value){
        const json = JSON.stringify(value)
        localStorage.setItem(key,json)
    }
    getData(){
       return JSON.parse(localStorage.getItem(key))
    } 
}

const storage = new Storage

export default storage