const isAuth = (req, res, next) => {
     const { token } = req.cookies
     if (!token) {
          res.redirect('/login')
     } else {
          next()
     }
}                      
export default isAuth                                                        