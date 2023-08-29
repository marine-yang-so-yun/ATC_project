import React from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HeaderContainer, NavBtn } from "styles/components/layout/header";

const Header = () => {
	return (
		<HeaderContainer>
			<Link to="/">
				<img
					src={process.env.PUBLIC_URL + "/logo.png"}
					alt="Total Soft Bank Logo"
				/>
			</Link>
			<nav>
				<NavBtn>
					<FaUser />
					<span>로그인</span>
				</NavBtn>
				<NavBtn>
					<FaBars />
					<span>메뉴</span>
				</NavBtn>
			</nav>
		</HeaderContainer>
	);
};

export default Header;
