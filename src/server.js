import app from './app'


app.listen(process.env.PORT,()=>{
    console.log(success('Server running on PORT '+process.env.PORT))
})