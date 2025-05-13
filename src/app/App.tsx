import {
	Button,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@heroui/react";
import { Info } from "lucide-react";
import Strips from "./Strips";

const Instructions = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Tooltip content="Instructions" showArrow={true}>
				<Info
					size={16}
					color="#006FEE"
					onClick={onOpen}
					className="focus:outline-none hover:cursor-pointer"
				/>
			</Tooltip>

			<Modal placement="center" isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Instructions
							</ModalHeader>
							<ModalBody>
								<p>Coming soon...</p>
							</ModalBody>
							<ModalFooter>
								<Button color="primary" onPress={onClose}>
									Understood!
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default function App() {
	return (
		<div className="flex flex-col items-center min-h-screen">
			<main className="flex flex-col items-center justify-center flex-grow gap-4">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-semibold tracking-tight scroll-m-20">
						Pick A Strip
					</h1>

					<Instructions />
				</div>

				<Strips />
			</main>

			<footer className="p-4">
				<p>
					Created with ❤️ by{" "}
					<Link
						isExternal
						showAnchorIcon
						href="https://github.com/ezzylan"
					>
						Ezlan Zulfiqree
					</Link>
				</p>
			</footer>
		</div>
	);
}
