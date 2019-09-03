window.compressor = {

    compress: function(data) {
        var query = Object.keys(data).reduce((str, key) => str + '&' + key + '=' + data[key], '').substr(1);
        return btoa(new LZ77().compress(query)).replace(/\+/g, '-').replace(/\//g, '_');
    },

    decompress: function(str){

        var b64 = str.replace(/-/g, '+').replace(/_/g, '/');
        var compressed = atob(b64);

        var query = new LZ77().decompress(compressed);

        var kvps = query.split('&');

        return kvps.reduce((agg, x) => {
            var parts = x.split('=');
            agg[parts[0]] = parseInt(parts[1], 10);
            return agg;
        }, {});
    }
};