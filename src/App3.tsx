import * as React from 'react';
import {Switch} from "./exercise-related/switch";

// Prop collections and getters
function callAll(...fns: any[]) {
    return (...args) => {
        fns.forEach((fn) => {
            fn && fn(...args)
        })
    }
}

function useToggle() {
    const [on, setOn] = React.useState(false);
    const toggle = () => setOn(!on);

    // @ts-ignore
    function getTogglerProps({onClick, ...props}: any = {}) {
        return {
            'aria-pressed': on,
            onClick: callAll(onClick, toggle),
            ...props
        };
    }
    return {on, toggle, getTogglerProps};
}

function App() {
    const {on, getTogglerProps} = useToggle();
    return (
        <div>
            <Switch {...getTogglerProps({on})} />
            <hr/>
            <button {...getTogglerProps({
                'aria-label': 'custom-button',
                onClick: () => console.info('onButton click')
            })}>
                {on ? "on" : "off"}
            </button>
        </div>
    )
}

export default App;