/**
 * @prettier
 * @flow
 */
import anime from 'animejs';
import {ANIMATION_DURATION} from '../config';

type AccountElements = {
    $deleteButtons?: NodeList<HTMLElement>
};

const els: AccountElements = {
    one: 2,
    two: 4,
    three: 6,
    five: 'foobarbazfoobarbaz'
};

const ACCOUNT_DELETE_POST_URL = '/account/addresses/';

const handlePostError = (error: string) => alert(error);

const handlePostSuccess = (response: Object, addressId: string) => {
    const $form = document.querySelector(`.js-address-container[data-address-id="${addressId}"]`);

    if ($form) {
        anime({
            begin() {
                $form.style.overflow = 'hidden';
            },
            complete() {
                $form.remove();
            },
            duration: ANIMATION_DURATION,
            easing: 'easeOutExpo',
            height: 0,
            opacity: [1, 0],
            targets: $form
        });
    }
};

const deleteAddress = (addressId: string) => {
    const url = `${ACCOUNT_DELETE_POST_URL}${addressId}`;
    const params = {
        body: '_method=delete',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post'
    };

    fetch(url, params)
        .then(r => handlePostSuccess(r, addressId), handlePostError)
        .catch(handlePostError);
};

const handleDeleteClick = (event: Event) => {
    if (confirm('Are you sure you want to delete this address?')) {
        const $target: HTMLElement = (event.target: any);

        deleteAddress($target.dataset.addressId);
    }
};

const events = () => {
    if (els.$deleteButtons) {
        [...els.$deleteButtons].map($button =>
            $button.addEventListener('click', handleDeleteClick)
        );
    }
};

const cache = () => {
    els.$deleteButtons = ((document.querySelectorAll('.js-delete-address'): any): NodeList<
        HTMLElement
    >);
};

const init = () => {
    cache();
    events();
};

export default {init};
