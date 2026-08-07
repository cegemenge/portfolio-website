// ==========================================
// ODUNAYO OSILAJA PORTFOLIO
// script.js
// ==========================================

// =============================
// Typing Animation
// =============================

const typingElement = document.getElementById("typing");

const words = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Python Developer",
    "Solar Engineer",
    "AI Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    if(!typingElement) return;

    let current = words[wordIndex];

    if(!deleting){

        typingElement.textContent =
            current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }else{

        typingElement.textContent =
            current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 45 : 90);

}

typeEffect();


// =============================
// Scroll Reveal Animation
// =============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll("section,.card,.project-card,.skill-card")
.forEach(el=>observer.observe(el));


// =============================
// Animated Counters
// =============================

const counters = document.querySelectorAll(".card h2");

counters.forEach(counter=>{

    const update = ()=>{

        const target =
        parseInt(counter.innerText);

        let current =
        Number(counter.getAttribute("data-count")) || 0;

        const increment =
        Math.ceil(target/80);

        if(current < target){

            current += increment;

            if(current > target){

                current = target;

            }

            counter.setAttribute("data-count",current);

            counter.innerText=current+"+";

            requestAnimationFrame(update);

        }else{

            counter.innerText=target+"+";

        }

    }

    update();

});


// =============================
// Sticky Header Shadow
// =============================

window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    if(window.scrollY>40){

        header.style.boxShadow=
        "0 10px 25px rgba(0,0,0,.15)";

    }else{

        header.style.boxShadow="none";

    }

});


// =============================
// Dark Mode
// =============================

const themeButton=
document.getElementById("themeToggle");

if(themeButton){

    const savedTheme=
    localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.add("dark");

        themeButton.innerHTML="☀";

    }

    themeButton.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            themeButton.innerHTML="☀";

        }else{

            localStorage.setItem("theme","light");

            themeButton.innerHTML="🌙";

        }

    });

}


// =============================
// Scroll To Top Button
// =============================

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.className="topButton";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.style.display="flex";

    }else{

        topButton.style.display="none";

    }

});

topButton.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};


// =============================
// Hire Me
// =============================

function hireMe(){

    window.location.href="contact.html";

}


// =============================
// Footer Year
// =============================

const footer=document.querySelector("footer p");

if(footer){

footer.innerHTML=
`© ${new Date().getFullYear()} Odunayo Osilaja. All Rights Reserved.`;

}


// =============================
// Active Navigation
// =============================

const links=document.querySelectorAll("nav a");

links.forEach(link=>{

    if(link.href===window.location.href){

        link.classList.add("active");

    }

});


// =============================
// Portfolio Loaded
// =============================

console.log("Portfolio Loaded Successfully.");