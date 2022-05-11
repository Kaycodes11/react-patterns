import * as React from 'react';
import {Switch} from "./exercise-related/switch";

// control props
const callAll = (...fns: any[]) => (...args: any[]) => fns.forEach(fn => fn && fn(args));


const actionTypes = {toggle: "toggle", reset: "reset"};

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

function useToggle({initialOn = false, reducer = toggleReducer, onChange, on: controlledOn}) {
    const {current: initialState} = React.useRef<{ on: boolean }>({on: initialOn});
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const onIsControlled = controlledOn != null; // it will evaluate to either true/false
    const on = onIsControlled ? controlledOn : state.on;

    function dispatchWithChange(action) {
        if (!onIsControlled) {
            dispatch(action);
        }
        const newState = reducer({...state, on}, action);
        onChange?.(newState, action); // onChange(reducer(state, action), action)
    }

    // @ts-ignore
    const toggle = () => dispatchWithChange({type: actionTypes.toggle});
    const reset = () => dispatchWithChange({type: actionTypes.reset, initialState});

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

function Toggle({on: controlledOn, onChange}: Record<string, any>) {
    // @ts-ignore
    const {on, getTogglerProps} = useToggle({on: controlledOn, onChange});
    const props = getTogglerProps({on});
    return <Switch {...props} />;
}

function App() {
    const [bothOn, setBothOn] = React.useState(false);
    const [timesClicked, setTimesClicked] = React.useState(0);

    function handleToggleChange(state, action) {
        if (action.type === actionTypes.toggle && timesClicked > 4) {
            return;
        }
        setBothOn(state.on);
        setTimesClicked(c => c + 1);
    }

    function handleResetClick() {
        setBothOn(false);
        setTimesClicked(0);
    }

    return (
        <div>
            <div>
                <Toggle on={bothOn} onChange={handleToggleChange}/>
                <Toggle on={bothOn} onChange={handleToggleChange}/>
            </div>
            {timesClicked > 4 ? (
                <div data-testid="notice">
                    Whoa, you clicked too much!
                    <br/>
                </div>
            ) : (
                <div data-testid="click-count">Click count: {timesClicked}</div>
            )}
            <button onClick={handleResetClick}>Reset</button>
            <hr/>
            <div>
                <div>Uncontrolled Toggle:</div>
                <Toggle
                    onChange={(...args) => console.info('Uncontrolled Toggle onChange', ...args)
                    }
                />
            </div>
        </div>
    );
}

export default App;