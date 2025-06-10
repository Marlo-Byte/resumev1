const BASE_PATH = window.location.hostname === "localhost" ? "" : "/resumev1";


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
    });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Proyectos | Portafolio Mariano López";
        $("#favicon").attr("href", `${BASE_PATH}/assets/images/favicon.png`);
    } else {
        document.title = "Volver a portfolio";
        $("#favicon").attr("href", `${BASE_PATH}/assets/images/favhand.png`);
    }
});

// buscar proyectos de inicio
function getProjects() {
    return fetch(`${BASE_PATH}/projects.json`)
        .then(response => response.json())
        .then(data => data);
}

function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        const imgSrc = `${BASE_PATH}/assets/images/projects/${project.image}.png`;

        // Botones condicionales
        const viewBtn = project.links.view
            ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> Ver</a>`
            : "";

        const codeBtn = project.links.code
            ? `<a href="${project.links.code}" class="btn" target="_blank">Código <i class="fas fa-code"></i></a>`
            : "";

        // Template HTML
        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img src="${imgSrc}" alt="project" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200.png?text=Imagen+no+disponible'; console.error('Imagen no encontrada:', '${imgSrc}')">
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
            </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Inicializar Isotope
    const $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}


getProjects().then(data => {
    showProjects(data);
});

// desactivar modo desarrollador
document.onkeydown = function (e) {
    if (e.keyCode == 123 || 
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) || 
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};
