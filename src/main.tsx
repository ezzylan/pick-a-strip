import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./css/index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HeroUIProvider>
			<ToastProvider placement="top-right" toastOffset={10} />
			<App />
		</HeroUIProvider>
	</StrictMode>
);
