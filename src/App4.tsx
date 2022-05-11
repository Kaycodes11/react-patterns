import * as React from 'react';
import {Switch} from "./exercise-related/switch";

// State Reducer
const callAll = (...fns: any[]) => (...args: any[]) => fns.forEach((fn) => fn && fn(args));
const actionTypes = { toggle: "toggle", reset: "reset" }

function toggleReducer(state: Record<string, any>, {type, initialState}) {
    switch (type) {
        case actionTypes.toggle: {
            return {on: !state.on}
        }
        case actionTypes.reset: {
            return initialState;
        }
        default:
            throw new Error(`Unsupported error types is : ${type}`);
    }
}

function useToggle({initialOn = false, reducer = toggleReducer}) {
    const {current: initialState} = React.useRef<{ on: boolean }>({on: initialOn});
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const {on} = state;

    // @ts-ignore
    const toggle = () => dispatch({type: actionTypes.toggle});
    const reset = () => dispatch({type: actionTypes.reset, initialState});

    // @ts-ignore
    function getTogglerProps({onClick, ...props}: any = {}) {
        return {
            'aria-pressed': on,
            onClick: callAll(onClick, toggle),
            ...props
        };
    }

    function getResetterProps({onClick, ...props}: any = {}) {
        return {
            onClick: callAll(onClick, reset),
            ...props
        }
    }

    return {on, toggle, reset, getTogglerProps, getResetterProps};
}

// export { useToggle, toggleReducer, actionTypes }
// import { useToggle, toggleReducer, actionTypes } from "./use-toggle"


function App() {
    const [timesClicked, setTimesClicked] = React.useState<number>(0);
    const clickedTooMuch = timesClicked >= 4;

    function toggleStateReducer(state, action) {
        if (action.type === actionTypes.toggle && clickedTooMuch) {
            return {on: state.on};
        }
        // otherwise sent to this reducer with state, action as arguments
        return toggleReducer(state, action);
    }

    const {on, getTogglerProps, getResetterProps} = useToggle({reducer: toggleStateReducer})

    return (
        <div>
            <Switch
                {...getTogglerProps({
                    disabled: clickedTooMuch,
                    on: on,
                    onClick: () => setTimesClicked(count => count + 1),
                })}
            />
            {clickedTooMuch ? (
                <div data-testid="notice">
                    Whoa, you clicked too much!
                    <br />
                </div>
            ) : timesClicked > 0 ? (
                <div data-testid="click-count">Click count: {timesClicked}</div>
            ) : null}
            <button {...getResetterProps({onClick: () => setTimesClicked(0)})}>
                Reset
            </button>
        </div>
    )
}

export default App;