import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import CookieSettingsPopup from "./CookieSettingsPopup";

const CookieDialog = () => {
	const [isConsentOpen, setIsConsentOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	useEffect(() => {
		const consent = localStorage.getItem('cookieConsent');
		if (!consent) {
			setIsConsentOpen(true);
		}
	}, []);

	const handleConsent = (consent: string) => {
		localStorage.setItem('cookieConsent', consent);
		setIsConsentOpen(false);
	};

	const openSettings = () => {
		setIsConsentOpen(false);
		setIsSettingsOpen(true);
	};

	return (
		<>
			{isConsentOpen && (
				<Modal isOpen={isConsentOpen} onClose={() => setIsConsentOpen(false)} closeButton>
					<ModalContent>
						<ModalHeader>We Use Cookies</ModalHeader>
						<ModalBody>
							<p>
								We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button color="success" onPress={() => handleConsent('allowed')}>Allow all cookies</Button>
							<Button color="warning" onPress={() => handleConsent('denied')}>Deny all</Button>
							<Button onPress={openSettings}>Cookie Settings</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
			<CookieSettingsPopup open={isSettingsOpen} setOpen={setIsSettingsOpen} />
		</>
	);
};

export default CookieDialog;
