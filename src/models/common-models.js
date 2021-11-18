import PropTypes from "prop-types";


//IngredientDetails component
// export const ingredientDetailsModel = PropTypes.shape({
//     image_large: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     calories: PropTypes.number.isRequired,
//     carbohydrates: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     proteins: PropTypes.number.isRequired,
// });

//IngredientCard component
export const ingredientModel = PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    onOpen: PropTypes.func.isRequired
});

//BurgerConstructorItem component
export const ingredientElementModel = PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
});

export const orderDetailsModel = PropTypes.shape({
    id: PropTypes.number.isRequired
});

//ProtectedRoute
export const propTypesModel = PropTypes.shape ({
    children: PropTypes.node.isRequired,
    exact: PropTypes.bool,
    path: PropTypes.string.isRequired
});
