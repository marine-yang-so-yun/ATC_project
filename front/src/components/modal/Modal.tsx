import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { setBlockCrane } from "store/blockCrane";
import { closeModal } from "store/modal";
import { SectionTitle } from "styles/commons";
import * as S from "styles/components/modal/modal.style";

const Modal = () => {
	const { isOpen }: AppState["modal"] = useSelector(
		(state: AppState) => state.modal
	);
	const dispatch = useDispatch();
	const btnNames = ["전체", "7A", "7B", "7C", "7D", "8A", "8B", "8C", "8D"];

	useEffect(() => {
		if (isOpen) {
			const scrollY = window.scrollY;
			document.body.style.cssText = "overflow-y: hidden;";

			return () => {
				document.body.style.cssText = "";
				window.scrollTo(0, scrollY);
			};
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<S.ModalContainer>
			<S.ModalBackdrop onClick={() => dispatch(closeModal())} />
			<S.ModalView>
				<S.CloseModalBtn onClick={() => dispatch(closeModal())} />
				<SectionTitle>블록을 선택해주세요.</SectionTitle>
				<S.SelectBtnContainer>
					{btnNames.map((name) => (
						<button
							key={name}
							onClick={() => {
								dispatch(setBlockCrane(name));
								dispatch(closeModal());
							}}
						>
							{name}
						</button>
					))}
				</S.SelectBtnContainer>
			</S.ModalView>
		</S.ModalContainer>
	);
};

export default Modal;
