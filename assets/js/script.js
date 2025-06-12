$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs para enviar por correo electrónico los datos del formulario de contacto -->
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        emailjs.init("4xvq8Kka9EeDNqVoi");

        emailjs.sendForm('service_c6lmq9k', 'template_v35ej7o', '#contact-form')
            .then(function (response) {
                console.log('ÉXITO!', response.status, response.text);
                document.getElementById("contact-form").reset();

                Swal.fire({
                    icon: 'success',
                    title: '¡Enviado!',
                    text: 'Tu formulario fue enviado exitosamente.',
                    confirmButtonColor: '#3085d6'
                });
            }, function (error) {
                console.log('FALLIDO...', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar el formulario. Por favor, intentá nuevamente.',
                    confirmButtonColor: '#d33'
                });
            });
    });
    // <!-- emailjs para enviar por correo electrónico los datos del formulario de contacto -->

    // <!-- MODO OSCURO -->
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    const icon = document.querySelector(".slider .icon"); // Asegúrate de tener este span

    function updateIcon(isDark) {
        if (icon) {
            icon.textContent = isDark ? "☀️" : "🌙";
        }
    }

    if (darkModeSwitch) {
        // Cargar preferencia guardada
        const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";

        if (darkModeEnabled) {
            document.body.classList.add("dark-mode");
            darkModeSwitch.checked = true;
        }

        // Actualizar el ícono al cargar
        updateIcon(darkModeEnabled);

        darkModeSwitch.addEventListener("change", () => {
            if (darkModeSwitch.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("darkMode", "enabled");
                updateIcon(true);
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("darkMode", "disabled");
                updateIcon(false);
            }
        });
    }

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Mariano López";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Volver al Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["desarrollo front-end", "desarrollo back-end", "desarrollo de android", "desarrollo web", "diseño web", "wordpress"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "habilidades") {
    let response
    type === "habilidades" ?
        response = await fetch("habilidades.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function mostrarHabilidades(habilidades) {
    let habilidadesContenedor = document.getElementById("habilidadesContenedor");
    let skillHTML = "";
    habilidades.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    habilidadesContenedor.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";

    projects
        .slice(0, 10)
        .filter(project => project.category !== "android")
        .forEach(project => {

            const viewLink = project.links.view;
            const codeLink = project.links.code;

            const viewBtn = viewLink && viewLink.trim() !== "" && viewLink !== "#"
                ? `<a href="${viewLink}" class="btn" target="_blank"><i class="fas fa-eye"></i> Ver</a>`
                : "";

            const codeBtn = codeLink && codeLink.trim() !== "" && codeLink !== "#"
                ? `<a href="${codeLink}" class="btn" target="_blank">Codigo <i class="fas fa-code"></i></a>`
                : "";

            projectHTML += `
        <div class="box tilt">
          <img draggable="false" src="../assets/images/projects/${project.image}.png" alt="project" />
          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                ${viewBtn}
                ${codeBtn}
              </div>
            </div>
          </div>
        </div>`;
        });

    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== ANIMACIÓN DE REVELACIÓN DE DESPLAZAMIENTO ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /*PROYECTOS DE DESPLAZAMIENTO*/
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    mostrarHabilidades(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 500);
}
window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6847195ba8bd801908c28af6/1itarm3mn';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL hogar */
srtop.reveal('.hogar .content h3', { delay: 200 });
srtop.reveal('.hogar .content p', { delay: 200 });
srtop.reveal('.hogar .content .btn', { delay: 200 });

srtop.reveal('.hogar .image', { delay: 400 });
srtop.reveal('.hogar .linkedin', { interval: 600 });
srtop.reveal('.hogar .github', { interval: 800 });
srtop.reveal('.hogar .twitter', { interval: 1000 });
srtop.reveal('.hogar .telegram', { interval: 600 });
srtop.reveal('.hogar .instagram', { interval: 600 });
srtop.reveal('.hogar .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* HABILIDADES DE DESPLAZAMIENTO */
srtop.reveal('.habilidades .container', { interval: 200 });
srtop.reveal('.habilidades .container .bar', { delay: 400 });

/* EDUCACIÓN DE DESPLAZAMIENTO */
srtop.reveal('.educacion .box', { interval: 200 });

/*PROYECTOS DE DESPLAZAMIENTO*/
srtop.reveal('.work .box', { interval: 200 });

/* EXPERIENCIA DE DESPLAZAMIENTO */
srtop.reveal('.experiencia .timeline', { delay: 400 });
srtop.reveal('.experiencia .timeline .container', { interval: 400 });

/* DESPLAZARSE CONTACTO */
srtop.reveal('.contacto .container', { delay: 400 });
srtop.reveal('.contacto .container .form-group', { delay: 400 });