import React from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { HeaderContainer, NavBtn } from "styles/components/header";

const Header = () => {
	return (
		<HeaderContainer>
			<img
				src={process.env.PUBLIC_URL + "/logo.png"}
				alt="Total Soft Bank Logo"
			/>
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
