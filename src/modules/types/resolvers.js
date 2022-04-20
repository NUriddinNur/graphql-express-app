export default {
    AnyType: {
        __resolveType(obj) {
            if (obj.userId) return 'User'
            return null
        },
    }
}