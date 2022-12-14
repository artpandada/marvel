class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=326718c28f95704ebcdf1185beb4a7d4';
    _baseOffset = 210;
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Cold not fetch ${url}, status ${res.status}`)
        }
        return await res.json()
    }
    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        console.log(res)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacters = async (id) => {
        const res =  await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (res) => {

        return {
            name:res.name,
            description: res.description ?  `${res.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki : res.urls[1].url,
            id:res.id,
            comics: res.comics.items
        }
    }
}

export default MarvelService;