import React, { useEffect, useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import * as S from "styles/components/layout/header.style";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const loc = useLocation().pathname;

	useEffect(() => {
		setIsMenuOpen(false);
	}, [loc]);

	return (
		<S.HeaderContainer>
			<Link to="/">
				<img
					src={process.env.PUBLIC_URL + "/logo.png"}
					alt="Total Soft Bank Logo"
				/>
			</Link>
			<div>
				<S.NavBtn>
					<FaUser />
					<span>로그인</span>
				</S.NavBtn>
				<S.NavBtn
					$isMenuOpen={isMenuOpen}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<FaBars />
					<span>메뉴</span>
				</S.NavBtn>
			</div>
			<S.NavContainer $isMenuOpen={isMenuOpen}>
				<ul>
					<S.NavListItem>
						<Link to="/notice">공지사항</Link>
					</S.NavListItem>
					<S.NavListItem>
						<Link to="/weather">날씨정보</Link>
					</S.NavListItem>
				</ul>
			</S.NavContainer>
		</S.HeaderContainer>
	);
};

export default Header;
