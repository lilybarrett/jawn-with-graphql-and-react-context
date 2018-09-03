import React from "react";
import { FindJawnProducts, FindJawnProducts_allProducts } from "./data/models";

export interface JawnState {
    cart?: FindJawnProducts_allProducts[];
    addToCart?: (product: FindJawnProducts_allProducts) => void;
    removeFromCart?: (index: number) => void;
    market?: "US" | "UK";
}

export default React.createContext<JawnState>(null);
