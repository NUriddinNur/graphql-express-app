import path from "path"

export default (app) => {
    app.set('views', path.join(process.cwd(), 'src', 'views'))

    return (req, res, next) => {
        res.render = (htmlName) => {
            res.sendFile(path.join(app.get('views'), htmlName + '.html'))
        }
        next()
    }

}