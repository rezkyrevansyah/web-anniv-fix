import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Name.module.css";
import { useRouter } from "next/router";
import confetti from "canvas-confetti"; // ← GANTI LIBRARY
import messages from "../utils/birthdayWishes.js";
import useTheme from "../hooks/useTheme";
import { Button } from "../components";

// Animasi
import { motion, AnimatePresence } from "framer-motion";

const Wish = ({ history }) => {
	const router = useRouter();
	const { name } = router.query;

	// Ambil nama & color dari URL
	const color = name ? name[1] : 0;

	// AUDIO
	const audioRef = useRef();

	// THEME
	const { setTheme } = useTheme();

	// TEXT ROTATION (index wish)
	const [msgIndex, setMsgIndex] = useState(0);

	// Confetti + Theme + Auto play audio
	useEffect(() => {
		setTheme(color);

		// CONFETTI FIRE
		confetti({
			particleCount: 180,
			spread: 80,
			origin: { y: 0.6 },
		});

		// PUTAR AUDIO
		if (audioRef.current && typeof audioRef.current.play === "function") {
			audioRef.current.play().catch(() => { });
		}
	}, [color]);

	// Auto-change wish every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setMsgIndex((prev) => (prev + 1) % messages.length);
		}, 13000);

		return () => clearInterval(interval);
	}, []);

	// TITLE WITH PROPER SPACING
	const title = (nameValue) => {
		const beforeName = "Haii sayangkuu";
		const extraText = "udahh 1 bulann aja yaa kitaa";
		const nbsp = "\u00A0";
		const displayName = nameValue || "kamu";

		return (
			<h1
				className={styles.title}
				style={{
					"--wish-length": (beforeName + displayName + extraText).length,
				}}
			>
				<span>{beforeName}</span>
				<span>{nbsp}</span>

				<span className={styles.span}>{displayName}</span>
				<span className={styles.span}>!</span>

				<span>
					{nbsp}
					{extraText}
				</span>
			</h1>
		);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Happy Birthday {name && name[0]}</title>
				<meta name="description" content="A surprise birthday wish!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.animate}>
				<div>
					<div className={styles.main}>{title(name && name[0])}</div>

					{/* ANIMATE WISH (POP + FADE) */}
					<div className={styles.descWrapper}>
						<AnimatePresence mode="wait">
							<motion.p
								key={msgIndex}
								initial={{ opacity: 0, scale: 0.7 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.7 }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className={styles.desc}
							>
								{messages[msgIndex].value}
							</motion.p>
						</AnimatePresence>
					</div>
				</div>

				<div className={styles.buttonContainer}>
					<Button
						onClick={() => router.push("/schedule")}
						text="kaloo udah bacaa klikk inii yaaa"
					/>
				</div>
			</main>

			{/* MUSIC */}
			<audio ref={audioRef} id="player" preload="auto">
				<source src="media/hbd.mp3" />
			</audio>
		</div>
	);
};

export default Wish;
