import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let max_price = action.payload.map((item) => item.price);
    max_price = Math.max(...max_price);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: max_price, price: max_price },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state;
    let tmp_products = [...filtered_products];
    if (sort === "price-lowest") {
      tmp_products = tmp_products.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tmp_products = tmp_products.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tmp_products = tmp_products.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tmp_products = tmp_products.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filtered_products: tmp_products };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    let temp_products = [...all_products];
    const { text, company, category, shipping, price, color } = state.filters;

    if (text) {
      temp_products = temp_products.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    if (category !== "all") {
      temp_products = temp_products.filter(
        (product) => product.category === category
      );
    }

    if (company !== "all") {
      temp_products = temp_products.filter(
        (product) => product.company === company
      );
    }

    if (color !== "all") {
      temp_products = temp_products.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }

    if (shipping) {
      temp_products = temp_products.filter(
        (product) => product.shipping === true
      );
    }

    temp_products = temp_products.filter((product) => product.price <= price);

    return { ...state, filtered_products: temp_products };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        comapny: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
