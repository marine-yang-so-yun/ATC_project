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
			duration: 1,
			ease: "linear",
		})
		.to(fromBox, {
			x: fromBox.x,
			y: 8.5,
			z: fromBox.z,
			duration: 1,
			ease: "linear",
		})
		.to(fromBox, {
			x: fromBox.x,
			y: 8.5,
			z: toBox.z,
			duration: 1,
			ease: "linear",
		})
		.to(fromBox, {
			x: toBox.x,
			y: 8.5,
			z: toBox.z,
			duration: 1,
			ease: "linear",
		})
		.to(
			fromCrane,
			{
				x: toCrane.x,
				y: toCrane.y,
				z: toCrane.z,
				duration: 1,
				ease: "linear",
			},
			"<"
		)
		.to(fromBox, {
			x: toBox.x,
			y: toBox.y,
			z: toBox.z,
			duration: 1,
			ease: "linear",
		});

	return new Promise((resolve) => {
		timeline.eventCallback("onComplete", resolve);
	});
};

// export const moveBoxAnimation = (
// 	box: THREE.Vector3,
// 	toPosition: THREE.Vector3
// ) => {
// 	const timeline = gsap.timeline();

// 	timeline.to(
// 		box,
// 		{
// 			x: box.x,
// 			y: 8.5,
// 			z: box.z,
// 			duration: 1,
// 			ease: "linear",
// 		},
// 		">"
// 	);

// 	timeline.to(
// 		box,
// 		{
// 			x: toPosition.x,
// 			y: 8.5,
// 			z: toPosition.z,
// 			duration: 1,
// 			ease: "linear",
// 		},
// 		">"
// 	);

// 	timeline.to(
// 		box,
// 		{
// 			x: toPosition.x,
// 			y: toPosition.y,
// 			z: toPosition.z,
// 			duration: 1,
// 			ease: "linear",
// 		},
// 		">"
// 	);

// 	return new Promise((resolve) => {
// 		timeline.eventCallback("onComplete", resolve);
// 	});
// };

// export const moveCraneAnimation = (
// 	crane: THREE.Vector3,
// 	toPosition: THREE.Vector3
// ) => {
// 	return new Promise((resolve) => {
// 		gsap.to(crane, {
// 			x: toPosition.x,
// 			y: 0,
// 			z: toPosition.z,
// 			duration: 5,
// 			ease: "power2.out",
// 			onComplete: resolve,
// 		});
// 	});
// };
