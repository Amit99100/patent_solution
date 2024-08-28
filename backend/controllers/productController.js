


// const Product = require("../models/product");
// const Category = require("../models/category");
// const ErrorResponse = require('../utils/errorResponse');
// const cloudinary = require('../utils/cloudinary');
// const { isAuthenticated } = require("../middleware/auth");

// // Create a new product
// exports.createProduct = async (req, res, next) => {
//     const { name, description, price, image, email, category } = req.body;

//     if (!isAuthenticated) console.log("cannot creat product ");

//     try {
//         // Uncomment and modify the cloudinary upload logic as needed
//         // const result = await cloudinary.uploader.upload(image, {
//         //     folder: "products"
//         // });

//         const product = await Product.create({
//             name,
//             description,
//             price,
//             email,
//             // image: {
//             //     public_id: result.public_id,
//             //     url: result.secure_url
//             // },
//             category
//         });

//         res.status(201).json({
//             success: true,
//             product
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

// // Display products with optional category filter and pagination
// exports.displayProduct = async (req, res, next) => {
//     const pageSize = 3;
//     const page = Number(req.query.pageNumber) || 1;
//     const categoryFilter = req.query.cat || '';

//     try {
//         // Build query based on category filter
//         let filter = {};
//         if (categoryFilter) {
//             filter.category = categoryFilter;
//         }

//         const products = await Product.find(filter)
//             .populate('category', 'name')
//             .skip(pageSize * (page - 1))
//             .limit(pageSize);

//         const count = await Product.countDocuments(filter);

//         res.status(200).json({
//             success: true,
//             products,
//             page,
//             pages: Math.ceil(count / pageSize),
//             count
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

// // Update a product's details
// exports.updateProduct = async (req, res, next) => {
//     try {
//         const currentProduct = await Product.findById(req.params.id);

//         // Build the update data object
//         const data = {
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//             email: req.body.email,
//             category: req.body.category
//         };

//         // Uncomment and modify the cloudinary image update logic as needed
//         // if (req.body.image !== '') {
//         //     const imgId = currentProduct.image.public_id;
//         //     if (imgId) {
//         //         await cloudinary.uploader.destroy(imgId);
//         //     }

//         //     const newImage = await cloudinary.uploader.upload(req.body.image, {
//         //         folder: "products",
//         //     });

//         //     data.image = {
//         //         public_id: newImage.public_id,
//         //         url: newImage.secure_url
//         //     };
//         // }

//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, data, { new: true });

//         res.status(200).json({
//             success: true,
//             updatedProduct
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

// // Delete a product and its image from Cloudinary
// exports.deleteProduct = async (req, res, next) => {
//     try {
//         const product = await Product.findById(req.params.id);

//         if (product) {
//             // Uncomment and modify the cloudinary deletion logic as needed
//             // const imgId = product.image.public_id;
//             // if (imgId) {
//             //     await cloudinary.uploader.destroy(imgId);
//             // }

//             await Product.findByIdAndDelete(req.params.id);

//             res.status(200).json({
//                 success: true,
//                 message: "Product deleted successfully"
//             });
//         } else {
//             res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

// // Display all categories
// exports.productCategory = async (req, res, next) => {
//     try {
//         const categories = await Category.find({});
//         res.status(200).json({
//             success: true,
//             categories
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };





// productController.js
const Product = require("../models/product");
const Category = require("../models/category");
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary');

exports.createProduct = async (req, res, next) => {
    const { name, description, price, image, email, category } = req.body;
    try {
        const product = await Product.create({
            name,
            description,
            price,
            email,
            category
        });
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

exports.displayProduct = async (req, res, next) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const categoryFilter = req.query.cat || '';
    try {
        let filter = {};
        if (categoryFilter) {
            filter.category = categoryFilter;
        }
        const products = await Product.find(filter)
            .populate('category', 'name')
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const count = await Product.countDocuments(filter);
        res.status(200).json({
            success: true,
            products,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const currentProduct = await Product.findById(req.params.id);
        const data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            email: req.body.email,
            category: req.body.category
        };
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        res.status(200).json({
            success: true,
            updatedProduct
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: "Product deleted successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.productCategory = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        next(error);
    }
};
