"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield product_model_1.default.find();
        res.status(200).json(courses);
    }
    catch (error) {
        res.json(error);
    }
});
const getByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseFound = yield product_model_1.default.findById(req.params.id);
    if (!courseFound)
        return res.status(204).json();
    return res.json(courseFound);
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = new product_model_1.default({
        name: req.body.name,
        photo: req.body.photo,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
    });
    const savedCourse = yield newCourse.save();
    return res.json(savedCourse).status(201);
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseUpdated = yield product_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!courseUpdated)
        return res.status(204).json();
    return res.json(courseUpdated);
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseFound = yield product_model_1.default.findByIdAndDelete(req.params.id);
    if (!courseFound)
        return res.status(204).json();
    return res.status(204).json();
});
exports.default = {
    get,
    createProduct,
    updateProduct,
    deleteProduct,
    getByid
};
