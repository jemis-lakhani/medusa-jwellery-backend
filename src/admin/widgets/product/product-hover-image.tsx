import { ProductDetailsWidgetProps, WidgetConfig } from "@medusajs/admin";
import {
  useAdminDeleteFile,
  useAdminUpdateProduct,
  useAdminUploadProtectedFile,
} from "medusa-react";
import { FileServiceUploadResult } from "@medusajs/types";
import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import { Trash } from "@medusajs/icons";

const ProductHoverImage = ({ product }: ProductDetailsWidgetProps) => {
  const { id: productId, hover_image: hoverImage } = product;
  const updateProduct = useAdminUpdateProduct(productId);
  const buttonRef = useRef(null);
  const uploadFile = useAdminUploadProtectedFile();
  const deleteFile = useAdminDeleteFile();
  const [uploadedFile, setUploadedFile] =
    useState<FileServiceUploadResult>(null);
  const imageUrlSplit = hoverImage ? hoverImage.split("/") : "";
  const imageKey = imageUrlSplit[imageUrlSplit.length - 1];

  const [isConfirmBtnVisible, setConfirmBtnVisible] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted(files, event) {
      uploadFile.mutate(files[0], {
        onSuccess: ({ uploads }) => {
          setUploadedFile(uploads[0]);
          updateProduct.mutate(
            {
              hover_image: uploads[0].url,
            },
            {
              onSuccess: ({ product }) => {
                console.log(product);
              },
            },
          );
        },
      });
    },
  });

  const handleConfirmClick = () => {
    if (uploadedFile || hoverImage) {
      console.log(imageKey);
      deleteFile.mutate(
        {
          file_key:
            uploadedFile && uploadedFile.key ? uploadedFile.key : imageKey,
        },
        {
          onSuccess: ({ id, object, deleted }) => {
            setConfirmBtnVisible(false);
            setUploadedFile(null);
            updateProduct.mutate(
              {
                hover_image: "",
              },
              {
                onSuccess: ({ product }) => {
                  console.log(product.id);
                },
              },
            );
          },
        },
      );
    }
  };
  return (
    <div className="px-xlarge pt-large pb-xlarge rounded-rounded bg-grey-0 border-grey-20 border">
      <div className="flex items-center justify-between">
        <h1 className="text-grey-90 inter-xlarge-semibold">Hover Image</h1>
        {(uploadedFile || hoverImage) && !isConfirmBtnVisible && (
          <button
            className="flex items-center justify-center rounded-lg border border-gray-20 bg-transparent transition-all px-3 py-1.5"
            onClick={() => setConfirmBtnVisible(true)}
          >
            <div className="inter-small-semibold text-rose-50">
              <Trash className="text-grey-50" />
            </div>
          </button>
        )}
        {(uploadedFile || hoverImage) && isConfirmBtnVisible && (
          <div className="flex items-center gap-x-2">
            <button
              ref={buttonRef}
              className="rounded-lg border border-grey-20 bg-transparent px-3 py-1.5"
              onClick={() => setConfirmBtnVisible(false)}
            >
              <span className="inter-small-semibold text-grey-50">Cancel</span>
            </button>
            <button
              ref={buttonRef}
              className="rounded-lg border-rose-50 bg-rose-50 px-3 py-1.5"
              onClick={handleConfirmClick}
            >
              <span className="inter-small-semibold text-white">Confirm</span>
            </button>
          </div>
        )}
      </div>
      {uploadedFile || hoverImage ? (
        <div className="gap-xsmall mt-base grid grid-cols-3">
          <div className="flex aspect-square items-center justify-center">
            <img
              src={hoverImage ? hoverImage : uploadedFile.url}
              alt="Thumbnail for LEATHER AND SUEDE TRAINERS WITH EMBOSSED LOGOS"
              className="rounded-rounded max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="mt-base">
          <div
            {...getRootProps()}
            className="inter-base-regular text-grey-50 rounded-rounded border-grey-20 hover:border-violet-60 hover:text-grey-40 flex h-full w-full cursor-pointer select-none flex-col items-center justify-center border-2 border-dashed transition-colors py-large"
          >
            <div className="flex flex-col items-center">
              <p>
                <span>
                  Drop your images here, or{" "}
                  <span className="text-violet-60">click to browse</span>
                </span>
              </p>
              1200 x 1600 (3:4) recommended, up to 10MB each
            </div>
            <input
              {...getInputProps()}
              accept="image/gif, image/jpeg, image/png, image/webp"
              type="file"
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.after",
};

export default ProductHoverImage;
