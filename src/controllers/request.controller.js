import { ApiError } from "../../utils/ApiError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import RequestedProduct from "../models/requestedproduct.model.js";

export const createRequestProduct = async (req, res) => {
  try {
    const { product } = req.body;
    // console.log("body", body);

    if (!product) {
      throw new ApiError(400, "Product request data is missing");
    }

    const productData = JSON.parse(product);

    // const productData=body
    // const productData=JSON.parse(body?.product)

    const productImages = req?.files;

    console.log("Requested data", productData);
    console.log("Requested img", productImages);

    // Upload all files to Cloudinary
    const uploadedFiles = await Promise.all(
      productImages.map((file) => uploadOnCloudinary(file.path))
    );

    // Extract URLs from the uploaded files
    const imageUrls = uploadedFiles.map((file) => file.secure_url);

    const response = await RequestedProduct.create({
      ...productData,
      images: imageUrls,
    });

    return res.status(200).json({ productData, productImages, response, message: "Product Requested Successfully" });
  } catch (error) {
    // throw new ApiError(500, error?.message || "Invalid product data");
    console.log("error", error);
    return res.status(500).json({ message: "Product Request error", error });
  }
};

export const getReqestDeatilsById = async (req, res) => {

  try {

    const { id } = req?.params
    console.log('ID', id);

    const response = await RequestedProduct.findById(id).populate({path:'messages',select:"-_id message userId type isviewed createdAt"})

    res.status(200).json({ message: "Success", data:response })




  } catch (error) {
    console.log("get Error", error);
    return res.status(500).json({ message: "prodoct get error", error });

  }
  // return res.status(200).json({ message: 'hello world' })
}
export const getAllRequestedProduct = async (req, res) => {
  try {
    console.log("get called");
    const {
      page = 1,
      limit = 10,
      search,
      //   category,
      //   priceMin,
      status,
    } = req.query;
    const query = {};

    // Filtering by search term in title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // Filtering by category
    // if (category) {
    //   query.category = category;
    // }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 }, // Sort by created date, newest first
    };

    const products = await RequestedProduct.paginate(query, options);
    console.log("products", products);

    return res.status(200).json({
      message: "Products Request fetched successfully",
      data: products.docs,
      meta: {
        totalDocs: products.totalDocs,
        limit: products.limit,
        totalPages: products.totalPages,
        page: products.page,
        pagingCounter: products.pagingCounter,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
      },
    });
  } catch (error) {
    console.log("get Error", error);
    return res.status(500).json({ message: "prodoct get error", error });
  }
};
