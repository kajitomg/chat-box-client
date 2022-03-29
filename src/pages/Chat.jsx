import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMessage, loadmessages, sendMessage } from '../actions/message'
import { connectToRoom, getConnectToRoom, leavetheroom, loadrooms } from '../actions/room'
import Message from '../components/UI/Message/Message'
import MyButton from '../components/UI/MyButton/MyButton'
import MyInput from '../components/UI/MyInput/MyInput'
import '../styles/App.css'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'
import { useSubscribing } from '../hooks/useSubscribing'

const Chat = () => {
	let chatID = JSON.parse(localStorage.getItem('room'))
	let chat = useSelector(state => state.room.room)
	const user = useSelector(state => state.user.currentUser)
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const scrollEnd = useRef(null)
	const scrollTop = useRef(null)
	const messages = useSelector(state => state.message.messages)
	const [message, setMessage] = useState('')
	const stringyChat = JSON.stringify(chat)
	const totalCount = useSelector(state => state.message.total)
	const [isMessagesLoading, setIsMessagesLoading] = useState(false)
	const [fetchMessages, isLoading, messagesError] = useFetching(async () => {
		if (messages.length === 0) {
			await dispatch(loadmessages(chat.id))
			await scrollEnd.current.scrollIntoView()
		}
		await dispatch(loadmessages(chat.id, messages[0]._id))
	})
	useEffect(() => {
		if (isLoading) {
			setIsMessagesLoading(true)
		}
		if (!isLoading) {
			setIsMessagesLoading(false)
		}
	}, [fetchMessages])
	const scrollHadler = async (e) => {
		if (e.target.scrollTop === 0) {
			if (messages.length === totalCount) {
				return
			}
			let lastHeight = e.target.scrollHeight
			await setIsMessagesLoading(true)
			await fetchMessages()
			await setIsMessagesLoading(false)
			let currentHeight = e.target.scrollHeight
			e.target.scrollTop = currentHeight - lastHeight
		}
	}
	useEffect(() => {
		fetchMessages()
		dispatch(connectToRoom(user.id, chatID.id))
		subscribeConnect()
		subscribeMessage()
	}, [])

	if (window.location.pathname === `/chat/${chat.id}`) {
		localStorage.setItem('room', stringyChat)
	}
	if (!(chat.id)) {
		if (window.location.pathname === `/chat/${JSON.parse(localStorage.getItem('room')).id}`) {
			chat = JSON.parse(localStorage.getItem('room'))
		}
	}
	if (window.location.pathname !== `/chat/${JSON.parse(localStorage.getItem('room')).id}`) {
		localStorage.removeItem('room')
	}
	const [subscribeConnect, errorConnect] = useSubscribing(async () => {
		await dispatch(getConnectToRoom())
		await subscribeConnect()
	})
	const [subscribeMessage, errorMessage] = useSubscribing(async () => {
		await dispatch(getMessage())
		await subscribeMessage()
	})
	const sendMess = async (e) => {
		e.preventDefault();
		if (message) {
			dispatch(sendMessage(message, user.id, chat.id))
			scrollEnd.current.scrollIntoView()
			setMessage('')
		}
	}
	return (
		<div className='chat'>
			<div className='chat__leave' onClick={async () => { leavetheroom(chat.id, user.id); navigate('/chats/'); dispatch(loadrooms()) }}>Leave</div>
			<div className='chat__message-place'>
				<div className="chat__header"></div>
				<ul className='chat__list' onScroll={scrollHadler}>
					<div className="top" ref={scrollTop}></div>
					{isMessagesLoading &&
						<div className='chat__loader-container'><Loader /></div>
					}
					{messages.map((mess, i) =>
						i === 0
							?
							mess.user_id === user.id
								? <Message key={mess._id} name={true} username={mess.username} message={mess.mess} current={true} />
								: <Message key={mess._id} name={true} username={mess.username} message={mess.mess} />


							:
							mess.user_id === messages[i - 1].user_id
								?
								mess.user_id === user.id
									? <Message key={mess._id} name={false} username={mess.username} message={mess.mess} current={true} />
									: <Message key={mess._id} name={false} username={mess.username} message={mess.mess} />
								:
								mess.user_id === user.id
									? <Message key={mess._id} name={true} username={mess.username} message={mess.mess} current={true} />
									: <Message key={mess._id} name={true} username={mess.username} message={mess.mess} />

					)}
					<div className="end" ref={scrollEnd}></div>
				</ul>
				<form className='chat__form' action="">
					<MyInput value={message} onChange={e => setMessage(e.target.value)} type='text' className='chat__input' placeholder='Write a message' />
					<MyButton onClick={sendMess} className='chat__button'>Send</MyButton>
				</form>
			</div>
			<div className='chat__info'>
				<div className='chat__users'>
					<ul>
						{chat.usernames.map((username, i) =>
							<li key={chat.users[i]}>
								{username}
							</li>
						)}
					</ul>
				</div>
			</div>
		</div >
	)
}

export default Chat