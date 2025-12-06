import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";

const useProductsStore = create(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        total: 0,
        categories: [],
        loading: false,
        currentPage: 0,
        searchTerm: "",
        selectedCategory: "",
        limit: 10,

        fetchProducts: async (params = {}) => {
          set({ loading: true });
          try {
            let url = `https://dummyjson.com/products`;

            if (params.search) {
              url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
                params.search
              )}`;
            } else if (params.category) {
              url = `https://dummyjson.com/products/category/${params.category}`;
            } else {
              url += `?limit=${get().limit}&skip=${params.skip || 0}`;
            }

            const { data } = await axios.get(url);
            set({
              products: data.products || data,
              total: data.total || data.products?.length || 0,
              loading: false,
            });
          } catch (error) {
            console.error("Products fetch error:", error);
            set({ loading: false });
          }
        },

        fetchCategories: async () => {
          try {
            const { data } = await axios.get(
              "https://dummyjson.com/products/categories"
            );
            set({ categories: data });
          } catch (error) {
            console.error("Categories fetch error:", error);
          }
        },

        setSearch: (search) => {
          set({ searchTerm: search, currentPage: 0, selectedCategory: "" });
          if (search) get().fetchProducts({ search });
          else get().fetchProducts();
        },

        setCategory: (category) => {
          set({ selectedCategory: category, currentPage: 0, searchTerm: "" });
          if (category) get().fetchProducts({ category });
          else get().fetchProducts();
        },

        setPage: (page) => {
          set({ currentPage: page });
          get().fetchProducts({ skip: page * get().limit });
        },

        clearFilters: () => {
          set({ searchTerm: "", selectedCategory: "", currentPage: 0 });
          get().fetchProducts();
        },
      }),
      { name: "products-storage" }
    )
  )
);

export default useProductsStore;
