// import { Router } from "express";
// import { validation } from "../../middleware/validation.middleware.js";
// import * as discountService from './services/discount.service.js';
// import * as validators from './services/discount.validation.js';
// import { authentication, authorization } from "../../middleware/auth.middelware.js";

// export const router = Router()

// router.post("/",
//     authentication(),
//     authorization(['admin']),
//     validation(validators.createDiscount),
//     discountService.createDiscount
// )
// router.patch("/:discountId/updateDiscount",
//     authentication(),
//     authorization(['admin']),
//     validation(validators.updateDiscount),
//     discountService.updateDiscount
// )
// router.delete("/:discountId/deleteDiscount",
//     authentication(),
//     authorization(['admin']),
//     validation(validators.deleteDiscount),
//     discountService.deleteDiscount
// )
// router.get("/",
//     authentication(),
//     authorization(['admin']),
//     discountService.getAllDiscounts
// )
// router.get("/:discountId",
//     authentication(),
//     authorization(['admin']),
//     discountService.getDiscountById
// )
// router.patch("/:productId",
//     authentication(),
//     authorization(['admin']),
//     validation(validators.removeDiscountFromProduct),
//     discountService.removeDiscountFromProduct
// )
// export default router;
