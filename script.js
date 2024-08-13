gsap.registerPlugin(ScrollTrigger);

const settings = {
    trigger: document.querySelector('.trigger'),
    lerp: 0.05,
    numberOfClones: 8,


}

const tlMain = gsap.timeline({

    scrollTrigger: {
        trigger: settings.trigger,
        start: 'top top',
        end: '+=8000 bottom',
        scrub: true,
        pin: true,

    }
})


const overlay = document.querySelector('.trigger_overlay');

const cloneTitle = () => {
    const titleContainer = document.querySelector('.trigger_text'),
        title = document.querySelector('.trigger_text_title');



    for (let i = 0; i < settings.numberOfClones; i++) {
        const clone = title.cloneNode(true);
        titleContainer.appendChild(clone);

    }

}



const isMobile = window.matchMedia('(max-width: 769px');

const init = () => {

    gsap.set(overlay, { autoAlpha: 0 })


    initLenis();
    animateMedia();
    animateText();
    animateSticky();


}

const initLenis = () => {
    const lenis = new Lenis({
        lerp: settings.lerp,
        smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

const animateMedia = () => {
    const tlPosition = 1;

    const media = {
        element: document.querySelector('.trigger_media'),
        figure: document.querySelectorAll('.trigger_media_figure'),
        image: document.querySelectorAll('.trigger_media_image'),



    };


    gsap.set(media.image, { yPercent: 101 });

    tlMain.to(media.image, {
        yPercent: 0,
        stagger: 0.08
    });

    const centerX = window.innerWidth / 2;

    media.figure.forEach((figure) => {

        const figureRect = figure.getBoundingClientRect(),
            figureCenterX = figureRect.x + figureRect.width / 2;

        const distance = centerX - figureCenterX;

        tlMain.to(figure, {
            x: distance,
            durantion: 1,
            stagger: 0.08,
        },
            tlPosition

        );
    });
            tlMain.to(
                media.figure, {
                scale: 5,

            }).to(overlay, {
                autoAlpha: 1
            });



   

};



const animateText = () => {

    const tlPosition = 2;

    const title = {
        words: document.querySelectorAll('.trigger_text_title_word'),
        odd: '.trigger_text_title:nth-child(odd)',
        even: '.trigger_text_title:nth-child(even)',
    };

    gsap.set(title.words, { autoAlpha: 0 });
    gsap.set(title.words[0], { autoAlpha: 1 });
    gsap.set(title.even, { xPercent: -15 });

    tlMain
        .to(title.odd, { duration: 4, xPercent: -15 }, tlPosition)
        .to(title.even, { duration: 4, xPercent: 0 }, tlPosition)
        .to(title.words, {
            duration: 0,
            autoAlpha: 1,
            stagger: {
                each: 0.2,
                grid: 'auto',
                from: 'random'
            },

        },
            tlPosition
        );


}

const animateSticky = () => {

    const tlPosition = 3;

    const sticky = {
        section: document.querySelector('.trigger_sticky'),
        cols: document.querySelectorAll('.trigger_sticky_col'),
    };

    gsap.set([sticky.cols[0], sticky.cols[1]], { yPercent: 100 });

    tlMain.to(
        sticky.cols[0],
        {
            yPercent: 0,
        },
        tlPosition
    ).to(
        sticky.cols[1],
        {
            duration: 3,
            yPercent: -100,

        },
        tlPosition
    ).to(overlay, {
        duration: 2,
        scale: 2,
    },
        '>-=0.5'
    );

}

window.addEventListener('DOMContentLoaded', () => {


    cloneTitle();
    init();




})