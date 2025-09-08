import mongoose from 'mongoose'
import validator from 'validator'

const connectWithUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        minLength: [3, "Name must contain atleast 3 characters"],
        maxLength: [30, "Name must contain maximum 30 characters"],
        trim: true,
    },
    message: {
        type: String,
        required: true,
        required: [true, "Please enter Message"],
        minLength: [3, "Message must contain atleast 3 characters"],
        validate: [validator.isAlphanumeric, "Please enter characters only"],
        trim: true,
    },
})

const connectWithUs = mongoose.model('ConnectWithUs', connectWithUsSchema)
export default connectWithUs