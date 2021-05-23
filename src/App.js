import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './screens/Login';
import { auth } from './firebase';

function App() {

	const user = useSelector(selectUser);
	const dispatch = useDispatch()

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if(authUser) {
				dispatch(login({
					uid: authUser.uid,
					photo: authUser.photoURL,
					email: authUser.email,
					displayName: authUser.displayName
				}))
			} else {
				dispatch(logout())
			}
		})
	},[dispatch]);

	return (
		<div className="app">
			{ user ? (
					<>
						{/* SideBar Component */}
						<Sidebar />
			
						{/* Chat */}
						<Chat />
					</>
				): (
					<>
						<Login />
					</>
				)
			}


		</div>
	);
}

export default App;
