import JWT from '../../utils/jwt.js'
import md5 from 'md5'
import fs from 'fs'
import path from 'path'
import '../../utils/validation.js'

import { GraphQLUpload } from 'graphql-upload'

export default {
    Upload: GraphQLUpload,

    Query: {
        users: (_, __, { model }) => {
            return model.read("users")
        }
    },

    Mutation: {
        login: (_, {username, password}, { model }) => {
            const users = model.read('users')
            const user = users.find(user => user.username == username && user.password == md5(password))

            if (!user) {
                return {
                    status: 400,
                    message: 'Wrong username or password!',
                    data: null
                }
            }

            return {
                status: 200,
                message: 'The user successfully logged in!',
                token: JWT.sign({ userId: user.userId }),
                data: user
            }
        }, 

        register: async (_, { username, password, file }, {model}) => {
            let data = process.JOI.registerSchema.validate({username, password})
            let { createReadStream, filename, mimetype } = await file
            const stream = createReadStream()


            if(mimetype.split("/")[0] != 'image') {
                return {
                    status: 400,
                    message: "Invalid file type",
                    data: null
                }
            }
            if(data.error) {
                return {
                    status: 400,
                    message: data.error.message,
                    data: null
                }
            }

            let users = model.read('users') 
            if (users.find(user => user.username.toLowerCase() == username.toLowerCase())) {
                return {
                    status: 400,
                    message: "The user already exists",
                    data: null
                }
            }

            filename = Date.now() + filename
            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', filename))
            stream.pipe(out)
            // await finished(out)

            let newUser = {
                userId: users.length ? users[users.length - 1].userId + 1 : 1,
                username,
                password: md5(password),
                userImg: filename
            }

            users.push(newUser)
            model.write('users', users)
            return {
                status: 200,
                message: "The user successfully registered!",
                token: JWT.sign({ userId: newUser.userId }),
                data: newUser
            }
        }
    },

    User: {
        userImg: (global, __, { host }) => host + global.userImg
    }
}

