"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appDataSource_1 = require("../config/appDataSource");
const User_1 = require("../entities/User");
const UserRepository = appDataSource_1.AppDataSource.getRepository(User_1.User);
exports.default = UserRepository;
