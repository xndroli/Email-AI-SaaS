import { db } from "./server/db";

await db.user.create({
    data: {
        emailAddress: 'test@gmail.com',
        firstName: 'alex',
        lastName: 'figoli',
    }
})
console.log('done')