"use client";
import { ReactNode, createContext, useState, useContext } from "react";
import { type Cart } from "@/api/types";
import {clearCart, getCart} from "@/api/cart";

const useCartState = (cart: Cart) => useState<Cart>(cart);

export const CartContext = createContext<ReturnType<
    typeof useCartState
> | null>(null);

export const CartProvider = ({ cart: initialCart, children }: { cart: Cart, children: ReactNode }) => {
    const [cart, setCart] = useCartState(initialCart);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const cart = useContext(CartContext);

    if (!cart) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return cart;
};
