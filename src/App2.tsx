import * as React from 'react';
import {Switch} from "./exercise-related/switch";


interface Toggle {
    on: boolean;
    toggle: () => void
};
type ToggleOrNull = Toggle | null;

// compound component
const ToggleContext = React.createContext<ToggleOrNull>(null);
ToggleContext.displayName = 'ToggleContext';

// @ts-ignore
function Toggle({children}) {
    const [on, setOn] = React.useState(false)
    const toggle = () => setOn(!on)

    // take existing props, clone it then add new props as required [which is what done here]
    // return React.Children.map(children, child => {
    //     return typeof  child.type === 'string' ? child : React.cloneElement(child, {on, toggle})
    // });

    // making it more flexible
    return <ToggleContext.Provider value={{on, toggle}}>{children}</ToggleContext.Provider>
}

function useToggle() {
    const context = React.useContext<ToggleOrNull>(ToggleContext);
    if(!context) {
        throw new Error('useToggle must be used within a <Toggle /> component');
    }
    return context;
}


// Accepts `on` and `children` props and returns `children` if `on` is true
// const ToggleOn = ({on, children}: Record<string, any>) => on ? children : null;

// making it more flexible
const ToggleOn = ({children}: { children: React.ReactNode }): any => {
    // @ts-ignore
    const {on} = useToggle();
    return on ? children : null;
};

// Accepts `on` and `children` props and returns `children` if `on` is false
// const ToggleOff = ({on, children}: Record<string, any>) => on ? null : children;

// making it more flexible
const ToggleOff = ({children}: {children: React.ReactNode}): any => {
    // @ts-ignore
    const {on} = useToggle();
    return on ? null : children;
};

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
// @ts-ignore
// const ToggleButton = ({on, toggle, ...props}: Record<string, any>) => <Switch on={on} onClick={toggle} {...props} />;

// making it more flexible
const ToggleButton = (props: Record<string, any>) => {
    // @ts-ignore
    const {on, toggle} = useToggle();
    // @ts-ignore
    return <Switch on={on} onClick={toggle} {...props} />
};


function App() {

    return (
        <div>
            <Toggle>
                <ToggleOn>The button is on</ToggleOn>
                <ToggleOff>The button is off</ToggleOff>
                <div>
                    <ToggleButton/>
                </div>
            </Toggle>
        </div>
    )
}

export default App;

