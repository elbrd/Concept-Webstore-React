import { create } from "zustand";
import { useNavigate } from "react-router-dom";

export const useOrdersStore = create((set, get) => ({
  orders: [],

  setOrders: (storedOrders) => {
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    set({
      orders: storedOrders,
    });
  },

  createOrder: (cart, subtotal, shipping, total, orderNumber) => {
    const orderDate = new Date();
    const orderDateFormatted = `${orderDate.toLocaleString("sv-SE")}`;

    const newOrder = {
      ordernumber: orderNumber,
      orderdate: orderDateFormatted,
      items: [...cart],
      shipping: {
        cost: shipping,
      },
      subtotal,
      total,
    };

    set((state) => {
      const updatedOrders = [...state.orders, newOrder];

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      return { orders: updatedOrders };
    });
  },
}));

/*
findOrder: (orderNmbr) => {
  set((state) => {
    const order = state.orders.find((o) => o.ordernumber === orderNmbr);
    return { latestOrder: order };
  });
},

findOrder: (orderNmbr) => {
  return get().orders.find((o) => o.ordernumber === orderNmbr);
},
*/
