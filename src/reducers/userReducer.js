const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const GET_USER = 'GET_USER'

const defaultState = {
	currentUser: {},
	isAuth: false,
	user: {},
	users: {}
}

export default function userReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				currentUser: action.payload,
				isAuth: true,
			}
		case LOGOUT:
			localStorage.removeItem('token')
			return {
				...state,
				currentUser: {},
				isAuth: false,
			}
		case GET_USER:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}

export const getUserReducer = user => ({ type: GET_USER, payload: user })
export const setUser = user => ({ type: SET_USER, payload: user })
export const logout = () => ({ type: LOGOUT })