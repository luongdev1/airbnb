import userRouter from "./user.js"

function route(app) {
  app.use("/user", userRouter)
}
export default route
