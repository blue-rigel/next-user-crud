import { string, object } from 'yup';

const userCreateUpdateSchema = object().shape({
    username: string().required("Username is required.").min(2, "Username must have atleast 2 chars.").max(45, "Username cannot have more than 45 chars."),
    first_name: string().required("Firstname is required").min(3, "Firstname must have atleast 3 chars.").max(55, "Firstname cannot have more than 55 chars."),
    last_name: string().max(55, "Lastname cannot have more than 55 chars.")
})

export { userCreateUpdateSchema }