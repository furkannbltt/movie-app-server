import { Request, Response, NextFunction } from "express";
import { loginUserValidation } from "../utils/validation-helper";

const API_URL = 'https://api.themoviedb.org/3';
const key = '5f6dfd4cbbe3778697b2287c28081cc5'
const contentTypes = {
    json: 'application/json; charset=utf-8',
    isMultiPart: 'application/json; charset=utf-8',
};
const fetch = require('node-fetch');


export const getFilms = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {pageNum } = request.body; 
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
        const data = await fetch(apiUrl, requestOptions).then((res: any) => res.json());
        return response.json(data);

    } catch (error) {
        next(error)
    }
}
export const searchFilms = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { query,pageNum } = request.body; 
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
        const data = await fetch(apiUrl, requestOptions).then((res: any) => res.json());
        return response.json(data);

    } catch (error) {
        next(error)
    }
}

export const filmDetail = async (request: Request, response: Response, next: NextFunction) => {
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
        const data = await fetch(apiUrl, requestOptions).then((res: any) => res.json());
        return response.json(data);

    } catch (error) {
        next(error)
    }
};
