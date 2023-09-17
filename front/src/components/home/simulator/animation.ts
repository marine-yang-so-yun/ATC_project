import { gsap } from "gsap";

export const moveAnimation = (
	fromBox: THREE.Vector3,
	toBox: THREE.Vector3,
	fromCrane: THREE.Vector3,
	toCrane: THREE.Vector3
) => {
	const timeline = gsap.timeline();

	timeline
		.to(fromCrane, {
			x: fromBox.x,
			y: 0,
			z: fromCrane.z,
			duration: Math.abs(fromBox.x - fromCrane.x) / 4,
			ease: "linear",
		})
		.to(fromBox, {
			x: fromBox.x,
			y: 8.5,
			z: fromBox.z,
			duration: 2,
			ease: "linear",
		})
		.to(fromBox, {
			x: fromBox.x,
			y: 8.5,
			z: toBox.z,
			duration: Math.abs(fromBox.z - toBox.z) / 4,
			ease: "linear",
		})
		.to(fromBox, {
			x: toBox.x,
			y: 8.5,
			z: toBox.z,
			duration: Math.abs(fromBox.x - toBox.x) / 4,
			ease: "linear",
		})
		.to(
			fromCrane,
			{
				x: toCrane.x,
				y: toCrane.y,
				z: toCrane.z,
				duration: Math.abs(fromBox.x - toCrane.x) / 4,
				ease: "linear",
			},
			"<"
		)
		.to(fromBox, {
			x: toBox.x,
			y: toBox.y,
			z: toBox.z,
			duration: 2,
			ease: "linear",
		});

	return new Promise((resolve) => {
		timeline.eventCallback("onComplete", resolve);
	});
};
