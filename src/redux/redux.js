import { configureStore, createSlice } from "@reduxjs/toolkit";

//connected user
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    updateOneUserById: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser, updateOneUserById } = userSlice.actions;
//connected user
const googleLoginSlice = createSlice({
  name: "googleLogin",
  initialState: { googleLogin: false },
  reducers: {
    setGoogleLogin: (state, action) => {
      return action.payload;
    },
  },
});

export const { setGoogleLogin } = googleLoginSlice.actions;

//owner slice
const ownerSlice = createSlice({
  name: "owner",
  initialState: [],
  reducers: {
    setOwner: (state, action) => {
      return [...action.payload];
    },
    addOwner: (state, action) => {
      state.push(action.payload);
    },
    updateOneOwnerById: (state, action) => {
      return state.map((owner) => {
        if (owner._id === action.payload._id) {
          return {
            ...owner,
            fullName: action.payload.fullName,
            phone1: action.payload.phone1,
            phone2: action.payload.phone2,
          };
        } else {
          return owner;
        }
      });
    },
  },
});
export const { setOwner, addOwner, updateOneOwnerById } = ownerSlice.actions;
//paginnations
const paginationSlice = createSlice({
  name: "pagination",
  initialState: [
    {
      currentPage: [1, 1, 1],
      totalPage: [0, 0, 0],
      isSearch: [false, false, false],
    },
    { itemsPerPage: [3, 3, 3], startIndex: [0, 0, 0], endIndex: [0, 0, 0] },
    { activeLink: "/" },
  ],
  reducers: {
    updateCurrentPage: (state, action) => {
      state[0].currentPage[action.payload.index] =
        action.payload.newCurrentPage;
    },
    updateIsSearch: (state, action) => {
      state[0].isSearch[action.payload.index] = action.payload.isSearch;
    },
    updateActiveLink: (state, action) => {
      state[2].activeLink = action.payload;
    },
    setTotalPage: (state, action) => {
      if (state[0].isSearch[action.payload.index]) {
        state[0].totalPage[action.payload.index] = Math.ceil(
          action.payload.subjectLength /
            state[1].itemsPerPage[action.payload.index]
        );
        state[1].startIndex[action.payload.index] =
          (1 - 1) * state[1].itemsPerPage[action.payload.index];
        state[1].endIndex[action.payload.index] =
          state[1].startIndex[action.payload.index] +
          state[1].itemsPerPage[action.payload.index];
      } else {
        state[0].totalPage[action.payload.index] = Math.ceil(
          action.payload.subjectLength /
            state[1].itemsPerPage[action.payload.index]
        );
        state[1].startIndex[action.payload.index] =
          (state[0].currentPage[action.payload.index] - 1) *
          state[1].itemsPerPage[action.payload.index];
        state[1].endIndex[action.payload.index] =
          state[1].startIndex[action.payload.index] +
          state[1].itemsPerPage[action.payload.index];
      }
    },
  },
});
export const {
  updateCurrentPage,
  updateIsSearch,
  setTotalPage,
  setResetAgentInput,
  updateActiveLink,
} = paginationSlice.actions;

//Top50Properties
const topPropertiesSlice = createSlice({
  name: "topProperties",
  initialState: null,
  reducers: {
    setTopProperties: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTopProperties } = topPropertiesSlice.actions;

//properties
const propertiesSlice = createSlice({
  name: "properties",
  initialState: [],
  reducers: {
    pushProperty: (state, action) => {
      state.push(action.payload);
    },
    setProperties: (state, action) => {
      return action.payload;
    },
    updateOnePropertyById: (state, action) => {
      return state.map((property) => {
        if (property._id === action.payload._id) {
          return {
            ...property,
            title: action.payload.title,
            description: action.payload.description,
            address: action.payload.address,
            city: action.payload.city,
            price: action.payload.price,
            rent: action.payload.rent,
            bedrooms: action.payload.bedrooms,
            bathrooms: action.payload.bathrooms,
            area: action.payload.area,
            propertyNumber: action.payload.propertyNumber,
            features: action.payload.features,
            images: action.payload.images,
            type: action.payload.type,
            owner: action.payload.owner,
            status: action.payload.status,
            created_at: action.payload.created_at,
            updated_at: action.payload.update_at,
            censusTaker: action.payload.censusTaker,
          };
        } else {
          return property;
        }
      });
    },
  },
});

export const { pushProperty, setProperties, updateOnePropertyById } = propertiesSlice.actions;

//liked properties
const likedPropertiesSlice = createSlice({
  name: "likedProperties",
  initialState: null,
  reducers: {
    setLikedPropreties: (state, action) => {
      return [...action.payload];
    },
    addLike: (state, action) => {
      state.push(action.payload);
    },
    deleteLike: (state, action) => {
      //action.payload is the id of the like
      return state.filter((like) => like._id !== action.payload);
    },
  },
});

export const { setLikedPropreties, addLike, deleteLike } =
  likedPropertiesSlice.actions;

//liked properties
const bookingSlice = createSlice({
  name: "booking",
  initialState: null,
  reducers: {
    setBooking: (state, action) => {
      return [...action.payload];
    },
    addBooking: (state, action) => {
      state.push(action.payload);
    },
    deleteBooking: (state, action) => {
      return state.filter((booking) => booking._id !== action.payload);
    },
  },
});

export const { setBooking, addBooking, deleteBooking } = bookingSlice.actions;

//owner slice
const locationSlice = createSlice({
  name: "location",
  initialState: [],
  reducers: {
    setLocation: (state, action) => {
      return [...action.payload];
    },
    addLocation: (state, action) => {
      state.push(action.payload);
    },
    updateOneLocationById: (state, action) => {
      return state.map((location) => {
        if (location._id === action.payload._id) {
          return {
            ...location,
            address: action.payload.address,
            locationLink: action.payload.locationLink,
          };
        } else {
          return location;
        }
      });
    },
  },
});
export const { setLocation, addLocation, updateOneLocationById } =
  locationSlice.actions;
export const store = configureStore({
  reducer: {
    owner: ownerSlice.reducer,
    user: userSlice.reducer,
    pagination: paginationSlice.reducer,
    topProperties: topPropertiesSlice.reducer,
    properties: propertiesSlice.reducer,
    booking: bookingSlice.reducer,
    location: locationSlice.reducer,
    likedProperties: likedPropertiesSlice.reducer,
    googleLogin: googleLoginSlice.reducer,
  },
});
