import { ApiError } from "../../utils/ApiError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import RequestedProduct from "../models/requestedproduct.model.js";
import Messages from "../models/requestMessage.models.js";
export const addRequestMessages = async (req, res) => {
  try {
    const Message = req.body;
    // console.log("body", body);

    if (!Message) {
      throw new ApiError(400, "Message data is missing");
    }

    console.log("Requested Message", Message);
    const response = await Messages.create(Message);

    if (response) {
      const update = await RequestedProduct.findByIdAndUpdate(
        Message?.requestId,
        {
          $push: { messages: response?._id },
        },
        { new: true }
      );
      console.log('update',update)
    }

    return res
      .status(200)
      .json({ response, message: "Message added Successfully" });
  } catch (error) {
    // throw new ApiError(500, error?.message || "Invalid product data");
    console.log("error", error);
    return res.status(500).json({ message: "Message add error", error });
  }
};

export const getMessagesByRequestId = async (req, res) => {
  try {
    const { id } = req?.params;
    console.log("ID", id);

    const response = await RequestedProduct.findById(id);

    res.status(200).json({ message: "Success", data: response });
  } catch (error) {
    console.log("get Error", error);
    return res.status(500).json({ message: "prodoct get error", error });
  }
  // return res.status(200).json({ message: 'hello world' })
};
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
