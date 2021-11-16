import {useRef} from "react";

export const useSupportInput = () => {
    const ref = useRef();
    const handleBlur = (e) => {
        e.preventDefault();
        let input = ref.current;
        input.setAttribute('disabled', true);
        input.classList.add('input_textfield-disabled');
    }
    const handleIconClick = (e) => {
        e.preventDefault();
        let input = ref.current;
        input.removeAttribute('disabled');
        input.classList.remove('input_textfield-disabled')
        input.focus();
    }
    return {
        ref,
        handleBlur,
        handleIconClick
    }
}
