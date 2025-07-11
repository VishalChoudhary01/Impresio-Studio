import { createSlice,createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";
export const fetchPhotographers = createAsyncThunk(
  "photographers/fetchAll",
  async () => {
    const res = await fetch("http://localhost:3001/photographers");
    if (!res.ok) throw new Error("Failed to fetch photographers");
    return await res.json();
  }
);

export const fetchPhotographerById = createAsyncThunk(
  "photographers/fetchById",
  async (photographerId) => {
    const res = await fetch(`http://localhost:3001/photographers/${photographerId}`);
    if (!res.ok) throw new Error("Failed to fetch photographer");
    return await res.json();
  }
);
const initialState = {
  all: [],
  loading: false,
  error: null,
  filters: {
    searchTerm:"",
    priceRange:[0,20000],
    minRating:0,
    styles:[],
    location:"",
  },
  sort:"default",
};

const photographerSlice = createSlice({
  name: "photographers",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.filters.searchTerm=action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setMinRating:(state,action)=>{
      state.filters.minRating=action.payload
    },
    toggleStyle:(state,action)=>{
      const style=action.payload;
      if(state.filters.styles.includes(style)){
        state.filters.styles=state.filters.styles.filter((s)=> s !== style)
      }else{
        state.filters.styles.push(style)
      }
    },
    setLocation:(state,action)=>{
      state.filters.location=action.payload
    },
    setSort:(state,action)=>{
      state.sort=action.payload
    },
    resetFilters: (state) => {
  const maxPrice = state.all.length 
    ? Math.max(...state.all.map(p => p.price)) 
    : 0;
    
  state.filters = {
    ...initialState.filters,
    priceRange: [0, maxPrice]
  };
  state.sort = initialState.sort;
}
  },
 extraReducers:(builder)=>{
  builder
      .addCase(fetchPhotographers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhotographers.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
        const maxPrice = Math.max(...action.payload.map(p => p.price), 0);
        
        // Only set initial price range if not already set
        if (state.filters.priceRange[1] === 0) {
          state.filters.priceRange = [0, maxPrice];
        }
      })
      .addCase(fetchPhotographers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }).addCase(fetchPhotographerById.pending, (state) => {
      state.loading = true;
      state.current = null; 
    })
    .addCase(fetchPhotographerById.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload; 
    })
    .addCase(fetchPhotographerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
      ;}
});

// fuse js for fuzzy Search

const fuseOptions={
  keys:[
    {name:"name",weight:0.4},
    {name:"location",weight:0.3},
    {name:"tags",weight:0.3},
  ],
  includeScore:true,
  threshold:0.4,
  minMatchCharLength:2,
  ignoreLocation:true,
  shouldSort:true,
}

export const selectAllPhotographers=(state)=>state.photographers.all;
export const selectFilters=(state)=>state.photographers.filters;
export const selectSort=(state)=>state.photographers.sort;
export const selectLoading=(state)=>state.photographers.loading;
export const selectError=(state)=>state.photographers.error;
export const selectCurrentPhotographer = (state) => state.photographers.current;

export const selectFiltersPhotographers=createSelector(
  [selectAllPhotographers,selectFilters,selectSort],
  (all,filters,sort)=>{
    let result=[...all];

    // Fuzzy Search (Name.location.tags)
    if(filters.searchTerm){
      const fuse=new Fuse(result,fuseOptions);
      const searchResults=fuse.search(filters.searchTerm);
      result=searchResults.map(item=>item.item)
    }

    // location filter
    if(filters.location){
      result=result.filter(p=>p.location===filters.location)
    }

    // Price range filter
    result=result.filter( p=>p.price>=filters.priceRange[0] && p.price<=filters.priceRange[1])
  
    // Rating Filter
    if(filters.minRating>0){
      result=result.filter((p)=>p.rating >= filters.minRating);
    }

    // Styles filter
 if(filters.styles.length > 0) {
      result = result.filter(p => 
        filters.styles.every(style => p.styles.includes(style)))
    }
    // sorting
    if(sort ==="price_asc"){
      result.sort((a,b)=>a.price-b.price);
    }else if(sort==="price_desc"){
      result.sort((a,b)=>b.price-a.price)
    }else if(sort==="rating_desc"){
      result.sort((a,b)=>b.rating-a.rating)
    }else if(sort==="recent"){
      result.sort((a,b)=>b.id-a.id);
    }
    return result
  
  }
)

// Memoized Filter with all selectors


export const selectAbsoluteMaxPrice = createSelector(
  [selectAllPhotographers],
  (photographers) => {
    if (photographers.length === 0) return 10000; 
    return Math.max(...photographers.map(p => p.price));
  }
);

export const selectPhotographerById = createSelector(
  [selectAllPhotographers, (_, photographerId) => photographerId],
  (photographers, photographerId) => 
    photographers.find(p => p.id === photographerId)
);

export const selectUniqueLocations=createSelector(
  [selectAllPhotographers],
  (photographers)=>{
    return [...new Set(photographers.map(p=>p.location))].sort();
  }
);




export const selectUniqueStyles = createSelector(
  [selectAllPhotographers],
  (photographers) => {
    const allStyles = new Set();
    photographers.forEach(p => {
      p.styles.forEach(style => allStyles.add(style));
    });
    return [...allStyles].sort();
  }
);

export const selectSearchSuggestions = createSelector(
  [selectAllPhotographers, (_, term) => term],
  (photographers, term) => {
    if (!term || term.length < 2) return [];
    
    const fuse = new Fuse(photographers, {
      ...fuseOptions,
      keys: ["name", "location", "tags"],
      threshold: 0.5, 
      limit: 5 
    });
    
    return fuse.search(term).map(item => ({
      id: item.item.id,
      name: item.item.name,
      location: item.item.location,
      tags: item.item.tags,
      score: item.score
    }));
  }
);

export const { 
  setSearchTerm, 
  setPriceRange, 
  setMinRating, 
  toggleStyle, 
  setLocation, 
  setSort,
  resetFilters
} = photographerSlice.actions;

export default photographerSlice.reducer;
