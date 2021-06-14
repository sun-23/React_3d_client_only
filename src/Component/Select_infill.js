

export default function Select_infill({ onChangeInfill }){
    return(
        <div className="row">
            <div className="col">
                <label className="col">  Infill: </label>
            </div>
            <div className="col-10">
                <select class="form-select" name="" onChange={(e) => onChangeInfill(e)}>
                    <option value="40">20 %</option>
                    <option value="60">40 %</option>
                    <option value="80">60 %</option>
                    <option value="100">80 %</option>
                </select>
            </div>
        </div>
    )
}