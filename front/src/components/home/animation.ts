import { gsap } from "gsap";

export const moveBoxAnimation = (
	box: THREE.Vector3,
	toPosition: THREE.Vector3
) => {
	const timeline = gsap.timeline();

	timeline.to(box, {
		x: box.x,
		y: 9,
		z: box.z,
		duration: 1,
		ease: "linear",
	});

	timeline.to(
		box,
		{
			x: toPosition.x,
			y: 9,
			z: toPosition.z,
			duration: 1,
			ease: "linear",
		},
		">"
	);

	timeline.to(
		box,
		{
			x: toPosition.x,
			y: toPosition.y,
			z: toPosition.z,
			duration: 1,
			ease: "linear",
		},
		">"
	);

	return new Promise((resolve) => {
		timeline.eventCallback("onComplete", resolve);
	});
};
