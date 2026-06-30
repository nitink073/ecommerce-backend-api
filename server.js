const app = require('./app')

const PORT = process.env.PORT || 5000

const server = app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`)
})

// Error handling
server.on('error', (err) => {
    console.error('Server error:', err)
    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
    process.exit(1)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
    process.exit(1)
})