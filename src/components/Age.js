const Age = ({ age, onAgeChange }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-6">
            <label htmlFor="" class="form-label">Age</label>
            <div className={"form-control " + (Object.keys(age.errors).length > 0 ? 'is-invalid' : '')}>
                <div class="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="age" value="18+" id="18+"
                        checked={age.value === '18+'}
                        onClick={(e) => onAgeChange({ touched: true, value: e.target.value })} />
                    <label class="form-check-label" htmlFor="18+">18+</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="age" value="35+" id="35+"
                        checked={age.value === '35+'}
                        onClick={(e) => onAgeChange({ touched: true, value: e.target.value })} />
                    <label class="form-check-label" htmlFor="35+">35+</label>
                </div>
            </div>
            { Object.keys(age.errors).length > 0  && (<div className="invalid-feedback">
                { age.errors.required && (<div>Age is required</div>) }
            </div>)}
        </div>
    )
}

export default Age
