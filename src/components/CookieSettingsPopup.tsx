import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Checkbox, Button, Spacer } from "@nextui-org/react";

interface CookieSettingsPopupProps {
	open: boolean;
	setOpen(open: boolean): void;
}

const CookieSettingsPopup: React.FC<CookieSettingsPopupProps> = ({ open, setOpen }) => {
	
	return (
		<Modal isOpen={open} onClose={() => setOpen(false)} closeButton>
			<ModalContent>
				<ModalHeader>Cookies</ModalHeader>
				<ModalBody style={{ maxHeight: '30rem', overflowY: 'auto' }}>
					<p>
						Cookies used on the site are categorized and below you can read about each category and allow or deny some or all of them, except for Necessary Cookies which are required to provide core website functionality. When categories that have been previously allowed are disabled, all cookies assigned to that category will be removed from your browser.
					</p>
					<Spacer y={1} />
					<Checkbox isSelected={true}>
						<b>Necessary cookies</b>
						<p>Some cookies are required to provide core functionality. The website won't function properly without these cookies and they are enabled by default and cannot be disabled.</p>
					</Checkbox>
					<Checkbox>
						<b>Analytical cookies</b>
						<p>Analytical cookies help us improve our website by collecting and reporting information on its usage.</p>
					</Checkbox>
					<Checkbox>
						<b>Marketing cookies</b>
						<p>Marketing cookies are used to track visitors across websites to allow publishers to display relevant and engaging advertisements. By enabling marketing cookies, you grant permission for personalized advertising across various platforms.</p>
					</Checkbox>
				</ModalBody>
				<ModalFooter>
					<Button className="bg-success" onPress={() => setOpen(false)}>Save</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CookieSettingsPopup;
