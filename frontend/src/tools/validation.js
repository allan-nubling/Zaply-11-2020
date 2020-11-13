export function existsOrError(value, err) {
    if(!value) throw err
    if(Array.isArray(value) && value.length === 0) throw err
    if(typeof value === 'string' && !value.trim()) throw err
    return value
}

export function existsOrFalse(value) {
    if(!value) return false
    if(Array.isArray(value) && value.length === 0) return false
    if(typeof value === 'string' && !value.trim()) return false
    return value
}

export function minorOrError(maxValue){
    return (value, err) => {
        if(value > maxValue) throw err
        return value
    }
}