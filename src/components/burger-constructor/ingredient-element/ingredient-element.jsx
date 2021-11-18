import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {ingredientElementModel} from "../../../models/common-models";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    CONSTRUCTOR_MOVE_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT
} from "../../../services/actions/burger-constructor";

const IngredientElement = (props) => {
    const uuid = props.data.uuid;
    const {_id, name, price, image} = props.data.data;
    const index = props.index;

    const dispatch = useDispatch();
    const item_ref = useRef(null);

    const handleRemove = () => {
        dispatch({
            type: CONSTRUCTOR_REMOVE_INGREDIENT,
            uuid: uuid
        })
    }

    const handleMove = (dragIndex, hoverIndex) => {
        dispatch({
            type: CONSTRUCTOR_MOVE_INGREDIENT,
            dragIndex,
            hoverIndex
        })
    }

    const [{isDragging}, drag] = useDrag({
        type: 'sortable',
        item: () => {
            return {...props, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    const [, drop] = useDrop({
        accept: 'sortable',
        hover(item, monitor) {
            if (!item_ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = item_ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            handleMove(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    });

    drag(drop(item_ref));

    return (
        <span id={_id} style={{opacity: opacity}} ref={item_ref}>
            <div style={{cursor: 'pointer'}}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={handleRemove}/>
        </span>
    )
}

IngredientElement.propTypes = ingredientElementModel.isRequired;
export default IngredientElement;

