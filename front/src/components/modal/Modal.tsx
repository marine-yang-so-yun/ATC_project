import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { setBlockCrane } from "store/blockCrane";
import { closeModal } from "store/modal";
import { SectionTitle } from "styles/commons";
import * as S from "styles/components/modal/modal.style";
import craneByBlock from "utils/craneByBlock";

const Modal = () => {
	const { isOpen }: AppState["modal"] = useSelector(
		(state: AppState) => state.modal
	);
	const dispatch = useDispatch();

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
					<button
						onClick={() => {
							dispatch(setBlockCrane("전체"));
							dispatch(closeModal());
						}}
					>
						전체
					</button>
					{Object.keys(craneByBlock).map((block) => (
						<button
							key={block}
							onClick={() => {
								dispatch(setBlockCrane(block));
								dispatch(closeModal());
							}}
						>
							{block}
						</button>
					))}
				</S.SelectBtnContainer>
			</S.ModalView>
		</S.ModalContainer>
	);
};

export default Modal;
