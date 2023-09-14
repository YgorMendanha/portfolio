import type { ISourceOptions } from "tsparticles-engine";
export default function OptionsParticles(): ISourceOptions {
  return {
    autoPlay: true,
    background: {
      color: {
        value: "#2e1065",
      },
      opacity: 1,
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
          parallax: {
            enable: true,
            force: 100,
            smooth: 1,
          },
        },
        resize: {
          delay: 0.5,
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            blink: true,
            consent: true,
            opacity: 1,
            color: {
              value: "#d946ef",
            },
          },
        },
        push: {
          default: true,
          groups: [],
          quantity: 4,
        },
      },
    },
    particles: {
      color: {
        value: "#d946ef",
      },
      move: {
        angle: {
          offset: 0,
          value: 90,
        },
        attract: {
          distance: 200,
          enable: false,
          rotate: {
            x: 3000,
            y: 3000,
          },
        },
        center: {
          x: 50,
          y: 50,
          mode: "percent",
          radius: 0,
        },
        decay: 0,
        distance: {},
        direction: "none",
        drift: 0,
        enable: true,
        gravity: {
          acceleration: 9.81,
          enable: false,
          inverse: false,
          maxSpeed: 50,
        },
        path: {
          clamp: true,
          delay: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
          },
          enable: false,
          options: {},
        },
        outModes: {
          default: "out",
          bottom: "out",
          left: "out",
          right: "out",
          top: "out",
        },
        random: false,
        size: false,
        speed: 2,
        spin: {
          acceleration: 0,
          enable: false,
        },
        straight: false,
        trail: {
          enable: false,
          length: 10,
          fill: {},
        },
        vibrate: false,
        warp: false,
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
        limit: 250,
        value: 200,
      },
      opacity: {
        random: {
          enable: true,
          minimumValue: 0.3,
        },
        value: {
          min: 0.3,
          max: 1,
        },
      },
      size: {
        random: {
          enable: true,
          minimumValue: 1,
        },
        value: {
          min: 1,
          max: 3,
        },
        animation: {
          count: 0,
          enable: true,
          speed: 3,
          decay: 0,
          delay: 0,
          sync: false,
          mode: "auto",
          startValue: "random",
          destroy: "none",
          minimumValue: 1,
        },
      },
      zIndex: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        opacityRate: 1,
        sizeRate: 1,
        velocityRate: 1,
      },
      links: {
        color: {
          value: "#d946ef",
        },
        consent: false,
        distance: 100,
        enable: true,
        frequency: 1,
        opacity: 0.92,
        shadow: {
          blur: false,
          color: {
            value: "#000",
          },
          enable: false,
        },
        triangles: {
          enable: true,
          frequency: 1,
          color: {
            value: "#a855f7",
          },
        },
        width: 1,
        warp: false,
      },
    },
  };
}
