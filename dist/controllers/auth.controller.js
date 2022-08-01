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
exports.logout = exports.profile = exports.singin = exports.singup = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const singup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new users_model_1.default({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 2
    });
    const user = yield users_model_1.default.findOne({ email: req.body.email });
    if (user)
        return res.status(400).json('Email already exists');
    newUser.password = yield newUser.encryptPassword(newUser.password);
    const savedUser = yield newUser.save();
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.SECRET_KEY || 'PROVISIONAL_SECRET');
    res.status(200).json({ token, savedUser });
});
exports.singup = singup;
const singin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json('Email wrong');
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(400).json('Invalid Password');
    const token = jsonwebtoken_1.default.sign({ _id: user._id, name: user.name }, process.env.SECRET_KEY || 'SECRET_PROVISIONAL', {
        expiresIn: 60 * 60 * 24
    });
    res.status(200).json({ token, user });
});
exports.singin = singin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json("No user found");
    res.json(user);
});
exports.profile = profile;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        message: 'success'
    });
});
exports.logout = logout;
