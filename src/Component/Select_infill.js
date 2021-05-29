export default function Select_infill({ onChangeInfill }){
    return(
        <div>
            <label for="infill">  Infill: </label>
            <select name="Infill" onChange={(e) => onChangeInfill(e)}>
                <option value="20">20 %</option>
                <option value="40">40 %</option>
                <option value="60">60 %</option>
                <option value="80">80 %</option>
            </select>
        </div>
    )
}