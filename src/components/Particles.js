import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
//import { loadFull } from "tsparticles"; // loads tsparticles
import { useCallback, useMemo } from "react";

const ParticlesComponent = (props) => {
    // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
    const options = useMemo(() => {
        // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
        // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
        return {

            particles: {
                background: {
                    color: "#040c04", // this sets a background color for the canvas
                },
                fullScreen: {
                    enable: true, // enabling this will make the canvas fill the entire screen, it's enabled by default
                    zIndex: -1, // this is the z-index value used when the fullScreen is enabled, it's 0 by default
                },
                



                number: {
                    value: 250,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#32fc75"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 4
                    }
                },
                opacity: {
                    value: { min: 0.3, max: 0.7 },
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1.6764191686557506,
                        opacity_min: 0,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 4,
                        size_min: 0.3,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 600
                    }
                }
            },
            fpsLimit: 30,
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "bubble",
                    },
                    onclick: {
                        enable: false,
                        mode: "repulse"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 250,
                        size: 5,
                        duration: 2,
                        opacity: 0,
                        speed: 3
                    },
                    repulse: {
                        distance: 400,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true

        };
    }, []);

    // useCallback is not mandatory, but it's recommended since this callback can be memoized if static
    const particlesInit = useCallback((engine) => {
        loadSlim(engine);
        // loadFull(engine); // for this sample the slim version is enough, choose whatever you prefer, slim is smaller in size but doesn't have all the plugins and the mouse trail feature
    }, []);

    // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
    return <Particles id={props.id} init={particlesInit} options={options} />;
};



export default ParticlesComponent;
