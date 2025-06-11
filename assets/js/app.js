particlesJS('particles-js', {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 900
      }
    },
    color: {
      value: ["#273c75", "#8c7ae6", "#44bd32", "#487eb0", "#353b48"] // tonos oscuros azules y verdes
    },
    shape: {
      type: ["circle", "triangle", "polygon", "star"],
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 3,
        size_min: 0.5,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 130,
      color: "#2f3640", // gris oscuro para buen contraste
      opacity: 0.5,
      width: 1.2
    },
    move: {
      enable: true,
      speed: 1.8,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 1000,
        rotateY: 1000
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 180,
        line_linked: {
          opacity: 0.8
        }
      },
      bubble: {
        distance: 250,
        size: 7,
        duration: 2,
        opacity: 0.9,
        speed: 3
      },
      repulse: {
        distance: 150,
        duration: 0.4
      },
      push: {
        particles_nb: 6
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true,
  config_demo: {
    background_color: "#ffffff",
    background_image: "",
    background_position: "center center",
    background_repeat: "no-repeat",
    background_size: "cover"
  }
});
