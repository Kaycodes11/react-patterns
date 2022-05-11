import * as React from 'react';


function App() {
    const [name, setName] = React.useState<string | undefined>(undefined!);
    const [animal, setAnimal] = React.useState<string>('tiger')
    return (
        <div>
            <div>
                <label>
                    {/*Read only (missing onChange): <input value="yo" onChange={() => {}}/>*/}
                    Read only (missing onChange): <input value="yo" readOnly={true} />
                </label>
            </div>
            <div>
                <button onClick={() => setName('bob')}>Set name to bob</button>
                <label>
                    Changing from uncontrolled to controlled:{' '}
                    <input value={name} onChange={e => setName(e.target.value)}/>
                </label>
            </div>
            <div>
                <button onClick={() => setAnimal(`lion`)}>Unset animal</button>
                <label>
                    Changing from controlled to uncontrolled:{' '}
                    <input value={animal} onChange={e => setAnimal(e.target.value)}/>
                </label>
            </div>
        </div>
    )
}

export default App;
