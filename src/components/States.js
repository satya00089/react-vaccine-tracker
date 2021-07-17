const States = ({ state, states, onStateChange }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-6">
            <label className="form-label" htmlFor="state">State</label>
            <select
                value={state.value?.state_id}
                onClick={() => onStateChange('', { touched: true })}
                onChange={(e) => onStateChange(e.target.value, {})}
                className={"form-select form-select-sm " + (Object.keys(state.errors).length > 0 ? 'is-invalid' : '')}
                id="state">
                <option></option>
                {states.map((state) => (
                    <option key={state?.state_id} value={state?.state_id}>{state?.state_name}</option>
                ))}
            </select>
            { Object.keys(state.errors).length > 0  && (<div className="invalid-feedback">
                { state.errors.required && (<div>Please select correct state</div>) }
            </div>)}
        </div>
    )
}

export default States
