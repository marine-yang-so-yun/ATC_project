import { gsap } from "gsap";

export const moveBoxAnimation = (
	box: THREE.Vector3,
	toPosition: THREE.Vector3
) => {
	const timeline = gsap.timeline();

	timeline.to(
		box,
		{
			x: box.x,
			y: 9,
			z: box.z,
			duration: 1,
			ease: "linear",
		},
		"+=1"
	);

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

export const moveCraneAnimation = (
	crane: THREE.Vector3,
	toPosition: THREE.Vector3
) => {
	return new Promise((resolve) => {
		gsap.to(crane, {
			x: toPosition.x,
			y: 0,
			z: toPosition.z,
			duration: 10,
			ease: "power2.out",
			onComplete: resolve,
		});
	});
};
