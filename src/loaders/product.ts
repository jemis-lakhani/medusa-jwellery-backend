export default async function () {
  const adminImports = (await import(
    "@medusajs/medusa/dist/api/routes/admin/products/index"
  )) as any;
  adminImports.defaultAdminProductFields = [
    ...adminImports.defaultAdminProductFields,
    "hover_image",
  ];

  const storeImports = (await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  )) as any;
  storeImports.defaultStoreProductsFields = [
    ...storeImports.defaultStoreProductsFields,
    "hover_image",
  ];

  storeImports.allowedStoreProductsFields = [
    ...storeImports.allowedStoreProductsFields,
    "hover_image",
  ];
}
