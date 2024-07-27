import { roles } from "../../middleware/auth.middleware.js";

export const endPoints ={
    create : [roles.Admin,roles.SubAdmin],
    get : [roles.Admin,roles.SubAdmin,roles.User],
    getAdmin : [roles.Admin,roles.SubAdmin],
    delete:[roles.Admin,roles.SubAdmin],
    update : [roles.Admin,roles.SubAdmin]
}