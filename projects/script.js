const BASE_PATH = "https://marlo-byte.github.io/resumev1";

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
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        let viewBtn = project.links.view && project.links.view.trim() !== ""
            ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> Ver</a>`
            : "";

        let codeBtn = project.links.code && project.links.code.trim() !== ""
            ? `<a href="${project.links.code}" class="btn" target="_blank">Código <i class="fas fa-code"></i></a>`
            : "";

        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img draggable="false" src="${BASE_PATH}/assets/images/projects/${project.image}.png" alt="project" />
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

    // isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
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
