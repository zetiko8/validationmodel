module.exports = function(self, data) {
    for (var key in data) {

        if (!data[key].type) {
            self[key] = { type: data[key] }
        } else {
            self[key] = data[key]
        }
    }
}