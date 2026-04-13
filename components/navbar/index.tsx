"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import titleImage from "../../public/images/3d-fluency-laptop.png";

import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
	const pathname = usePathname();

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		console.log(pathname);
	}, [pathname]);

	return (
		<div className={styles.navbar}>
			<div className={styles.navbarWrapper}>
				<div className={styles.name}>
					<Image src={titleImage} height={24} alt="laptop" />
					<h1>roda.dev</h1>

					<div className="animation"></div>
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
