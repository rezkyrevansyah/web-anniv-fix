import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Schedule.module.css";

const Schedule = () => {
    const router = useRouter();

    // AUDIO
    const audioRef = useRef();

    useEffect(() => {
        if (audioRef.current && typeof audioRef.current.play === "function") {
            audioRef.current.play().catch(() => { });
        }
    }, []);

    const sendWhatsApp = (date) => {
        const number = "6281283950403";
        const text = `aku mauu co ditanggall ${date}`;
        const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
        window.location.href = url;
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Select Your Date</title>
            </Head>

            <main className={styles.main}>
                <h1 className={`${styles.title} ${styles.titleBlack}`}>
                    Sekarang saatnya pilih tanggal untuk Checkout kerudung yang kamu mauu yaa sayangg☺️
                </h1>

                <div className={styles.buttonWrapper}>
                    <button
                        className={`${styles.button} ${styles.inactive}`}
                        onClick={() => sendWhatsApp("25 November")}
                    >
                        25 November
                    </button>

                    <button
                        className={`${styles.button} ${styles.inactive}`}
                        onClick={() => sendWhatsApp("26 November")}
                    >
                        26 November
                    </button>

                    <button
                        className={`${styles.button} ${styles.inactive}`}
                        onClick={() => sendWhatsApp("27 November")}
                    >
                        27 November
                    </button>
                </div>

                <button
                    className={`${styles.button} ${styles.active} ${styles.backBtn}`}
                    onClick={() => router.push("/")}
                >
                    ← Back
                </button>

                {/* BACKGROUND MUSIC */}
                <audio ref={audioRef} id="player" preload="auto">
                    <source src="media/cahayaa.m4a" />
                </audio>
            </main>
        </div>
    );
};

export default Schedule;
