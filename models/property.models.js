import mongoose from 'mongoose';
import validator from 'validator';
import fs from 'fs'

const propertySchema = new mongoose.Schema({

    location: {
        type: String,
        required: true,
        trim: true,
    },
    purpose: {
        type: String,
        enum: {
            values: ['Rent', 'Buy'],
            message: ["Please select an option"],
        },
    },
    name: {
        type: String,
        required: [true, "Please enter name"],
        minLength: [3, "Name must contain atleast 3 characters"],
        maxLength: [30, "Name must contain maximum 30 characters"],
        validate: [validator.isAlphanumeric, "Please enter characters only"],
        trim: true,
    },
    bedrooms: {
        type: String,
    },
    parking: {
        type: String,
        enum: {
            values:["Available", "NotAvailable"],
            message:["Enter correct entity"],
        },
    },
    gym: {
        type: String,
        enum: {
            values:["Available", "NotAvailable"],
            message:["Enter correct entity"],
        },
    },
    pgFlat: {
        type: String,
        enum: {
            values:["Pg", "Flat"],
            message:["Enter correct entity"],
        },
    },
    food: {
        type: String,
        enum: {
            values:["WithFood", "WithoutFood"],
            message:["Enter correct entity"],
        },
    },
    sharing: {
        type: String,
        enum: ["SingleSharing", "DoubleSharing", "TripleSharing"],
    },
    attachWashroom: {
        type: String,
        enum: {
            values:["Available", "NotAvailable"],
            message:["Enter correct entity"],
        },
    },
    ac: {
        type: String,
        enum: {
            values:["Available", "NotAvailable"],
            message:["Enter correct entity"],
        },
    },
    rent: {
        type: String,
        enum: ["10000", "10500", "18000"],
    },
    geyser: {
        type: String,
        enum: {
            values:["Available", "NotAvailable"],
            message:["Enter correct entity"],
        },
    },
    fridge: {
        type: String,
        enum: {
            values:["Available", "NotAvailable"],
            message:["Enter correct entity"],
        },
    },
    indoorGames: {
        type: String,
        enum: ["BilliardPool", "Carrom", "Chess"],
    },
    clothWashingService: {
        type: String,
        enum: {
            values:["Available", "NotAvailable"],
            message:["Enter correct entity"],
        },
    },
    furnish: {
        type: String,
        enum: ["Furnished", "SemiFurnished", "UnFurnished"],
    },
    image1Avatar: {
        public_id: String,
        url: String,
    },
    image2Avatar: {
        public_id: String,
        url: String,
    },
    image3Avatar: {
        public_id: String,
        url: String,
    },
    image4Avatar: {
        public_id: String,
        url: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

propertySchema.post('save', function (doc, next) {
    const content = `A new property with name:${doc.name} has been created by ${doc.createdBy}\n`;
    fs.writeFileSync('../log.txt', content, { flag: 'a' }, (err) => {
        console.log(err.message);
    })
    next();
})

propertySchema.virtual('priceInThousands').get(function () {
    return this.rent/1000;
})



const property = mongoose.model("Property", propertySchema);
export default property;