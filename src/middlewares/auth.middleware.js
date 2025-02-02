/* Assumption: Admin has to be verified before giving access to anyone to perform any type of operation on FAQ model except read
 Verification is done using jwt tokens and cookie parsing but since we do not have a registration process in this 
 assignment, admin is authenticated temporarily using admin model 
*/

import { asyncHandler } from '../utils/asyncHandler.js';
import {Admin} from '../models/admin.model.js'
import {ApiError} from '../utils/ApiError.js';

export const isAdmin = asyncHandler(async(req, _, next) => {                           // when res is not in use
        try {
            const { token } = req.body; // Get userId from request
            const admin = await Admin.findOne({ token });

            if (!(admin)) {
            throw new ApiError(401, "unauthorised access")
}
            req.admin = next()
        } catch (error) {
            throw new ApiError(402, error?.message || "unauthorised access" );
        }
}
)
