

export default function Select_material({ onChangeMaterial }){
    return(
        <div className="row">
            <div className="col">
                <label>  Material: </label>
            </div>
            <div className="col-10">
                <select class="form-select" name="" onChange={(e) => onChangeMaterial(e)}>
                    <option value="1.27">PETG</option>
                    <option value="1.24">PLA</option>
                </select>
            </div>
        </div>
    )
}