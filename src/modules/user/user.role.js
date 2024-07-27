import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    get : [roles.Admin,roles.SubAdmin],
    updatAdmin : [roles.Admin,roles.SubAdmin]
}