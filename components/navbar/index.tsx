"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import titleImage from "../../public/images/3d-fluency-laptop.png";

import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
	const pathname = usePathname();
	const nameRef = useRef<HTMLHeadingElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const steps = ["r", "o", "d", "a", ".", "d", "e", "v"];
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		console.log(pathname);
	}, [pathname]);

	const animateName = () => {
		if (nameRef.current) {
			let text = nameRef.current.textContent;

			if (currentStep < steps.length) {
				// adicionar mais uma letra
				text += steps[currentStep];

				//aumentar o step
				setCurrentStep(currentStep + 1);
			} else {
				// piscar o underline
				if (currentStep % 4 === 0) {
					if (text?.endsWith("_")) {
						text = text.substring(0, text.length - 1);
					} else {
						text += "_";
					}
				}
				setCurrentStep(currentStep + 1);
			}

			nameRef.current.textContent = text;
		}
	};

	useEffect(() => {
		const animator = window.setInterval(animateName, 200);

		return () => {
			window.clearInterval(animator);
		};
		//eslint-disable-next-line
	}, [currentStep]);

	return (
		<div className={styles.navbar}>
			<div className={styles.navbarWrapper}>
				<div className={styles.name}>
					<Image src={titleImage} height={24} alt="laptop" />
					<h1 ref={nameRef}></h1>
				</div>
				<div className={styles.navItems}>
					<Link href={"/"}>
						<span className={`${pathname === "/" ? styles.activeItem : ""}`}>
							{" "}
							Home
						</span>
					</Link>
					<Link href={"/about"}>
						<span className={pathname === "/about" ? styles.activeItem : ""}>
							Sobre
						</span>
					</Link>
					<Link href={"/projects"}>
						<span className={pathname === "/projects" ? styles.activeItem : ""}>
							Projetos
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
