import { create } from "zustand";

export const useOrdersStore = create((set) => ({
  orders: [],

  createOrder: (cart, subtotal, shipping, total) => {
    if (cart.length === 0) return;

    const orderNumber = `#${Date.now().toString().slice(-6)}`;

    const orderDate = new Date();
    const orderDateFormatted = `${orderDate.toLocaleString("sv-SE")}`;

    set((state) => {
      return {
        orders: [
          ...state.orders,
          {
            ordernumber: orderNumber,
            orderdate: orderDateFormatted,
            items: [...cart],
            shipping: {
              //   option: shippingOption,
              cost: shipping,
            },
            subtotal,
            total,
          },
        ],
      };
    });
  },
}));
