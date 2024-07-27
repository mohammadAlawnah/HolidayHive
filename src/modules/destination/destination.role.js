import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    create : [roles.Admin,roles.SubAdmin],
    get : [roles.Admin,roles.SubAdmin,roles.User]
}
