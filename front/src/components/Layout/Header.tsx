import React, { useEffect, useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
	HeaderContainer,
	NavBtn,
	NavContainer,
	NavListItem,
} from "styles/components/layout/header";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const loc = useLocation().pathname;

	useEffect(() => {
		setIsMenuOpen(false);
	}, [loc]);

	return (
		<HeaderContainer>
			<Link to="/">
				<img
					src={process.env.PUBLIC_URL + "/logo.png"}
					alt="Total Soft Bank Logo"
				/>
			</Link>
			<div>
				<NavBtn>
					<FaUser />
					<span>로그인</span>
				</NavBtn>
				<NavBtn
					$isMenuOpen={isMenuOpen}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<FaBars />
					<span>메뉴</span>
				</NavBtn>
			</div>
			<NavContainer $isMenuOpen={isMenuOpen}>
				<ul>
					<NavListItem>
						<Link to="/notice">공지사항</Link>
					</NavListItem>
					<NavListItem>
						<Link to="/weather">날씨정보</Link>
					</NavListItem>
				</ul>
			</NavContainer>
		</HeaderContainer>
	);
};

export default Header;
