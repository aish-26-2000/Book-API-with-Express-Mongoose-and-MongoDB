//creating class
class APIFeatures {
    //initializing object instance
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    //pagination function
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
    
        this.query = this.query.skip(skip).limit(limit);
    
        return this;
      }
}

//export
module.exports = APIFeatures;
