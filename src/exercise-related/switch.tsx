import './switch.styles.css'
import * as React from 'react'
import {symlink} from "fs";


const noop = () => {
}
type AriaLabel = { "ariaLabel"?: string };
type Props = { on: boolean, toggle?: () => void, className?: string, onClick?: () => void } & AriaLabel;
type PropsA= { 'aria-pressed'?: boolean, getTogglerProps?: () => Props } & Props;

type State = {}

class Switch extends React.Component<any, State> {
    render() {
        const {
            on,
            className: className = '',
            onClick,
            ...props
        } = this.props
        const btnClassName = [
            className,
            'toggle-btn',
            on ? 'toggle-btn-on' : 'toggle-btn-off',
        ]
            .filter(Boolean)
            .join(' ')
        return (
            <label aria-label={props.ariaLabel || 'Toggle'} style={{display: 'block'}}>
                <input
                    className="toggle-input"
                    type="checkbox"
                    checked={on}
                    onChange={noop}
                    onClick={onClick}
                    data-testid="toggle-input"
                />
                <span className={btnClassName} {...props} />
            </label>
        )
    }
}

export {Switch}
