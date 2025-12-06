import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import axios from 'axios'

const useUsersStore = create(devtools(persist((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  currentPage: 0,
  searchTerm: '',
  limit: 10,

  fetchUsers: async (params = {}) => {
    set({ loading: true })
    try {
      const url = params.search 
        ? `https://dummyjson.com/users/search?q=${encodeURIComponent(params.search)}`
        : `https://dummyjson.com/users?limit=${get().limit}&skip=${params.skip || 0}`
      
      const { data } = await axios.get(url)
      set({ 
        users: data.users || data,
        total: data.total || data.length,
        loading: false 
      })
    } catch (error) {
      console.error('Users fetch error:', error)
      set({ loading: false })
    }
  },

  setSearch: (search) => {
    set({ searchTerm: search })
    get().fetchUsers({ search })
  },

  setPage: (page) => {
    set({ currentPage: page })
    get().fetchUsers({ skip: page * get().limit })
  }
}), { name: 'users-storage' })))

export default useUsersStore
