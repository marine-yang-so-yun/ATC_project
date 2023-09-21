import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "styles/commons";
import * as S from "styles/components/layout/footer.style";

const Footer = () => {
	return (
		<S.FooterContainer>
			<SectionTitle>TOTAL SOFT BANK ATC MONITORING SYSTEM</SectionTitle>
			<ul>
				<li>
					<Link to="/">법적고지</Link>
				</li>
				<li>
					<Link to="/">개인정보취급방침</Link>
				</li>
			</ul>
			<span>copyrightⓒ 2023 All rights reserved by ATC Project</span>
		</S.FooterContainer>
	);
};

export default Footer;
