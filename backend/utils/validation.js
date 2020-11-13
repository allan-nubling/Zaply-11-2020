module.exports =  app => {
    function existsOrError(value, err) {
        if(!value) throw err
        if(Array.isArray(value) && value.length === 0) throw err
        if(typeof value === 'string' && !value.trim()) throw err
        return value
    }

    function minorOrError(maxValue){
        return (value, err) => {
            if(value > maxValue) throw err
            return value
        }
    }

    return({ existsOrError, minorOrError })
}