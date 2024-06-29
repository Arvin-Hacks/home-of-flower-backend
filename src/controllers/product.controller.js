import fs from "fs";
import { ApiError } from "../../utils/ApiError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { product } = req.body;
    // console.log("body", body);

    if (!product) {
      throw new ApiError(400, "Product data is missing");
    }

    const productData = JSON.parse(product);

    // const productData=body
    // const productData=JSON.parse(body?.product)

    const productImages = req?.files;

    console.log("first", productData);
    console.log("first", productImages);

    // Upload all files to Cloudinary
    const uploadedFiles = await Promise.all(
      productImages.map((file) => uploadOnCloudinary(file.path))
    );

    // Extract URLs from the uploaded files
    const imageUrls = uploadedFiles.map((file) => file.secure_url);

    const response = await Product.create({
      ...productData,
      imageUrl: imageUrls,
    });

    return res.status(200).json({
      productData,
      productImages,
      response,
      message: "Product Added Successfully",
    });
  } catch (error) {
    // throw new ApiError(500, error?.message || "Invalid product data");
    console.log("error", error);
    return res.status(500).json({ message: "prodoct add error", error });
  }
};

export const getProductDetailsById = async (req, res) => {
  try {
    const { id } = req?.params;
    console.log("ID", id);
    if (!id) {
      return res.status(400).json({ message: "Inavalid Product Request!" });
    }

    const response = await Product.findById(id);

    res.status(200).json({ message: "Success", data: response });
  } catch (error) {
    console.log("get Error", error);
    return res.status(500).json({ message: "prodoct get error", error });
  }
};
export const getAllProduct = async (req, res) => {
  try {
    // console.log("get called");
    const {
      page = 1,
      limit = 10,
      search,
      category,
      priceMin,
      priceMax,
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
    if (category) {
      query.category = category;
    }

    // Filtering by price range
    if (priceMin && priceMax) {
      query.price = { $gte: parseFloat(priceMin), $lte: parseFloat(priceMax) };
    } else if (priceMin) {
      query.price = { $gte: parseFloat(priceMin) };
    } else if (priceMax) {
      query.price = { $lte: parseFloat(priceMax) };
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 }, // Sort by created date, newest first
    };

    const products = await Product.paginate(query, options);
    // console.log("products", products);

    return res.status(200).json({
      message: "Products fetched successfully",
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
    return res.status(500).json({ message: "Prodoct Details Failed", error });
  }
};

export const deleteProductApi = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // if (!product.isDeletable()) {
    //   return res.status(403).json({ error: "Product cannot be deleted" });
    // }

    // await product.remove();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateProductApi = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log('da id',id)
  console.log('da',data)

  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
