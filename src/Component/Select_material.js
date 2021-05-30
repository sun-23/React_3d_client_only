import '../CSS/material.css'

export default function Select_material({ onChangeMaterial }){
    return(
        <div className="material">
            <label for="material">  Material: </label>
            <select name="Material" onChange={(e) => onChangeMaterial(e)}>
                <option value="1.27">PETG</option>
                <option value="1.24">PLA</option>
            </select>
        </div>
    )
}