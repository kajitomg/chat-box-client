import { addRoom, gotoRoom, loadRooms } from '../reducers/roomReducer'
import { getUserReducer } from '../reducers/userReducer'

const axios = require('axios')
const path = 'http://elemen77.beget.tech/'
export const createroom = (roomname, headers) => {
	return async dispatch => {
		try {
			const response = await axios.post(`${path}api/room/create-room`,
				{
					roomname,
					headers
				}
			)
			dispatch(addRoom(response.data.room))
			return
		} catch (e) {
			console.log(e)
		}
	}
}
export const deleteroom = (roomid, userid) => {
	return async dispatch => {
		try {
			const response = await axios.post(`${path}api/room/delete-room`,
				{
					roomid,
					userid
				}
			)
			dispatch(loadRooms(response.data.rooms))
			return
		} catch (e) {
			console.log(e)
		}
	}
}
export const leavetheroom = async (roomid, userid) => {
	try {
		const response = await axios.post(`${path}api/room/leave-room`,
			{
				roomid,
				userid
			}
		)
		return
	} catch (e) {
		console.log(e)
	}

}

export const loadrooms = () => {
	return async dispatch => {
		try {
			const response = await axios.get(`${path}api/room/load-rooms`,
				{ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
			)
			dispatch(loadRooms(response.data.rooms))
			return
		} catch (e) {
			console.log(e)
		}
	}
}
export const searchrooms = (name) => {
	return async dispatch => {
		try {
			const response = await axios.post(`${path}api/room/search-rooms`, {
				name
			})
			dispatch(loadRooms(response.data.rooms))
			return
		} catch (e) {
			console.log(e)
		}
	}
}
export const connectToRoom = (userid, roomid) => {
	return async dispatch => {
		try {
			const response = await axios.post(`${path}api/room/connect-to-room`, {
				userid,
				roomid
			})
			dispatch(gotoRoom(response.data))
			return
		} catch (e) {
			console.log(e)
		}
	}
}
export const getConnectToRoom = () => {
	return async dispatch => {
		try {
			const response = await axios.get(`${path}api/room/get-connect-to-room`)
			dispatch(gotoRoom(response.data))
			return
		} catch (e) {
			console.log(e)
		}
	}
}

export const entrenceroom = async () => {
	try {
	} catch (e) {
		console.log(e)
	}
}
export const getUser = (userid) => {
	return async dispatch => {
		try {
			const response = await axios.post(`${path}api/room/get-user`, {
				userid
			})
			dispatch(getUserReducer(response.data))
			return
		} catch (e) {
			console.log(e)
		}
	}
}


export const getUsers = async (usersid) => {
	try {
		const response = await axios.post(`${path}api/room/get-users`, {
			usersid
		})
		return console.log(response)
	} catch (e) {
		console.log(e)
	}
}

