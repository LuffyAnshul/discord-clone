import React from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

import './Login.css'

function Login() {

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.catch(error => alert(error.message));
	}
	
	return(
		<div className="login" >
			<div className="login__logo" >
				<img 
					src="https://res.cloudinary.com/practicaldev/image/fetch/s--7i1S06Xf--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/37haac8nd0x96kghx9p5.png"
					alt="Discord Logo"
				/>
			</div>

			<Button onClick={signIn}>
				Sign In
			</Button>

		</div>
	)
}

export default Login;