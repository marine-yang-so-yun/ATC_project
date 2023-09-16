import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as S from "styles/components/layout/header.style";
import { getUser, removeUser } from "utils/localStorage";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const loc = useLocation().pathname;
	const navigate = useNavigate();
	const headerRef = useRef<HTMLHeadElement>(null);
	const [isTop, setIsTop] = useState<boolean>(true);

	useEffect(() => {
		setIsMenuOpen(false);
	}, [loc]);

	useEffect(() => {
		const scrollEvent = () => {
			if (!headerRef.current) return;

			const clientHeight = headerRef.current.clientHeight;
			if (window.scrollY > clientHeight) setIsTop(() => false);
			else setIsTop(() => true);
		};

		window.addEventListener("scroll", scrollEvent);
		return () => {
			window.removeEventListener("scroll", scrollEvent);
		};
	}, []);

	return (
		<S.HeaderContainer ref={headerRef} $isTop={isTop}>
			<Link to="/">
				<img
					src={process.env.PUBLIC_URL + "/logo.png"}
					alt="토탈 소프트 뱅크 로고"
				/>
			</Link>
			<div>
				{getUser() ? (
					<S.NavBtn
						onClick={() => {
							removeUser();
							navigate("/");
						}}
					>
						<FaUser />
						<span>로그아웃</span>
					</S.NavBtn>
				) : (
					<S.NavBtn onClick={() => navigate("/login")}>
						<FaUser />
						<span>로그인</span>
					</S.NavBtn>
				)}
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
					<S.NavListItem>
						<Link to="/atcwork">ATC 작업 목록</Link>
					</S.NavListItem>
					<S.NavListItem>
						<Link to="/yardwork">야드 작업 목록</Link>
					</S.NavListItem>
				</ul>
			</S.NavContainer>
		</S.HeaderContainer>
	);
};

export default Header;
