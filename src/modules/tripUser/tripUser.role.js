import { roles } from "../../middleware/auth.middleware.js";

export const endPoints ={
    create : [roles.Admin,roles.SubAdmin,roles.User],
    get : [roles.Admin,roles.SubAdmin,roles.User],
    delete:[roles.Admin,roles.SubAdmin,roles.User],
    update : [roles.Admin,roles.SubAdmin,roles.User]
}