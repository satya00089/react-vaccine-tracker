const Pincode = ({ pinCode, onPinCodeChange }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="form-outline">
                <label className="form-label" htmlFor="pinCode">Pincode</label>
                <input type="text" id="pinCode" className="form-control" autoComplete="off"
                    onClick={() => onPinCodeChange({ touched: true })}
                    onChange={(e) => onPinCodeChange({ value: e.target.value })}
                    className={"form-control " + (Object.keys(pinCode.errors).length > 0 ? 'is-invalid' : '')} />
                { Object.keys(pinCode.errors).length > 0  && (<div className="invalid-feedback">
                    { pinCode.errors.required && (<div>Pincode is required</div>) }
                    { pinCode.errors.pattern && (<div>please provide valid pincode</div>) }
                </div>)}
            </div>
        </div>
    )
}

export default Pincode
