import { ErrorForbidden } from "../error";

const validateRole = (decoded, roles) => {
   
    if(roles.length > 0) {
        let hasRole = false;
        for (const role of decoded.roles) {
            if(decoded.roles.includes(role)) {
                hasRole = true;
            }
        }

        // Forbidden
        if(!hasRole) throw new ErrorForbidden()
    }

    // Legit
    return decoded

}

export {
    validateRole
}
