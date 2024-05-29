import Head from 'next/head';
import PasswordGenerator from '../components/PasswordGenerator';
import CookieDialog from '../components/CookieDialog';
import CookieSettingsPopup from "../components/CookieSettingsPopup";
import { SunIcon } from '../components/SunIcon';
import { Switch } from '@nextui-org/react';
import { BsMoon } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
	const [mounted, setMounted] = useState(false);
	const {theme, setTheme} = useTheme();
	const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
	const googleAdsClient = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT;

	useEffect(() => {
		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			setTheme(systemTheme);
		}
		setMounted(true);
	}, []);

	if(!mounted) return null;

	return (
		<>
			<Head>
				<title>Password Generator</title>
				<meta name="description" content="A simple password generator app" />
				<link rel="icon" href="/favicon.ico" />
				{googleAdsClient && (
					<script
						async
						src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsClient}`}
						crossOrigin="anonymous"
					/>
				)}
			</Head>
			<main className="min-w-full relative" style={{ top: "calc(-31vh + 230px)" }}>
				<div className="h-screen flex items-center justify-center">
					<CookieDialog/>
					<CookieSettingsPopup open={isCookieSettingsOpen} setOpen={setIsCookieSettingsOpen} />
					<div className="transform scale-110 mx-8">
						<h1 className= "text-center text-6xl mb-4 font-bold bg-gradient-to-r from-20% from-blue-600 to-60% to-pink-600 bg-clip-text text-transparent">
							Random
						</h1>
						<h1 className= "text-center text-6xl mb-8 sm:mb-10 lg:mb-22 font-bold bg-gradient-to-r from-20% from-yellow-400 to-100% to-yellow-600 bg-clip-text text-transparent">
							Password Generator
						</h1>
						<PasswordGenerator />
						<div className="flex justify-center mt-4 pb-6">
							<Switch
								defaultSelected={theme === 'dark' ? true : false}
								size="md"
								color="secondary"
								onChange={(e) => e.target.checked ? setTheme('dark') : setTheme('light')}
								startContent={<BsMoon />}
								endContent={<SunIcon />}	
								classNames={{
									wrapper: "bg-default-300"
								}}		
								>
							</Switch>
						</div>
					</div>
				</div>
			</main>
			<div className="settings-icon" onClick={() => setIsCookieSettingsOpen(true)}>
				<span>Cookie Settings</span>
				<FaCog size={30} />
			</div>
		</>
	);
}
