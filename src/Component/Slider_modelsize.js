import '../CSS/slider.css'

export default function Slider_modelsize({size, onChangeSize}) {
    return(
        <div className="row">
            <div className="col">
                <label>Size: {size} %</label>
            </div>
            <div className="col-9">
                <input className="form-range" type="range" min="10" max="200" step="5" onChange={onChangeSize} value={size}></input>
            </div>
        </div>
    )
}