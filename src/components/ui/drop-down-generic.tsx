/**
 * @module Component for handling general dropdown needs.
 * @param String stateObject: linked to the dropdown storing its value.
 * @param Function updateState: setState function linked to the dropdown updating its value.
 * @param Array<String> options: array of strings giving the dropdown's potential options.
 * @param String Label: Label to give to the dropdown.
 * @returns
 */

/**
 *
 *
 */
interface DropDownProps {
    stateObject: string;
    updateState: (newValue: string) => void;
    options: Array<string>;
    label: string;
}

export default function GenericDropDown(props: DropDownProps) {
    const { stateObject, updateState, options, label } = props;

    return (
        <div className="flex items-center">
            <span className="mr-1 text-sm">{label}</span>
            <select
                value={stateObject}
                onChange={(e) => {
                    updateState(e.target.value);
                }}
                className="border border-gray-300 rounded px-1 py-1 text-sm"
            >
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.toLowerCase()}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
