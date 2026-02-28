document.addEventListener("DOMContentLoaded", function() {

    function toggleMenu() {
        const menu = document.getElementById("mobileMenu");
        menu.classList.toggle("active");
    }

    window.toggleMenu = toggleMenu;
    /* ===================== */
    /* GRADIENT SCROLL */
    /* ===================== */

    const gradientElements = document.querySelectorAll(".gradient-scroll");

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        gradientElements.forEach(el => {
            const shift = scrollPercent * 120;
            el.style.backgroundPosition = `${shift}% 50%`;
        });

        document.querySelectorAll(".fade-in").forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                section.classList.add("visible");
            }
        });
    });


    /* ===================== */
    /* NAVIGATION FIX */
    /* ===================== */

    window.scrollToSection = function(e, id) {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({
            behavior: "smooth"
        });
    };


    /* ===================== */
    /* SEARCH LOGIC */
    /* ===================== */

    const searchOverlay = document.getElementById("searchOverlay");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    window.openSearch = function() {
        searchOverlay.classList.add("active");
        searchInput.focus();
    };

    function closeSearch() {
        searchOverlay.classList.remove("active");
        searchInput.value = "";
        searchResults.innerHTML = "";
    }

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeSearch();
        }
    });
    /* ===================== */
    /* CLICK OUTSIDE CLOSE */
    /* ===================== */

    document.addEventListener("click", function(e) {

        if (!searchOverlay.classList.contains("active")) return;

        const container = document.querySelector(".search-container");
        const searchIcon = document.querySelector(".search-icon");

        const clickedInsideSearch = container.contains(e.target);
        const clickedSearchIcon = searchIcon.contains(e.target);

        if (!clickedInsideSearch && !clickedSearchIcon) {
            closeSearch();
        }

    });
    /* Collect section titles dynamically */
    /* ===================== */
    /* SEARCH DATA */
    /* ===================== */

    const searchableData = [];

    document.querySelectorAll("section").forEach(section => {
        const heading = section.querySelector("h2");
        if (heading && section.id) {
            searchableData.push({
                title: heading.innerText.toLowerCase(),
                id: section.id
            });
        }
    });


    /* ===================== */
    /* LIVE SEARCH */
    /* ===================== */

    searchInput.addEventListener("input", function() {
        const query = this.value.toLowerCase();
        searchResults.innerHTML = "";

        if (!query) return;

        const matches = searchableData.filter(item =>
            item.title.includes(query)
        );

        matches.slice(0, 4).forEach(item => {
            const result = document.createElement("div");
            result.innerText = item.title;

            result.onclick = function() {
                document.getElementById(item.id)
                    .scrollIntoView({
                        behavior: "smooth"
                    });
                closeSearch();
            };

            searchResults.appendChild(result);
        });
    });


    //* ===================== */
    /* ENTER KEY SUPPORT */
    /* ===================== */

    searchInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {

            const query = this.value.toLowerCase();

            // Easter egg trigger
            if (["' or '1'='1", "zeroday", "<script>alert(1)</script>", "null", "hacker", "flag", "internship", "exp", "experience", "exploit", "zeroday", "0day", "ctf", "pwned", "root", "toor", "sudo", "redteam", "blueteam", "purpleteam", "exploitdev", "buffer", "stack", "heap", "shell", "reverse", "bindshell", "payload", "metasploit", "burpsuite", "wireshark", "nmap", "osint", "ghidra", "ida", "malware", "ransomware", "phishing", "spoofing", "pivot", "lateral", "privilege", "escalation", "forensics", "hash", "sha256", "md5", "jwt", "oauth", "csrf", "xss", "sqli", "racecondition", "zeroTrust", "defcon", "blackhat", "hackthebox", "tryhackme", "bugbounty"].includes(query)) {

                const egg = document.getElementById("easterEgg");
                const terminal = document.getElementById("terminalText");

                const lines = [
                    "> initializing recon...",
                    "> adversarial mindset active.",
                    "> build. break. secure."
                ];
                const flagLine = "> Found a flag: Flag{hire_me_maybe}";

                terminal.innerHTML = "";
                egg.classList.add("active");

                let lineIndex = 0;
                let charIndex = 0;

                function typeLine() {
                    if (lineIndex < lines.length) {

                        if (charIndex < lines[lineIndex].length) {
                            terminal.innerHTML += lines[lineIndex][charIndex];
                            charIndex++;
                            setTimeout(typeLine, 25);
                        } else {
                            terminal.innerHTML += "<br>";
                            lineIndex++;
                            charIndex = 0;
                            setTimeout(typeLine, 400);
                        }

                    } else {
                        setTimeout(typeFlag, 1000);
                    }
                }

                function typeFlag() {
                    let flagChar = 0;

                    function typeFlagChar() {
                        if (flagChar < flagLine.length) {
                            terminal.innerHTML += flagLine[flagChar];
                            flagChar++;
                            setTimeout(typeFlagChar, 30);
                        }
                    }

                    typeFlagChar();
                }

                typeLine();

                setTimeout(() => {
                    egg.classList.remove("active");
                }, 7000);

                closeSearch();
                return;
            }

            const match = searchableData.find(item =>
                item.title.includes(query)
            );

            if (match) {
                document.getElementById(match.id)
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            }

            closeSearch();
        }
    });
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");

        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });
});
