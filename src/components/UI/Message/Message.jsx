import React from 'react'
import cl from './Message.module.css'

const Message = ({ name, message, username, current }) => {
	const messageBody = [cl.messageBody]
	const messageText = [cl.messageText]
	const messageName = [cl.messageName]
	if (current) {
		messageBody.push(cl.currentUser)
		messageText.push(cl.currentUser)
		messageName.push(cl.currentUser)
	}
	if (name) {
		messageBody.push(cl.name)
		messageText.push(cl.name)
	}
	return (
		<div>
			{name
				?
				current
					?
					<li className={messageBody.join(' ')}>
						<span className={messageName.join(' ')}>{username}</span>
						<span className={messageText.join(' ')}>{message}</span>
					</li>
					:
					<li className={messageBody.join(' ')}>
						<span className={messageName.join(' ')}>{username}</span>
						<span className={messageText.join(' ')}>{message}</span>
					</li>
				:
				<li className={messageBody.join(' ')}>
					<span className={messageText.join(' ')}>{message}</span>
				</li>
			}
		</div>
	)
}

export default Message