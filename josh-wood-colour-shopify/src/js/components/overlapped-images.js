/**
 * @prettier
 * @/flow
 */
type OverlappedImagesElements = {
    $containers?: NodeList<HTMLElement>
};

const els: OverlappedImagesElements = {};

const handleContainerClick = (event: MouseEvent) => {
    const $target: HTMLElement = event.target.parentNode.parentNode;

    $target.style.zIndex = $target.style.zIndex > 2 ? parseInt($target.style.zIndex) + 1 : 3;
};

const events = () => {
    if (els.$containers) {
        [...els.$containers].map($container =>
            $container.addEventListener('mouseover', handleContainerClick, false)
        );
    }
};

const cache = () => {
    els.$containers = ((document.querySelectorAll('.js-overlapped-images'): any): NodeList<
        HTMLElement
    >);
};

const init = () => {
    cache();
    events();
};

export default {init};
