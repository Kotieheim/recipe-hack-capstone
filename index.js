const searchURL = 'https://api.edamam.com/search';

function getDataFromApi(searchTerm, callBack) {
    const query = {
        q: `${searchTerm}`,
        app_id: 'e4a09154',
        app_key: 'dfdeff1d32e1493b08689cc95a11b623',
        from: 0,
        to: 6
    };
    
}