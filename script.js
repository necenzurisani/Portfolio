const pageLoader = document.getElementById("pageLoader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const siteHeader = document.getElementById("siteHeader");
const backToTop = document.getElementById("backToTop");
const cursorGlow = document.getElementById("cursorGlow");

if (pageLoader) {
	window.addEventListener("load", () => {
		setTimeout(() => {
			pageLoader.classList.add("hidden");
		}, 450);
	});
}

if (menuToggle && navLinks) {
	menuToggle.addEventListener("click", () => {
		const isOpen = navLinks.classList.toggle("active");
		menuToggle.classList.toggle("active", isOpen);
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		document.body.classList.toggle("menu-open", isOpen);
	});

	document.querySelectorAll(".nav-links a").forEach((link) => {
		link.addEventListener("click", () => {
			navLinks.classList.remove("active");
			menuToggle.classList.remove("active");
			menuToggle.setAttribute("aria-expanded", "false");
			document.body.classList.remove("menu-open");
		});
	});
}

const currentPage = document.body.dataset.page;
document.querySelectorAll(".nav-links a").forEach((link) => {
	link.classList.toggle("active", link.dataset.page === currentPage);
});

const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
			revealObserver.unobserve(entry.target);
		}
	});
}, {
	threshold: 0.16
});

document.querySelectorAll(".reveal").forEach((element) => {
	revealObserver.observe(element);
});

window.addEventListener("scroll", () => {
	if (siteHeader) {
		siteHeader.classList.toggle("scrolled", window.scrollY > 18);
	}

	if (backToTop) {
		backToTop.classList.toggle("visible", window.scrollY > 520);
	}
});

if (backToTop) {
	backToTop.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
}

document.querySelectorAll(".tilt-card").forEach((card) => {
	card.addEventListener("mousemove", (event) => {
		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const rotateX = ((y / rect.height) - 0.5) * -6;
		const rotateY = ((x / rect.width) - 0.5) * 6;

		card.style.setProperty("--mx", `${x}px`);
		card.style.setProperty("--my", `${y}px`);

		if (window.innerWidth > 900) {
			card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
		}
	});

	card.addEventListener("mouseleave", () => {
		card.style.transform = "";
	});
});

document.querySelectorAll(".magnetic").forEach((button) => {
	button.addEventListener("mousemove", (event) => {
		if (window.innerWidth < 900) {
			return;
		}

		const rect = button.getBoundingClientRect();
		const x = event.clientX - rect.left - rect.width / 2;
		const y = event.clientY - rect.top - rect.height / 2;

		button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px) translateY(-3px)`;
	});

	button.addEventListener("mouseleave", () => {
		button.style.transform = "";
	});
});

window.addEventListener("mousemove", (event) => {
	if (!cursorGlow || window.innerWidth < 920) {
		return;
	}

	cursorGlow.style.left = `${event.clientX}px`;
	cursorGlow.style.top = `${event.clientY}px`;
});


const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const themeText = document.querySelector(".theme-text");

const applyTheme = (theme) => {
	const isLight = theme === "light";
	document.body.classList.toggle("light-mode", isLight);

	if (themeIcon) {
		themeIcon.textContent = isLight ? "☀" : "☾";
	}

	if (themeText) {
		themeText.textContent = isLight ? "Light" : "Dark";
	}
};

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);

if (themeToggle) {
	themeToggle.addEventListener("click", () => {
		const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
		localStorage.setItem("portfolio-theme", nextTheme);
		applyTheme(nextTheme);
	});
}
