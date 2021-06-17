export default function Select_Quality({ onChangeQuality }) {
    return(
        <div className="row">
            <div className="col">
                <label> Quality: </label>
            </div>
            <div className="col-10">
                <select class="form-select" name="" onChange={(e) => onChangeQuality(e)}>
                    <option value="1">Normal (0.2mm)</option>
                    <option value="1.1">High (0.15mm)</option>
                    <option value="0.9">Low (0.3mm)</option>
                </select>
            </div>
        </div>
    )
}
