import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { useSelector } from 'react-redux';
import firebase from 'firebase'

import './Chat.css';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import db from '../firebase';

function Chat () {
	const user = useSelector(selectUser);
	const channelId = useSelector(selectChannelId);
	const channelName = useSelector(selectChannelName);

	const [input, setInput] = useState('');
	const [message, setMessage] = useState([]);

	useEffect(() => {
		if (channelId) {
			db
				.collection('discord-channels')
				.doc(channelId)
				.collection("messages")
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) => {
					setMessage(snapshot.docs.map((doc) => doc.data()))
				})
		}
	}, [channelId]);

	const sendMessage = e => {
		e.preventDefault();

		db
			.collection('discord-channels')
			.doc(channelId)
			.collection("messages")
			.add({
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				message: input,
				user
			})
		
		setInput('')
	}

	return(
		<div className="chat" >
			<ChatHeader channelName={channelName} />

			<div className="chat__messages" >
				{message.map((message) => (
					<Message 
						message={message.message}
						timestamp={message.timestamp} 
						user={message.user} 
					/>
				))}
			</div>

			<div className="chat__input" >
				<AddCircleIcon fontSize="large" />
				<form>
					<input 
						disabled={!channelId}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder={`Message #${channelName}`} 
					/>
					<button 
						disabled={!channelId}
						className="chat__inputButton" 
						type="submit" 
						onClick={sendMessage}
					>
						Send Message
					</button>
				</form>

				<div className="chat__inputIcons" >
					<CardGiftcardIcon fontSize="large" />
					<GifIcon fontSize="large" />
					<EmojiEmotionsIcon fontSize="large" />
				</div>

			</div>
		</div>
	)
}

export default Chat;