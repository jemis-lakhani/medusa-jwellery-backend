import { registerOverriddenValidators } from "@medusajs/medusa";
import { AdminPostProductsReq as MedusaAdminPostProductsReq } from "@medusajs/medusa/dist/api/routes/admin/products/create-product";
import { AdminPostProductsProductReq as MedusaAdminPostProductsProductReq } from "@medusajs/medusa/dist/api/routes/admin/products/update-product";
import { IsString, IsOptional } from "class-validator";

class AdminPostProductsReq extends MedusaAdminPostProductsReq {
  @IsString()
  @IsOptional()
  hover_image?: string | null;
}

class AdminPostProductsProductReq extends MedusaAdminPostProductsProductReq {
  @IsString()
  @IsOptional()
  hover_image?: string | null;
}

registerOverriddenValidators(AdminPostProductsReq);
registerOverriddenValidators(AdminPostProductsProductReq);
