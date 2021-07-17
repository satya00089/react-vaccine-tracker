const Districts = ({ district, districts, onDistrictsChange }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-6">
            <label className="form-label" htmlFor="district">District</label>
            <select
                value={district.district_id}
                onClick={() => onDistrictsChange('', { touched: true })}
                onChange={(e) => onDistrictsChange(e.target.value, {})}
                className={"form-select form-select-sm " + (Object.keys(district.errors).length > 0 ? 'is-invalid' : '')}
                id="state">
                <option></option>
                {districts.map((district) => (
                    <option key={district?.district_id} value={district?.district_id}>{district?.district_name}</option>
                ))}
            </select>
            { Object.keys(district.errors).length > 0  && (<div className="invalid-feedback">
                { district.errors.required && (<div>Please select correct district</div>) }
            </div>)}
        </div>
    )
}

export default Districts
