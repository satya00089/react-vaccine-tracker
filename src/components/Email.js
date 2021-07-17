const Email = ({ email, onEmailChange }) => {
    return (
        <div className="row mb-1">
            <div className="col">
                <div className="form-outline">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" autoComplete="off"
                        onClick={() => onEmailChange({ touched: true })}
                        onChange={(e) => onEmailChange({ value: e.target.value })}
                        className={"form-control " + (Object.keys(email.errors).length > 0 ? 'is-invalid' : '')} />
                    { Object.keys(email.errors).length > 0  && (<div className="invalid-feedback">
                        { email.errors.required && (<div>Email is required</div>) }
                        { email.errors.pattern && (<div>please provide valid email address</div>) }
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Email
