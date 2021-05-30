import '../CSS/infill.css'

export default function Select_infill({ onChangeInfill }){
    return(
        <div className="infill">
            <label for="infill">  Infill: </label>
            <select name="Infill" onChange={(e) => onChangeInfill(e)}>
                <option value="40">20 %</option>
                <option value="60">40 %</option>
                <option value="80">60 %</option>
                <option value="100">80 %</option>
            </select>
        </div>
    )
}