import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = (props) => (
    <span>
        <DragIcon type="primary"/>
        <ConstructorElement
            text={props.data.name}
            price={props.data.price}
            thumbnail={props.data.image}
        />
    </span>
)
export default IngredientElement;

