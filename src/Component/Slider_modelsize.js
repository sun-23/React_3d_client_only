import '../CSS/slider.css'

export default function Slider_modelsize({size, onChangeSize}) {
    return(
        <div className="slider-size">
            <label>Size: {size} %</label>
            <input type="range" min="10" max="200" step="5" onChange={onChangeSize}></input>
            <p>Please note: size of model is change but preview model size is not change</p>
        </div>
    )
}