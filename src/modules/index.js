import { makeExecutableSchema } from '@graphql-tools/schema'

import userModule from './user/index.js'
import TypeModule from './types/index.js'

export default makeExecutableSchema({
    typeDefs: [
        userModule.typeDefs,
        TypeModule.typeDefs
    ],

    resolvers: [
        userModule.resolvers,
        TypeModule.resolvers
    ]
})