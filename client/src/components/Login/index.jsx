import { useEffect, useState } from "react";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {

	const navigate = useNavigate();

	// useEffect (()=>{
	// 	const user = localStorage.getItem("userID");
	// 	if(user){
	// 		navigate("/dashboard")
	// 	}
	// 	console.log(user)
	// },[])

	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/user/login";
			const resp = await axios.post(url, data);
			console.log(resp.data)
			if(resp.data.message==='logged in successfully')
			{localStorage.setItem("userID", resp.data.store);
			localStorage.setItem("userIDT", resp.data.id);
			navigate("/dashboard");}


		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>USER LOGIN</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign up as User
						</button>
					</Link>
					<div style={{height:"50px"}}></div>
					<Link to="/adminLogin">
						<button type="button" className={styles.white_btn}>
							Sign in as Admin
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
