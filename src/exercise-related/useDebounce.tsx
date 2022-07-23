import {useEffect, useRef, useState} from 'react';


export function useDebounce<T extends string = "just text">(value: T, delay: number = 2500) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    let {current} = useRef<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            current = value;
            setDebouncedValue(value);
        }, delay)
        //    cancel the timeout if value changes (also on delay change or unmount)
        //    this is how to prevent debounced value from updating if value is changed
        //    within the delay period , timeout gets cleared and restarted
        return () => {
            clearTimeout(handler);
        }
        //    only recall this useEffect when value / delay changes
    }, [value, delay]);


    return debouncedValue;
}


