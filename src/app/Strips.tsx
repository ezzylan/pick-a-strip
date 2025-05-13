import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	Textarea,
	useDisclosure,
} from "@heroui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Eye, Maximize2, Plus, Shuffle, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Strip, useStrips } from "./utils";

interface StripInputProps {
	strip: Strip;
	strips: Strip[];
	updateStrip: (oldStrip: Strip, newStrip: Strip) => void;
	removeStrip: (strip: Strip) => void;
}

const StripInput = ({
	strip,
	strips,
	updateStrip,
	removeStrip,
}: StripInputProps) => {
	const [inputHover, setInputHover] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div
			className="w-xs"
			onMouseEnter={() => setInputHover(true)}
			onMouseLeave={() => setInputHover(false)}
		>
			<Input
				value={strip.value}
				data-label={strip.id}
				placeholder="New Strip"
				onValueChange={(newStripValue) => {
					updateStrip(strip, {
						...strip,
						value: newStripValue,
					});
				}}
				endContent={
					<>
						<Button
							isIconOnly
							variant="light"
							aria-label="Expand input"
							className={inputHover ? "inline" : "hidden"}
							onPress={onOpen}
						>
							<Maximize2 />
						</Button>
						{strips.length > 2 && (
							<Button
								isIconOnly
								color="danger"
								aria-label="Remove strip"
								onPress={() => removeStrip(strip)}
							>
								<Trash2 />
							</Button>
						)}
					</>
				}
			/>

			<Modal placement="center" isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<ModalBody className="py-6">
						<Textarea
							value={strip.value}
							placeholder="New Strip"
							onValueChange={(newStripValue) => {
								updateStrip(strip, {
									...strip,
									value: newStripValue,
								});
							}}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

interface StripsModalProps {
	isOpen: boolean;
	onClose: () => void;
	strips: Strip[];
	updateStrip: (oldStrip: Strip, newStrip: Strip) => void;
	resetStrips: () => void;
}

const StripsModal = ({
	isOpen,
	onClose,
	strips,
	updateStrip,
	resetStrips,
}: StripsModalProps) => {
	const { width } = useWindowSize();
	const [isBlurred, setIsBlurred] = useState(true);

	const handleStripPressed = (strip: Strip) => {
		setIsBlurred(false);

		const newStrip = { ...strip, isPressed: true };
		updateStrip(strip, newStrip);
	};

	return (
		<Modal
			isOpen={isOpen}
			size={width && width < 768 ? "full" : "md"}
			onClose={() => {
				resetStrips();
				setIsBlurred(true);
				onClose();
			}}
		>
			<ModalContent>
				<ModalBody className="py-6">
					{strips.map((strip) => (
						<Button
							size="lg"
							key={strip.id}
							color={strip.isPressed ? "warning" : undefined}
							className={`grow ${
								isBlurred ? "" : "pointer-events-none"
							}`}
							onPress={() => handleStripPressed(strip)}
						>
							{isBlurred ? "" : strip.value}
						</Button>
					))}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default function Strips() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		strips,
		addStrip,
		updateStrip,
		showStrips,
		removeStrip,
		resetStrips,
		randomizeStripOrder,
	} = useStrips(onOpen);

	return (
		<>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-2">
					{strips.map((strip) => (
						<div key={strip.id}>
							<StripInput
								strip={strip}
								strips={strips}
								updateStrip={updateStrip}
								removeStrip={removeStrip}
							/>
						</div>
					))}
				</div>
				{strips.length < 10 && (
					<Button
						variant="bordered"
						startContent={<Plus />}
						onPress={addStrip}
					>
						Add Strip
					</Button>
				)}
			</div>

			<div className="flex gap-2">
				<Button
					startContent={<Shuffle size={20} />}
					onPress={randomizeStripOrder}
				>
					Randomize Order
				</Button>
				<Button
					color="primary"
					onPress={showStrips}
					startContent={<Eye />}
				>
					Show Strips
				</Button>
			</div>

			<StripsModal
				isOpen={isOpen}
				onClose={onClose}
				strips={strips}
				updateStrip={updateStrip}
				resetStrips={resetStrips}
			/>
		</>
	);
}
