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
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmDetail = exports.searchFilms = exports.getFilms = void 0;
const API_URL = 'https://api.themoviedb.org/3';
const key = '5f6dfd4cbbe3778697b2287c28081cc5';
const contentTypes = {
    json: 'application/json; charset=utf-8',
    isMultiPart: 'application/json; charset=utf-8',
};
const fetch = require('node-fetch');
const getFilms = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageNum } = request.body;
        const apiUrl = `${API_URL}/movie/popular?api_key=${key}&language=en-US&page=${pageNum}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': contentTypes.json,
                // token, 
            },
            data: JSON.stringify({}),
        };
        const data = yield fetch(apiUrl, requestOptions).then((res) => res.json());
        return response.json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.getFilms = getFilms;
const searchFilms = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, pageNum } = request.body;
        const apiUrl = `${API_URL}/search/movie?api_key=${key}&query=${query}&language=en-US&page=${pageNum}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': contentTypes.json,
                // token, 
            },
            data: JSON.stringify({}),
        };
        const data = yield fetch(apiUrl, requestOptions).then((res) => res.json());
        return response.json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.searchFilms = searchFilms;
const filmDetail = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Id } = request.body;
        const apiUrl = `${API_URL}/movie/${Id}?api_key=${key}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': contentTypes.json,
                // token, 
            },
            data: JSON.stringify({}),
        };
        const data = yield fetch(apiUrl, requestOptions).then((res) => res.json());
        return response.json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.filmDetail = filmDetail;
