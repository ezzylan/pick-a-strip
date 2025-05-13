import { addToast } from "@heroui/react";
import { useState } from "react";

export interface Strip {
	id: number;
	value: string;
	isPressed: boolean;
}

export const useStrips = (onOpen: () => void) => {
	const [strips, setStrips] = useState([
		{ id: 1, value: "", isPressed: false },
		{ id: 2, value: "", isPressed: false },
	]);

	const addStrip = () => {
		const lastStrip = strips.at(-1);
		const newId = lastStrip ? lastStrip.id + 1 : 1;

		setStrips([...strips, { id: newId, value: "", isPressed: false }]);
	};

	const updateStrip = (oldStrip: Strip, newStrip: Strip) => {
		const newStrips = strips.map((strip) =>
			strip.id === oldStrip.id ? newStrip : strip
		);

		setStrips(newStrips);
	};

	const showStrips = () => {
		if (strips.some((strip) => strip.value === "")) {
			addToast({
				title: "Error: Some strips are not filled",
				description:
					"Make sure all strips are filled before proceeding",
				color: "danger",
			});

			return;
		}

		onOpen();
	};

	const removeStrip = (strip: Strip) =>
		setStrips(strips.filter((c) => c.id !== strip.id));

	const resetStrips = () =>
		setStrips(
			strips.map((strip) =>
				strip.isPressed === true
					? { ...strip, isPressed: false }
					: strip
			)
		);

	const randomizeStripOrder = () => {
		const randomizedStrips = [...strips];
		for (let i = randomizedStrips.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[randomizedStrips[i], randomizedStrips[j]] = [
				randomizedStrips[j],
				randomizedStrips[i],
			];
		}
		setStrips(randomizedStrips);
	};

	return {
		strips,
		addStrip,
		updateStrip,
		showStrips,
		removeStrip,
		resetStrips,
		randomizeStripOrder,
	};
};
